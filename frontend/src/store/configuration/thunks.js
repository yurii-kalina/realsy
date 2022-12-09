import { createAsyncThunk } from '@reduxjs/toolkit'
import Api from '../../services/Api'

export const fetchPropertyTypes = createAsyncThunk('configurations/fetchPropertyTypes', async () => {
  const response = await Api.sendRequest('/property/type')
  return response.data
})
export const fetchPropertyCategories = createAsyncThunk('configurations/fetchPropertyCategories', async (propertyType) => {
  const { id } = propertyType
  const response = await Api.sendRequest(`/property/category/type/${id}`)
  return response.data
})
export const fetchPropertyCategoryConfigurations = createAsyncThunk('configurations/fetchPropertyCategoryConfigurations', async (propertyCategory) => {
  const { id } = propertyCategory
  const response = await Api.sendRequest(`/property/category/${id}/configurations`)
  return response.data
})
export const fetchDistrictsAndMetros = createAsyncThunk('configurations/fetchDistrictsAndMetros', async () => {
  const response = await Api.sendRequest('/districts')
  return response.data
})
export const fetchHeaderConfigurations = createAsyncThunk('configurations/fetchHeaderConfigurations', async () => {
  const response = await Api.sendRequest('/property/type/configurations')
  return response.data
})
