const error = require("../utils/error.js")
const jwt = require("jsonwebtoken")
const api = require("../config.js")
const secret = api.secret

function sign(data){
    const token = jwt.sign(data, secret)
    return token
}

const check = {
    own: function(token, username){   
        jwt.verify(token, secret, (err, userAuthInfo) => {
            if (err) {
                console.log(err.message)
                throw error("Error de verificacion de token (Token invalido)", 400)
            }
            if (userAuthInfo.username !== undefined && userAuthInfo.username !== username){
                throw error("No tienes autorizacion", 400)
            } 
            return userAuthInfo
        })
    },
    logged: function(token){
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (err, userAuthInfo) => {
                if (err) {
                    reject(err)
                    // console.log(err.message)
                    // throw error("Error de verificacion de token (Token invalido)")
                }
                resolve(userAuthInfo)
            })
        })
    },  
}

module.exports = {
    sign,
    check,
}