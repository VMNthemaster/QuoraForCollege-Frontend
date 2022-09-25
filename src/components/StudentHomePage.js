import axios from 'axios'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useState from 'react-usestateref'
import Loader from '../assets/Loader.png'
import {BsSearch} from 'react-icons/bs'
import {GiFountainPen} from 'react-icons/gi'
import CreateQuestion from './Modals/CreateQuestion'

const StudentHomePage = () => {
  const navigate = useNavigate()
  const isStudentLoggedIn = useSelector((state) => state.isStudentLoggedIn)
  const [isLoading, setIsLoading] = useState(true)
  const [allQuestions, setAllQuestions] = useState([])
  const [isCreateQuestionModalOpen, setIsCreateQuestionModalOpen] = useState(false)
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
        setAllQuestions(data.questionsArray.reverse())
        setIsLoading(false)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleQuestionClick = (qid) => {
    navigate(`/student/${qid}`)
  }

 
  return (
    <div className="min-h-[91vh] bg-gray-100 ">
      <div className="h-[5vh] w-[94vw] md:w-[60vw] border-[0.5px] md:border-2 border-red-500 rounded-md flex items-center mx-auto ">
        <div className="px-[1vw]"><BsSearch /></div>
        <div className='w-[100%] pr-[1vw] py-[0.5vh]'><input className='w-[100%] outline-none text-sm md:text-xl bg-gray-100 placeholder-gray-700 placeholder:font-serif' type="text" placeholder='Write keywords for better chances of solution' /></div>
      </div>
      {!isLoading && (
        <div className="flex flex-col flex-wrap justify-start items-center w-[94vw] md:w-[70vw] md:px-[1.5vw] min-h-[86vh] py-[1vw] mx-auto gap-y-[1.5vh] ">
          {allQuestions.length > 0 &&
            allQuestions.map((question) => {
              return (
                <div 
                onClick={() => handleQuestionClick(question._id)}
                  className="flex justify-between w-[100%] border-[0.5px] md:border-[2px]  rounded-md cursor-pointer bg-gradient-to-r from-red-400 to-pink-400 text-white hover:bg-gradient-to-l"
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
          <div onClick={() => setIsCreateQuestionModalOpen(true)} className="fixed bottom-[7vh] right-[10vw] md:right-[20vw] z-10 p-[1rem] rounded-full bg-white cursor-pointer text-lg md:text-2xl"><GiFountainPen color='black' /></div>
          {isCreateQuestionModalOpen && <div className="fixed customStyles"><CreateQuestion setIsCreateQuestionModalOpen={setIsCreateQuestionModalOpen} /></div>}
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
