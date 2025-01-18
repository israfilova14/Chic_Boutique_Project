import React from 'react'
import { BsFacebook, BsTelegram } from "react-icons/bs"
import { FaTwitter } from "react-icons/fa"
import { PiInstagramLogoFill } from "react-icons/pi"

const Footer = () => {
  return (
    <div className='ml-[4rem] mt-[5px] p-2 border-t-2 flex justify-evenly flex-wrap sm:ml-[0rem]'>
       <div>
          <h2 className='text-2xl font-semibold'>Chic</h2>
          <h2 className='text-2xl font-semibold text-[#1DB954]'>Boutique</h2>
       </div>
       <div>
           <h2 className='fot-semibold mb-3 text-lg'>Chic Boutique</h2>
           <ul>
              <li>Alloy26</li>
              <li>100 South Commons Suite 102</li>
              <li>Pittsburgh PS 15212</li>
              <li>(077) 459-7627</li>
           </ul>
       </div>
       <div>
            <h2 className='font-semibold mb-3 text-lg'>Store Hours</h2>
            <ul>
               <li>Monday-Friday(8am-5pm)</li>
               <li>Saturday(10am-6pm)</li>
               <li>Sunday(12pm-6pm)</li>
            </ul>
        </div>
       <div className='flex flex-col gap-3'>
           <h2 className='font-semibold text-lg'>Follow Us</h2>
           <ul className='flex items-center gap-3'>
              <li>
                <BsFacebook size={20} className='cursor-pointer'/>
              </li>
              <li>
                 <FaTwitter size={20} className='cursor-pointer'/>
              </li>
              <li>
                 <BsTelegram size={20} className='cursor-pointer'/>
              </li>
              <li>
                <PiInstagramLogoFill size={20} className='text-white cursor-pointer'/>
              </li>
           </ul>
       </div>
    </div>
  )
}

export default Footer