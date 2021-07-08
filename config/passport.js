const {Strategy} = require('passport-jwt')
const {ExtractJwt} = require('passport-jwt')
const {UserModel} = require('../models')
// const keys = require('./key')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.SECRET_KEY

module.exports = passport => {
    passport.use(
        new Strategy(opts, (jwt_payload, done) => {
            UserModel.findById(jwt_payload.id)
            .then(user => {
                if(user) {
                    return done(null, user)
                }
                return done(null, false)
            })
            .catch(err => console.log(err))
        })
    )
}