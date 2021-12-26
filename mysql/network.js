const response = require("../network/response.js")
const Store = require("../store/mysql.js")

const express = require("express")
const router = express.Router()

router.get('/:table', getTable)
router.get('/:table/:id', getById)
router.post('/:table', insert)
router.put('/:table', upsert)

async function getTable(req, res, next){
    const result = await Store.getTable(req.params.table)
    response.success(req, res, 200, result)
}

async function getById(req, res, next){
    const result = await Store.getTable(req.params.table, req.params.id)
    response.success(req, res, 200, result)
}

async function insert(req, res, next){
    const result = await Store.getTable(req)
    response.success(req, res, 200, result)
}

async function upsert(req, res, next){
    const result = await Store.getTable(req)
    response.success(req, res, 200, result)
}

module.exports = router