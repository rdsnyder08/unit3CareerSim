import { useState } from 'react'
import './App.css'
import {Route,Routes} from 'react-router-dom'
import PostViewUnauth from './components/PostViewUnauth'
import Register from './components/Register'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/posts' element={<PostViewUnauth />} />
      </Routes>
    </>
  )
}

export default App
