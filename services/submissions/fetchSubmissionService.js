const { graderGetQuestionService } = require('../questions')
const fetch = require('node-fetch')
const dotenv = require('dotenv')
const updateSubmissionService = require('./updateSubmissionService')
const checkSubmissionExistService = require('./checkSubmissionExistService')
const insertSubmissionCodeService = require('./insertSubmissionCodeService')
const createSubmissionService = require('./createSubmissionService')
const updateUserCommitService = require('./updateUserCommitService')
dotenv.config()

module.exports = async function fetchSubmissionService(code, userId, questionId){
    const question = await graderGetQuestionService(questionId)
    const output = question.unit === " Pattern" ? question.output : question.output.replace("\n", "")
    // console.log("input " + question.input);
    // console.log("output " + output);
    // console.log("rank " + question.rank);
    const body = {
        questionId: questionId,
        userId: userId,
        code: code,
        input: question.input,
        output: output
    }
    const res = await fetch(`${process.env.GRADER_URL}/check_result`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-type': 'application/json'}
    })
    const resJson = await res.json()
    const checkExist = await checkSubmissionExistService(userId, questionId)
    try {
        if(checkExist) {
            await updateSubmissionService(userId, questionId, code, resJson.result, resJson.status, question.rank)
        } else {
            await createSubmissionService(userId, questionId, resJson.status, resJson.result, question.rank)
            await insertSubmissionCodeService(userId, questionId, code, resJson.status)
        }
    } catch (err) {
        console.log(err)
    } finally {
        await updateUserCommitService(userId)
        return resJson
    }
}