import { createAsyncThunk } from '@reduxjs/toolkit'
import Api from '../../services/Api'

export const fetchSentPropositions = createAsyncThunk('propositions/fetchSent', async ({ page, sortBy, direction }) => {
  const response = await Api.sendRequest(`/propositions/user/sent/?page=${page - 1}&sortBy=${sortBy}&direction=${direction}`)
  const pages = response && response.headers && response.headers['x-total-count']
  return { data: response.data, count: +pages }
})

export const fetchReceivedPropositions = createAsyncThunk('propositions/fetchReceived', async ({ page, sortBy, direction }) => {
  const response = await Api.sendRequest(`/propositions/user/received/?page=${page - 1}&sortBy=${sortBy}&direction=${direction}`)
  const pages = response && response.headers && response.headers['x-total-count']
  return { data: response.data, count: +pages }
})

export const fetchPropositionById = createAsyncThunk('propositions/fetchById', async (id) => {
  const response = await Api.sendRequest(`/propositions/${id}`, 'GET', null)
  return response.data
})

export const answerProposition = createAsyncThunk('propositions/answer', async ({ id, clientPrice, status }) => {
  const response = await Api.sendRequest(`/propositions/${id}`, 'POST', { clientPrice, status })
  return response.data
})

export const sendProposition = createAsyncThunk('propositions/send', async ({ propertyId, adId }) => {
  const data = {
    property: {
      id: propertyId
    },
    ad: {
      id: adId
    }
  }
  const response = await Api.sendRequest('/propositions', 'POST', data)
  return response.data
})