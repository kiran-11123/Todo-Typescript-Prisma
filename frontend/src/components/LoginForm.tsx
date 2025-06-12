import React, { useState } from 'react'
import axios from 'axios'

const LoginForm = () => {

    const [email,setEmail] = useState('');
    const [password ,setPassword] = useState('');
  
    
    interface login_details{
           email:String
        password:String
    }

    async function submitform() {

        const response = await axios.post("http://localhost:3000/api/login" ,{

            email,
            password
             
        })

        if(response){
            const token = response.data.token;
            localStorage.setItem('token' , token);
        }

        

       


        
    }
  return (
      
    <div className='display:flex '>

        <form onSubmit={submitform}>

            <div> 

                <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" onChange={(e)=>setEmail(e.target.value)} />
                 
            </div>

            <br/>

          


            <label htmlFor='password' > Password </label> <br/>

            <input    type='password'  id='password'name='password' onChange={(e)=>setPassword(e.target.value)}  />

            <div>

                <br/>

            </div>

            <button>Submit</button>

        </form>


    </div>
  )
}

export default LoginForm