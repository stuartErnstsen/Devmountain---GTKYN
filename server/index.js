require('dotenv').config()
const express = require('express')
const app = express()
const authCtrl = require('./controllers/auth/authController')
const { SERVER_PORT } = process.env

app.use(express.json())

app.put('/auth/login', authCtrl.login)


app.listen(SERVER_PORT, () => console.log(`Hippity Hoppity your server is poppening on SERVER_PORT: ${SERVER_PORT}`))