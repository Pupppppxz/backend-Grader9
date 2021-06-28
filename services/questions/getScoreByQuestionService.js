module.exports = async function getScoreByQuestionService(result, rank) {
    const totalPassedArr = result.split("")
    const totalPassed = totalPassedArr.filter((item) => {
        return item === "P"
    })
    const total = totalPassed.length
    let score = total * 10 * rank
    if(score < 0) {
        return 0
    } else {
        return score
    }
}