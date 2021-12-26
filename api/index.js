/* Configuracion */
const api = require("../config.js")

/* Servidor */
const express = require("express")
const app = express()

/* Manipulacion de peticiones */
app.use(express.json())             
app.use(express.urlencoded({ extended: false }))

/* Router de los componentes */
const auth = require("./components/auth/network.js")
const user = require("./components/user/network.js")

app.use("/api/auth", auth)
app.use("/api/user", user)

/* Documentacion */
const swaggerUi = require("swagger-ui-express")
const swaggerDoc = require("../swagger.json")
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc))

/* Gestion de errores: Debe ir al final */
const errors = require("../network/errors.js")
app.use(errors)

/* Puerto de atencion */
app.listen(api.port, () => {
    console.log(`API: ${api.host}:${api.port}`)
})
