const { SubmitModel } = require('../../models')

module.exports = async function getScoreByQuestionService(uId, qId) {
    const submissions = await SubmitModel.find({userId: uId, questionId: qid})
    let max = 0
    submissions.map((score) => {
        if(max < score) {
            max = score
        }
    })
    return max
}