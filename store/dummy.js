const db = {
    user: [
        {
            id: 1,
            name: "Santiago"
        },
        {
            id: 2,
            name: "Daniel"
        }
    ]
}

async function login(table, query){
    let keys = Object.keys(query) 
    let username = keys[0] 

    if (db[table] !== undefined) {
        return db[table].filter(item => item[username] == query[username])[0]
    } else {
        return []
    }
}

async function getDB(){
    return db
}

async function getUsers(table){
    return db[table]
}

async function getUserById(table, id){
    return db[table].filter(item => item.id == id)
}

async function addUser(table, data){
    if (!db[table]){
        db[table] = []
    }
    
    db[table].push(data)
    return data
}

async function remove(table, id){
    let col = list(table)
    return col.filter(item => item.id === id)[0] || null
}

module.exports = {
    getDB,
    login,
    addUser,
    getUsers,
    getUserById,
    remove
}
