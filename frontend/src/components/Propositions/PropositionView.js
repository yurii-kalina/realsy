import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectProposition } from '../../store/propositions/selectors'
import { fetchPropositionById } from '../../store/propositions/thunks'
import { sliceStatus } from '../../store/sliceStatus'
import Loading from '../Loading'
import Error from '../Error'
import PropertyView from '../Property/View/PropertyView'
import PropositionActions from './PropositionActions'
import SendPropositionMessage from './SendPropositionMessage'

const PropositionView = () => {
  const { status, error, proposition } = useSelector(selectProposition)
  const { id } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    if (proposition && +proposition.id !== +id) {
      dispatch(fetchPropositionById(id))
    }
  }, [dispatch, id, proposition])
  return (
    <>
      {status === sliceStatus.LOADING && <Loading/>}
      {status === sliceStatus.FAILED && <Error error={error && error.message}/>}
      {status === sliceStatus.SUCCEEDED &&
      <PropertyView property={proposition.property}>
        <PropositionActions proposition={proposition}/>
        <SendPropositionMessage sender={proposition && proposition.property && proposition.property.user}
          recipient={proposition && proposition.ad && proposition.ad.user}/>
      </PropertyView>}
    </>
  )
}

export default PropositionView