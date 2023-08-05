import {useState,useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'

const COHORT_NAME = '2306-FTB-WEB-FT'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`



export default function PostViewAuth ({token}) {
    
        const [posts, setPosts] = useState([])
        const [userPosts, setUserPosts] = useState([])
    
        useEffect(()=> {
            async function fetchData() {
                try{
                    const response = await fetch(`${BASE_URL}/posts`)
                    const data = await response.json()
    
                    setPosts(data.data.posts)
                } catch(err) {
                    console.log('error occured fetching posts')
                }
            }
    
            fetchData()
        }, [])
    
        console.log(posts)

        const handleDeletePost = async (postId) => {
            try {
                const response = await fetch(`${BASE_URL}/posts/${postId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'applications.json',
                        Authorization: `Bearer ${token}`,
                    },
                })
                const result = await response.json()

                if(result.success) {
                    setPosts((prev)=> prev.filter((post)=> post._id !== postId))
                }
            } catch (error) {
                console.log(error)
            }
        }


    
        return( 
        <>
            {posts.map((p,index) =>
            <div key={index}
            className='posts'
            >
                <h1>{p.title}</h1>
                <h3>{p.author.username}</h3>
                <p>{p.description}</p>
                <h3>{p.price}</h3>
                <h3>Will deliver? {p.willDeliver.toString()}</h3>
                {p.isAuthor ? (
                    <>
                    <button onClick={()=> handleDeletePost(p._id)}> Delete </button>
                    
                    </>
                ) : (<button disabled> Delete</button>)
                }
    
            </div>
            )}
        </>
        )
    
    
}