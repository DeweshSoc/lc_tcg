//internal node packages
const path = require("path");

//external node packages
require("dotenv").config();
const express = require("express");

//module imports
const util = require("./util/utility");

//app settings
const app = express();



//routers
// const authRoutes = require("./routes/auth");

//models


//configuration middlewares
app.use(express.json());

// cors error handling middleware
app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
  next();
})


// route middlewares
// app.use('/auth',authRoutes);



let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

app.listen(port,()=>{
  console.log(`Server up at ${port}`);
})
