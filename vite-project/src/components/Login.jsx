import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const COHORT_NAME = '2306-FTB-WEB-FT'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

export default function Login({ setToken, setUsername, username }) {
  
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const login = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Server error:', errorData)
        return { success: false, data: errorData }
      }

      const result = await response.json();
      //console.log(result)
      return { success: true, data: result }
    } catch (err) {
      console.error(err)
      return { success: false, data: err }
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const result = await login()
      if (result.success) {
        console.log('username:', username)
        
        console.log(result)
        setToken(result.data.data.token)
        
        console.log(result.data.data.token)
        navigate('/dashboard')
        setUsername(data.data.user.username)
        setError(null)
        setUsername('')
        setPassword('')
        
      } else {
        setError('Invalid username and/or password')
      }
    } catch (err) {
      setError(err)
    }
  }



  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} >
        <label>
          Username:
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit" >Login</button>
      </form>
      <br />
      <br />
      <Link to='/register'>Don't have an account, Register Here!</Link>
      <br />
      <br />
      <Link to='/posts'>...or view posts without registering</Link>
    </>
  )
}