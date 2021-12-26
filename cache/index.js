const router = require("./network.js")
const config = require("../config.js")

/* Manipulacion de peticiones */
const express = require("express")
const app = express()
app.use(express.json())             
app.use(express.urlencoded({ extended: false }))

app.use('/', router)

app.listen(config.cacheService.port, () => {
    console.log(`CACHE REDIS: hppt://localhost:${config.cacheService.port}`)
})