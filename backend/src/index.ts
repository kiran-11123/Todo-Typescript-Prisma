import express from "express";
import normalroutes from "./routes/todo_routes"; 
import cors from 'cors'

const app = express();
app.use(express.json()); 
app.use(cors());

app.use("/api", normalroutes); 
console.log(typeof normalroutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
