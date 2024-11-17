import { Route, Routes } from 'react-router-dom'
import './App.css'
import './bootstrap.min.css'
import Auth from './Pages/Auth'
import Home from './Pages/Home'
import Landing from './Pages/Landing'
import { useContext, useEffect } from 'react'
import { tokenAuthContext } from './contextApi/AuthContext'
import Pnf from './Pages/Pnf'


function App() {
  const { isAuthorised, setIsAuthorised } = useContext(tokenAuthContext)
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsAuthorised(true)
    } else {
      setIsAuthorised(false)
    }
  }, [isAuthorised])
  console.log(isAuthorised);
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth insideRegister={true} />} />
        {
          isAuthorised &&
          <Route path='/home' element={<Home />} />
        }
        <Route path='/*' element={<Pnf />} />

      </Routes>
    </>
  )
}

export default App
