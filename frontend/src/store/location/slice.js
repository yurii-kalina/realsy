import { createSlice } from '@reduxjs/toolkit'
import { sliceStatus } from '../sliceStatus'
import { extraReducers } from './extraReducers'

export const locationSlice = createSlice({
  name: 'location',
  initialState: {
    cities: {
      status: sliceStatus.IDLE,
      error: null,
      items: []
    },
    city: {
      status: sliceStatus.IDLE,
      error: null,
      item: {}
    }
  },
  extraReducers: extraReducers
})

export default locationSlice.reducer
