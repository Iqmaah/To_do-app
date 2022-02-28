

const mySqlConnection = require('../config/mysql')


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

module.exports = {
    DeleteTodo,
    getAllTodos,
    getOneTodo
}
