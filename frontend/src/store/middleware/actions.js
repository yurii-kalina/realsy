export const WS_CONNECT = 'WS_CONNECT'
export const WS_CONNECTING = 'WS_CONNECTING'
export const WS_DISCONNECT = 'WS_DISCONNECT'
export const WS_SUBSCRIBE = 'WS_SUBSCRIBE'
export const WS_SUBSCRIBE_CHAT = 'WS_SUBSCRIBE_CHAT'
export const WS_UNSUBSCRIBE_CHAT = 'WS_UNSUBSCRIBE_CHAT'
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE'

export const wsConnect = host => ({ type: WS_CONNECT })
export const wsConnecting = host => ({ type: WS_CONNECTING })
export const wsDisconnect = host => ({ type: WS_DISCONNECT })
export const wsSubscribe = id => ({ type: WS_SUBSCRIBE, payload: id })
export const wsSubscribeChat = id => ({ type: WS_SUBSCRIBE_CHAT, payload: id })
export const wsUnsubscribeChat = id => ({ type: WS_UNSUBSCRIBE_CHAT, payload: id })
export const wsSendMessage = msg => ({ type: WS_SEND_MESSAGE, payload: msg })