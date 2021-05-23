const { getQuestionByIdService } = require('../questions')
const { GRADER_URL } = require('../../config/key')
// const { post } = require('../../routes')
const { updateSubmissionCodeService, checkSubmissionExistService, insertSubmissionCodeService } = require('.')

module.exports = async function fetchSubmissionService(code, userId, questionId){
    const { input, output, scorePerCase } = getQuestionByIdService(questionId)
    const body = {
        questionId,
        userId,
        code,
        input,
        output,
        scorePerCase
    }
    const res = await fetch(`${GRADER_URL}/compiler`, {
        method: post,
        body: JSON.stringify(body),
        headers: { 'Content-type': 'application/json'}
    })
    const resJson = await res.json()
    console.log('fetch to compile (grader)');
    try {
        if(await checkSubmissionExistService(userId, questionId)) {
            await updateSubmissionCodeService(userId, questionId, code, {finished: false})
        } else {
            await insertSubmissionCodeService(userId, questionId, code)
        }
    } catch (err) {
        console.log(err)
    }
    return resJson
}