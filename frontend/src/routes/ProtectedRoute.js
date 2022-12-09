import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserInfo } from '../store/user/selectors'
import { Redirect, Route } from 'react-router-dom'

const ProtectedRoute = ({ children, ...rest }) => {
  const user = useSelector(selectUserInfo)
  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/users/login',
              state: { from: props && props.location }
            }}
          />
        )
      }
    />
  )
}

export default ProtectedRoute
