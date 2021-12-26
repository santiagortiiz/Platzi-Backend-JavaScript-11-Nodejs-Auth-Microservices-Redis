/* Configuracion */
const config = require("../config.js")

/* Servidor */
const express = require("express")
const app = express()

/* Manipulacion de peticiones */
app.use(express.json())             
app.use(express.urlencoded({ extended: false }))

/* Router de los componentes */
const post = require("./components/post/network.js")
app.use("/api/post", post)

/* Gestion de errores: Debe ir al final */
const errors = require("../network/errors.js")
app.use(errors)

/* Puerto de atencion */
app.listen(config.post.port, () => {
    console.log(`POST: ${config.post.host}:${config.post.port}`)
})
