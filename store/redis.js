const config = require("../config.js")
const redis = require("redis")
const client = redis.createClient({
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password,
})

/*
Para leer datos clave:valor
debe convertirse el valor leido 
en string, a un objeto
*/
function getTable(table){
    return new Promise ((resolve, reject) => {
        client.get(table, (err, data) => {
            if (err) {
                console.log(`[Error en redis.js]`)
                reject(err)
            } else {
                let result = data || null
                if (result !== null) {
                    result = JSON.parse(data)
                }
                resolve(result)
            }
        })
    })
}

function getById(table, id){
    
}

/*
Para almacenar datos clave:valor
debe convertirse el valor a un string
*/
async function upsert(table, data){
    /* Data Must be key:value only*/
    let key = table
    if (data && data.id){
        key = `key_${data.id}`
        console.log(JSON.stringify(data))
    }

    /* Set expiration (key, expirationTime, data)*/ 
    try {
        client.setex(key, 5, JSON.stringify(data))
        return "Done"
    } catch (err) {
        return err.message
    }
}

module.exports = {
    getTable,
    getById,
    upsert,
}
