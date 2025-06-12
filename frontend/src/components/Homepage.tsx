import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface Todo{
    title:String,
    description:String,
    status:Boolean,
}

const Homepage = () => {

    const [todos,setTodos] = useState<Todo[]>([]);

   

    async function  getTodos() {

        const token = localStorage.getItem('token');

        const response = await axios.get("http://localhost:3000/api/todos/get_todos",{
            headers:{
                Authorization: `Bearer ${token}`,
            }
             
        });

        if(response){
            setTodos(response.data);
        }
        
    }

    async function statuscomplete(index:number) {

        const response = await axios.put(`http://localhost:3000/api/todos/update_status?{index}`)
        getTodos()
        
    }

    async function deleteTodo(index:number) {

        const response = await axios.put(`http://localhost:3000/api/todos/delete_todo?{index}`)
        getTodos();
        
    }


     useEffect(()=>{
          
        getTodos();  
    },[])
  return (
    <div>


        {todos.map((todo, index) => (
           <div key={index}>
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>

        <p>{!todo.status && <button onClick={() => statuscomplete(index)} >  Mark as Complete </button>}</p>

        <p>{!todo.status && <button onClick={() => deleteTodo(index)} > Delete</button>}</p>
    </div>
))}


    </div>
  )
}

export default Homepage