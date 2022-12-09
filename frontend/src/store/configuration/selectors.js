import { createSelector } from '@reduxjs/toolkit'

export const getPropertyType = state => state.configurations.propertyType
export const getPropertyCategories = state => state.configurations.propertyCategory
export const getPropertyConfigurations = state => state.configurations.propertyConfigurations
export const getHeaderConfigs = state => state.configurations.header

export const getBuyConfigurations = createSelector(
  state => state.configurations.propertyConfigurations.items,
  items => items.filter(item => item.isDetailed === false && item.isOnlyForRent === false)
)
export const getRentConfigurations = createSelector(
  state => state.configurations.propertyConfigurations.items,
  configs => configs.filter(item => item.isDetailed === false)
)

export const getDetailedConfiguration = createSelector(
  state => state.configurations.propertyConfigurations.items,
  configs => configs.filter(item => item.isDetailed === true)
)
