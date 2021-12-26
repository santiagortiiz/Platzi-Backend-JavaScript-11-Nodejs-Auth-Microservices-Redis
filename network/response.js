const statusMessage = {
    "200": "OK",
    "201": "Creado",
    "301": "Movido permanentemente",
    "304": "No modificado",
    "400": "Error en la consulta",
    "401": "Sin autorizacion",
    "403": "Prohibido",
    "404": "No encontrado",
    "500": "Error del servidor"
}

function success(req, res, statusCode=200, result=null) {
    res.status(statusCode).send({
        status: statusMessage[statusCode],
        body: result
    })
}

function error(req, res, statusCode=500, details=null) {
    if (details !== null){
        console.error(`Error Details: ${details}`)
    }

    res.status(statusCode).send({
        status: statusMessage[statusCode],
        error: details
    })
}

module.exports = {
    success,
    error
}