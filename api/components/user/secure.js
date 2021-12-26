const user = require(".")
const auth = require("../../../auth")

module.exports = function checkAuth(action){
    async function middleware(req, res, next){
        let token
        let username
        let userAuthInfo
        switch(action){
            case "update":
                token = req.headers.authorization.split(' ')[1]
                username = req.body.username
                auth.check.own(token, username)
                next()
                break

            case "follow":
                token = req.headers.authorization.split(' ')[1]
                userAuthInfo = await auth.check.logged(token)
                req.user = userAuthInfo
                next()
                break

            default:
                next()
        }
    }

    return middleware
}