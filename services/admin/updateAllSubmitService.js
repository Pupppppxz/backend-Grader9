const { SubmitModel, SubmitCodeModel, QuestionModel, UserModel } = require('../../models')

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

const getAllUsers = async () => {
    const user = await UserModel.find({}).select(['_id'])
    return user
}

const getSubmitCode = async (userId, questionId) => {
    const submitCode = await SubmitCodeModel.find({userId: userId, questionId: questionId}).select(['_id']).sort({updatedAt: 'desc'})
    return submitCode
}

const getAllQuestions = async () => {
    const question = await QuestionModel.find({}).select(['_id'])
    return question
}

const deleteSubmitCode = async (id) => {
    const del = await SubmitCodeModel.findOneAndDelete({_id: id})
    console.log("deleted!")
    return del
}

module.exports = async function updateAllSubmitService() {
    try {
        // let count = 0, count1 = 0
        // const [submit, code] = await Promise.all([
        //     getAllSubmit(),
        //     getAllSubmitCode()
        // ])
    
        // for (let i = 0; i < submit.length; i++) {
        //     const check = await checkQuestion(submit[i].questionId)
        //     // console.log(i)
        //     if(check === 0) {
        //         count = count + 1
        //         // console.log("gg", submit[i])
        //     }
        // }
        
        // for (let i = 0; i < code.length; i++) {
        //     const check = await checkQuestion(code[i].questionId)
        //     // console.log(i)
        //     if(check === 0) {
        //         count1 = count1 + 1
        //         // console.log("gg", submit[i])
        //     }
        // }
        // console.log("length1", submit.length)
        // console.log("length2", code.length)
        console.log("Hello, world!")
        const [users, questions] = await Promise.all([
            getAllUsers(),
            getAllQuestions()
        ])
        for(let i = 0; i < users.length; i++) {
            console.log(i)
            for(let j = 0; j < questions.length; j++) {
                const submit = await getSubmitCode(users[i]._id, questions[j]._id)
                if(submit.length > 1) {
                    console.log(users[i]._id, questions[j]._id)
                    for (let k = 1; k < submit.length; k++) {
                        await deleteSubmitCode(submit[k]._id)
                    }
                }
            }
        }
        return users
    
    } catch (err) {
        return {Error: err}
    }
}