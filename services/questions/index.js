const addQuestionService = require('./addQuestionService')
const getQuestionByIdService = require('./getQuestionByIdService')
const getQuestionService = require('./getQuestionService')
const updateQuestionService = require('./updateQuestionService')
const graderGetQuestionService = require('./graderGetQuestionService')
const deleteQuestionService = require('./deleteQuestionService')
const getScoreByQuestionService = require('./getScoreByQuestionService')
const getFinishCode = require('./getFinishCode')
const updateNumberService = require('./updateNumberService')

module.exports = {
    addQuestionService,
    getQuestionByIdService,
    getQuestionService,
    updateQuestionService,
    graderGetQuestionService,
    deleteQuestionService,
    getScoreByQuestionService,
    getFinishCode,
    updateNumberService
}