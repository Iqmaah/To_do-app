

const mySqlConnection = require('../config/mysql')



// const getUserDetailsByEmail =  async ( email) => {
   
//     return new Promise((resolve, reject) => {

//         mysqlConnection.query({
//             sql: `select * from customers where email=?`,
//             values: [email]
//         },
//           (err, results, fields) => {
//                 if (err) {
//                  reject(err)
//                 }
//                 resolve(results)
//           })
//     })
// }

const DeleteTodo = async (todo_id) => {
    return new Promise ((resolve, reject) =>{
        mySqlConnection.query({
            sql:`delete from todos where todo_id=?`,
            values:[todo_id]
            },
            (err, results, fields) => {
                if (err){
                    reject(err)
                }
                resolve(results)
                }
        )
    })
}

module.exports = {
    DeleteTodo
}
