const express = require('express')
const router = express.Router()
const usersController  = require('../controllers/users.controllers')


router.post('/todo/add', usersController.addTodo)
router.delete('/delete/:todo_id', usersController.DeleteMyTodo)
router.get('/list-all-todos', usersController.listAllTodos)
router.get('/get-one-todo/:todo_id', usersController.listOneTodo)




module.exports = router
