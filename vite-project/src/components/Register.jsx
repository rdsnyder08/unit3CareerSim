import {useState,useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'

const COHORT_NAME = '2306-FTB-WEB-FT'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

export default function Register ({setToken}) {

    const [username,setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const response = await fetch(`${BASE_URL}/users/register`,
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

            setToken(data.token)

            setUsername('')
            setPassword('')


        } catch (err) {
            setError(err)
        }
    }

    return <>
        <h1>Register</h1>
        {error && <p>great, now return to login</p>}
        <form onSubmit={handleSubmit}>
            <label>Username:
                <input value={username} onChange={e=>setUsername(e.target.value)} />
            </label>
            <label>Password:
                <input value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <button type='submit'>Register</button>
        </form>
        <br></br>
        <br></br>
        <Link to='/'>Back to Login</Link>
        <br></br>
        <br></br>
        <Link to='/posts'>Or view Posts without registering</Link>

    </>


}
