import { useContext, useState } from 'react'
import './App.scss'
import Chat from './pages/Chat'
import Register from './pages/Register'
import Login from './pages/Login'
import { Route, Routes, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap"
import NavBar from './components/NavBar'
import { AuthContext } from './context/Authcontext'
function App() {
  const {user} = useContext(AuthContext)
  return (<>
    <NavBar />
    <Container className='text-secondary'>
      <Routes>
        <Route path='/' element={user?<Chat/>:<Login />} />
        <Route path='/login' element={user?<Chat/>:<Login />} />
        <Route path='/register' element={user?<Chat/>:<Register />} />
        <Route path='/*' element={<Navigate to="/" />} />
      </Routes>
    </Container>
  </>


  )
}

export default App
