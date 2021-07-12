const express = require('express')
const router = express.Router()
const userController = require('./controllers/users')
const questionController = require('./controllers/questions')
const submissionController = require('./controllers/submissions')
const adminController = require('./controllers/admin')
const services = require('./services/users')
const checkJwt = require('./middleware/checkJwt')

router.post('/login', (req, res) => services.loginService(req, res))
router.post('/register', (req, res) => services.registerService(req, res))
// router.put('/user/:id', checkJwt, (req, res) => userController.updateUserController(req, res))
router.put('/password/:id', checkJwt, (req, res) => userController.updatePasswordController(req, res))
// router.get('/all-users', checkJwt, (req, res) => userController.getUsersController(req, res))
router.get('/user', checkJwt, (req, res) => userController.getUserController(req, res))
router.put('/update-group', checkJwt, (req, res) => userController.updateGroupController(req, res))
router.get('/score-board/:status', checkJwt, (req, res) => userController.getScoreBoardController(req, res))
router.delete('/del-user', checkJwt, (req, res) => userController.deleteUserController(req, res))
router.delete('/check-updated', checkJwt, (req, res) => userController.checkUpdatedController(req, res))

router.post('/add-question', (req, res) => questionController.addQuestionController(req, res))
router.put('/update-question/:id', (req, res) => questionController.editQuestionController(req, res))
router.get('/question-id/:userId/:questionId', checkJwt, (req, res) => questionController.getQuestionByIdController(req, res))
router.get('/all-questions', checkJwt, (req, res) => questionController.getQuestionController(req, res))
router.delete('/del-question/:id', (req, res) => questionController.deleteQuestionController(req, res))
router.get('/grader-question/:questionId', (req, res) => questionController.graderGetQuestionController(req, res))

router.get('/sub-code', checkJwt, (req, res) => submissionController.getSubmissionCodeController(req, res))
router.get('/finish-sub', checkJwt, (req, res) => submissionController.getFinishSubmissionCodeController(req, res))
router.get('/submission', checkJwt, (req, res) => submissionController.getSubmissionController(req, res))
router.post('/submit', (req, res) => submissionController.fetchSubmissionController(req, res))
router.get('/history', checkJwt, (req, res) => submissionController.getHistoryController(req, res))

router.get('/leader', (req, res) => adminController.getLeaderController(req, res))
router.put('/asefefd', (req, res) => adminController.forgotPasswordController(req, res))

module.exports = router