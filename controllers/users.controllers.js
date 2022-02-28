require('dotenv').config()
const { v4: uuidv4 } = require('uuid')
const Joi = require('joi')
const usersModel = require('../models/users.models')


const addTodo = (req, res) =>{
    console.log(req.body)
    const { title, contents, todo_date, todo_time } = req.body
    const todo_id = uuidv4()
    const toDoSchema = Joi.object({
        title: Joi.string().required(),
        contents:Joi.string().required(),
        todo_date:Joi.string().required(),
        todo_time:Joi.string().required()
    })

    const validateToDo = toDoSchema.validate(req.body)
    console.log(validateToDo)
    if(validateToDo.error) {
        // res.status(400).send({
        //     status: false,
        //     message: 'something went wrong'
        throw new Error(`Bad request`)
        
    }
    else {

        usersModel.createToDo(todo_id, title, contents, todo_date, todo_time)
        .then(responseFromModel => {
            console.log(responseFromModel)
            if(!responseFromModel) {
                throw new Error(`Something went wrong. Pls try again`)
            }
            res.status(200).send({
                status: true,
                message: `toDo successfully addedd`
            })            
        })
        .catch(err => {
            console.log(err.message)
            res.status(400).send({
                status: false,
                message: err

            })
        })
    }

}




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
   
    addTodo,
    DeleteMyTodo,
    listAllTodos,
    listOneTodo
}