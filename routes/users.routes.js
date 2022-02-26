const express = require('express')
const router = express.Router()
const usersController  = require('../controllers/users.controllers')




router.get('/search/todo/:todo_date', usersController.searchTodoApp)



module.exports = router
