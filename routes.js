const express = require('express')
const router = express.Router()
const userController = require('./controllers/users')
const questionController = require('./controllers/questions')
const submissionController = require('./controllers/submissions')
const services = require('./services/users')
const upload = require('./middleware/upload')
//login
router.post('/login', (req, res) => services.loginService(req, res))
//register
router.post('/register', (req, res) => services.registerService(req, res))
// update user
router.put('/user/:id', (req, res) => userController.updateUserController(req, res))
// update password
router.put('/password/:id', (req, res) => userController.updatePasswordController(req, res))
// get all users
router.get('/all-users', (req, res) => userController.getUsersController(req, res))
//get user for edit => score, id, bla bla bla ~~ except password
router.get('/user', (req, res) => userController.getUserController(req, res))
//profile picture
router.post('/profile-upload', upload, (req, res) => userController.profileUploadController(req, res))
//update group
router.put('/update-group', (req, res) => userController.updateGroupController(req, res))
// get score board
router.get('/score-board/:status', (req, res) => userController.getScoreBoardController(req, res))
//delete user
router.delete('/del-user', (req, res) => userController.deleteUserController(req, res))
//add question
router.post('/add-question', (req, res) => questionController.addQuestionController(req, res))
//update question
router.put('/update-question/:id', (req, res) => questionController.editQuestionController(req, res))
//get question nt id
router.get('/question-id/:userId/:questionId', (req, res) => questionController.getQuestionByIdController(req, res))
//get all question
router.get('/all-questions', (req, res) => questionController.getQuestionController(req, res))
//grader get question
router.get('/question-grader', (req, res) => questionController.graderGetQuestionController(req, res))
//delete question by id
router.delete('/del-question/:id', (req, res) => questionController.deleteQuestionController(req, res))

router.get('/sub-code', (req, res) => submissionController.getSubmissionCodeController(req, res))

router.get('/finish-sub', (req, res) => submissionController.getFinishSubmissionCodeController(req, res))

router.get('/submission', (req, res) => submissionController.getSubmissionController(req, res))

router.post('/submit', (req, res) => submissionController.fetchSubmissionController(req, res))

// router.post('/create-sub', (req, res) => submissionController.createSubmissionController(req, res))

// router.post('/submission', (req, res) => submissionController.getSubmissionController(req, res))

module.exports = router