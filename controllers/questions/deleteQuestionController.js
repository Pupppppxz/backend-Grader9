const { deleteQuestionService } = require('../../services/questions')
const { QuestionModel } = require('../../models')

module.exports = async function deleteQuestionController(req, res) {
    try {
        const question = await QuestionModel.findOne({_id: req.params.id})
        if(!question) {
            return res.status(400).json({error: "Error!"})
        }
        const deleteQuestion = await deleteQuestionService(req.params.id)
        return res.send(deleteQuestion)
    } catch(err) {
        console.log(err);
    }
}