

const mysqlConnection = require('../config/mysql')


const searchTodobyDate =  async ( todo_date) => {
   
    return new Promise((resolve, reject) => {

        mysqlConnection.query({
            sql: `select * from todos where todo_date='2022-02-26'`,
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



module.exports =  {
    searchTodobyDate

}

