const connect = require('./connect');
const express = require('express')
const cors = require('cors')
const scores = require('./scoreRoutes')
const user = require('./userRoutes')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use('/scores', scores)
app.use(user)

app.listen(PORT, ()=>{
    connect.connectToServer()
    console.log(`Server running on ${PORT}`)
})