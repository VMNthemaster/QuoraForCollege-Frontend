import React, { useEffect } from 'react'
import useState from 'react-usestateref'
import StudentLogin from '../components/Login/StudentLogin.js'
import AdminLogin from '../components/Login/AdminLogin.js'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const LandingPage = () => {
  const isStudentLoggedIn = useSelector((state) => state.isStudentLoggedIn)
  const isAdminLoggedIn = useSelector((state) => state.isAdminLoggedIn)
  const navigate = useNavigate()

  useEffect(() => {
    if(isStudentLoggedIn){
      navigate('/student')
    }
    else if(isAdminLoggedIn){
      navigate('/admin')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const [value, setValue, getValue] = useState(1)
  const FOCUSED_TAB =
    'border-[0.5px] md:border-[2px] border-white bg-red-600 text-white'
  const NON_FOCUSED_TAB =
    'border-[0.5px] md:border-[2px] border-red-600 bg-white text-red-600'

  const toggleUser = (_value) => {
    if (value !== _value) {
      setValue(_value)
      // do animation here if required
    } else {
      return
    }
  }
  return (
    <>
      <div className="py-[15vh] min-h-[100vh] bg-gray-100">
        <div className="flex flex-col items-center gap-y-[3vh] md:gap-y-[5vh] py-[2vh] md:mx-[20vw] md:border-[2px] md:border-gray-300 rounded-md bg-violet-50">
          <h1 className="text-gray-600 text-sm md:text-2xl font-serif ">
            Login to Quora For College
          </h1>

          <div className="flex w-[90vw] md:w-[50vw] justify-center mx-auto">
            <div
              onClick={() => toggleUser(1)}
              className={`flex justify-center items-center h-[3.5vh] md:h-[5.75vh] w-[50%] cursor-pointer rounded-l-md ${getValue.current === 1 ? FOCUSED_TAB : NON_FOCUSED_TAB }`}
            >
              <h2 className="font-serif text-sm md:text-xl">Student</h2>
            </div>

            <div
              onClick={() => toggleUser(2)}
              className={`flex justify-center items-center h-[3.5vh] md:h-[5.75vh] w-[50%] cursor-pointer rounded-r-md ${getValue.current === 2 ? FOCUSED_TAB : NON_FOCUSED_TAB }`}
            >
              <h2 className="font-serif text-sm md:text-xl">Admin</h2>
            </div>
          </div>
          {/* actual login form */}
          {getValue.current === 1 && <StudentLogin /> }
          {getValue.current === 2 && <AdminLogin /> }
        </div>
      </div>
    </>
  )
}

export default LandingPage
