import prisma from "../prisma/prisma";
import express, { Request, Response } from "express";
const router  = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
import todo_router from "./todo_main";

router.use("/todos", todo_router);


router.post("/register" , async (req:Request , res:Response)=>{


    try{

        const {email , mobile,password} = req.body;
        
        const check =await  prisma.user.findUnique({
            where:{
                email:email
            }
        })

        if(mobile.length!=10){
            res.json({
                message:"Please Enter 10 digit mobile number"
            })
        }

        if(check){
              res.status(200).json({
                message:"User already Registered Please Login"
            })
        }

        const hashedpassword =await  bcrypt.hash(password,10);

        const data = await prisma.user.create({
            data:{
                email,
                mobile,
                password:hashedpassword
            }
        })

        if(data){
             res.status(200).json({
                message:"User Registered successfully"
            })
        }

        else{
            res.json({
                message:"Server Error"
            })
        }


    }
    catch(er){
        res.status(400).json(er);
    }
     
   

})

router.post("/login" , async (req:Request , res:Response)=>{
      
    try{

        const {email , password} = req.body;

        const email_check =await  prisma.user.findUnique({
            where:{
                email:email
            }
        })

        if(!email){
             res.status(400).json({
                message:"You dont have account please create "
             })
        }

        
        const get_password = await prisma.user.findUnique({
            where:{
                email:email
            },
            select:{
                password:true
            }
        })

        const comparing_password = await bcrypt.compare(password,get_password);

        if(!comparing_password){
            res.json({
                message:"Password is Wrong "
            })
        }

      
        if(email_check !==null){

        const auth_token_credentials = {email:email_check.email , id:email_check.id , mobile : email_check.mobile}

        const token = jwt.sign(auth_token_credentials,"kiran" , {
            expiresIn:"1h"
        });

        res.status(200).json({message:"Login Successful" , token : token});


        
    }
    else{
        res.status(400).json({
            message:"Something went wrong...."
        })
    }

    


    }
    catch(er){
        res.status(400).json({
            message:"Server Error"
        })
    }
})














export default router;