import React from 'react'
// import { useSelector } from 'react-redux'
import { Route, Routes, BrowserRouter as Router, useParams } from 'react-router-dom'
import AdminHomePage from './components/AdminHomePage'
import LandingPage from './components/LandingPage'
import WithNav from './components/Layout/WithNav'
import WithoutNav from './components/Layout/WithoutNav'
import CompleteQuestion from './components/Modals/CompleteQuestion'
import PageNotFound from './components/PageNotFound'
import Signin from './components/Signin'
import StudentHomePage from './components/StudentHomePage'


function App() {
  // const isStudentLoggedIn = useSelector((state) => state.isStudentLoggedIn)
  // const isAdminLoggedIn = useSelector((state) => state.isAdminLoggedIn)
  // console.log(isAdminLoggedIn, isStudentLoggedIn)
  // console.log(isAdminLoggedIn, isStudentLoggedIn)

  return (
    <React.Fragment>
      <main>
        <Router>
          <Routes>
              <Route element={<WithoutNav />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" element={<Signin />} />
              </Route>
               <Route element={<WithNav />}>
                <Route path="/student" element={<StudentHomePage />} />
                <Route path="/admin" element={<AdminHomePage />} />
                <Route path='/student/:questionid' element={<CompleteQuestion questionId={useParams().questionid} />} />
              </Route>
              <Route path='*' element={<PageNotFound />} />
          </Routes>
        </Router>
      </main>
    </React.Fragment>
  )
}

export default App
