import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../store/user/selectors'
import { fetchUserInfo } from '../../store/user/thunks'
import { sliceStatus } from '../../store/sliceStatus'
import Loading from '../Loading'

const UserContainer = ({ children }) => {
  const { status, user, error } = useSelector(selectUser)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!user) {
      dispatch(fetchUserInfo())
    }
  }, [dispatch, user])
  if (error || user) {
    return children
  }
  if (status === sliceStatus.LOADING) {
    return <Loading/>
  }
  return null
}

export default UserContainer