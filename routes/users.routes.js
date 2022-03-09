const express = require('express')
const router = express.Router()
const { shareToDO }  = require('../controllers/users.controllers')
const usersController  = require('../controllers/users.controllers')

router.post('/share-todo', shareToDO )
router.post('/todo/add', usersController.addTodo)
router.delete('/delete/:todo_id', usersController.DeleteMyTodo)
router.get('/list-all-todos', usersController.listAllTodos)
router.get('/get-one-todo/:todo_id', usersController.listOneTodo)
router.put("/update-todo/:id", usersController.UpdateMyTodo)



router.get('/search/todo/:todo_date', usersController.searchTodoApp)



module.exports = router
