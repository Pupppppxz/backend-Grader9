const { QuestionModel, UserModel, SubmitModel } = require('../../models')

// const pushTosubmitModel = async function(id, questionData) {
//     const data = {
//         userId: id,
//         questionId: questionData.questionId,
//         status: questionData.status
//     }
//     const newItem = await new SubmitModel(data)
//     return newItem.save()
// }

// const getUsers = async function() {
//     const allUser = await UserModel
//                         .find({userStatus: "user"})
//                         .select(['_id'])
//     return allUser
// }

// const getQuestionId = async function(number) {
//     const id = QuestionModel
//                 .findOne({number: number})
//                 .select(['_id'])
//     return id._id
// }

module.exports = async function addQuestionService(data) {
    const question = new QuestionModel(data)
    question.save()

    // const questionData = {
    //     questionId: question._id,
    //     status: question.status
    // }

    // let userCount = []
    // userCount = await getUsers()
    // userCount.map((user) => {
    //     pushTosubmitModel(user._id, questionData)
    // })
    // const result = await getQuestionId(question.number)
    return {id: question._id}
}