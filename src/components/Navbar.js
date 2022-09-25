/* eslint-disable no-restricted-globals */
import React from 'react'
import Logo from '../assets/Logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useNavigate } from 'react-router-dom'
import { actions } from '../state'
import { GiHamburgerMenu } from 'react-icons/gi'
import '../App.css'
import useState from 'react-usestateref'
import JoinSchoolModal from './Modals/JoinSchoolModal'
import axios from 'axios'
import ProfileModal from './Modals/ProfileModal'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { setUserDetails, setAdminLoginDetails, setStudentLoginDetails, setUpvoteDetails, setDownvoteDetails } =
    bindActionCreators(actions, dispatch)

  const user = useSelector((state) => state.user)
  const isStudentLoggedIn = useSelector((state) => state.isStudentLoggedIn)
  const isAdminLoggedIn = useSelector((state) => state.isAdminLoggedIn)
  const hasUpvoted = useSelector((state) => state.hasUpvoted)
  const hasDownvoted = useSelector((state) => state.hasDownvoted)

  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [showHamburger, setShowHamburger] = useState(false)

  const handleLogout = () => {
    const updateUser = async () => {
      const url = 'http://localhost:5000/api/users/updateUser'
      const res = await axios
        .patch(url, {
          email: user.email,
          upvotesArray: hasUpvoted,
          downvotesArray: hasDownvoted,
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
    updateUser()
    setShowHamburger((prevValue) => !prevValue)
    setUserDetails({})
    setUpvoteDetails([])
    setDownvoteDetails([])
    setStudentLoginDetails(false)
    setAdminLoginDetails(false)
    navigate('/')
  }

  const leaveSchool = async () => {
    const school = user.school
    const url = `http://localhost:5000/api/schools/leaveSchool/${school}`

    const res = await axios
      .post(url, {
        email: user.schoolEmail,
        generalEmail: user.email,
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

  const handleLeaveSchool = () => {
    leaveSchool().then((data) => {
      if (data.success) {
        setUserDetails({
          ...user,
          school: 'Anonymous',
        })
      }
    })
  }

  const handleSchool = () => {
    setShowHamburger((prevValue) => !prevValue)
    if (user.school === 'Anonymous') {
      setIsSchoolModalOpen(true)
    } else {
      handleLeaveSchool()
    }
  }

  const handleHamburgerClick = () => {
    setShowHamburger((prevValue) => !prevValue)
  }

  return (
    <div className="bg-white w-[100%] h-[9vh] flex items-center px-[1vw] py-[1vh]">
      <div className="logo w-[50%] flex py-[1vh] items-center gap-x-[1vw]">
        <img src={Logo} className="h-[7vh] w-[7vh]" alt="Logo" />
        <h2 className="text-2xl font-serif hidden md:block ">
          Quora For College
        </h2>
      </div>

      {isAdminLoggedIn && (
        <div className="logo w-[50%] flex justify-end py-[1vh] ">
          <button
            onClick={handleLogout}
            className="border-[0.5px] md:border-[2px] px-[2vw] md:px-[1vw] py-[0.75vh] rounded-md font-serif text-white bg-red-600 text-sm md:text-xl"
          >
            Log Out
          </button>
        </div>
      )}

      {/* for laptop screens */}
      {isStudentLoggedIn && (
        <div className="school hidden w-[50%] md:flex md:justify-end md:items-center gap-x-[1vw] py-[1vh] ">
          <div className="">
            <button
              onClick={handleSchool}
              className="border-[0.5px] md:border-[2px] px-[2vw] md:px-[1vw] py-[0.75vh] rounded-md font-serif text-white bg-blue-700 text-sm md:text-xl"
            >
              {user.school === 'Anonymous' ? 'Join School' : 'Leave School'}
            </button>
          </div>
          <div
            onClick={() => setIsProfileModalOpen(true)}
            className="profile bg-green-700 rounded-full h-[6vh] w-[6vh] flex justify-center items-center cursor-pointer"
          >
            <h2 className="text-white font-bold font-serif text-xl">
              {user.name[0]}
            </h2>
          </div>
          <div className="">
            <button
              onClick={handleLogout}
              className="border-[0.5px] md:border-[2px] px-[2vw] md:px-[1vw] py-[0.75vh] rounded-md font-serif text-white bg-red-600 text-sm md:text-xl"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
      {isStudentLoggedIn && (
        <div className="md:hidden ml-auto mr-[2.5vw]">
          <div onClick={handleHamburgerClick} className="">
            <GiHamburgerMenu
              style={{ transform: 'rotate(180deg)' }}
              size={20}
              className="text-red-600 "
            />
          </div>
          <div
            className={`absolute z-20 flex flex-col top-[9vh] right-0  bg-red-500 ${
              showHamburger ? 'visible' : 'hidden'
            }`}
          >
            <div
              onClick={handleSchool}
              className="px-[1.5vw] py-[0.9vh] text-sm text-white font-semibold text-center"
            >
              {user.school === 'Anonymous' ? 'Join School' : 'Leave School'}
            </div>
            <div
              onClick={() => {
                setIsProfileModalOpen(true)
                setShowHamburger((prev) => !prev)
              }}
              className="px-[1.5vw] py-[0.9vh] text-sm text-white font-semibold text-center"
            >
              Profile
            </div>
            <div
              onClick={handleLogout}
              className="px-[1.5vw] py-[0.9vh] text-sm text-white font-semibold text-center"
            >
              Logout
            </div>
          </div>
        </div>
      )}

      {isSchoolModalOpen && (
        <div className={`fixed z-10 customStyles`}>
          <JoinSchoolModal setIsSchoolModalOpen={setIsSchoolModalOpen} />
        </div>
      )}

      {isProfileModalOpen && (
        <div className={`fixed z-10 customStyles`}>
          <ProfileModal setIsProfileModalOpen={setIsProfileModalOpen} />
        </div>
      )}
    </div>
  )
}

export default Navbar
