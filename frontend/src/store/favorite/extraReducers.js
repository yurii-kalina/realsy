import { sliceStatus } from '../sliceStatus'
import { deleteFavorite, fetchFavoritesIds, getFavoriteAds, getFavoriteProperties, sendFavorite } from './thunks'

export const extraReducers = {
  [getFavoriteAds.pending]: state => {
    state.items.status = sliceStatus.LOADING
  },
  [getFavoriteAds.fulfilled]: (state, action) => {
    state.items.status = sliceStatus.SUCCEEDED
    const { data, count } = action.payload
    state.items.status = sliceStatus.SUCCEEDED
    state.items.ad.ads = data
    state.items.ad.count = count
  },
  [getFavoriteAds.rejected]: (state, action) => {
    state.items.status = sliceStatus.FAILED
    state.items.error = action.payload
  },
  [getFavoriteProperties.pending]: state => {
    state.items.status = sliceStatus.LOADING
  },
  [getFavoriteProperties.fulfilled]: (state, action) => {
    state.items.status = sliceStatus.SUCCEEDED
    const { data, count } = action.payload
    state.items.status = sliceStatus.SUCCEEDED
    state.items.property.properties = data
    state.items.property.count = count
  },
  [getFavoriteProperties.rejected]: (state, action) => {
    state.items.status = sliceStatus.FAILED
    state.items.error = action.payload
  },
  [fetchFavoritesIds.pending]: state => {
    state.status = sliceStatus.LOADING
  },
  [fetchFavoritesIds.fulfilled]: (state, action) => {
    state.status = sliceStatus.SUCCEEDED
    const { properties, ads } = action.payload
    state.properties = properties
    state.ads = ads
  },
  [fetchFavoritesIds.rejected]: (state, action) => {
    state.status = sliceStatus.FAILED
    state.error = action.payload
  },
  [sendFavorite.pending]: state => {
    state.items.status = sliceStatus.LOADING
  },
  [sendFavorite.fulfilled]: (state, action) => {
    state.items.status = sliceStatus.SUCCEEDED
    if (action.payload && action.payload.id) {
      const { ad, property } = action.payload
      if (ad && ad.id) {
        state.ads.push(ad.id)
        state.items.ad.ads.push(ad)
      } else if (property && property.id) {
        state.properties.push(property.id)
        state.items.property.properties.push(property)
      }
    }
  },
  [sendFavorite.rejected]: (state, action) => {
    state.items.status = sliceStatus.FAILED
    state.items.error = action.payload
  },

  [deleteFavorite.pending]: state => {
    state.items.status = sliceStatus.LOADING
  },
  [deleteFavorite.fulfilled]: (state, action) => {
    state.items.status = sliceStatus.SUCCEEDED
    if (action.payload && action.payload.id) {
      const { ad, property } = action.payload
      if (ad && ad.id) {
        const adIndex = state.ads.findIndex(item => item === ad.id)
        if (adIndex > -1) state.ads.splice(adIndex, 1)
        const adFavIndex = state.items.ad.ads.findIndex(item => item.ad && item.ad.id === ad.id)
        if (adFavIndex > -1) state.items.ad.ads.splice(adFavIndex, 1)
      } else if (property && property.id) {
        const propertyIndex = state.properties.findIndex(item => item === property.id)
        if (propertyIndex > -1) state.properties.splice(propertyIndex, 1)
        const propertyFavIndex = state.items.property.properties.findIndex(item => item.property && item.property.id === property.id)
        if (propertyFavIndex > -1) state.items.property.properties.splice(propertyFavIndex, 1)
      }
    }
  },
  [deleteFavorite.rejected]: (state, action) => {
    state.items.status = sliceStatus.FAILED
    state.items.error = action.payload
  }
}
