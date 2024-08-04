import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from '../src/components'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'

function App() {
  const [loader, setLoader] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData)
        dispatch(login(userData))
      else
        dispatch(logout())
    }).finally(() => setLoader(false))
  }, [])
  return !loader ? (<div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  </div>
  ) : null
}

export default App
