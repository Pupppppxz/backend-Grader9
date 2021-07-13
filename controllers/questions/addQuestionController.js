const { addQuestionService } = require('../../services/questions')
const { QuestionModel } = require('../../models')
const dotenv = require('dotenv')
dotenv.config()

module.exports = async function addQuestionController(req, res) {
    if (!req.body) {
        return res.status(400).json({
          status: 'error',
          error: 'req body cannot be empty',
        })
    }
    const check = await QuestionModel.findOne({number: req.body.number})
    if(check === null) {
      const add = await addQuestionService(req.body)
      return res.send(add._id)
    } else {
      return res.send(401).json({questionExist: "Question already exists!"})
    }
}