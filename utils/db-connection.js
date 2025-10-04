const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Abc@123',
    database: 'testDb'
})

connection.connect((err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log('Connection has been created')
    const creationStudentQuery = `CREATE TABLE IF NOT EXISTS StudentOfBVM(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20),
    email VARCHAR(20),
    age INT
    )`

    connection.execute(creationStudentQuery, (err) => {
        if (err) {
            console.log(err)
            connection.end()
            return
        }
        console.log('Student table is created')
    })
})

module.exports = connection