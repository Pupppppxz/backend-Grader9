const { UpdatedModel } = require('../models')

const setUpdate = async (id, bool) => {
    const update = await UpdatedModel.findOneAndUpdate({userId: id}, {updated: bool})
    return update
}

const setUpdateAll = async () => {
    const update = await UpdatedModel.updateMany({updated: true})
    return update
}

const insertUpdate = async (id) => {
    const newUpdated = new UpdatedModel({
        userId: id,
    })
    return newUpdated.save()
}

const check = async (id) => {
    const check = await UpdatedModel.findOne({userId: id})
    if(check.length > 0) {
        return check.updated
    } else {
        await insertUpdate(id)
        return true
    }
}

module.exports = { check, setUpdate, setUpdateAll }