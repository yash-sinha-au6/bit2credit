const mongoose=require('mongoose')

mongoose.connect("mongodb+srv://yash:biz2credit@biz2credit.11opt.mongodb.net/biz2credit",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
.then(()=>{
    console.log("Db connected sucessfully")
})
.catch((err)=>{
    console.log("error message",err)
})