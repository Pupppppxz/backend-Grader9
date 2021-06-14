const express = require('express')
const mongoose = require("mongoose")
const passport = require("passport")
const routes = require('./routes')
const cors = require('cors')
const { mongoURI, GRADER_USER } = require('./config/key')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/uploads', express.static('uploads'))

const db = require('./config/key').mongoURI
mongoose.connect(db,
{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => console.log('Success connect'))
.catch(err => console.log(err))
// mongoose.Promise = global.Promise
// mongoose.connect(`${mongoURI}`,{
//     "auth": {"authSource":"admin"},
//     "user": GRADER_USER,
//     "pass":
// })

require('./config/passport')(passport)
app.use(passport.initialize())

app.use('/api', routes)
const port = 5000;
app.listen(process.env.PORT || port, () => console.log(`Server start at port ${port}`))
