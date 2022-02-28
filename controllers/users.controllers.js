require('dotenv').config()
const { v4: uuidv4 } = require('uuid')
const usersModel = require('../models/users.models')
const Joi = require('joi')
const util = require('util')
const usersModel = require('../models/users.models')



const DeleteMyTodo =  (req, res) => {
    const { todo_id } = req.params
    usersModel.DeleteTodo(todo_id)
    .then(response => {
        console.log("i got here :",response)
        if (response.affectedRows == 0)
        throw new Error("Invalid Id")

        res.status(200).send({
            status: true,
            message: "Todo deleted succesfully",
            data: []
        })
    })
    .catch(err => {
        res.status(422).send({
            status: false,
            message: err.message
        })
})


const listAllTodos = ((req,res) => {

    usersModel.getAllTodos()
    .then(response => {
        res.status(200).send({
            status: true,
            message: "success",
            data: response
        })
    })

    .catch(err => {
        console.log(`error happened: `, err)
        res.status(422).send({
            status: false,
            message: err
        })
    })

})


const listOneTodo = ((req,res) => {

    const {todo_id} = req.params

    const todoSchema = Joi.object({
        todo_id: Joi.string().required()
    })

    const validateToDo = todoSchema.validate(req.params)
    if(validateToDo.error){
        res.status(422).send({
            status: false,
            message: "Bad Request",
            data: []
        })
    }

    usersModel.getOneTodo()
    .then(result => {
        res.status(200).send({
            status: true,
            message: "success",
            data: result
        })
    })

    .catch(err => {
        res.status(422).send({
            status: false,
            message: err
        })
    })

})

}



module.exports = {
    DeleteMyTodo,
    listAllTodos,
    listOneTodo
}