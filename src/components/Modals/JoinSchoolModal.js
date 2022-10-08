import React from 'react'
import { ImCross } from 'react-icons/im'
import useState from 'react-usestateref'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../state/index'

const JoinSchoolModal = (props) => {
  const { setIsSchoolModalOpen } = props
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const { setUserDetails } = bindActionCreators(actions, dispatch)

  const [joinSchoolDetails, setJoinSchoolDetails] = useState({
    studentEmail: '',
    generalEmail: '',
    school: '',
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [showErrorMessage, setShowErrorMessage] = useState(false)

  const handleChange = (e) => {
    setJoinSchoolDetails((prevDetails) => {
      return {
        ...prevDetails,
        [e.target.name]: e.target.value,
      }
    })
  }

  const sendRequestToBackend = async () => {
    if (
      joinSchoolDetails.generalEmail.length === 0 ||
      joinSchoolDetails.school.length === 0 ||
      joinSchoolDetails.studentEmail.length === 0
    ) {
      return {
        message: 'All fields are required',
        success: false,
        status: 400,
      }
    }
    const url = `https://quora-for-college.onrender.com/api/schools/joinSchool`
    const res = await axios
      .post(url, {
        email: joinSchoolDetails.studentEmail || '',
        generalEmail: joinSchoolDetails.generalEmail || '',
        school: joinSchoolDetails.school || '',
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
        setUserDetails({
          ...user,
          school: joinSchoolDetails.school,
          schoolEmail: joinSchoolDetails.studentEmail,
          schoolName: data.singleStudentDetails.name
        })
        setIsSchoolModalOpen(false)
      }
    })
  }

  return (
    <div className="flex flex-col w-[94vw] md:w-[50vw] px-[2vw] py-[3vh] relative bg-gradient-to-r from-cyan-500 to-blue-400 rounded-md">
      <div
        onClick={() => setIsSchoolModalOpen(false)}
        className="close absolute top-2 right-2 clickEffect"
      >
        <ImCross className="text-white font-medium text-sm md:text-xl cursor-pointer" />
      </div>
      <h2 className="mx-auto text-[1.05rem] md:text-2xl font-serif underline text-white">
        Join School
      </h2>
      <div className="mx-auto">
        {showErrorMessage && errorMessage && (
          <h1 className="text-[0.6rem] md:text-[1rem] font-serif font-semibold underline text-gray-600">
            {errorMessage}
          </h1>
        )}
      </div>
      <form className="flex flex-col gap-y-[2vh] mt-[2vh]">
        <div className="general-email flex flex-col flex-wrap gap-y-[1vh]">
          <label
            htmlFor="generalEmail"
            className="text-white text-sm md:text-xl font-serif underline underline-offset-2"
          >
            Personal Email
          </label>
          <input
            type="email"
            name="generalEmail"
            id="generalEmail"
            value={joinSchoolDetails.generalEmail}
            onChange={handleChange}
            className="w-[90%] md:w-[80%] outline-none rounded-sm h-[4.25vh] px-[0.7vw] py-[0.75vh]"
          />
        </div>
        <div className="institution-email flex flex-col flex-wrap gap-y-[1vh]">
          <label
            htmlFor="studentEmail"
            className="text-white text-sm md:text-xl font-serif underline underline-offset-2"
          >
            School/College Email<span>(Provided by your institution)</span>
          </label>
          <input
            type="email"
            name="studentEmail"
            id="studentEmail"
            value={joinSchoolDetails.studentEmail}
            onChange={handleChange}
            className="w-[90%] md:w-[80%] outline-none rounded-sm h-[4.25vh] px-[0.7vw] py-[0.75vh]"
          />
        </div>

        <div className="institution-name flex flex-col flex-wrap gap-y-[1vh]">
          <label
            htmlFor="school"
            className="text-white text-sm md:text-xl font-serif underline underline-offset-2"
          >
            School/College Name
          </label>
          <input
            type="text"
            name="school"
            id="school"
            value={joinSchoolDetails.school}
            onChange={handleChange}
            className="w-[90%] md:w-[80%] outline-none rounded-sm h-[4.25vh] px-[0.7vw] py-[0.75vh]"
          />
        </div>
      </form>
      <div className="mt-[2.5vh]">
        <button
          onClick={handleSubmit}
          className="border-[0.5px] md:border-2 bg-white text-cyan-600 px-[1vw] py-[0.75vh] rounded-md font-serif font-semibold clickEffect"
        >
          Join School
        </button>
      </div>
    </div>
  )
}

export default JoinSchoolModal
