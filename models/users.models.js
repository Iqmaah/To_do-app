

const mySqlConnection = require('../config/mysql')

const createToDo = (todo_id, title, contents, todo_date, todo_time) => {
    return new Promise((resolve, reject)=> {
        mysqlConnection.query({
            sql: `insert into todos(todo_id, title, contents, todo_date, todo_time) values(?,?,?,?,?)`,
            values: [todo_id,title, contents, todo_date, todo_time]
        },
        (err, results, fields)=> {
            if(err) {
                reject(err)
            }
            resolve (results)
        })


    })
}


const DeleteTodo = async (todo_id) => {
  
    return new Promise((resolve, reject) => {
      
      mysqlConnection.query({
            sql:`delete from todos where todo_id=?`,
            values:[todo_id]
        },
          (err, results, fields) => {
                if (err) {
                 reject(err)
                }
                resolve(results)
          })
    })
}

const getAllTodos =  async () => {
   
    return new Promise((resolve, reject) => {
      
      mysqlConnection.query({
            sql: `select * from todos`,
            values: []
        },
          (err, results, fields) => {
                if (err) {
                 reject(err)
                }
                resolve(results)
          })
    })
}


const getOneTodo =  async (todo_id) => {
  
    return new Promise((resolve, reject) => {

        mysqlConnection.query({
            sql: `select * from todos where todo_id=?`,
            values: [todo_id]
        },
          (err, results, fields) => {
                if (err) {
                 reject(err)

                }
                resolve(results)
                }
        )
    })
 }
    

const fetchTodo = async (todoID) =>{

    return new Promise((resolve, reject) => {

        mysqlConnection.query({
            sql: `select * from todos where todo_id=?`,
            values: [todoID],
            sql: `select * from todos where todo_date=?`,
            values: [todo_date]

        },
          (err, results, fields) => {
                if (err) {
                 reject(err)
                }
                console.log(results)
                resolve(results)
          })
    })
}

const UpdateTodo = async(title, contents, todo_date, todo_time, todo_id)=> {
    return new Promise((resolve, reject)=>{
        mysqlConnection.query({
            sql: "Update todos set title=?, contents=?, todo_date=?, todo_time=?where todo_id=todo_id",
            values: [title, contents, todo_date, todo_time, todo_id]
        }, (error, results, fields) =>{
           if(error){reject(error)}
           resolve(results)
        })
    })
}

const searchTodobyDate = async (todo_date) =>{

    return new Promise((resolve, reject) => {

        mysqlConnection.query({
            sql: `select * from todos where todo_date=?`,
            values: [todo_date]

        },
          (err, results, fields) => {
                if (err) {
                 reject(err)
                }
                console.log(results)
                resolve(results)
          })
    })
} 


module.exports = {
   
    createToDo,
    DeleteTodo,
    fetchTodo,
    getAllTodos,
    getOneTodo,
    UpdateTodo,
    searchTodobyDate
    
}

