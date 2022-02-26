require('dotenv').config()
const Joi = require('joi')
const usersModel = require('../models/users.models')


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
        if(responseUpdateTodo){
            res.status(200).send({
                status: true,
                message: "Todo updated successfully"
            })
            
        }
    })
    .catch((error)=>{
        res.status(422).send({
            status: false,
            message: error.message
        })
       
    })

    
}



module.exports = {
    UpdateMyTodo
}