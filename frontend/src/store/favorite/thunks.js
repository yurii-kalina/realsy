import Api from '../../services/Api'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getFavoriteAds = createAsyncThunk('favorites/getAds', async ({ page, sortBy, direction }) => {
  const response = await Api.sendRequest(`/favorites/ads?page=${page - 1}&sortBy=${sortBy}&direction=${direction}`, 'GET')
  const pages = response && response.headers && response.headers['x-total-count']
  return { data: response.data, count: +pages }
})

export const getFavoriteProperties = createAsyncThunk('favorites/getProperties', async ({ page, sortBy, direction }) => {
  const response = await Api.sendRequest(`/favorites/properties?page=${page - 1}&sortBy=${sortBy}&direction=${direction}`, 'GET')
  const pages = response && response.headers && response.headers['x-total-count']
  return { data: response.data, count: +pages }
})

export const sendFavorite = createAsyncThunk('favorites/send', async ({ adId, propertyId }) => {
  const response = await Api.sendRequest('/favorites', 'POST', { adId, propertyId })
  return response.data
})

export const deleteFavorite = createAsyncThunk('favorites/delete', async ({ adId, propertyId }) => {
  const response = await Api.sendRequest('/favorites', 'DELETE', { adId, propertyId })
  return response.data
})

export const fetchFavoritesIds = createAsyncThunk('favorites/getIds', async () => {
  const response = await Api.sendRequest('/favorites/ids', 'GET')
  return response.data
})