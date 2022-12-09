import { createAsyncThunk } from '@reduxjs/toolkit'
import Api from '../../services/Api'

export const login = createAsyncThunk('users/login', async (user) => {
  const response = await Api.sendRequest('/users/auth/login', 'POST', user)
  if (response.headers && response.headers.authorization) {
    return response.headers.authorization
  }
})

export const fetchUserInfo = createAsyncThunk('users/info', async () => {
  const response = await Api.sendRequest('/users/auth/currentUser', 'GET', null)
  return response.data
})

export const register = createAsyncThunk('users/register', async (user) => {
  const response = await Api.sendRequest('/users/auth/register', 'POST', user)
  return response.data
})

export const logout = createAsyncThunk('users/logout', async () => {
  const response = await Api.sendRequest('/users/auth/logout', 'POST')
  return response.data
})