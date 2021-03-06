const { getHistoryService } = require('../../services/submissions')
const { checkUserExistService } = require('../../services/users')

module.exports = async function getHistoryController(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    try {
        const check = await checkUserExistService(req.user.id)
        if(check) {
            if(!req.query.id || req.user.id !== req.query.id) {
                return res.status(401).json({Error: "Hello world!"})
            }
            const history = await getHistoryService(req.query.id)
            return res.send(history)
        } else {
            return res.status(401).json({Error: "Hello gg"})
        }
    } catch (err) {
        return res.status(400).json({Error: "Error!"})
    }
    
}