import { sliceStatus } from '../sliceStatus'
import { fetchAdById, fetchUserAds, sortAds, submitAd, submitAdFromPreview } from './thunks'

export const extraReducers = {
  [fetchUserAds.pending]: state => {
    state.items.status = sliceStatus.LOADING
  },
  [fetchUserAds.fulfilled]: (state, action) => {
    state.items.status = sliceStatus.SUCCEEDED
    state.items.ads = action.payload
  },
  [fetchUserAds.rejected]: state => {
    state.items.status = sliceStatus.FAILED
  },
  [fetchAdById.pending]: (state) => {
    state.item.status = sliceStatus.LOADING
  },
  [fetchAdById.fulfilled]: (state, action) => {
    state.item.status = sliceStatus.SUCCEEDED
    state.item.ad = action.payload
  },
  [fetchAdById.rejected]: (state, action) => {
    state.item.status = sliceStatus.FAILED
    state.item.error = action.error
  },
  [submitAd.pending]: (state) => {
    state.item.status = sliceStatus.LOADING
  },
  [submitAd.fulfilled]: (state, action) => {
    state.item.status = sliceStatus.SUCCEEDED
    state.item.ad = action.payload
    state.items.ads.push(action.payload)
  },
  [submitAd.rejected]: (state, action) => {
    state.item.status = sliceStatus.FAILED
    state.item.error = action.error
  },
  [submitAdFromPreview.pending]: (state) => {
    state.item.status = sliceStatus.LOADING
  },
  [submitAdFromPreview.fulfilled]: (state, action) => {
    state.item.status = sliceStatus.SUCCEEDED
    state.item.ad = action.payload
    state.items.ads.push(action.payload)
  },
  [submitAdFromPreview.rejected]: (state, action) => {
    state.item.status = sliceStatus.FAILED
    state.item.error = action.error
  },
  [sortAds.pending]: state => {
    state.items.status = sliceStatus.LOADING
  },
  [sortAds.fulfilled]: (state, action) => {
    const { data, count } = action.payload
    state.items.status = sliceStatus.SUCCEEDED
    state.items.ads = data
    state.items.count = count
  },
  [sortAds.rejected]: state => {
    state.items.status = sliceStatus.FAILED
  }
}
