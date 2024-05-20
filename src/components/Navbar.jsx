import React from 'react'

const Navbar = () => {
  return (
   <nav className='flex justify-between bg-blue-700 text-white py-5'>
    <div className='logo'> 
    <span className='font-bold text-xl mx-7'>MY TASKS</span>
    </div>
    <ul className='flex gap-7 mx-12'>
      <li className='cursor-pointer hover:font-bold transition-all duration-75'>Home</li>
      <li className='cursor-pointer hover:font-bold transition-all duration-75'>Your Tasks</li>
      <li className='cursor-pointer hover:font-bold transition-all duration-75'>Recent Activity</li> 
    </ul>
   </nav>
   
  )
}

export default Navbar
