
import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./lib/db.js"
import gatewayRoutes from "./routes/gateway.routes.js";



dotenv.config()



const app = express();
const PORT = process.env.PORT 

app.use('/', gatewayRoutes);

connectDB();
app.listen(PORT , ()=>{
    console.log(`server is ranning in PORT ${PORT}`)
})


