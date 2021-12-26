const response = require("../network/response.js")
const Store = require("../store/redis.js")

const express = require("express")
const router = express.Router()
router.get('/:table', getTable)
router.get('/:table/:id', getById)
router.put('/:table', upsert)

async function getTable(req, res, next){
    const result = await Store.getTable(req.params.table)
    response.success(req, res, 200, result)
}

async function getById(req, res, next){
    const result = await Store.getById(req.params.table, req.params.id)
    response.success(req, res, 200, result)
}

async function upsert(req, res, next){
    const result = await Store.upsert(req.params.table, req.body)
    response.success(req, res, 200, result)
}   

// function upsert(req, res, next){
//     Store.upsert(req.params.table, req.body)
//         .then( db => response.success(req, res, 200, db))
//         .catch(next)
// }

module.exports = router