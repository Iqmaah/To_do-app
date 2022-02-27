

const mysqlConnection = require('../config/mysql')



const getUserDetailsByEmail =  async ( email) => {
   
    return new Promise((resolve, reject) => {

        mysqlConnection.query({
            sql: `select * from customers where email=?`,
            values: [email]
        },
          (err, results, fields) => {
                if (err) {
                 reject(err)
                }
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


// commment on this line

module.exports = {
    getUserDetailsByEmail,
    UpdateTodo
}
