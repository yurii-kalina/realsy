import {
  fetchPropertyAds,
  fetchPropertyById,
  fetchUserProperties,
  sortProperties,
  submitProperty,
  submitPropertyImage
} from './thunks'
import { sliceStatus } from '../sliceStatus'

export const extraReducers = {
  [sortProperties.pending]: state => {
    state.items.status = sliceStatus.LOADING
  },
  [sortProperties.fulfilled]: (state, action) => {
    const { data, count } = action.payload
    state.items.status = sliceStatus.SUCCEEDED
    state.items.properties = data
    state.items.count = count
  },
  [sortProperties.rejected]: state => {
    state.items.status = sliceStatus.FAILED
  },
  [fetchPropertyById.pending]: state => {
    state.item.status = sliceStatus.LOADING
  },
  [fetchPropertyById.fulfilled]: (state, action) => {
    state.item.status = sliceStatus.SUCCEEDED
    state.item.property = action.payload
  },
  [fetchPropertyById.rejected]: state => {
    state.item.status = sliceStatus.FAILED
  },
  [fetchUserProperties.pending]: state => {
    state.items.status = sliceStatus.LOADING
  },
  [fetchUserProperties.fulfilled]: (state, action) => {
    state.items.status = sliceStatus.SUCCEEDED
    state.items.properties = action.payload
  },
  [fetchUserProperties.rejected]: state => {
    state.items.status = sliceStatus.FAILED
  },
  [fetchPropertyAds.pending]: state => {
    state.ads.status = sliceStatus.LOADING
  },
  [fetchPropertyAds.fulfilled]: (state, action) => {
    const { data, propertyId } = action.payload
    state.ads.status = sliceStatus.SUCCEEDED
    state.ads.items = data
    state.ads.propertyId = propertyId
  },
  [fetchPropertyAds.rejected]: (state, action) => {
    state.ads.status = sliceStatus.FAILED
    state.ads.error = action.payload
  },
  [submitProperty.pending]: state => {
    state.item.status = sliceStatus.LOADING
  },
  [submitProperty.fulfilled]: (state, action) => {
    state.item.status = sliceStatus.SUCCEEDED
    state.item.property = action.payload
    state.items.properties.push(action.payload)
  },
  [submitProperty.rejected]: (state, action) => {
    state.item.status = sliceStatus.FAILED
    state.item.error = action.payload
  },

  [submitPropertyImage.pending]: state => {
    state.images.status = sliceStatus.LOADING
  },
  [submitPropertyImage.fulfilled]: (state, action) => {
    state.images.status = sliceStatus.SUCCEEDED
    if (state.item) {
      state.item.images = action.payload
    }
  },
  [submitPropertyImage.rejected]: (state, action) => {
    state.images.status = sliceStatus.FAILED
    state.images.error = action.payload
  }
}
