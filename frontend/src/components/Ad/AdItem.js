import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Error from '../Error'
import { sliceStatus } from '../../store/sliceStatus'
import Loading from '../Loading'
import AdView from './AdView'
import { fetchAdById } from '../../store/ad/thunks'
import { selectAdItem } from '../../store/ad/selectors'

const AdItem = () => {
  const { error, status, ad } = useSelector(selectAdItem)
  const { id } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    if (ad.id !== +id) {
      dispatch(fetchAdById(id))
    }
  }, [dispatch, ad.id, id])

  return (
    <>
      {status === sliceStatus.FAILED && <Error error={error && error.message}/>}
      {status === sliceStatus.LOADING && <Loading isFullWidth={true}/>}
      {status === sliceStatus.SUCCEEDED && <AdView ad={ad}/>}
    </>
  )
}

export default AdItem
