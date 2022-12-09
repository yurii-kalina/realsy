export const reducers = {
  wsConnected: (state) => {
    state.isConnected = true
  },
  wsDisconnected: (state) => {
    state.isConnected = false
  },
  wsSubscribed: (state) => {
    state.isSubscribed = true
  },
  wsUnsubscribed: (state) => {
    state.isSubscribed = false
  },
  wsSubscribedChat: (state) => {
    state.isSubscribedToChat = true
  },
  wsUnsubscribedChat: (state) => {
    state.isSubscribedToChat = false
  }
}
