import React, { useEffect } from 'react'
import AdList from '../Ad/AdList'
import { useDispatch } from 'react-redux'
import { fetchUserAds } from '../../store/ad/thunks'
import ClientNavigation from './ClientNavigation'

const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUserAds())
  }, [dispatch])
  return (
    <>
      <ClientNavigation/>
      <AdList isSortVisible={false}/>
    </>
  )
}

export default Home