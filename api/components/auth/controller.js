const error = require("../../../utils/error.js")
const bcrypt = require("bcrypt")
const defaultStore = require("../../../store/dummy.js")
const auth = require("../../../auth/index.js")
const TABLE = "auth"

module.exports = function(injectedStore = defaultStore){
    let store = injectedStore

    async function login(req){
        const username = req.body.username
        const password = req.body.password
        const userAuthInfo = await store.login(TABLE, username)
        const originalEncryptedKey = userAuthInfo.password
        
        return (
            bcrypt.compare(password, originalEncryptedKey)
                .then((isAuthentic) => {
                    if (isAuthentic == true){
                        const token = auth.sign({...userAuthInfo}) 
                        return token
                    } else {
                        throw error("Incorrect user or password", 404)
                    }
            })
        )
    }

    async function addUser(username, password){
        const authData = {
            username: username,
            password: await bcrypt.hash(password, 5)
        }
        
        return store.addUser(TABLE, authData)
    }

    return {
        addUser, 
        login
    }
}