import { useState } from 'react'
import './App.css'
import {Route,Routes} from 'react-router-dom'
import PostViewUnauth from './components/PostViewUnauth'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import MakePost from './components/MakePost'
import PostViewAuth from './components/PostViewAuth'

function App() {
  const [token,setToken] = useState('')
  const [username, setUsername] = useState('')


  


  return (
    <>
      <Routes>
        <Route path='/' element={<Login setToken={setToken} setUsername={setUsername} username={username} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/posts' element={<PostViewUnauth />} />
        <Route path='/dashboard' element={<Dashboard token={token} username={username} />} />
        <Route path='/makepost' element={<MakePost  token={token} />} />
        <Route path='/postsauth' element={<PostViewAuth token={token} />} />
      </Routes>
    </>
  )
}

export default App
