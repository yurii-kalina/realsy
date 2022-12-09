import { sliceStatus } from '../sliceStatus'
import { fetchMessages, fetchRooms, sendMessage, sendPropositionMessage } from './thunks'

export const extraReducers = {
  [fetchRooms.pending]: state => {
    state.rooms.status = sliceStatus.LOADING
  },
  [fetchRooms.fulfilled]: (state, action) => {
    state.rooms.status = sliceStatus.SUCCEEDED
    state.rooms.items = action.payload
  },
  [fetchRooms.rejected]: (state, action) => {
    state.rooms.status = sliceStatus.FAILED
    state.rooms.error = action.payload
  },
  [fetchMessages.pending]: state => {
    state.messages.status = sliceStatus.LOADING
  },
  [fetchMessages.fulfilled]: (state, action) => {
    state.messages.status = sliceStatus.SUCCEEDED
    const { messages, id, ...others } = action.payload
    const index = state.rooms.items.findIndex(item => item.id === id)
    if (index > -1 && state.rooms.items[index]) {
      state.rooms.items[index].unread = 0
    }
    state.messages.items = { messages: messages.reverse(), id, ...others }
  },
  [fetchMessages.rejected]: (state, action) => {
    state.messages.status = sliceStatus.FAILED
    state.messages.error = action.payload
  },
  [sendMessage.pending]: state => {
    state.sendStatus = sliceStatus.LOADING
  },
  [sendMessage.fulfilled]: (state, action) => {
    state.sendStatus = sliceStatus.SUCCEEDED
    state.messages.items.messages.push(action.payload)
  },
  [sendMessage.rejected]: (state, action) => {
    state.sendStatus = sliceStatus.FAILED
    state.messages.error = action.payload
  },
  [sendPropositionMessage.pending]: state => {
    state.sendStatus = sliceStatus.LOADING
  },
  [sendPropositionMessage.fulfilled]: (state, action) => {
    state.sendStatus = sliceStatus.SUCCEEDED
  },
  [sendPropositionMessage.rejected]: (state, action) => {
    state.sendStatus = sliceStatus.FAILED
    state.messages.error = action.payload
  }
}
