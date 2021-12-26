const express = require("express")
const router = express.Router()
const secure = require("./secure") 
const response = require("../../../network/response.js")
const controller = require("./index.js")

router.get('/', getTable)
router.get('/', getUsers)
router.get('/:id', getUserById)
router.get('/:id/following', following)
router.post('/', addUser)
router.put('/', secure("update"), updateUser) // secure is a middleware
router.post('/follow/:id', secure("follow"), follow)

function getTable(req, res, next){
    controller.getTable(req.query.table)
        .then( db => response.success(req, res, 200, db))
        .catch(next)
}

function getUsers(req, res, next){
    controller.getUsers()
        .then( list => response.success(req, res, 200, list))
        .catch(next)
}

function getUserById(req, res, next){
    controller.getUserById(req.params.id)
        .then( list => response.success(req, res, 200, list))
        .catch(next)
}

function addUser(req, res, next){
    controller.addUser(req.body)
        .then( result => response.success(req, res, 201, result))
        .catch(next)
}

function updateUser(req, res, next){
    controller.updateUser(req.body)
        .then( result => response.success(req, res, 201, result))
        .catch(next)
}

function follow(req, res, next){
    controller.follow(req.user.id, req.params.id)
        .then(result => response.success(req, res, 201, result))
        .catch(next)
}

function following(req, res, next){
    return controller.following(req.params.id)
        .then((result) => {
            return response.success(req, res, 200, result)
        })
        .catch(next)
}

module.exports = router
