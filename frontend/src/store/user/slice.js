import { createSlice } from '@reduxjs/toolkit'
import { sliceStatus } from '../sliceStatus'
import { reducers } from './reducers'
import { extraReducers } from './extraReducers'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    status: sliceStatus.IDLE,
    error: null,
    user: null
  },
  extraReducers: extraReducers,
  reducers: reducers
})
export const { logout, setUserInfo } = userSlice.actions
export default userSlice.reducer
