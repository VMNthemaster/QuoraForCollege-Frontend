import React from 'react'
import { ImCross } from 'react-icons/im'
import { useSelector } from 'react-redux'

const ProfileModal = (props) => {
  const { setIsProfileModalOpen } = props
  const user = useSelector((state) => state.user)
  console.log(window.location.pathname)

  return (
    <div className="flex flex-col w-[94vw] md:w-[50vw] px-[2vw] py-[3vh] relative bg-gradient-to-r from-green-400 to-lime-400 rounded-md gap-y-[2vh]">
      <div
        onClick={() => setIsProfileModalOpen(false)}
        className="close absolute top-2 right-2"
      >
        <ImCross className="text-white font-medium text-sm md:text-xl cursor-pointer" />
      </div>
      <h2 className="mx-auto text-[1.05rem] md:text-2xl font-serif underline text-white">
        Profile
      </h2>
      <h2 className="text-white text-sm md:text-xl font-serif">
        <span className="underline underline-offset-2">Name:</span> {user.name}
      </h2>
      <h2 className="text-white text-sm md:text-xl font-serif">
        <span className="underline underline-offset-2">Email:</span>{' '}
        {user.email}
      </h2>
      <h2 className="text-white text-sm md:text-xl font-serif">
        <span className="underline underline-offset-2">School:</span>{' '}
        {user.school}
      </h2>
      <div className="mx-auto w-[50%] flex flex-wrap border-[0.5px] md:border-2 border-white rounded-md py-[1vh] px-[0.5vw] justify-center bg-white cursor-pointer">
        <h2 className="font-serif text-green-800 font-medium text-sm md:text-xl ">
          Switch to{' '}
          {window.location.pathname.startsWith('/student')
            ? 'School'
            : 'General'}{' '}
          chat
        </h2>
      </div>
    </div>
  )
}

export default ProfileModal
