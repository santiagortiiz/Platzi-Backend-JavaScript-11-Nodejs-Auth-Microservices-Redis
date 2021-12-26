// const { nanoid } = require("nanoid")
const defaultStore = require("../../../store/dummy.js")
const defaultCache = require("../../../store/dummy.js")
const auth = require("../auth")
const TABLE = "user"

module.exports = function(injectedStore = defaultStore, injectedCache = defaultCache){
    let store = injectedStore // store/mysql.js
    let cache = injectedCache // store/redis.js

    /* Allow cache storage */
    async function getTable(table){
        let data
        data = await cache.getTable(table)

        if (!data){
            console.log("No encontrado en cache, buscando en BD")
            data = await store.getTable(table)
            cache.upsert(table, data)
        } else {
            console.log("Encontrado en cache")
        }

        return store.getTable(table)
    }
    
    function getUsers(){
        return store.getUsers(TABLE)
    }

    function getUserById(id){
        return store.getUserById(TABLE, id)
    }

    async function addUser(data){
        let userInfo = {
            // id: data.id || nanoid(),
            username: data.username || null,
            name: data.name || null,
            // password: data.password || null,
        }

        if (data.password && data.username){
            await auth.addUser(data.username, data.password)    // Private Data
            return store.addUser(TABLE, userInfo)               // Public Data
        }
    }

    async function updateUser(data){
        return store.updateUser(TABLE, data)  
    }

    function follow(from, to){
        let table = `${TABLE}_follow`
        let data = {
            user_from: from,
            user_to: to
        }
        return store.follow(table, data)
    }

    async function following(userId){
        return await store.following(userId)
    }
    
    return {
        getTable,
        getUsers,
        getUserById,
        addUser,
        updateUser,
        follow,
        following,
    }
}