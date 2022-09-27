import React from 'react'
// import { useSelector } from 'react-redux'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import AdminHomePage from './components/admin/AdminHomePage'
import LandingPage from './components/LandingPage'
import WithNav from './components/Layout/WithNav'
import WithoutNav from './components/Layout/WithoutNav'
import CompleteQuestion from './components/Modals/CompleteQuestion'
import SchoolCompleteQuestion from './components/Modals/SchoolCompleteQuestion'
import PageNotFound from './components/PageNotFound'
import SchoolHomePage from './components/SchoolHomePage'
import Signin from './components/Signin'
import StudentHomePage from './components/StudentHomePage'


function App() {
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
                <Route path='/student/:questionid' element={<CompleteQuestion />} />
                <Route path='/:school' element={<SchoolHomePage />} />
                <Route path='/:school/:questionid' element={<SchoolCompleteQuestion />} />
              </Route>
              <Route path='*' element={<PageNotFound />} />
          </Routes>
        </Router>
      </main>
    </React.Fragment>
  )
}

export default App
