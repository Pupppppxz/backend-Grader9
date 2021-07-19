const { SubmitModel, SubmitCodeModel, QuestionModel } = require('../../models')

const getAllSubmit = async () => {
    const submit = await SubmitModel.find({})
    return submit
}

const getAllSubmitCode = async () => {
    const code = await SubmitCodeModel.find({})
    return code
}

const checkQuestion = async (id) => {
    const question = await QuestionModel.findOne({_id: id})
    if(question) {
        return 1
    } else {
        return 0
    }
}

module.exports = async function updateAllSubmitService() {
    try {
        let count = 0, count1 = 0
        const [submit, code] = await Promise.all([
            getAllSubmit(),
            getAllSubmitCode()
        ])
    
        for (let i = 0; i < submit.length; i++) {
            const check = await checkQuestion(submit[i].questionId)
            // console.log(i)
            if(check === 0) {
                count = count + 1
                // console.log("gg", submit[i])
            }
        }
        
        for (let i = 0; i < code.length; i++) {
            const check = await checkQuestion(code[i].questionId)
            // console.log(i)
            if(check === 0) {
                count1 = count1 + 1
                // console.log("gg", submit[i])
            }
        }
        // console.log("length1", submit.length)
        // console.log("length2", code.length)
        const obj = {
            count,
            count1
        }
        return obj
    
    } catch (err) {
        return {Error: err}
    }
}