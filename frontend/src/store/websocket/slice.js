import { createSlice } from '@reduxjs/toolkit'
import { reducers } from './reducers'

export const websocketSlice = createSlice({
  name: 'websocket',
  initialState: {
    isConnected: false,
    isSubscribed: false,
    isSubscribedToChat: false
  },
  reducers: reducers
})
export const { wsSubscribed, wsUnsubscribed, wsConnected, wsDisconnected, wsSubscribedChat, wsUnsubscribedChat } = websocketSlice.actions
export default websocketSlice.reducer
