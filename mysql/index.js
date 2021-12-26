const router = require("./network.js")
const api = require("../config.js")

/* Manipulacion de peticiones */
const express = require("express")
const app = express()
app.use(express.json())             
app.use(express.urlencoded({ extended: false }))

app.use('/', router)

app.listen(api.mysqlService.port, () => {
    console.log(`MYSQL: hppt://localhost:${api.mysqlService.port}`)
})