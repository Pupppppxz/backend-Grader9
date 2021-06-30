const { CheckModel } = require('../../models')

module.exports = async function recheckQuestionService(data) {
    const recheck = await CheckModel.findOneAndUpdate({question: data.questionId}, data);
    return recheck
}