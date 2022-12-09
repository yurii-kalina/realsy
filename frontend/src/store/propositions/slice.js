import { createSlice } from '@reduxjs/toolkit'
import { sliceStatus } from '../sliceStatus'
import { extraReducers } from './extraReducers'
import { reducers } from './reducers'

export const propositionsSlice = createSlice({
  name: 'propositions',
  initialState: {
    status: sliceStatus.IDLE,
    error: null,
    sent: {
      status: sliceStatus.IDLE,
      error: null,
      propositions: [],
      count: 0
    },
    received: {
      status: sliceStatus.IDLE,
      error: null,
      propositions: [],
      count: 0
    },
    item: {
      status: sliceStatus.IDLE,
      error: null,
      proposition: {}
    },
    offer: {
      status: sliceStatus.IDLE,
      error: null
    }
  },
  extraReducers: extraReducers,
  reducers: reducers
})
export default propositionsSlice.reducer