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
    return {id: question._id}
}