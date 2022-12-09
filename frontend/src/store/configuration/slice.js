import { createSlice } from '@reduxjs/toolkit'
import { sliceStatus } from '../sliceStatus'
import { extraReducers } from './extraReducers'
import { reducers } from './reducers'

export const configurationsSlice = createSlice({
  name: 'configurations',
  initialState: {
    status: sliceStatus.IDLE,
    error: null,
    propertyType: {
      error: null,
      status: sliceStatus.IDLE,
      items: []
    },
    propertyCategory: {
      error: null,
      status: sliceStatus.IDLE,
      items: []
    },
    propertyConfigurations: {
      error: null,
      status: sliceStatus.IDLE,
      items: []
    },
    locations: {
      error: null,
      status: sliceStatus.IDLE,
      items: {}
    },
    header: {
      error: null,
      status: sliceStatus.IDLE,
      items: []
    }
  },
  reducers: reducers,
  extraReducers: extraReducers
})

export default configurationsSlice.reducer
