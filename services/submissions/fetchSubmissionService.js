// const { graderGetQuestionService } = require('../questions')
// const fetch = require('node-fetch')
const { UserModel } = require('../../models')
const dotenv = require('dotenv')
const updateSubmissionService = require('./updateSubmissionService')
const checkSubmissionExistService = require('./checkSubmissionExistService')
const insertSubmissionCodeService = require('./insertSubmissionCodeService')
const createSubmissionService = require('./createSubmissionService')
const updateUserCommitService = require('./updateUserCommitService')
dotenv.config()

module.exports = async function fetchSubmissionService(data){
    UserModel.findOne({_id: data.userId})
    .then(user => {
        if(!user) {
            return res.status(400).json({InvalidUserError: "Can not found user"})
        }
    })
    console.log(data);
    const result = data.result
    const questionId = data.questionId
    const userId = data.userId
    const code = data.code
    const status = data.status
    const rank = data.rank 
    const checkExist = await checkSubmissionExistService(userId, questionId)
    try {
        if(result !== "B") {
            const checkResult = result.split("")
            if(checkExist === true && checkResult[0] !== "T") {
                // console.log("1");
                await updateSubmissionService(userId, questionId, code, result, status, rank)
            } else if (checkExist === false && checkResult[0] !== "T") {
                // console.log("2");
                await createSubmissionService(userId, questionId, status, result, rank)
                await insertSubmissionCodeService(userId, questionId, code, status)
            } else if (checkExist === true && checkResult[0] === "T") {
                // console.log("3");
                await updateSubmissionService(userId, questionId, code, checkResult[0], status, rank)
            } else if (checkExist === false && checkResult[0] === "T") {
                // console.log("4");
                await createSubmissionService(userId, questionId, status, checkResult[0], rank)
                await insertSubmissionCodeService(userId, questionId, code, checkResult[0])
            }
        } else if(checkExist === true && result === "B") {
            // console.log("5");
            await updateSubmissionService(userId, questionId, code, result, status, rank)
        } else if(checkExist === false && result === "B") {
            // console.log("6");
            await createSubmissionService(userId, questionId, status, result, rank)
            await insertSubmissionCodeService(userId, questionId, code, status)
        }
    } catch (err) {
        console.log(err)
    } finally {
        await updateUserCommitService(userId)
        return data
    }
}