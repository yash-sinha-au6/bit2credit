var get=require('../controller/get')
const router=require('express').Router()

router.get('/dashboard',get.dashboard)



module.exports=router