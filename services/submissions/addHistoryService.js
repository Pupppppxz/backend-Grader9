const { HistoryModel } = require('../../models')

module.exports = async function addHistoryService(userId, questionId, status, score, result) {
    const obj = {
        userId,
        questionId,
        status,
        score,
        result
    }
    const newHistory = new HistoryModel(obj)
    return newHistory.save()
}