const { addQuestionService, updateQuestionService } = require('../../services/questions')
const { QuestionModel } = require('../../models')
const fetch = require('node-fetch')
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
    console.log(check);
    if(check === null) {
      const add = await addQuestionService(req.body)
      const fromBackend = {
        input: req.body.input,
        output: req.body.output,
        code: req.body.code,
        questionId: add,
        oldStatus: 0
      }
      const res = await fetch(`${process.env.GRADER_URL}/check_correct`, {
        method: 'POST',
        body: JSON.stringify(fromBackend),
        headers: { 'Content-type': 'application/json'}
      })
      console.log(res);
      await updateQuestionService(add, {opened: Number(res)})
      return res.send(add)
    } else {
      return res.send(401).json({questionExist: "Question already exists!"})
    }
}