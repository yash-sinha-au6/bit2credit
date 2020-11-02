const User=require('../models/users')
const NewUser=require('../models/newUser')
const express=require('express')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
module.exports={
registration:async(req,res)=>{
  
    const UseremailExist = await User.findOne({ email: req.body.email });
   
    if (UseremailExist){
        return res.send('Email already exists');
    }

   const salt = await bcrypt.genSalt(10);
   const hasedPassword = await bcrypt.hash(req.body.password, salt)

   const user = new User({
       name:  req.body.name,
       email: req.body.email,
       password: hasedPassword,
       phone_number: req.body.phone_number
   });
  
   try{
       const savedUser = await user.save();
       res.send("successfully Registered!");
   }catch (err) {
       console.log(err)
         res.status(400).send('Invalid Email or Password');
   }
},
login:async(req,res)=>{
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(201).send('Email or password is incorrect!');
    
    
   
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(201).send('Invalid Email or Password')

  
    const token = jwt.sign({id: user._id}, 'voldemort')
    res.header('auth-token', token);
    res.status(200).send(token);

},
todo_new_user:async(req,res)=>{
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(req.body.password, salt)
   
    console.log(req.body)
    const todo = new NewUser({
        name:  req.body.name,
        email: req.body.email,
        password: hasedPassword,
        phone_number: req.body.phone_number,
        created_by: req.body.created_by
    });
    console.log("2nd line",todo)
    try{
        const savedUser = await todo.save();
        res.status(200).send('New User is Created!');
    }catch (err) {
        console.log("todo error",err)
          res.status(400).send(err);
    }
},
todo_view_user:async(req,res)=>{
    var myid = req.params.id;

  NewUser.find({created_by: myid})
  .then(users => {
      res.send(users)
  }).catch(err => {
      res.status(500).send("some error occured")
  })
},
todo_delete_user:async(req,res)=>{
    var myid = req.params.id;
    NewUser.findByIdAndDelete({_id: myid})
    .then(users => {
        res.send('Deleted')
    }).catch(err => {
        res.status(500).send("some error occured")
    }) 
},
todo_edit_user:async(req,res)=>{
    var myid = req.params.id
    var name = req.body.name;
    var email = req.body.email;
    var phone_number = req.body.phone_number;
    NewUser.findByIdAndUpdate({_id: myid},{name:name, email:email, phone_number:phone_number})
    .then(users => {
        res.send('User Data updated!')
    }).catch(err => {
        res.status(500).send("some error occured")
    })
}


}