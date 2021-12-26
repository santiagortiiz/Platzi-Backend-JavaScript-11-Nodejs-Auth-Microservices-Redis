const express = require("express")
const router = express.Router()
const response = require("../../../network/response.js")
const controller = require("./index.js")

router.post('/login', login)

function login(req, res, next){
    controller.login(req)
        .then(token => response.success(req, res, 200, token))
        .catch(next)
}

module.exports = router
