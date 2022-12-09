import { createSlice } from '@reduxjs/toolkit'
import { sliceStatus } from '../sliceStatus'
import { reducers } from './reducers'
import { extraReducers } from './extraReducers'

export const initialState = {
  status: sliceStatus.IDLE,
  error: null,
  type: '',
  name: '',
  propertyType: null,
  propertyCategory: null,
  location: {
    address: '',
    city: { id: 1 },
    districts: [],
    metros: [],
    geoLocations: [],
    distanceFromMetro: null
  },
  description: '',
  configurations: [],
  preview: {}

}
export const submissionSlice = createSlice({
  name: 'submission',
  initialState: initialState,
  extraReducers: extraReducers,
  reducers: reducers
})
export const {
  setSubmissionType,
  setSubmissionPropertyType,
  setSubmissionPropertyCategory,
  setSubmissionConfiguration, removeSubmissionConfiguration,
  setSubmissionCity,
  setSubmissionDistricts,
  removeSubmissionDistricts,
  setSubmissionConfigurationTime,
  setSubmissionConfigurationTimeItems,
  setSubmissionExactAddress,
  setSubmissionMetros,
  setSubmissionMetroDistance,
  setSubmissionDescription,
  setSubmissionEmpty,
  setSubmissionName,
  setSubmissionDistrict,
  setSubmissionPreview
} = submissionSlice.actions
export default submissionSlice.reducer
