import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const StudentHomePage = () => {
  const navigate = useNavigate()
  const isStudentLoggedIn = useSelector(state => state.isStudentLoggedIn)
  useEffect(() => {
    if(!isStudentLoggedIn){
      navigate('/')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <div>StudentHomePage</div>
  )
}

export default StudentHomePage