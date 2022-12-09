import { createAsyncThunk } from '@reduxjs/toolkit'
import Api from '../../services/Api'
import { transformSubmission } from '../../utils/transforms'

export const fetchUserAds = createAsyncThunk('ads/fetchUserAds', async () => {
  const response = await Api.sendRequest('/ad', 'GET')
  return response.data
})

export const fetchAdById = createAsyncThunk('ads/getById', async (id) => {
  const response = await Api.sendRequest(`/ad/${id}`)
  return response.data
})

export const sortAds = createAsyncThunk('ads/sort', async ({ page, sortBy, direction }) => {
  const response = await Api.sendRequest(`/ad/?page=${page - 1}&sortBy=${sortBy}&direction=${direction}`)
  const pages = response && response.headers && response.headers['x-total-count']
  return { data: response.data, count: +pages }
})

export const paginationAds = createAsyncThunk('ads/pagination', async () => {
  const response = await Api.sendRequest('/pagination')
  return response.data
})

export const submitAd = createAsyncThunk('ad/submit', async (ad) => {
  const transformedAd = transformSubmission(ad)
  const response = await Api.sendRequest('/ad', 'POST', transformedAd)
  return response.data
})

export const submitAdFromPreview = createAsyncThunk('ad/submitFromPreview', async (ad) => {
  const response = await Api.sendRequest('/ad', 'POST', ad)
  return response.data
})
