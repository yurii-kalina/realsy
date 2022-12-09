import { createSelector } from '@reduxjs/toolkit'
import { PropositionStatus } from '../../constants'

export const selectPropositions = state => state.propositions.items
export const selectProposition = state => state.propositions.item
export const selectSentPropositions = state => state.propositions.sent
export const selectReceivedPropositions = state => state.propositions.received
export const selectOffer = state => state.propositions.offer

export const selectPropositionOffer = state => state.propositions.offer

export const selectPropositionsNew = createSelector(
  selectPropositions,
  items => items.filter(item => item.status === PropositionStatus.NEW)
)

export const selectPropositionsPending = createSelector(
  selectPropositions,
  items => items.filter(item => item.status === PropositionStatus.PENDING)
)

export const selectPropositionsAccepted = createSelector(
  selectPropositions,
  items => items.filter(item => item.status === PropositionStatus.ACCEPTED)
)

export const selectPropositionsRejected = createSelector(
  selectPropositions,
  items => items.filter(item => item.status === PropositionStatus.REJECTED)
)