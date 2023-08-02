import { useState } from 'react'
import './App.css'
import {Route,Routes} from 'react-router-dom'
import PostViewUnauth from './components/PostViewUnauth'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/posts' element={<PostViewUnauth />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
