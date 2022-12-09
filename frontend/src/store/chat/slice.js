import { createSlice } from '@reduxjs/toolkit'
import { sliceStatus } from '../sliceStatus'
import { reducers } from './reducers'
import { extraReducers } from './extraReducers'

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    rooms: {
      error: null,
      status: sliceStatus.IDLE,
      items: []
    },
    messages: {
      error: null,
      status: sliceStatus.IDLE,
      items: {
        messages: []
      }
    },
    sendStatus: sliceStatus.IDLE
  },
  extraReducers: extraReducers,
  reducers: reducers
})

export const {
  receiveMessage
} = chatSlice.actions
export default chatSlice.reducer
