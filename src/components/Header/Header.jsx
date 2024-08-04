import React from 'react'
import { useSelector } from 'react-redux'
import {Container, Logo, LogoutBtn} from '../'
import {Link, useNavigate} from 'react-router-dom'

function Header() {
  const isLoggedin = useSelector((state)=>(state.auth.status))
  const navigate = useNavigate()
  const navItem = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !isLoggedin,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !isLoggedin,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: isLoggedin,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: isLoggedin,
  },
  ]
  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link
            to={'/'}
            >
            <Logo width='70px'/>
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {
            navItem.map((item)=>(
              item.active?(
              <li key={item.name}>
                <button
                onClick={()=>{navigate(item.slug)}}
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >
                  {item.name}
                </button>
              </li>)
              :null
            ))
            }
            {isLoggedin&&(
              <li>
                <LogoutBtn/>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header