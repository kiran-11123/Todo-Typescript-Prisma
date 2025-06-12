import React, { use, useState } from 'react'

const UploadTodos = () => {

    const[title , setTitle] = useState('');
    const[description , setDescription] = useState('');


   


    async function submitform() {

        const token = localStorage.getItem('token');

        const response = await axios.post("http://localhost:3000/api/todos/upload_todo" , {
             
            title:title,
            description:description
        } , {
             headers:{
                Authorization: `Bearer ${token}`,
            }
        })

        
        
    }
  return (
    <div>

        <form onSubmit={submitform}>

            <div> 

                <label htmlFor="title">title</label>
        <input type="title" id="title" name="title"  onChange={(e)=>setTitle(e.target.value)}/>
                 
            </div>

            <br/>

          


            <label htmlFor='description' > description </label> <br/>

            <input    type='description'  id='description'name='description' onChange={(e)=>setDescription(e.target.value)}  />

            <div>

                <br/>

            </div>

            <button>Submit</button>

        </form>

    </div>
  )
}

export default UploadTodos