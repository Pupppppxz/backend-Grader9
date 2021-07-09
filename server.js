const express = require('express')
const mongoose = require("mongoose")
const passport = require("passport")
const routes = require('./routes')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const { decrypt } = require('./middleware/encode')

app.use(cors())
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
    // console.log(decrypt("c04ce3aa0f701779a8637d116511462f:0ad769742757d41f1c5a13bd743fbddf"))
    // console.log(decrypt("e145f0d97fbd87e1b0768de073813c74:63d22a7f52085bebd3485aef641d4fdb"))
}).catch(err => console.log(err))

require('./config/passport')(passport)
app.use(passport.initialize())

app.use('/api', routes)
const port = 5000
app.listen(process.env.PORT || port, () => console.log(`Server start at port ${port}`))