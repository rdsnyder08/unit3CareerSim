import React from 'react'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import {useEffect} from 'react'

const Dashboard = ({username , token}) => {
    const [user,setUser]=useState({})
    const [currentToken,setCurrentToken]=useState(token)
    
    const navigate=useNavigate()

    useEffect(() => {
        async function fetchUser() {
            let response = await fetch('/api/auth/me', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  },
            })

            let result = await response.json()

            console.log(result)
            //setMessage(result.message)
            //setUser(result.user)
        }


        if (token.length !== 0) {
            fetchUser() 
        }
    }, [token])

    console.log('Token:', token)
    console.log('username:', username)
    

    function handleLogout () {
        console.log('logging out')
        setCurrentToken(null)
        navigate('/')
    }

    return(<>
    <div>
        <h2>{username}'s Dashboard</h2>
    </div>
    
    <div>
        <Link to='/makepost'>Create a Post</Link>
    </div>
    
    <div>
        <Link to='/postsauth'>View Posts</Link>
    </div>
    <div>
        <button onClick={handleLogout}>Log Out</button>
    </div>
    
    
    
    </>)

}

export default Dashboard