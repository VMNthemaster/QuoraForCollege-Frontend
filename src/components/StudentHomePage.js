import axios from 'axios'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useState from 'react-usestateref'
import Loader from '../assets/Loader.png'

const StudentHomePage = () => {
  const navigate = useNavigate()
  const isStudentLoggedIn = useSelector((state) => state.isStudentLoggedIn)
  const [isLoading, setIsLoading] = useState(true)
  const [allQuestions, setAllQuestions] = useState([])
  useEffect(() => {
    if (!isStudentLoggedIn) {
      navigate('/')
    }

    async function sendRequestToBackend() {
      const res = await axios
        .get('http://localhost:5000/api/questions/openForAll/getAllQuestions')
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
      if (data.success) {
        setAllQuestions(data.questionsArray)
        setIsLoading(false)
        console.log(data)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-[91vh] bg-gray-100">
      <div className="flex justify-center items-center h-[5vh] w-[94vw] md:w-[50vw] px-[1.25vw] md:px-[1.5vw] py-[1vw] mx-auto border-[0.5px] md:border-[2px] border-red-600 rounded-md">
        hello
      </div>
      {!isLoading && (
        <div className="flex flex-col flex-wrap justify-center items-center w-[94vw] md:w-[70vw] md:px-[1.5vw] py-[1vw] mx-auto gap-y-[1.5vh]">
          {allQuestions.length > 0 &&
            allQuestions.map((question) => {
              return (
                <div
                  className="flex justify-between w-[100%] border-[0.5px] md:border-[2px] border-red-600 rounded-md cursor-pointer"
                  key={question._id}
                >
                  <h2 className="px-[1vw] py-[1vh] w-[70%] text-sm md:text-xl font-serif">
                    {question.question}
                  </h2>
                  <h2 className="px-[1vw] py-[1vh] text-sm md:text-xl font-serif ml-auto">
                    {question.date}
                  </h2>
                </div>
              )
            })}
        </div>
      )}
      {isLoading && (
        <div className='flex justify-center'>
          <img className="animate-spin" src={Loader} alt="Loading" />
        </div>
      )}
    </div>
  )
}

export default StudentHomePage
