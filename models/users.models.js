

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

module.exports = {
   
    createToDo,
    DeleteTodo,
    getAllTodos,
    getOneTodo
}
