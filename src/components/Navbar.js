import React from 'react'
import Logo from '../assets/Logo.png'

const Navbar = () => {
  return (
    <div className='bg-white w-[100%] h-[9vh] flex items-center px-[1vw] py-[1vh] P'>
      <div className="logo w-[50%] flex py-[1vh] items-center gap-x-[1vw]">
        <img src={Logo} className="h-[7vh] w-[7vh]" alt="Logo" />
        <h2 className='text-2xl font-serif hidden md:block'>Quora For College</h2>
      </div>
      <div className="logo w-[50%] flex justify-end py-[1vh] ">
        <button className='border-[0.5px] md:border-[2px] px-[2vw] md:px-[1vw] py-[0.75vh] rounded-md font-serif text-white bg-red-600 text-sm md:text-xl'>Log Out</button>
      </div>

    </div>
  )
}

export default Navbar