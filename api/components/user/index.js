const config = require("../../../config.js")

let store, cache

if (config.retomeDB == true){
    store = require("../../../store/remote-mysql.js")
    cache = require("../../../store/remote-cache.js")
} else {
    store = require("../../../store/mysql.js")
    cache = require("../../../store/redis.js")
}

const controller = require("./controller.js")

module.exports = controller(store, cache)
