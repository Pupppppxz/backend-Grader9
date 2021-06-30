const { CheckModel } = require('../../models')

module.exports = async function checkQuestionService(data) {
    const check = new CheckModel({ 
        questionId: data.questionId,
        status: data.status
    })
    return check.save()
}