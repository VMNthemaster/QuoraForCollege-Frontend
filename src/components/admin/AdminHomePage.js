import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AddAdmin from './cards/AddAdmin'
import AddStudent from './cards/AddStudent'
import RemoveAdmin from './cards/RemoveAdmin'
import RemoveStudent from './cards/RemoveStudent'

const AdminHomePage = () => {
  // create 4 cards; add and remove admin, add and remove student
  const navigate = useNavigate()
  const isAdminLoggedIn = useSelector((state) => state.isAdminLoggedIn)
  const user = useSelector((state) => state.user)

  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false)
  const [isRemoveStudentModalOpen, setIsRemoveStudentModalOpen] =
    useState(false)
  const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false)
  const [isRemoveAdminModalOpen, setIsRemoveAdminModalOpen] = useState(false)

  useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="bg-gray-100 min-h-[91vh] bg-gradient-to-r from-blue-200 to-cyan-400">
      <div className="flex flex-col min-h-[91vh] mx-auto w-[98vw] md:w-[60vw] justify-around">
        <div>
          <div className="flex addAdmin removeAdmin justify-around">
            <h2
              onClick={() => setIsAddAdminModalOpen(true)}
              className="w-[40%] px-[1vw] py-[0.5vh] border-[0.5px] md:border-2 bg-gradient-to-r from-purple-400 to-pink-500 hover:bg-gradient-to-l text-white font-serif rounded-md text-center cursor-pointer clickEffect text-sm md:text-xl"
            >
              Add Admin
            </h2>
            <h2 onClick={() => setIsRemoveAdminModalOpen(true)} className="w-[40%] px-[1vw] py-[0.5vh] border-[0.5px] md:border-2 bg-gradient-to-r from-purple-400 to-pink-500 hover:bg-gradient-to-l text-white font-serif rounded-md text-center cursor-pointer clickEffect text-sm md:text-xl">
              Remove Admin
            </h2>
          </div>
          <div className="flex addStudent removeStudent justify-around mt-[2vh]">
            <h2
              onClick={() => setIsAddStudentModalOpen(true)}
              className="w-[40%] px-[1vw] py-[0.5vh] border-[0.5px] md:border-2 bg-gradient-to-r from-purple-400 to-pink-500 hover:bg-gradient-to-l text-white font-serif rounded-md text-center cursor-pointer clickEffect text-sm md:text-xl"
            >
              Add Student
            </h2>
            <h2
              onClick={() => setIsRemoveStudentModalOpen(true)}
              className="w-[40%] px-[1vw] py-[0.5vh] border-[0.5px] md:border-2 bg-gradient-to-r from-purple-400 to-pink-500 hover:bg-gradient-to-l text-white font-serif rounded-md text-center cursor-pointer clickEffect text-sm md:text-xl"
            >
              Remove Student
            </h2>
          </div>
        </div>
        <div className="watermark  flex justify-center items-center">
          <h2 className="font-[gabriola] font-medium tracking-wider text-[7rem] md:text-[11rem] -rotate-[30deg] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            {user.school}
          </h2>
        </div>
      </div>

      {isAddStudentModalOpen && (
        <div className="fixed customStyles">
          {<AddStudent setIsAddStudentModalOpen={setIsAddStudentModalOpen} />}
        </div>
      )}

      {isRemoveStudentModalOpen && (
        <div className="fixed customStyles">
          {
            <RemoveStudent
              setIsRemoveStudentModalOpen={setIsRemoveStudentModalOpen}
            />
          }
        </div>
      )}

      {isAddAdminModalOpen && (
        <div className="fixed customStyles">
          {<AddAdmin setIsAddAdminModalOpen={setIsAddAdminModalOpen} />}
        </div>
      )}

      {isRemoveAdminModalOpen && (
        <div className="fixed customStyles">
          {<RemoveAdmin setIsRemoveAdminModalOpen={setIsRemoveAdminModalOpen} />}
        </div>
      )}
    </div>
  )
}

export default AdminHomePage
