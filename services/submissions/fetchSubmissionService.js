const { UserModel } = require('../../models')
const updateSubmissionService = require('./updateSubmissionService')
const checkSubmissionExistService = require('./checkSubmissionExistService')
const insertSubmissionCodeService = require('./insertSubmissionCodeService')
const createSubmissionService = require('./createSubmissionService')
const updateUserCommitService = require('./updateUserCommitService')
const getOldSubmission = require('./getOldSubmission')
const getScoreByQuestionService = require('../questions/getScoreByQuestionService')
const isValidObjectId = require('../users/isValidObjectId')
const addHistoryService = require('./addHistoryService')

const getUserFunc = async (userId) => {
    const {group} = await UserModel.findOne({_id: userId}).select(['group'])
    return group
}
module.exports = async function fetchSubmissionService(data){
    
    const result = data.result
    const questionId = data.questionId
    const userId = data.userId
    const code = data.code
    const status = Number(data.status)
    const rank = data.rank 
    const number = Number(data.number)
    const confirm = data.confirm

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
    
    if(confirm === process.env.CONFIRM) {
        try {
            const [oldSubmit, checkExist, totalScore, group] = await Promise.all([
                getOldSubmission(userId, questionId), 
                checkSubmissionExistService(userId, questionId), 
                getScoreByQuestionService(result, rank),
                getUserFunc(userId)
            ])
            if(checkExist === true) {
                console.log("S1");
                await updateSubmissionService(userId, questionId, code, result, status, totalScore, oldSubmit.score, oldSubmit.status, group)
            } else if (checkExist === false) {
                console.log("S2");
                await Promise.all([
                    createSubmissionService(userId, questionId, status, result, totalScore, number, group),
                    insertSubmissionCodeService(userId, questionId, code, status)
                ])
            }
            await addHistoryService(userId, questionId, status, totalScore, result)
        } catch (err) {
            console.log(err)
        } finally {
            await updateUserCommitService(userId)
            return data
        }
    } else {
        return {Error: "cannot process!"}
    }
}
