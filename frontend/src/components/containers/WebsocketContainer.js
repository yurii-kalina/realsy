import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../store/user/selectors'

import { wsConnect, wsSubscribe } from '../../store/middleware/actions'
import { selectSocketStatus, selectSocketSubscriptionStatus } from '../../store/websocket/selectors'
import { sliceStatus } from '../../store/sliceStatus'

const WebsocketContainer = ({ children }) => {
  const { user, status } = useSelector(selectUser)
  const isSocketConnected = useSelector(selectSocketStatus)
  const isSocketSubscribed = useSelector(selectSocketSubscriptionStatus)
  /* const sendMessage = (sender, receiver, msg) => {
      if (msg.trim() !== '') {
        const message = {
          sender: { id: sender },
          recipient: { id: 2 },
          content: msg,
          timestamp: new Date()
        }
        dispatch(wsSendMessage(JSON.stringify(message)))
      }
    } */
  const dispatch = useDispatch()
  useEffect(() => {
    if (user && user.id && status === sliceStatus.SUCCEEDED) {
      dispatch(wsConnect())
    }
  }, [dispatch, status, user])

  useEffect(() => {
    if (isSocketConnected && user && user.id && status === sliceStatus.SUCCEEDED) {
      if (!isSocketSubscribed) {
        dispatch(wsSubscribe(user.id))
      }
    }
  }, [dispatch, isSocketConnected, isSocketSubscribed, status, user])
  return (
    children
  )
}

export default WebsocketContainer