const post=require('../controller/post')
const router=require('express').Router()


router.post('/register',post.registration)
router.post('/api/v1/session',post.login)
router.post('/api/v1/users',post.todo_new_user)
router.get('/api/v1/users/:id',post.todo_view_user)
router.delete('/api/v1/users/:id',post.todo_delete_user)
router.put('/api/v1/users/:id',post.todo_edit_user)

module.exports=router

