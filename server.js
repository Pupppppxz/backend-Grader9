const express = require('express')
const mongoose = require("mongoose")
const passport = require("passport")
const routes = require('./routes')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

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

require('./config/passport')(passport)
app.use(passport.initialize())

app.use('/api', routes)
const port = 5000;
app.listen(port, () => console.log(`Server start at port ${port}`))
