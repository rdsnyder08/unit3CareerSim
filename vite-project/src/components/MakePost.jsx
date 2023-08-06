import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import {Link} from 'react-router-dom'

const COHORT_NAME = '2306-FTB-WEB-FT'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

export default function MakePost({token}) {
    console.log(token)
    const [form, setForm] = useState({
        title:'',
        description:'',
        price:'',
        location:'',
        willDeliver: false
    })
    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        if (name==='location'){
            setForm((prev) => {
                const updatedData = {...prev, [name]: value}
                return updatedData
            })

        } else {
            setForm((prev => {
                const updatedData = { ...prev, [name]: value };
                return updatedData;

            }))
        }

        
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const make = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...form, 
                    location: form.location , 
                }),
              }
              console.log({token})
        
              const response = await fetch(`${BASE_URL}/posts`, make)
              const data = await response.json()
        
              console.log(make)
              console.log('Post created:')
              console.log(data)



        } catch(error) {
            console.log(error)
        }
    }
    return (
        <>
            <h1>Create a Post</h1>
            <form onSubmit={handleSubmit}>
                
                <label htmlFor="title">Title your post:
                    <input id="title" name="title" value={form.title} onChange={handleChange} />
                </label>
                <br></br>
                <br></br>
                <label htmlFor="description">Add a brief description:
                    <input id="description" name="description" value={form.description} onChange={handleChange} />
                </label>
                <br></br>
                <br></br>
                <label htmlFor="price">Asking Price:
                    <input id="price" name="price" value={form.price} onChange={handleChange} />
                </label>
                <br></br>
                <br></br>
                <label htmlFor="location">Location:
                    <input id="location" name="location" defaultValue='optional' onChange={handleChange} />
                </label>
                <br></br>
                <br></br>
                <label>Will you deliver?
                    
                    <input type="radio" name="willDeliver" value='true' onChange={handleChange} /> Yes
                    <input type="radio" name="willDeliver" value="false" onChange={handleChange} /> No
                </label>
                <br></br>
                <br></br>
                <button type='submit'>Make Post</button>
            </form>
            <Link to='/dashboard' > Take me back to my dashboard</Link>
            
        </>
    )
}