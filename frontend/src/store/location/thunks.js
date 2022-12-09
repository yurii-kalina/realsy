import { createAsyncThunk } from '@reduxjs/toolkit'
import Api from '../../services/Api'

export const fetchCities = createAsyncThunk('locations/fetchCities', async () => {
  const response = await Api.sendRequest('/city')
  return response.data
})

export const fetchCity = createAsyncThunk('locations/fetchCity', async (id) => {
  const response = await Api.sendRequest(`/city/${id}`)
  return response.data
})
