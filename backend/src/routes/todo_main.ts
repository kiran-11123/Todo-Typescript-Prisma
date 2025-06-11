import prisma from "../prisma/prisma";
import express, { Request, Response } from "express";
import { authenticateToken } from "../middlewares/token_middleware";
const todo_router = express.Router();


todo_router.get("/get_todos" , authenticateToken ,  async( req:Request , res:Response) =>{
     

    try{
         
        
        if(req.user && typeof req.user==="object" && "id" in req.user){

            const cur_user_id = (req.user as {id:number}).id

            const data = await prisma.todo.findMany({
                where:{
                    user_id:cur_user_id
                }
            })

            res.status(200).json(data);
             
        }
        else{
            res.status(200).json({
                message:"Token Expired"
            })
        }



    }
    catch(er){
         res.status(400).json({
            message:"Server Error"
         })
    }
})


todo_router.put("/update_status/:id"  ,  async( req:Request , res:Response)=>{
        
       try{

          const cur_todo_id = req.params ; 

            

            const data = prisma.todo.update({
                where:{
                    id:Number(cur_todo_id)
                },data:{
                    status:false
                }
            })
        

       }
       catch(er){
        res.status(400).json("Server Error")
       }
})

todo_router.delete("/delete_todo/:id" , async(req:Request ,res:Response) =>{

     try{

          const cur_todo_id = req.params ; 

            

            const data = prisma.todo.delete({
                where:{
                    id:Number(cur_todo_id)
                }
            })
        

       }
       catch(er){
        res.status(400).json("Server Error")
       }
        
     
})


























export default todo_router ; 
