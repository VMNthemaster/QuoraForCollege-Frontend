import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminHomePage = () => {
  const navigate = useNavigate()
  const isAdminLoggedIn = useSelector(state => state.isAdminLoggedIn)
  useEffect(() => {
    if(!isAdminLoggedIn){
      navigate('/')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <div>AdminHomePage</div>
  )
}

export default AdminHomePage