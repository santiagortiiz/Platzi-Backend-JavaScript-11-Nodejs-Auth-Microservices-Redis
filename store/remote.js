const request = require("request")

function createRemoteDB(host, port){
    const URL = `http://${host}:${port}`

    function getTable(table){
        return req("GET", table)
    }

    function req(method, table){
        let url = `${URL}/${table}`
        let body = "" 

        return new Promise((resolve, reject) => {
            request({
                method,
                header: {
                    "content-type": "application/json"
                },
                url,
                body,
            }, (err, req, body) => {
                if (err){
                    console.error("Error en la base de datos remota", err)
                    return reject(err.message)
                }
                const response = JSON.parse(body)
                return resolve(response.body)
            })
        })
    }

    return {
        getTable,
    }
}

module.exports = createRemoteDB
