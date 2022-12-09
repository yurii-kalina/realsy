export const reducers = {
  receiveMessage: (state, action) => {
    const { chatRoom: id, sender, recipient, content, avatar } = action.payload
    if (state.messages.items.id === id) {
      state.messages.items.messages.push({
        sender: { id: sender, avatar: avatar },
        recipient: { id: recipient },
        content
      })
    }
    const index = state.rooms.items.findIndex(item => item.id === id)
    const currentRoom = state.messages.items.id
    if (index > -1 && currentRoom !== id) {
      const unread = state.rooms.items[index].unread
      if (unread) {
        state.rooms.items[index].unread += 1
      } else {
        state.rooms.items[index].unread = 1
      }
    }
  }
}
