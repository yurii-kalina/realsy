import { initialState } from './slice'
import { sliceStatus } from '../sliceStatus'
import { transformSubmission } from '../../utils/transforms'
import { DealTypes } from '../../constants'

export const reducers = {
  setSubmissionType: (state, action) => {
    state.type = action.payload
    if (state.configurations.length > 0 && action.payload === DealTypes.BUY) {
      state.configurations = state.configurations.filter(item => item.isOnlyForRent === false)
    }
  },
  setSubmissionPropertyType: (state, action) => {
    state.propertyCategory = null
    state.propertyType = action.payload
  },
  setSubmissionPropertyCategory: (state, action) => {
    state.configurations.length = 0
    state.propertyCategory = action.payload
  },
  setSubmissionName: (state, action) => {
    state.name = action.payload
  },
  getSubmissionConfigurationById: (state, action) => state.configurations.find(item => item.id === action.payload),
  setSubmissionConfiguration: (state, action) => {
    const { id, name, value, ...other } = action.payload
    const index = state.configurations.findIndex(item => item.id === id)
    if (index > -1) {
      state.configurations[index] = { id, name, value, ...other }
    } else {
      state.configurations.push({ id, name, value, ...other })
    }
  },
  setSubmissionConfigurationTimeItems: (state, action) => {
    const { id, name, value, ...others } = action.payload
    const index = state.configurations.findIndex(item => item.id === id)
    if (index > -1) {
      const configValueIndex = state.configurations[index].value.findIndex(config => config.id === value.id)
      if (configValueIndex > -1) {
        state.configurations[index].value.splice(configValueIndex, 1)
      } else {
        state.configurations[index].value.push(value)
      }
    } else state.configurations.push({ id, name, value: [value], ...others })
  },
  setSubmissionConfigurationTime: (state, action) => {
    const { id, value } = action.payload
    const index = state.configurations.findIndex(item => item.id === id)
    if (index > -1) {
      state.configurations[index].value.forEach(configItem => configItem.valueNumber = value)
    }
  },
  removeSubmissionConfiguration: (state, action) => {
    const id = action.payload
    const index = state.configurations.findIndex(item => item.id === id)
    if (index > -1) {
      state.configurations.splice(index, 1)
    }
  },
  setSubmissionCity: (state, action) => {
    state.location.districts.length = 0
    state.location.metros.length = 0
    state.location.geoLocations.length = 0
    state.location.address = ''
    const { value } = action.payload
    state.location.city = { id: value }
  },
  setSubmissionDistrict: (state, action) => {
    state.location.districts.length = 0
    state.location.districts.push(action.payload)
  },
  setSubmissionDistricts: (state, action) => {
    if (action.payload.name === 'all') { // 'all' checkbox was clicked
      if (state.location.districts.length === 0) { // No checkbox was selected before click 'all'
        state.location.districts = action.payload.values
      } else {
        if (state.location.districts.length === action.payload.values.length) { // 'all' checkbox was already checked
          state.location.districts.length = 0
        } else { // other checkboxes were checked
          state.location.districts = action.payload.values
        }
      }
    } else {
      const index = state.location.districts.findIndex(item => item.id === action.payload.id)
      if (index > -1) {
        state.location.districts.splice(index, 1)
      } else state.location.districts.push(action.payload)
    }
  },
  setSubmissionMetros: (state, action) => {
    const { distance, value } = action.payload
    if (Array.isArray(value)) {
      if (value[0] && value[0].metroLine) {
        const selected = state.location.metros.filter(item => item.metroLine === value[0].metroLine)
        if (selected && selected.length === value.length) {
          state.location.metros = state.location.metros.filter(item => item.metroLine !== value[0].metroLine)
        } else {
          value.forEach(val => {
            if (state.location.metros.findIndex(item => item.id === val.id) === -1) {
              state.location.metros.push(val)
            }
          })
        }
      }
    } else {
      const index = state.location.metros.findIndex(item => item.id === value.id)
      if (index > -1) {
        state.location.metros.splice(index, 1)
      } else {
        state.location.metros.push(value)
      }
    }
    state.location.distanceFromMetro = distance
  },
  setSubmissionMetroDistance: (state, action) => {
    state.location.distanceFromMetro = action.payload
  },
  removeSubmissionDistricts: (state, action) => {
    const index = state.location.districts.findIndex(item => item.id === action.payload.id)
    if (index > -1) {
      state.location.districts.splice(index, 1)
    }
  },
  setSubmissionExactAddress: (state, action) => {
    state.location.street = action.payload
  },
  setSubmissionDescription: (state, action) => {
    state.description = action.payload
  },
  setSubmissionEmpty: state => initialState,
  setSubmissionPreview: (state, action) => {
    state.status = sliceStatus.LOADING
    state.preview = transformSubmission(action.payload)
    state.status = sliceStatus.SUCCEEDED
  }

}
