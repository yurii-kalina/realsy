import { createSlice } from '@reduxjs/toolkit'
import { sliceStatus } from '../sliceStatus'
import { reducers } from './reducers'
import { extraReducers } from './extraReducers'

export const initialState = {
  status: sliceStatus.IDLE,
  error: null,
  items: {
    status: sliceStatus.IDLE,
    error: null,
    ads: [],
    count: 0
  },
  item: {
    status: sliceStatus.IDLE,
    error: null,
    ad: {}
  },
  preview: {}

}
export const adSlice = createSlice({
  name: 'ad',
  initialState: initialState,
  extraReducers: extraReducers,
  reducers: reducers
})
export default adSlice.reducer
