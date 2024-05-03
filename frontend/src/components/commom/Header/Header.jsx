import React, { useState } from "react"
import Head from "./Head"
import HeadLines from "./HeadLines"
import "./header.css"
import { Link, NavLink } from "react-router-dom"
import "./social.css"

const Header = () => {
  const [navbar, setNavbar] = useState(false)
  const categoryArray = ["Press", "Law", "Policies", "Education", "Agriculture", "Opinions", "Scheme", "Tech", "Event", "Sport", "Business"];

  return (
    <>
      <Head />

      <header>
        <div className='container paddingSmall'>
          <nav>
            <ul className={navbar ? "navbar" : "flex"} onClick={() => setNavbar(false)}>


              <li>
                <NavLink to='/' className={({ isActive }) =>
                  `${isActive ? "text-orange-700" : "text-gray-100"}`
                }>Home</NavLink>
              </li>


              {/* Dynamically render category links based on the category prop */}
              {categoryArray.map((cat, index) => (
                <li key={index}>
                  <NavLink to={`/categoryPage/${cat}`} className={({ isActive }) =>
                    `${isActive ? "text-orange-700" : "text-gray-100"}` } > 
                    { cat }
                  </NavLink>

                  {/* <NavLink to='{`/categoryPage/${cat}`}>' className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }>{cat}</NavLink> */}
                </li>
              ))}


          </ul>
          <button className='barIcon' onClick={() => setNavbar(!navbar)}>
            {navbar ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
          </button>
        </nav>
      </div>
    </header >
      <HeadLines />
    </>
  )
}

export default Header
