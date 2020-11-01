const express=require('express')
const cors=require('cors')
const app=express()
require('./models/db')
const get=require('./routes/get')
const post =require('./routes/post')
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(get)
app.use(post)
app.listen(7000,(err)=>{
    if(err){
        return res.json(err).status(400)
    }
   console.log("server running") 
})