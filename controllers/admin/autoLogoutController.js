const { setUpdateAll } = require('../../middleware/updated')

module.exports = async function autoLogoutController(req, res) {
    if(req.headers.logoutUser === process.env.CONFIRM) {
        await setUpdateAll()
        return res.status(200).json({updateSuccess: "Success!"})
    } else {
        return res.status(400).json({again: "try again!"})
    }
}