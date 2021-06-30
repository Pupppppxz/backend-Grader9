// const { graderGetQuestionService } = require('../questions')
// const fetch = require('node-fetch')
const { UserModel } = require('../../models')
const dotenv = require('dotenv')
const updateSubmissionService = require('./updateSubmissionService')
const checkSubmissionExistService = require('./checkSubmissionExistService')
const insertSubmissionCodeService = require('./insertSubmissionCodeService')
const createSubmissionService = require('./createSubmissionService')
const updateUserCommitService = require('./updateUserCommitService')
const getOldSubmission = require('./getOldSubmission')
const {getScoreByQuestionService} = require('../questions')
const isValidObjectId = require('../users/isValidObjectId')
dotenv.config()

module.exports = async function fetchSubmissionService(data){
    
    const result = data.result
    const questionId = data.questionId
    const userId = data.userId
    const code = data.code
    const status = Number(data.status)
    const rank = data.rank 
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
    try {
        if(result === "C" || result === "L" || result === "F" || result === "Y" || result === "X" || result === "O") {
            data = {SubmissionFaild :"faild to submission, result : " + result + " uId : " + userId + " qId : " + questionId}
        } else {
            const oldSubmit = await getOldSubmission(userId, questionId)
            const checkExist = await checkSubmissionExistService(userId, questionId)
            const totalScore = await getScoreByQuestionService(result, rank)
            
            console.log(totalScore);
            if(checkExist === true) {
                console.log("S1");
                await updateSubmissionService(userId, questionId, code, result, status, totalScore, oldSubmit.score, oldSubmit.status)
            } else if (checkExist === false) {
                console.log("S2");
                await createSubmissionService(userId, questionId, status, result, totalScore)
                await insertSubmissionCodeService(userId, questionId, code, status)
            }
        }
    } catch (err) {
        console.log(err)
    } finally {
        await updateUserCommitService(userId)
        return data
    }
}