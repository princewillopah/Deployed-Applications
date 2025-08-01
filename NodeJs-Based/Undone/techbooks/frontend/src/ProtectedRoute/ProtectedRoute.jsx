import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, getUserStatus, isUserExist } from '../store/userSlice'
import { Navigate } from 'react-router-dom'
import Loading from '../Loading/Loading'

const ProtectedRoute = ({ children, isUser }) => {
  const user = useSelector(getUser)
  const userStatus = useSelector(getUserStatus)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(isUserExist())
  }, [dispatch])


  // if we want the user exist
  if (!isUser) {
    if (user.length === 0) {
      return <Navigate to="/login" />
    }
    return children
  }
  // if we want the user does not exist for example login, signup pages
  if (isUser) {
    if (user.length !== 0) {
      return <Navigate to="/" />
    }
    return children
  }
}

export default ProtectedRoute
