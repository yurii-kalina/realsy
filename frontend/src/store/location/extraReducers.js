import { fetchCities, fetchCity } from './thunks'
import { sliceStatus } from '../sliceStatus'

export const extraReducers = {
  // fetch property types
  [fetchCities.pending]: state => {
    state.cities.status = sliceStatus.LOADING
  },
  [fetchCities.fulfilled]: (state, action) => {
    state.cities.status = sliceStatus.SUCCEEDED
    state.cities.items = action.payload
  },
  [fetchCities.rejected]: (state, action) => {
    state.cities.error = action.payload
    state.cities.status = sliceStatus.FAILED
  },

  [fetchCity.pending]: state => {
    state.city.status = sliceStatus.LOADING
  },
  [fetchCity.fulfilled]: (state, action) => {
    state.city.status = sliceStatus.SUCCEEDED
    state.city.item = action.payload
  },
  [fetchCity.rejected]: (state, action) => {
    state.city.error = action.payload
    state.city.status = sliceStatus.FAILED
  }
}
