import React from 'react'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'

const Dashboard = ({username , token}) => {
    const [currentToken,setCurrentToken]=useState(token)
    const navigate=useNavigate()

    function handleLogout () {
        console.log('logging out')
        setCurrentToken(null)
        navigate('/')
    }

    return(<>
    <div>
        <h2>Welcome {username}</h2>
    </div>
    <div>
        <h3>Messaging</h3>
    </div>
    <div>
        <h3>Create a Post</h3>
    </div>
    <div>
        <h3>Edit or Delete Posts</h3>
    </div>
    <div>
        <h3>View Posts</h3>
    </div>
    <div>
        <button onClick={handleLogout}>Log Out</button>
    </div>
    
    
    
    </>)

}

export default Dashboard