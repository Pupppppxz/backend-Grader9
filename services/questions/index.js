const addQuestionService = require('./addQuestionService')
const getQuestionByIdService = require('./getQuestionByIdService')
const getQuestionService = require('./getQuestionService')
const updateQuestionService = require('./updateQuestionService')
const graderGetQuestionService = require('./graderGetQuestionService')
const deleteQuestionService = require('./deleteQuestionService')
const getScoreByQuestionService = require('./getScoreByQuestionService')

module.exports = {
    addQuestionService,
    getQuestionByIdService,
    getQuestionService,
    updateQuestionService,
    graderGetQuestionService,
    deleteQuestionService,
    getScoreByQuestionService,
}