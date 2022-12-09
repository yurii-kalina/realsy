import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import {
  WS_CONNECT,
  WS_DISCONNECT,
  WS_SEND_MESSAGE,
  WS_SUBSCRIBE, WS_SUBSCRIBE_CHAT, WS_UNSUBSCRIBE_CHAT
} from './actions'
import { wsConnected, wsSubscribed, wsSubscribedChat, wsUnsubscribedChat } from '../websocket/slice'
import { receiveMessage } from '../chat/slice'

const socketMiddleware = () => {
  let stompClient = null
  let sock = null
  let chatSubscribe = null

  const onError = store => (err) => {
    console.log(err)
  }

  const onConnected = store => frame => {
    store.dispatch(wsConnected())
  }

  const onMessageReceived = (store) => (msg) => {
    console.log(msg)
    if (msg.body) {
      const message = JSON.parse(msg.body)
      store.dispatch(receiveMessage(message))
    }
  }

  const onNotificationReceived = (store) => (msg) => {
    if (msg.body) {
      console.log(JSON.parse(msg.body))
    }
  }

  // the middleware part of this function
  return store => next => action => {
    switch (action.type) {
      case WS_CONNECT:
        if (sock === null) {
          sock = new SockJS('/ws', {
            transports: ['xhr-streaming'],
            Upgrade: 'websocket',
            Connection: 'Upgrade'
          })
          stompClient = Stomp.over(sock)
          stompClient.connect({}, onConnected(store), onError)
        } else {
          if (stompClient !== null) {
            stompClient = Stomp.over(sock)
            stompClient.connect({}, onConnected(store), onError)
          }
        }
        break
      case WS_DISCONNECT:
        if (sock !== null) {
          sock.close()
        }
        sock = null
        stompClient.disconnect()
        store.dispatch(wsConnected())
        break
      case WS_SEND_MESSAGE:
        stompClient.send('/app/chat', {}, action.payload)
        // store.dispatch(sendMessage(action.payload))
        break
      case WS_SUBSCRIBE:
        if (sock !== null && stompClient !== null) {
          stompClient.subscribe(
            '/user/' + action.payload + '/notifications',
            onNotificationReceived(store)
          )
        }
        store.dispatch(wsSubscribed())
        break
      case WS_SUBSCRIBE_CHAT:
        if (sock !== null && stompClient !== null) {
          chatSubscribe = stompClient.subscribe(
            '/user/' + action.payload + '/queue/messages',
            onMessageReceived(store)
          )
        }
        store.dispatch(wsSubscribedChat())
        break
      case WS_UNSUBSCRIBE_CHAT:
        if (chatSubscribe !== null) {
          chatSubscribe.unsubscribe()
          chatSubscribe = null
        }
        store.dispatch(wsUnsubscribedChat())
        break
      default:
        return next(action)
    }
  }
}

export default socketMiddleware()