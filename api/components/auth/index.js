const store = require("../../../store/mysql.js")    
const controller = require("./controller.js")

module.exports = controller(store) // Se indica al controlador que BD usara para el componente