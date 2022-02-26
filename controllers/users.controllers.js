require('dotenv').config()

const usersModel = require('../models/users.models')


const searchTodoApp = (req, res) => {
const { todo_date } = req.params


//console.log('am here', date)
usersModel.searchTodobyDate(todo_date)

.then((searchTodo) =>{
    console.log('......... ',searchTodo)
    if(searchTodo.length ==  0){
        throw new Error('there is no schedule for today')
    }
    

res.status(200).send({
    status: true,
    message: 'schedule was successfully fetched',
    data: searchTodo
})

})

.catch((err) =>{
    res.status(400).send({
        status: false,
        message: err.message
    })
})

}


module.exports = {
    searchTodoApp
}