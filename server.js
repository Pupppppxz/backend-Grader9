const express = require('express')
const mongoose = require("mongoose")
const passport = require("passport")
const routes = require('./routes')
const cors = require('cors')
const app = express()
const { corsOptions } = require('./middleware/corsOption')
const dotenv = require('dotenv')
dotenv.config()

app.use(cors( corsOptions ))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/uploads', express.static('uploads'))

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGO_URL,{
    "auth": {"authSource":"admin"},
    "user": String(process.env.MONGO_USER),
    "pass": process.env.MONGO_PASS,
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log(`Mongo connected to database`)
}).catch(err => console.log(err))

require('./config/passport')(passport)
app.use(passport.initialize())

app.use('/api', routes)
const port = 5000
app.listen(process.env.PORT || port, () => console.log(`Server start at port ${port}`))