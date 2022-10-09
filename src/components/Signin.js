import React from 'react'
import useState from 'react-usestateref'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../state'

const Signin = () => {
  const navigate = useNavigate()
    const dispatch = useDispatch()
    const { setUserDetails: setDetails } = bindActionCreators( actions, dispatch )

  const [userDetails, setUserDetails, getUserDetails] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [showErrorMessage, setShowErrorMessage] = useState(false)

  const sendRequestToBackend = async () => {
    if(getUserDetails.current.name.length === 0 || getUserDetails.current.email.length === 0 || getUserDetails.current.password.length === 0){
      return {
          message: 'All fields are required',
          success: false,
          status: 400,
        
      }
    }
    const url = 'https://quora-for-college-backend.onrender.com/api/users/signup'
    const res = await axios
      .post(url, {
        name: getUserDetails.current.name || '',
        email: getUserDetails.current.email || '',
        password: getUserDetails.current.password || ''
      })
      .catch((err) => {
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
    setUserDetails(prevUserDetails => {
      return {
        ...prevUserDetails,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendRequestToBackend().then((data) => {
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
        // use redux here to store student data and then navigate to login page
        const storeData = {
          name: data.newUser.name,
          email: data.newUser.email,
          school: data.newUser.school,
          userId: data.newUser._id
        }
        setDetails(storeData)
        navigate('/')
      }
    })
  }
  return (
    <div className="h-[100vh] bg-gray-100 flex flex-col justify-center items-center">
      <div className="cover flex flex-col gap-y-[2vh] w-[96vw] md:w-[50vw] border-[0.5px] md:border-2 border-red-600 rounded-md bg-purple-50 py-[3vh]">
        <div className="flex justify-center">
          <h2 className="text-gray-600 text-sm md:text-2xl font-serif ">
            SignIn To Quora For College
          </h2>
        </div>

        <div className='mx-auto'>{showErrorMessage && errorMessage && <h1 className='text-[0.6rem] md:text-[1rem] font-serif font-semibold underline'>{errorMessage}</h1>}</div>

        <form className="flex flex-col gap-y-[2vh] py-[1.5vh] px-[2vw]">
          <div className="flex flex-col gap-y-[1vh]">
            <label htmlFor="studentEmail">
              <h2 className="text-sm md:text-xl text-red-600 font-serif font-medium underline">
                Name
              </h2>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={userDetails.name}
              onChange={handleChange}
              className="w-[80vw] md:w-[40vw] h-[4.5vh] px-[0.5vw] py-[0.75vh] border-[0.5px] md:border-[2px] border-gray-600 rounded-sm"
            />
          </div>

          <div className="flex flex-col gap-y-[1vh]">
            <label htmlFor="studentEmail">
              <h2 className="text-sm md:text-xl text-red-600 font-serif font-medium underline">
                Email
              </h2>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={userDetails.email}
              onChange={handleChange}
              className="w-[80vw] md:w-[40vw] h-[4.5vh] px-[0.5vw] py-[0.75vh] border-[0.5px] md:border-[2px] border-gray-600 rounded-sm"
            />
          </div>

          <div className="flex flex-col gap-y-[1vh]">
            <label htmlFor="studentEmail">
              <h2 className="text-sm md:text-xl text-red-600 font-serif font-medium underline">
                Password
              </h2>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={userDetails.password}
              onChange={handleChange}
              className="w-[80vw] md:w-[40vw] h-[4.5vh] px-[0.5vw] py-[0.75vh] border-[0.5px] md:border-[2px] border-gray-600 rounded-sm"
            />
          </div>

          <div className="">
          <button
            type="button"
            className="w-[20vw] md:w-[10vw] border-[0.5px] md:border-[2px] bg-red-600 text-white font-serif px-[1vw] py-[0.75vh] rounded-md text-sm md:text-xl focus:outline-none clickEffect"
            onClick={handleSubmit}
          >
            Signin
          </button>       
        </div>
        </form>
      </div>
    </div>
  )
}

export default Signin
