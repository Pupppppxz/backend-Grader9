const { getFinishSubmissionCodeService, getSubmissionService } = require('../../services/submissions')
const { checkUserExistService } = require('../../services/users')
const { UserModel } = require('../../models')

module.exports = async function getFinishSubmissionCodeController(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    try {
        const check = await checkUserExistService(req.user.id)
        if(check === true) {
            const getSubmit = await getSubmissionService(req.user.id)
            const { group } = await UserModel.findOne({_id: req.user.id})
            if(group === 6) {
                const code = await getFinishSubmissionCodeService(req.query.questionId)
                return res.send(code)  
            } else {
                if(getSubmit.length > 0) {
                    if(!req.query.questionId) {
                        return res.status(400).json({Error: "Hello world!"})
                    }
                    const code = await getFinishSubmissionCodeService(req.query.questionId)
                    return res.send(code)   
                } else {
                    return res.status(400).json({Error: "Cannot get!"})
                }
            }
        } else {
            return res.status(401).json({Error: "Hello gg"})
        }
    } catch (err) {
        return res.status(400).json({Error: "Error!"})
    }
}