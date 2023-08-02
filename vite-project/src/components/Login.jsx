import {useState,useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'


const COHORT_NAME = '2306-FTB-WEB-FT'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

export default function Login ({setToken}) {
    const [username,setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const login = async () => {

        try {
          const response = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user: {
                username: username,
                password: password
              }
            })
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.error('Server error:', errorData);
          }


          const result = await response.json();
          console.log(result);
          return result
        } catch (err) {
          console.error(err);
        }
      }



    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const result = await login({
                username: username,
                password: password,
            })

            console.log(result)

            if (result.success){
                setToken(result.data.token)
                setError(null)
                setUsername('')
                setPassword('') 

                navigate('/dashboard')

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
            <button onClick={() => navigate('/dashboard')}>Login</button>
            
        </form>
        <br></br>
        <br></br>
        <Link to='/register'>Don't have an account, Register Here!</Link>
        <br></br>
        <br></br>

        <Link to='/posts'>...or view posts without registering</Link>
    
    
    </>)

}