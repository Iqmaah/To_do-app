require('dotenv').config()
const { v4: uuidv4 } = require('uuid')
const util = require('util')
const {fetchTodo} = require('../models/users.models')
const {sendSMS} = require('../services/sms.service')
const { isEmpty, doSomeAsyncMagik } = require('../utils/utils')
const Joi = require('joi')
const usersModel = require('../models/users.models')


const DeleteMyTodo = (req, res) => {
    const { todo_id } = req.params
    usersModel.DeleteTodo(todo_id)
        .then(response => {
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

}
    
const addTodo = (req, res) =>{
    
    const { title, contents, todo_date, todo_time } = req.body
    const todo_id = uuidv4()
    const toDoSchema = Joi.object({
        title: Joi.string().required(),
        contents:Joi.string().required(),
        todo_date:Joi.string().required(),
        todo_time:Joi.string().required()
    })

    const validateToDo = toDoSchema.validate(req.body)
   
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

const shareToDO = async (req, res) =>{
   const { phoneNumber, todoID } = req.body
   try {
   const [err, checkIfFetchedTodo] = await doSomeAsyncMagik(fetchTodo(todoID))
   if (err){
       throw new Error ("Internal Error")
   }
   if(isEmpty(checkIfFetchedTodo)){
       throw new Error ("Todo Event not found")
   }

   const todoToShare = checkIfFetchedTodo[0]

   const message = `You have been invited into this event ${todoToShare.title}, ${todoToShare.contents} ${todoToShare.todo_date}, ${todoToShare.todo_time}`

   await sendSMS(phoneNumber, message)
        res.status(200).send({
            status: true,
            message: "Todo Event successfully shared"
        })
    }

    catch(e){
        res.status(200).send({
            status: false,
            message: "Todo Event not shared, please try again"
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

    usersModel.getOneTodo(todo_id)
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


const UpdateMyTodo = async(req, res) => {
   const {todo_id} = req.params

    const {title, contents, todo_date, todo_time} = req.body

    const updateSchema = Joi.object({
        title: Joi.string(),
        contents: Joi.string(),
        todo_date: Joi.string(),
        todo_time: Joi.string()
    })

    const responseUpdateSchema = updateSchema.validate(req.body)
    if(responseUpdateSchema.error){
        res.status(422).send({
            status: false,
            message: responseUpdateSchema.error.details[0].message        
        })
    }
    usersModel.UpdateTodo(title, contents, todo_date, todo_time, todo_id)
    .then((responseUpdateTodo)=>{
        if(responseUpdateTodo.length == 0 ){
            throw new Error("Invalid details")
        }
        res.status(200).send({
            status: true,
            message: "Todo updated successfully"
        })
        
    })
    .catch((error)=>{
        res.status(422).send({
            status: false,
            message: error.message
        })
       
    })

    
}


const searchTodoApp = (req, res) => {
const { todo_date } = req.params

usersModel.searchTodobyDate(todo_date)
.then(searchTodo => {
   
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
    shareToDO,
    addTodo,
    DeleteMyTodo,
    listAllTodos,
    listOneTodo,
    UpdateMyTodo,
    searchTodoApp
}