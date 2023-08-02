import {useState,useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'

const COHORT_NAME = '2306-FTB-WEB-FT'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`



export default function PostViewUnauth () {
    const [posts, setPosts] = useState([])

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

        </div>
        )}
    </>
    )

}