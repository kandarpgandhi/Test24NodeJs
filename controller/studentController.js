const connection = require('../utils/db-connection')
const db = require('../utils/db-connection')

const getAllStudents = (req, res) => {
    const getAllStudentQuery = `select * from StudentOfBVM`
    db.execute(getAllStudentQuery, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send(err.message)
            connection.end()
            return
        }
        res.status(200).json(result)
    })
}

const getStudentById = (req, res) => {
    const stdId = req.params.id
    const getStudentByIdQuery = `select * from StudentOfBVM where id=?`

    connection.execute(getStudentByIdQuery, [stdId], (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send(err.message)
            return
        }
        if (result.length === 0) {
            res.status(404).send(err.message)
            return
        }
        res.status(200).json(result)
    })
}

const addStudent = (req, res) => {
    const { name, email, age } = req.body
    const insertStd = `insert into StudentOfBVM(name,email,age) values(?,?,?)`
    db.execute(insertStd, [name, email, age], (err) => {
        if (err) {
            console.log(err)
            res.status(500).send(err.message)
            connection.end()
            return
        }
        console.log('Student has beem inserted')
        res.status(200).send(`Student with name ${name} added`)
    })
}

const updateStudent = (req, res) => {
    const id = req.params.id
    const { name, email, age } = req.body
    const updateQuery = `update StudentOfBVM set name=?,email=?,age=? where id=?`

    connection.execute(updateQuery, [name, email, age, id], (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send(err.message)
            return
        }
        if (result.affectedRows === 0) {
            res.status(404).send(`No student found with id ${id}`)
            return
        }
        console.log('Student updated')
        res.status(200).send(`Student with id ${id} updated`)
    })
}

const deleteStudent = (req, res) => {
    const id = req.params.id
    const deleteQuery = `delete from StudentOfBVM where id=?`
    connection.execute(deleteQuery, [id], (err, result) => {
        if (err) {
            console.error('Error deleting student:', err);
            res.status(500).send(err.message);
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).send(`No student found with ID ${id}`);
            return;
        }

        console.log(`Student with ID ${id} has been deleted`);
        res.status(200).send(`Student with ID ${id} deleted successfully`);
    });
}

module.exports = {
    getAllStudents, getStudentById, addStudent, updateStudent, deleteStudent
}