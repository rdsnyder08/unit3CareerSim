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

        const handleMessageSubmit = async (postId, content) => {
            try {
                console.log('made it into handlemessagesubmit, posid:', postId)
                const response = await fetch(`${BASE_URL}/posts/${postId}/messages`, {
                    method: 'POST',
                    headers : {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    message: {
                        content: content,
                        },
                    }),

                })
                const result=await response.json()

                if (result.success) {
                    console.log('message sent:', result.data.message)
                    setPosts((prev =>
                        prev.map((post)=>
                            post._id === postId
                                ? {
                                    ...post,
                                    messages: [...post.messages,result.data.message],
                                }
                                : post
                        )))
                    console.log('Message sent!')
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

                {token && p.author._id !== token && (
                    <form onSubmit={(e) =>{e.preventDefault()
                        const content = e.target.messageContent.value
                        handleMessageSubmit(p._id,content)
                        e.target.messageContent.value = ''
                    }}
                >
                    <input type='text' name='messageContent' placeholder='Message goes here' />
                    <button type='submit'>Send</button>
                </form>
                
                )}
                <h3>Message Thread</h3>
                {p.messages.map((message, messageIndex) => (
                    <div key={messageIndex} className='message'>
                        <p>{message.content}</p>
                    </div>
                ))}
                
                


                
                
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