// const { nanoid } = require("nanoid")
const defaultStore = require("../../../store/dummy.js")
const TABLE = "post"

module.exports = function(injectedStore = defaultStore){
    let store = injectedStore
    
    function getTable(){
        return store.getTable(TABLE)
    }

    function getById(id){
        return store.getById(TABLE, id)
    }
    return {
        getTable,
        getById,
    }
}