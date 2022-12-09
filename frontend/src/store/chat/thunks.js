import { createAsyncThunk } from '@reduxjs/toolkit'
import Api from '../../services/Api'

export const fetchRooms = createAsyncThunk('chat/fetchRooms', async () => {
  const response = await Api.sendRequest('/chat', 'GET')
  return response.data
})

export const fetchMessages = createAsyncThunk('chat/fetchMessages', async ({ id }) => {
  const response = await Api.sendRequest('/chat', 'POST', { id })
  return response.data
})

export const sendMessage = createAsyncThunk('chat/sendMessage', async ({ message }) => {
  const response = await Api.sendRequest('/chat/message', 'POST', { ...message })
  return response.data
})

export const sendPropositionMessage = createAsyncThunk('chat/sendPropositionMessage', async ({ message }) => {
  const response = await Api.sendRequest('/chat/proposition', 'POST', { ...message })
  return response.data
})