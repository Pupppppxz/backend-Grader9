module.exports = async function getScoreByQuestionService(result, rank) {
    const totalPassedArr = result.split("")
    const totalPassed = totalPassedArr.filter((item) => item === "p" || "P")
    const total = totalPassed.lenght
    console.log("total passed = " + total);
    let max = 0
    if((total.length * rank) === max) {
        return max
    } else {
        return (total.length * rank)
    }
}