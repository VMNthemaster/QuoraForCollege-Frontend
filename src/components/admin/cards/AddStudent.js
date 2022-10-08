import React from 'react'
import { ImCross } from 'react-icons/im'
import useState from 'react-usestateref'
import axios from 'axios'
import { useSelector } from 'react-redux'

const AddStudent = (props) => {
  const {setIsAddStudentModalOpen} = props
  const user = useSelector((state) => state.user)
  const [errorMessage, setErrorMessage] = useState('')
  const [showErrorMessage, setShowErrorMessage] = useState(false)

  const [studentDetails, setStudentDetails] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setStudentDetails((prevDetails) => {
      return {
        ...prevDetails,
        [e.target.name]: e.target.value,
      }
    })
  }

  const sendRequestToBackend = async () => {
    if (
      studentDetails.name.length === 0 ||
      studentDetails.email.length === 0 ||
      studentDetails.password.length === 0
    ) {
      return {
        message: 'All fields are required',
        success: false,
        status: 400,
      }
    }
    const url = `https://quora-for-college.onrender.com/api/schools/${user.school}/addStudent`
    const res = await axios
      .patch(url, {
        name: studentDetails.name,
        email: studentDetails.email,
        password: studentDetails.password,
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
      if(!data.success){
        if(data.status === 400){
          setErrorMessage(data.message)
          setShowErrorMessage(true)
          setTimeout(() => {
            setShowErrorMessage(false)
          }, 3000);
        }
        else {
          setErrorMessage('Internal Server Error, Please try again')
          setShowErrorMessage(true)
          setTimeout(() => {
            setShowErrorMessage(false)
          }, 3000);
        }
      }
    })
  }

  return (
    <div className="flex flex-col w-[94vw] md:w-[50vw] px-[2vw] py-[3vh] relative bg-gradient-to-r from-green-400 to-lime-400 rounded-md">
      <div
        onClick={() => setIsAddStudentModalOpen(false)}
        className="close absolute top-2 right-2 clickEffect"
      >
        <ImCross className="text-white font-medium text-sm md:text-xl cursor-pointer" />
      </div>
      <h2 className="mx-auto text-[1.05rem] md:text-2xl font-serif underline text-white">
        Add Student
      </h2>
      <div className="mx-auto">
        {showErrorMessage && errorMessage && (
          <h1 className="text-[0.6rem] md:text-[1rem] font-serif font-semibold underline text-white">
            {errorMessage}
          </h1>
        )}
      </div>
      <form className="flex flex-col gap-y-[2vh] mt-[2vh]">
        <div className="name flex flex-col flex-wrap gap-y-[1vh]">
          <label
            htmlFor="studentName"
            className="text-white text-sm md:text-xl font-serif underline underline-offset-2"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={studentDetails.name}
            onChange={handleChange}
            className="w-[90%] md:w-[80%] outline-none rounded-sm h-[4.25vh] px-[0.7vw] py-[0.75vh]"
          />
        </div>

        <div className="email flex flex-col flex-wrap gap-y-[1vh]">
          <label
            htmlFor="studentEmail"
            className="text-white text-sm md:text-xl font-serif underline underline-offset-2"
          >
            Student Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={studentDetails.email}
            onChange={handleChange}
            className="w-[90%] md:w-[80%] outline-none rounded-sm h-[4.25vh] px-[0.7vw] py-[0.75vh]"
          />
        </div>

        <div className="password flex flex-col flex-wrap gap-y-[1vh]">
          <label
            htmlFor="password"
            className="text-white text-sm md:text-xl font-serif underline underline-offset-2"
          >
            Student Password
          </label>
          <input
            type="text"
            name="password"
            id="password"
            value={studentDetails.password}
            onChange={handleChange}
            className="w-[90%] md:w-[80%] outline-none rounded-sm h-[4.25vh] px-[0.7vw] py-[0.75vh]"
          />
        </div>
      </form>
      <div className="mt-[2.5vh]">
        <button
          onClick={handleSubmit}
          className="border-[0.5px] md:border-2 bg-white text-lime-500 px-[1vw] py-[0.75vh] rounded-md font-serif font-semibold clickEffect"
        >
          Add Student
        </button>
      </div>
    </div>
  )
}

export default AddStudent
