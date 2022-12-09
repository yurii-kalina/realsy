import {
  fetchDistrictsAndMetros,
  fetchHeaderConfigurations,
  fetchPropertyCategories,
  fetchPropertyCategoryConfigurations,
  fetchPropertyTypes
} from './thunks'
import { sliceStatus } from '../sliceStatus'

export const extraReducers = {
  // fetch property types
  [fetchPropertyTypes.pending]: state => {
    state.propertyType.status = sliceStatus.LOADING
  },
  [fetchPropertyTypes.fulfilled]: (state, action) => {
    state.propertyType.status = sliceStatus.SUCCEEDED
    state.propertyType.items = action.payload
  },
  [fetchPropertyTypes.rejected]: (state, action) => {
    state.propertyType.error = action.payload
    state.propertyType.status = sliceStatus.FAILED
  },
  // fetch property categories
  [fetchPropertyCategories.pending]: state => {
    state.propertyConfigurations.items.length = 0
    state.propertyCategory.status = sliceStatus.LOADING
  },
  [fetchPropertyCategories.fulfilled]: (state, action) => {
    state.propertyCategory.status = sliceStatus.SUCCEEDED
    state.propertyCategory.items = action.payload
  },
  [fetchPropertyCategories.rejected]: (state, action) => {
    state.propertyCategory.error = action.payload
    state.propertyCategory.status = sliceStatus.FAILED
  },
  // fetch property category configurations
  [fetchPropertyCategoryConfigurations.pending]: state => {
    state.propertyConfigurations.items.length = 0
    state.propertyConfigurations.status = sliceStatus.LOADING
  },
  [fetchPropertyCategoryConfigurations.fulfilled]: (state, action) => {
    state.propertyConfigurations.status = sliceStatus.SUCCEEDED
    if (state.type === 'BUY') {
      state.propertyConfigurations.items = action.payload ? action.payload.filter(item => item.isOnlyForRent === false) : []
    } else state.propertyConfigurations.items = action.payload
  },
  [fetchPropertyCategoryConfigurations.rejected]: (state, action) => {
    state.propertyConfigurations.error = action.payload
    state.propertyConfigurations.status = sliceStatus.FAILED
  },
  // fetch locations
  [fetchDistrictsAndMetros.pending]: state => {
    state.locations.status = sliceStatus.LOADING
  },
  [fetchDistrictsAndMetros.fulfilled]: (state, action) => {
    state.locations.status = sliceStatus.SUCCEEDED
    state.locations.items.districts = action.payload
  },
  [fetchDistrictsAndMetros.rejected]: (state, action) => {
    state.locations.error = action.payload
    state.locations.status = sliceStatus.FAILED
  },
  // Fetch header configs
  [fetchHeaderConfigurations.pending]: state => {
    state.header.status = sliceStatus.LOADING
  },
  [fetchHeaderConfigurations.fulfilled]: (state, action) => {
    state.header.status = sliceStatus.SUCCEEDED
    state.header.items = action.payload
  },
  [fetchHeaderConfigurations.rejected]: (state, action) => {
    state.header.error = action.payload
    state.header.status = sliceStatus.FAILED
  }
}
