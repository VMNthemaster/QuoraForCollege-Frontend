import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { BiUpArrow, BiDownArrow } from 'react-icons/bi'

const CompleteQuestion = () => {
  const navigate = useNavigate()
  const questionid = useParams().questionid
  const isStudentLoggedIn = useSelector((state) => state.isStudentLoggedIn)
  const user = useSelector((state) => state.user)

  const [completeQuestion, setCompleteQuestion] = useState({})
  const [completeAnswers, setCompleteAnswers] = useState([])
  const [answersErrorMessage, setAnswersErrorMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [postAnswerErrorMessage, setPostAnswerErrorMessage] = useState('')
  const [showPostAnswerError, setShowPostAnswerError] = useState(false)
  const [answerDetails, setAnswerDetails] = useState({
    answer: '',
  })

  useEffect(() => {
    if (!isStudentLoggedIn) {
      navigate('/')
    }

    async function sendRequestToBackend() {
      const res = await axios
        .get(
          `http://localhost:5000/api/questions/openForAll/getSingleQuestion/${questionid}`
        )
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

    sendRequestToBackend().then((data) => {
      if (!data.success) {
        // seterror messages as data not found
        if (data.status === 400) {
          setErrorMessage('Question does not exist')
        } else if (data.status === 500) {
          setErrorMessage('Invalid Question ID')
        }
      } else {
        setCompleteQuestion(data.question)
      }
    })

    const getAnswers = async () => {
      const res = await axios
        .get(
          `http://localhost:5000/api/questions/openForAll/${questionid}/getAllAnswers`
        )
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

    getAnswers().then((data) => {
      if (!data.success) {
        if (data.status === 400) {
          setAnswersErrorMessage(data.message)
        } else if (data.success === 500) {
          setAnswersErrorMessage(
            'We are facing issues fetching the answers....Please try again later'
          )
        }
      } else {
        if (data.answersArray.length === 0) {
          setAnswersErrorMessage('No answers yet....Be the first one to answer')
        } else {
          const sortedAnswers = data.answersArray.sort((a,b) => b.votes - a.votes);
          setCompleteAnswers(sortedAnswers)
        }
      }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAnswerChange = (e) => {
    setAnswerDetails((prevDetails) => {
      return {
        ...prevDetails,
        [e.target.name]: e.target.value,
      }
    })
  }

  const sendRequestToBackend = async (e) => {
    if (!answerDetails.answer) {
      return {
        message: 'All fields are required',
        success: false,
        status: 400,
      }
    }
    const url = `http://localhost:5000/api/questions/openForAll/${questionid}/addAnswer`
    const res = await axios
      .post(url, {
        name: user.name,
        email: user.email,
        answer: answerDetails.answer,
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

  const handlePostAnswer = (e) => {
    e.preventDefault()
    sendRequestToBackend().then(data => {
      console.log(data)
      let answerBody = document.getElementById('answer')
      answerBody.value = ''
      if(!data.success){
        if(data.status === 400){
          setPostAnswerErrorMessage(data.message)
          setShowPostAnswerError(true)
          setTimeout(() => {
            setShowPostAnswerError(false)
          }, 3000)
        }
        else{
          setPostAnswerErrorMessage('Internal Server Error, Please Try Again....')
          setShowPostAnswerError(true)
          setTimeout(() => {
            setShowPostAnswerError(false)
          }, 3000)
        }
      }
      else{
        setPostAnswerErrorMessage('Answer added successfully....')
          setShowPostAnswerError(true)
          setTimeout(() => {
            setShowPostAnswerError(false)
          }, 3000)
          navigate(`/student/${questionid}`)
      }
    })
  }

  return (
    <div>
      {errorMessage && (
        <div className="h-[91vh] flex justify-center items-center">
          <h2>{errorMessage}</h2>
        </div>
      )}
      {!errorMessage && (
        <div className="bg-gray-100 min-h-[91vh] md:py-[3vh] flex flex-col gap-y-[3vh] justify-between">
          <div className="w-[98vw] md:w-[60vw] flex flex-col mx-auto md:border-2 md:border-red-500 px-[1vw] py-[1vh] rounded-md bg-white">
            <div className="question flex flex-wrap">
              <h2 className="text-lg md:text-2xl font-serif">
                {completeQuestion.question}
              </h2>
            </div>

            <div className="flex gap-x-[3vw] mt-[1vh]">
              <h2 className="text-[0.8rem] md:text-xl font-serif">
                Asked On: {completeQuestion.date}
              </h2>
              <h2 className="text-[0.8rem] md:text-xl font-serif">
                Asked By: {completeQuestion.askedBy}
              </h2>
            </div>

            <div className="h-[0.3vh] bg-gray-400 my-[2vh]"></div>

            {answersErrorMessage && (
              <div className="answers-error">
                <h2 className="text-[0.8rem] md:text-xl font-serif">
                  {answersErrorMessage}
                </h2>
              </div>
            )}

            {!answersErrorMessage && (
              <div className="flex flex-col">
                {completeAnswers.length > 0 &&
                  completeAnswers.map((singleAnswer) => {
                    return (
                      <div className="flex my-[2vh]" key={singleAnswer._id}>
                        <div className="w-[7%] flex flex-col items-center mr-[3%] md:mr-[1%]">
                          <div className="cursor-pointer">
                            <BiUpArrow
                              color="green"
                              className="text-sm md:text-2xl"
                            />
                          </div>
                          <div className="">
                            <h2
                              className={`text-[0.8rem] md:text-xl font-semibold ${
                                singleAnswer.votes > 0
                                  ? 'text-green-800'
                                  : singleAnswer.votes < 0
                                  ? 'text-red-600'
                                  : ''
                              }`}
                            >
                              {singleAnswer.votes}
                            </h2>
                          </div>
                          <div className="cursor-pointer">
                            <BiDownArrow
                              color="red"
                              className="text-sm md:text-2xl"
                            />
                          </div>
                        </div>
                        <div className="w-[85%]">
                          <div className="flex justify-between">
                            <h2 className="text-[0.8rem] md:text-xl font-serif">
                              {singleAnswer.answeredBy}
                            </h2>
                            <h2 className="text-[0.8rem] md:text-xl font-serif">
                              {singleAnswer.date}
                            </h2>
                          </div>
                          <h2>{singleAnswer.answer}</h2>
                        </div>
                      </div>
                    )
                  })}
              </div>
            )}
          </div>
          <div className="answer flex flex-col gap-y-[1vh] mx-auto text-sm md:text-xl font-serif">
            <div className="flex flex-wrap">
              <h2 className="font-serif font-semibold text-gray-600">Write your answer</h2>
            </div>
            {postAnswerErrorMessage && showPostAnswerError && <div className="answerMessage">
              <h2>{postAnswerErrorMessage}</h2>
            </div>}
            <textarea
              name="answer"
              id="answer"
              onChange={handleAnswerChange}
              style={{ resize: 'none' }}
              className="w-[98vw] md:w-[60vw] outline-none px-[0.5vw] py-[1vh] border-[0.5px] md:border-2 border-red-500 rounded-md"
              rows="7"
            ></textarea>
            <div onClick={handlePostAnswer} className="button bg-red-500 w-fit px-[1vw] py-[0.5vh] rounded-sm mb-[2vh]">
              <button className="text-white text-sm md:text-xl">
                Post Answer
              </button>
            </div>

            
          </div>
        </div>
      )}
    </div>
  )
}

export default CompleteQuestion

