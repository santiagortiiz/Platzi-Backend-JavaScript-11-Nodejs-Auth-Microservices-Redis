const express = require("express")
const router = express.Router()
const response = require("../../../network/response.js")
const controller = require("./index.js")

router.get('/', getTable)
router.get('/:id', getById)

function getTable(req, res, next){
    controller.getTable()
        .then( result => response.success(req, res, 200, result))
        .catch(next)
}

function getById(req, res, next){
    controller.getById(req.params.id)
        .then( result => response.success(req, res, 200, result))
        .catch(next)
}

module.exports = router