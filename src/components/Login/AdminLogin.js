import axios from 'axios'
import React from 'react'
import useState from 'react-usestateref'
import {Link} from 'react-router-dom'

const AdminLogin = () => {
  const [adminDetails, setAdminDetails, getAdminDetails] = useState({
    adminEmail: '',
    adminPassword: '',
    adminSchool: '',
  })
  let a = adminDetails.adminPassword
console.log(a)
  const [errorMessage, setErrorMessage] = useState('')
  const [showErrorMessage, setShowErrorMessage] = useState(false)

  const sendRequestToBackend = async () => {
    const url = 'http://localhost:5000/api/users/adminLogin'
    const res = await axios
      .post(url, {
        email: getAdminDetails.current.adminEmail || '',
        password: getAdminDetails.current.adminPassword || '',
        school: getAdminDetails.current.adminSchool || ''
      })
      .catch((err) => {
        console.log('error')
        return {
          data: {
            message: err.response.data.message,
            success: err.response.data.success,
            status: err.response.status,
          },
        }
      })
    const data = await res.data
    return data

  }

  const handleChange = (e) => {
    setAdminDetails(prevAdminDetails => {
      return {
        ...prevAdminDetails,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendRequestToBackend().then((data) => {
      console.log(data)
      if (!data.success) {
        if (data.status === 400) {
          setErrorMessage(data.message)
          setShowErrorMessage(true)
          setTimeout(() => {
            setShowErrorMessage(false)
          }, 3000)
        } else {
          setErrorMessage('Internal Server Error, Please Try Again....')
          setShowErrorMessage(true)
          setTimeout(() => {
            setShowErrorMessage(false)
          }, 3000)
        }
      } else {
        // use redux here to store student data and then navigate to login home page

      }
    })
  }

  return (
    <div className="flex flex-col w-[90vw] md:w-[50vw] px-[1.25vw] md:px-[1.5vw] py-[1vw] border-[0.5px] md:border-[2px] border-red-600 rounded-md">
      <div className='mx-auto'>{showErrorMessage && errorMessage && <h1 className='text-[0.6rem] md:text-[1rem] font-serif font-semibold underline'>{errorMessage}</h1>}</div>
      <form className="flex flex-col gap-y-[2vh] py-[1.5vh]">
        <div className="flex flex-col gap-y-[1vh]">
          <label htmlFor="adminEmail">
            <h2 className="text-sm md:text-xl text-red-600 font-serif font-medium underline">
              Email
            </h2>
          </label>
          <input
            type="email"
            name="adminEmail"
            id="adminEmail"
            value={adminDetails.adminEmail}
            onChange={handleChange}
            className="w-[80vw] md:w-[40vw] h-[4.5vh] px-[0.5vw] py-[0.75vh] border-[0.5px] md:border-[2px] border-gray-600 rounded-sm"
          />
        </div>

        <div className="flex flex-col gap-y-[1vh]">
          <label htmlFor="adminPassword">
            <h2 className="text-sm md:text-xl text-red-600 font-serif font-medium underline">
              Password
            </h2>
          </label>
          <input
            type="password"
            name="adminPassword"
            id="adminPassword"
            value={adminDetails.adminPassword}
            onChange={handleChange}
            className="w-[80vw] md:w-[40vw] h-[4.5vh] px-[0.5vw] py-[0.75vh] border-[0.5px] md:border-[2px] border-gray-600 rounded-sm"
          />
        </div>

        <div className="flex flex-col gap-y-[1vh]">
          <label htmlFor="adminSchool">
            <h2 className="text-sm md:text-xl text-red-600 font-serif font-medium underline">
              School
            </h2>
          </label>
          <input
            type="text"
            name="adminSchool"
            id="adminSchool"
            value={adminDetails.adminSchool}
            onChange={handleChange}
            className="w-[80vw] md:w-[40vw] h-[4.5vh] px-[0.5vw] py-[0.75vh] border-[0.5px] md:border-[2px] border-gray-600 rounded-sm"
          />
        </div>

        <div className="">
          <button
            type="button"
            className="w-[20vw] md:w-[10vw] border-[0.5px] md:border-[2px] bg-red-600 text-white font-serif px-[1vw] py-[0.75vh] rounded-md text-sm md:text-xl focus:outline-none"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>

        <div className='flex -mt-[1vh]'>
          <Link to='/signin' className='text-[0.6rem] md:text-[0.95rem] font-medium  text-red-500 underline focus:outline-none'>SignIn Instead</Link>
        </div>

      </form>
    </div>
  )
}

export default AdminLogin
