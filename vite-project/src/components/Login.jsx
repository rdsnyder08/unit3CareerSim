import {useState,useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'

const COHORT_NAME = '2306-FTB-WEB-FT'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

export default function Login ({setToken}) {
    const [username,setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const response = await fetch(`${BASE_URL}/users/login`,
                {
                    method:'POST',
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({
                        user: {
                            username: username,
                            password: password
                }})
                }
            
            
            )

            const data = await response.json()
            console.log(data)

            if (response.ok && data.success){
                setToken(data.token)
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

    return(
    <>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <label>Username:
                <input value={username} onChange={(e)=> setUsername(e.target.value)} />
            </label>
            <label>Password:
                <input value={password} onChange={(e)=> setPassword(e.target.value)} />
            </label>
            <button type='submit'>Login</button>
        </form>
        <br></br>
        <br></br>
        <Link to='/register'>Don't have an account, Register Here!</Link>
        <br></br>
        <br></br>

        <Link to='/posts'>...or view posts without registering</Link>
    
    
    </>)

}