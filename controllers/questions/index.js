const addQuestionController = require('./addQuestionController')
const getQuestionController = require('./getQuestionController')
const getQuestionByIdController = require('./getQuestionByIdController')
const graderGetQuestionController = require('./graderGetQuestionController')
const editQuestionController = require('./editQuestionController')
const deleteQuestionController = require('./deleteQuestionController')

module.exports = {
    addQuestionController,
    getQuestionController,
    graderGetQuestionController,
    editQuestionController,
    getQuestionByIdController,
    deleteQuestionController
}