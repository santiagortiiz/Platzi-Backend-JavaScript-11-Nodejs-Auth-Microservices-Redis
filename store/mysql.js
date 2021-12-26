const mysql = require("mysql")
const config = require("../config.js")

/* Configuration */
const dbConfig = {
    host: config.dbConfig.host,
    user: config.dbConfig.user,
    password: config.dbConfig.password,
    database: config.dbConfig.database,
}

/* Create the instance of mysql.createConnection(dbConfig) */
let connection 

function handleConnection(){
    connection = mysql.createConnection(dbConfig)
    connection.connect(error => {
        if (error) {
            console.log(`[Error conectando mysql.js]\n ${error} \n${error.message}`)
            setTimeout(handleConnection, 2000)
        } else {
            console.log("MySQL Database Connected")
        }
    })
    /* Re-connect the database when the connection is lost */
    connection.on("error", error => {
        console.log(error.message)
        if (error.code == "PROTOCOL_CONNECTION_LOST"){
            handleConnection()
        } else {
            throw error
        }
    })
}

handleConnection()

/* Functions */
function login(table, username){ 
    // Returns the original password associated to the username for comparison
    return new Promise ((resolve, reject) => {
        const query = `SELECT * FROM ${table} WHERE username = "${username}"`
        connection.query(query, (error, authInfo) => {
            if (error) {
                return reject(error)
            } else {
                resolve(authInfo[0])
            }
        })
    })
}

function getTable(table){
    return new Promise ((resolve, reject) => {
        const query = `SELECT * FROM ${table}`
        connection.query(query, (error, data) => {
            if (error) {
                return reject(error)
            } else {
                resolve(data)
            }
        })
    })
}

function getUsers(table){
    return new Promise ((resolve, reject) => {
        const query = `SELECT * FROM ${table}`
        connection.query(query, (error, data) => {
            if (error) {
                return reject(error)
            } else {
                resolve(data)
            }
        })
    })
}

function getUserById(table, id){
    return new Promise ((resolve, reject) => {
        const query = `SELECT * FROM ${table} WHERE id = ${id}`
        connection.query(query, (error, data) => {
            if (error) {
                return reject(error)
            } else {
                resolve(data)
            }
        })
    })
}

function addUser(table, data){
    return new Promise ((resolve, reject) => {
        const query = `INSERT INTO ${table} SET ?`
        connection.query(query, data, (error, result) => {
            if (error) {
                return reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

function updateUser(table, data){
    return new Promise ((resolve, reject) => {
        const {password, ...all} = data
        const query = `UPDATE ${table} SET ? WHERE username = ?`
        connection.query(query, [all, data.username], (error, result) => {
            if (error) {    
                return reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

function follow(table, data){
    return new Promise ((resolve, reject) => {
        const query = `INSERT INTO ${table} SET ?`
        connection.query(query, data, (error, result) => {
            if (error) {    
                return reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

function following(userId){
    return new Promise ((resolve, reject) => {
        let result = []
        const query = 
            `SELECT * 
            FROM user_follow
            JOIN user 
            ON user_to = id
            AND user_from = ${userId}`

        connection.query(query, (error, followers) => {
            if (error) {    
                return reject(error)
            } else {
                followers.forEach(follower => result.push({...follower}))
                result = JSON.parse(JSON.stringify(result))
                resolve(result)
            }
        })
    })
}

function getById(table, id){
    return new Promise ((resolve, reject) => {
        const query = 
            `SELECT * 
            FROM ${table}
            WHERE id = ${id}`

        connection.query(query, (error, result) => {
            if (error) {    
                return reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

module.exports = {
    login,
    getTable,
    getUsers,
    getUserById,
    addUser,
    updateUser,
    follow,
    following,
    getById,
}
