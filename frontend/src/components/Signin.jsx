import React from 'react'
import { useState } from 'react';

const Signin = () => {

  const [email,setEmail] = useState('');
      const [password ,setPassword] = useState('');
        const [mobile,setMobile] = useState('');


        
  
  
      async function submitform() {

        const response = await axios.post("http://localhost:3000/api/register",{
             email:email,
             password:password,
             mobile:mobile
        })
  
  
          
      }
    return (
        
      <div className='display:flex '>
  
          <form onSubmit={submitform}>
  
              <div> 
  
                  <label > Email </label> <br/>
  
                  <input onChange={(e)=>setEmail(e.target.value)}  />
                   
              </div>
  
              <br/>

              <div>

                <label > mobile </label> <br/>
  
              <input onChange={(e)=>setMobile(e.target.value)}  />
  

              </div>

                <br/>
  
              <label > Password </label> <br/>
  
              <input onChange={(e)=>setPassword(e.target.value)}  />
  
              <div>
  
                  <br/>
  
              </div>
  
              <button>Submit</button>
  
          </form>
  
  
      </div>
    )
}

export default Signin