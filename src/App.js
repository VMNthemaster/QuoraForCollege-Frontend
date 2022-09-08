import React from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import WithNav from './components/Layout/WithNav'
import WithoutNav from './components/Layout/WithoutNav'
import Signin from './components/Signin'

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
              {/* <Route path='/' element={<LandingPage />}  /> */}
            </Route>
          </Routes>
        </Router>
      </main>
    </React.Fragment>
  )
}

export default App
