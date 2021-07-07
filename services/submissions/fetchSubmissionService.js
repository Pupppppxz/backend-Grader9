const { UserModel } = require('../../models')
const dotenv = require('dotenv')
const updateSubmissionService = require('./updateSubmissionService')
const checkSubmissionExistService = require('./checkSubmissionExistService')
const insertSubmissionCodeService = require('./insertSubmissionCodeService')
const createSubmissionService = require('./createSubmissionService')
const updateUserCommitService = require('./updateUserCommitService')
const getOldSubmission = require('./getOldSubmission')
const getScoreByQuestionService = require('../questions/getScoreByQuestionService')
const graderGetQuestionService = require('../questions/graderGetQuestionService')
const isValidObjectId = require('../users/isValidObjectId')
const addHistoryService = require('./addHistoryService')
dotenv.config()

const numberCheck = async (number, questionId) => {
    if(number === undefined) {
        const question = await graderGetQuestionService(questionId)
        return question.number
    } else {
        return Number(number)
    }
}

module.exports = async function fetchSubmissionService(data){
    
    const result = data.result
    const questionId = data.questionId
    const userId = data.userId
    const code = data.code
    const status = Number(data.status)
    const rank = data.rank 
    const number = await numberCheck(data.number, questionId)

    if(isValidObjectId(userId) === true){
        UserModel.findOne({_id: data.userId})
        .then(user => {
            if(!user) {
                return {InvalidUserError: "Can not found user"}
            }
        })
    } else {
        return {InvalidUserError: "Invalid userId"}
    }
    const [oldSubmit, checkExist, totalScore] = await Promise.all([
        getOldSubmission(userId, questionId), 
        checkSubmissionExistService(userId, questionId), 
        getScoreByQuestionService(result, rank)
    ])
    try {
        if(checkExist === true) {
            console.log("S1");
            await updateSubmissionService(userId, questionId, code, result, status, totalScore, oldSubmit.score, oldSubmit.status)
        } else if (checkExist === false) {
            console.log("S2");
            await Promise.all([
                createSubmissionService(userId, questionId, status, result, totalScore, number),
                insertSubmissionCodeService(userId, questionId, code, status)
            ])
        }
    } catch (err) {
        console.log(err)
    } finally {
        await updateUserCommitService(userId)
        await addHistoryService(userId, questionId, status, totalScore, result)
        return data
    }
}
