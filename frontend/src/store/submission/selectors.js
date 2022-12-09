import { createSelector } from 'reselect'
import { ConfigCategory } from '../../constants'

export const getSubmission = state => state.submission
export const getSubmissionType = state => state.submission.type
export const getName = state => state.submission.name
export const getSubmissionPropertyCategory = state => state.submission.propertyCategory
export const getSubmissionPropertyType = state => state.submission.propertyType
export const getSubmissionLocation = state => state.submission.location
export const getSubmissionUser = state => state.submission.user
export const getSubmissionDescription = state => state.submission.description
export const getSubmissionPreview = state => state.submission.preview
export const selectConfigurations = state => state.submission.configurations

export const getTopConfig = createSelector(
  selectConfigurations,
  items => items.filter(item => item.isSpecial === true)
)

export const getBasicConfig = createSelector(
  selectConfigurations,
  items => items.filter(item => item.category !== ConfigCategory.COMFORT && item.category !== ConfigCategory.INFRASTRUCTURE && item.category !== ConfigCategory.PERIOD)
)

export const getExtraConfig = createSelector(
  selectConfigurations,
  items => items.filter(item => item.category === ConfigCategory.COMFORT)
)

export const getInfrastructureConfig = createSelector(
  selectConfigurations,
  items => items.find(item => item.category === ConfigCategory.INFRASTRUCTURE)
)

export const getPriceConfig = createSelector(
  selectConfigurations,
  items => items.find(item => item.category === ConfigCategory.PRICE)
)