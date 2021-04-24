const express = require('express')
const router = express.Router()
const controllers = require('./controllers/users')
const services = require('./services/users')

router.post('/login', (req, res) => services.loginService(req, res))
router.post('/register', (req, res) => services.registerService(req, res))
// update user
router.put('/editUser/:id', (req, res) => controllers.updateUserController(req, res))
//edit password
router.put('/editPassword/:id', (req, res) => controllers.updateUserController(req, res))
// get all users
router.get('/getAllUsers', (req, res) => controllers.getUsersController(req, res))
//get user for edit => score, id, bla bla bla ~~ except password
router.get('/getUser', (req, res) => controllers.getUserController(req, res))
//delete user
router.delete('/deleteUser', (req, res) => controllers.deleteUserController(req, res))

module.exports = router