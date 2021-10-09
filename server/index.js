const express = require('express')
const app = express()
const authCtrl = require('./controllers/auth/authController')
const PORT = 5555

app.use(express.json())

app.put('/auth/login', authCtrl.login)


app.listen(PORT, () => console.log(`Hippity Hoppity your server is poppening on port: ${PORT}`))