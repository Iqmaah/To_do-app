const express = require('express')
const router = express.Router()
const usersController  = require('../controllers/users.controllers')
// const {authentication} = require('../middlewares/authentication')


router.get('/list-all-todos', usersController.listAllTodos)
router.get('/get-one-todo/:todo_id', usersController.listOneTodo)



module.exports = router
