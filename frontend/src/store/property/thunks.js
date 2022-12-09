import Api from '../../services/Api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { transformSubmission } from '../../utils/transforms'

export const fetchPropertyById = createAsyncThunk('properties/fetchPropertyById', async (id) => {
  const response = await Api.sendRequest(`/property/${id}`)
  return response.data
})

export const fetchUserProperties = createAsyncThunk('properties/fetchUserProperties', async (property) => {
  const response = await Api.sendRequest('/property', 'GET')
  return response.data
})

export const fetchPropertyAds = createAsyncThunk('properties/fetchAds', async (id) => {
  const response = await Api.sendRequest(`/property/${id}/ads`, 'GET')
  return { data: response.data, propertyId: +id }
})

export const submitPropertyImage = createAsyncThunk('properties/submitImage', async ({ id, files }) => {
  const formData = new FormData()
  for (let i = 0; i < files.length; i++) {
    formData.append('file', files[i])
  }
  formData.append('id', id)
  const response = await Api.sendRequest('/property/images',
    'POST',
    formData,
    { 'Content-Type': 'multipart/form-data' })
  return response.data
})
export const submitProperty = createAsyncThunk('properties/submit', async (property) => {
  const transformedProperty = transformSubmission(property)
  const response = await Api.sendRequest('/property',
    'POST',
    { ...transformedProperty })
  return response.data
})

export const submitPropertyFromPreview = createAsyncThunk('properties/submitFromPreview', async (property) => {
  const response = await Api.sendRequest('/property', 'POST', property)
  return response.data
})

export const sortProperties = createAsyncThunk('properties/sort', async ({ page, sortBy, direction }) => {
  const response = await Api.sendRequest(`/property/?page=${page - 1}&sortBy=${sortBy}&direction=${direction}`)
  const pages = response && response.headers && response.headers['x-total-count']
  return { data: response.data, count: +pages }
})