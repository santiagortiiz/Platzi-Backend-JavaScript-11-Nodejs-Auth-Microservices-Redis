const response = require("./response")

function errors(err, req, res, next){
    response.error(req, res, err.statusCode, err.message)
}

module.exports = errors

/*
 Este es un middleware que se va a encargar de capturar todos los errores que hayamos generados en el api.

Al ser un middleware lo trabaja separado de lo que es la lógica del response, cada vez que se genera el error con throw error() debemos llamar a next() dentro del catch de la promesa para que el middleware maneje ese error
*/