export const selectSocketStatus = state => state.websocket.isConnected
export const selectSocketSubscriptionStatus = state => state.websocket.isSubscribed
export const selectSocketChatStatus = state => state.websocket.isSubscribedToChat
