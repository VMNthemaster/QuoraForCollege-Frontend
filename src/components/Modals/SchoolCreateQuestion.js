import axios from 'axios'
import React from 'react'
import { ImCross } from 'react-icons/im'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import useState from 'react-usestateref'

const SchoolCreateQuestion = (props) => {
    const { setIsCreateQuestionModalOpen } = props
    const {school} = useParams()
  const [errorMessage, setErrorMessage] = useState('')
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [questionDetails, setQuestionDetails, getQuestionDetails] = useState({
    question: '',
    keywords: [],
  })
  const generalWords = [
    '',
    'how',
    'to',
    'what',
    'is',
    'the',
    'a',
    'an',
    '.',
    ',',
    '?',
    '/',
    'and',
    'of',
    'in',
    'be',
    'have',
    'too',
    'it',
    'i',
    'that',
    'for',
    'you',
    'he',
    'she',
    'with',
    'on',
    'do',
    'at',
    'but',
    'we',
    'his',
    'her',
    'from',
    'by',
    'or',
    'as',
    'what',
  ]

  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setQuestionDetails((prevDetails) => {
      return {
        ...prevDetails,
        [e.target.name]: e.target.value,
      }
    })
  }

  const sendRequestToBackend = async (e) => {
    if(!questionDetails.question){
      return {
        message: 'All fields are required',
        success: false,
        status: 400,
      }
    }

    const url = `https://quora-for-college.onrender.com/api/questions/${school}/addQuestion`
    const res = await axios.post(url, {
      question: questionDetails.question,
      askedBy: user.schoolName,
      keywords: getQuestionDetails.current.keywords,
      email: user.schoolEmail
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

  const handleKeywords = (question) => {
    const questionWithoutQuesMark = question.replace(/\?/g, '')
    const questionWithoutExtraSpaces = questionWithoutQuesMark.replace('  ', '')
    const array = questionWithoutExtraSpaces.split(' ')
    const filteredArr = array.filter((word) => !generalWords.includes(word))
    return filteredArr
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const keywords = await handleKeywords(questionDetails.question)
    setQuestionDetails(prevDetails => {
      return {
        ...prevDetails,
        keywords: keywords
      }
    })

    sendRequestToBackend().then(data => {
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
      }
      else{
        setIsCreateQuestionModalOpen(false)
        navigate(`/${school}`)
      }
    })
  }

  return (
    <div className="flex flex-col w-[94vw] md:w-[50vw] px-[2vw] py-[3vh] relative bg-gradient-to-r from-gray-300 to-slate-400 rounded-md">
      <div
        onClick={() => setIsCreateQuestionModalOpen(false)}
        className="close absolute top-2 right-2 clickEffect"
      >
        <ImCross className="text-white font-medium text-sm md:text-xl cursor-pointer" />
      </div>
      <h2 className="mx-auto text-[1.05rem] md:text-2xl font-serif underline text-white">
        Create Question
      </h2>

      <div className="mx-auto">
        {showErrorMessage && errorMessage && (
          <h1 className="text-[0.6rem] md:text-[1rem] font-serif font-medium underline  text-white">
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
            Question
          </label>
          <input
            type="text"
            name="question"
            id="question"
            value={questionDetails.question}
            onChange={handleChange}
            className="w-full outline-none rounded-sm px-[0.7vw] py-[0.75vh] h-[4.25vh] flex justify-start flex-wrap"
          />
        </div>

        <div className="my-[1vh] clickEffect">
          <button
            onClick={handleSubmit}
            className="border-[0.5px] md:border-2 bg-white text-gray-600 px-[1vw] py-[0.75vh] rounded-md font-serif font-semibold"
          >
            Create Question
          </button>
        </div>
      </form>
    </div>
  )
}

export default SchoolCreateQuestion