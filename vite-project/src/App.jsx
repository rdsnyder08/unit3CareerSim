import { useState } from 'react'
import './App.css'
import {Route,Routes} from 'react-router-dom'
import PostViewUnauth from './components/PostViewUnauth'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<PostViewUnauth />} />
      </Routes>
    </>
  )
}

export default App
