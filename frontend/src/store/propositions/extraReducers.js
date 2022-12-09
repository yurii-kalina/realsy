import {
  fetchPropositionById,
  sendProposition,
  answerProposition, fetchSentPropositions, fetchReceivedPropositions
} from './thunks'
import { sliceStatus } from '../sliceStatus'

export const extraReducers = {
  [fetchSentPropositions.pending]: state => {
    state.sent.status = sliceStatus.LOADING
  },
  [fetchSentPropositions.fulfilled]: (state, action) => {
    const { data, count } = action.payload
    state.sent.status = sliceStatus.SUCCEEDED
    state.sent.propositions = data
    state.sent.count = count
  },
  [fetchSentPropositions.rejected]: (state, action) => {
    state.sent.error = action.payload
    state.sent.status = sliceStatus.FAILED
  },
  [fetchReceivedPropositions.pending]: state => {
    state.received.status = sliceStatus.LOADING
  },
  [fetchReceivedPropositions.fulfilled]: (state, action) => {
    const { data, count } = action.payload
    state.received.status = sliceStatus.SUCCEEDED
    state.received.propositions = data
    state.received.count = count
  },
  [fetchReceivedPropositions.rejected]: (state, action) => {
    state.received.error = action.payload
    state.received.status = sliceStatus.FAILED
  },
  [fetchPropositionById.pending]: state => {
    state.item.status = sliceStatus.LOADING
  },
  [fetchPropositionById.fulfilled]: (state, action) => {
    state.item.status = sliceStatus.SUCCEEDED
    state.item.proposition = action.payload
  },
  [fetchPropositionById.rejected]: (state, action) => {
    state.item.error = action.payload
    state.item.status = sliceStatus.FAILED
  },
  [sendProposition.pending]: state => {
    state.item.status = sliceStatus.LOADING
  },
  [sendProposition.fulfilled]: (state, action) => {
    state.item.status = sliceStatus.SUCCEEDED
    state.item.proposition = action.payload
    state.items.propositions.push(action.payload)
  },
  [sendProposition.rejected]: (state, action) => {
    state.item.error = action.payload
    state.item.status = sliceStatus.FAILED
  },
  [answerProposition.pending]: state => {
    state.offer.status = sliceStatus.LOADING
  },
  [answerProposition.fulfilled]: (state, action) => {
    state.offer.status = sliceStatus.SUCCEEDED
    const { id, status } = action.payload
    if (id) {
      if (state.item.proposition && state.item.proposition.id === id) {
        state.item.proposition.status = status
      } else state.item.proposition = action.payload
    }
  },
  [answerProposition.rejected]: (state, action) => {
    state.offer.error = action.payload
    state.offer.status = sliceStatus.FAILED
  }
}
