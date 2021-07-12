const { setUpdateAll } = require('../../middleware/updated')

module.exports = async function autoLogoutController(req, res) {
    await setUpdateAll()
    return res.status(200).json({updateSuccess: "Success!"})
}