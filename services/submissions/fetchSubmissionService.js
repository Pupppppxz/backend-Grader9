const { getQuestionByIdService } = require('../questions')
const fetch = require('node-fetch')
const dotenv = require('dotenv')
const updateSubmissionService = require('./updateSubmissionService')
const checkSubmissionExistService = require('./checkSubmissionExistService')
const insertSubmissionCodeService = require('./insertSubmissionCodeService')
const createSubmissionService = require('./createSubmissionService')
const updateUserCommitService = require('./updateUserCommitService')
dotenv.config()

module.exports = async function fetchSubmissionService(code, userId, questionId){
    const question = await getQuestionByIdService(userId, questionId)
    // const input = `1 1
    // N
    // 0 0$.$2 2
    // N E
    // E W
    // 0 1$.$2 2
    // N E
    // E S
    // 1 0$.$3 3
    // S E W
    // N S W
    // E N E
    // 2 1$.$4 4 
    // N W E S 
    // W W N S 
    // N S W E 
    // W E N S 
    // 2 3$.$4 4 
    // N W E S 
    // W W N S 
    // N S W E 
    // W S N S
    // 2 3$.$6 6
    // N E S N E N
    // N S S E E W
    // S E W N S W
    // N E S N E N
    // W E N S W N
    // W W W W E W
    // 3 4$.$9 9
    // E E E E E E E E S
    // S S S S S S S N S
    // W W S N E N S N W
    // W W W W W W W W W
    // S S S S S E W E S
    // N N E N W E N S N
    // W E S W W N N N W
    // N W N W E S N W N
    // W E E N E S N W N
    // 6 0$.$9 9
    // N W S E W E N S S
    // S W E N S E N S S
    // E N N E S E N S N
    // S W E N S E N S E
    // W N N W E N S E N
    // S E N W E S N E W
    // N N N W E N N N S
    // W W E N W S E N S
    // E E W S E N S W W
    // 5 6$.$10 10
    // S E W W N E N E W W
    // W W N E E E W S E N
    // S N W W S N S N W E
    // W E N N E W W W E N
    // S N W W E S N N W S
    // N E E N W E E N S S
    // S W S N W W E N W N
    // E E W W S S N N E W
    // S W S W S W N E N N
    // S N N N E N N N W N
    // 4 6`
    // const output = `YES$.$NO$.$YES$.$NO$.$NO$.$YES$.$YES$.$NO$.$NO$.$YES`
    const body = {
        questionId: questionId,
        userId: userId,
        code: code,
        input: question.input,
        output: question.output
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
            await updateSubmissionService(userId, questionId, code, resJson.result, resJson.status, 1)
        } else {
            await createSubmissionService(userId, questionId, resJson.status, resJson.result, 1)
            await insertSubmissionCodeService(userId, questionId, code, resJson.status)
        }
    } catch (err) {
        console.log(err)
    } finally {
        await updateUserCommitService(userId)
        return resJson
    }
}