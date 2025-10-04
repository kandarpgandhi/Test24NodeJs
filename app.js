const express = require('express')
const app = express()
const db = require('./utils/db-connection')
const studentRoutes = require('./routes/studentRoutes')

app.use(express.json())

app.use('/student', studentRoutes)
app.listen(3000, (err) => {
    console.log('Server is running')
})