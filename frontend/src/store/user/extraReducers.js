import { fetchUserInfo, login, logout, register } from './thunks'
import { sliceStatus } from '../sliceStatus'

export const extraReducers = {
  [register.pending]: (state) => {
    state.status = sliceStatus.LOADING
  },
  [register.fulfilled]: (state, action) => {
    state.status = sliceStatus.SUCCEEDED
    state.user = action.payload
  },
  [register.rejected]: (state, action) => {
    state.status = sliceStatus.FAILED
    state.error = action.error
  },
  [login.pending]: (state) => {
    state.status = sliceStatus.LOADING
  },
  [login.fulfilled]: (state, action) => {
    state.status = sliceStatus.SUCCEEDED
    state.token = action.payload
  },
  [login.rejected]: (state, action) => {
    state.status = sliceStatus.FAILED
    state.error = action.error
  },

  [fetchUserInfo.pending]: (state) => {
    state.status = sliceStatus.LOADING
  },
  [fetchUserInfo.fulfilled]: (state, action) => {
    state.status = sliceStatus.SUCCEEDED
    state.user = action.payload
  },
  [fetchUserInfo.rejected]: (state, action) => {
    state.status = sliceStatus.FAILED
    state.error = action.error
  },

  [logout.pending]: (state) => {
    state.status = sliceStatus.LOADING
  },
  [logout.fulfilled]: (state) => {
    state.status = sliceStatus.SUCCEEDED
    state.user = null
  },
  [logout.rejected]: (state, action) => {
    state.status = sliceStatus.FAILED
    state.error = action.error
  }
}
