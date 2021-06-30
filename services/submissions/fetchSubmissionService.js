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
    
    console.log(data);
    const result = data.result
    const questionId = data.questionId
    const userId = data.userId
    const code = data.code
    const status = data.status
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
        const oldSubmit = await getOldSubmission(userId, questionId)
        const checkExist = await checkSubmissionExistService(userId, questionId)
        const totalScore = await getScoreByQuestionService(result, rank)
        console.log(oldSubmit);
        if(result !== "B") {
            const checkResult = result.split("")
            if(checkExist === true && checkResult[0] !== "T") {
                console.log("1");
                await updateSubmissionService(userId, questionId, code, result, status, totalScore, oldSubmit.score, oldSubmit.status)
            } else if (checkExist === false && checkResult[0] !== "T") {
                console.log("2");
                await createSubmissionService(userId, questionId, status, result, totalScore)
                await insertSubmissionCodeService(userId, questionId, code, status)
            } else if (checkExist === true && checkResult[0] === "T") {
                console.log("3");
                await updateSubmissionService(userId, questionId, code, checkResult[0], status, totalScore, oldSubmit.score, oldSubmit.status)
            } else if (checkExist === false && checkResult[0] === "T") {
                console.log("4");
                await createSubmissionService(userId, questionId, status, checkResult[0], totalScore)
                await insertSubmissionCodeService(userId, questionId, code, checkResult[0])
            }
        } else if(checkExist === true && result === "B") {
            console.log("5");
            await updateSubmissionService(userId, questionId, code, result, status, totalScore, oldSubmit.score, oldSubmit.status)
        } else if(checkExist === false && result === "B") {
            console.log("6");
            await createSubmissionService(userId, questionId, status, result, totalScore)
            await insertSubmissionCodeService(userId, questionId, code, status)
        }
    } catch (err) {
        console.log(err)
    } finally {
        await updateUserCommitService(userId)
        return data
    }
}