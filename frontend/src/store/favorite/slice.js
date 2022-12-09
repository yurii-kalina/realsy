import { createSlice } from '@reduxjs/toolkit'
import { extraReducers } from './extraReducers'
import { sliceStatus } from '../sliceStatus'
import { reducers } from './reducers'

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    status: sliceStatus.IDLE,
    error: null,
    items: {
      status: sliceStatus.IDLE,
      error: null,
      ad: {
        count: 0,
        ads: []
      },
      property: {
        count: 0,
        properties: []
      }
    },
    properties: [],
    ads: []
  },
  extraReducers: extraReducers,
  reducers: reducers
})
export default favoritesSlice.reducer