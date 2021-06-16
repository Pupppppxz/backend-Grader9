const { getQuestionByIdService } = require('../questions')
const dotenv = require('dotenv')
dotenv.config()

const { 
    updateSubmissionCodeService, 
    checkSubmissionExistService, 
    insertSubmissionCodeService, 
    createSubmissionService 
} = require('.')

module.exports = async function fetchSubmissionService(code, userId, questionId){
    const { input, output, rank } = getQuestionByIdService(questionId, userId)
    const body = {
        questionId,
        userId,
        code,
        input,
        output
    }
    const res = await fetch(`${process.env.GRADER_URL}/check_result`, {
        method: post,
        body: JSON.stringify(body),
        headers: { 'Content-type': 'application/json'}
    })
    const resJson = await res.json()
    console.log('fetch to compile (grader)')
    try {
        if(await checkSubmissionExistService(userId, questionId)) {
            await updateSubmissionCodeService(userId, questionId, code, resJson.result, resJson.status, rank)
        } else {
            await insertSubmissionCodeService(userId, questionId, code, resJson.status)
            await createSubmissionService(userId, questionId, resJson.status, resJson.result, rank)
        }
    } catch (err) {
        console.log(err)
    }
    return resJson
}