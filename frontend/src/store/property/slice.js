import { createSlice } from '@reduxjs/toolkit'
import { sliceStatus } from '../sliceStatus'
import { extraReducers } from './extraReducers'
import { reducers } from './reducers'

export const propertySlice = createSlice({
  name: 'property',
  initialState: {
    status: sliceStatus.IDLE,
    error: null,
    items: {
      status: sliceStatus.IDLE,
      error: null,
      properties: [],
      count: 0
    },
    item: {
      status: sliceStatus.IDLE,
      error: null,
      property: {}
    },
    images: {
      status: sliceStatus.IDLE,
      error: null
    },
    ads: {
      propertyId: null,
      items: [],
      status: sliceStatus.IDLE,
      error: null
    }
  },
  extraReducers: extraReducers,
  reducers: reducers
})
export default propertySlice.reducer