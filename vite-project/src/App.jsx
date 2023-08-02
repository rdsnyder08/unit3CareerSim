import { useState } from 'react'
import './App.css'
import {Route,Routes} from 'react-router-dom'
import PostViewUnauth from './components/PostViewUnauth'
import Register from './components/Register'
import Login from './components/Login'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/posts' element={<PostViewUnauth />} />
      </Routes>
    </>
  )
}

export default App
