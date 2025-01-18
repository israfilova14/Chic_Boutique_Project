import React, {useState} from 'react';
import { NavLink } from 'react-router-dom'; 
import { FaTimes } from "react-icons/fa";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
     setIsMenuOpen(!isMenuOpen);

  }
  return (
    <div>
       <button 
        className={`${isMenuOpen ? "top-2 right-2" : "top-5 right-7"} bg-[#151515] p-2 fixed rounded-lg`}
        onClick={toggleMenu}
       >
          {
            isMenuOpen 
            ? 
            (
              <FaTimes color='white'/>
            )
            :
            (
              <>
               <div className='w-6 h-0.5 bg-white my-1'></div>
               <div className='w-6 h-0.5 bg-white my-1'></div>
               <div className='w-6 h-0.5 bg-white my-1'></div>
              </>
            )
          }
       </button>
          {
            isMenuOpen && (
              <section className='bg-[#151515] p-4 fixed right-7 top-5'>
                 <ul className='list-none mt-2'>
                    <li>
                       <NavLink 
                         className={
                           ({ isActive }) => `list-item py-2 px-3 d-block mb-5 hover:bg-[#2E2D2D] rounded-sm ${isActive ? "text-[greenyellow]" : "text-white"}`
                         } 
                         to='/admin/dashboard'
                        
                        >
                           Admin Dashboard
                        </NavLink>
                    </li>
                    <li>
                       <NavLink 
                         className={
                           ({ isActive }) => `list-item py-2 px-3 d-block mb-5 hover:bg-[#2E2D2D] rounded-sm ${isActive ? "text-[greenyellow]" : "text-white"}`
                         } 
                         to='/admin/category-list'
                        
                        >
                            Create Category
                        </NavLink>
                    </li>
                    <li>
                       <NavLink 
                         className={
                           ({ isActive }) => `list-item py-2 px-3 d-block mb-5 hover:bg-[#2E2D2D] rounded-sm ${isActive ? "text-[greenyellow]" : "text-white"}`
                        } 
                         to='/admin/upload-product'
                    
                        >
                            Upload Product
                        </NavLink>
                    </li>
                    <li>
                       <NavLink 
                         className={
                           ({ isActive }) => `list-item py-2 px-3 d-block mb-5 hover:bg-[#2E2D2D] rounded-sm ${isActive ? "text-[greenyellow]" : "text-white"}`
                        } 
                         to='/admin/all-products-list/:pageNumber'
                      
                        >
                           All Products
                        </NavLink>
                    </li>
                    <li>
                       <NavLink 
                         className={
                           ({ isActive }) => `list-item py-2 px-3 d-block mb-5 hover:bg-[#2E2D2D] rounded-sm ${isActive ? "text-[greenyellow]" : "text-white"}`
                        } 
                         to='/admin/users'
                       
                        >
                           Users List
                        </NavLink>
                    </li>
                    <li>
                       <NavLink 
                         className={
                           ({ isActive }) => `list-item py-2 px-3 d-block mb-5 hover:bg-[#2E2D2D] rounded-sm ${isActive ? "text-[greenyellow]" : "text-white"}`
                        } 
                         to='/admin/order-list'
                      
                        >
                           Orders List
                        </NavLink>
                    </li>
                 </ul>
              </section>
            )
          }
    </div>
  )
}

export default AdminMenu