var cluster = require('cluster')

if(cluster.isMaster) {
    var cpuCount = require('os').cpus().length
    for(var i = 0; i < cpuCount; i++){
        cluster.fork()
    }
    cluster.on( 'online', function( worker ) {
        console.log( 'Worker ' + worker.process.pid + ' is online.' );
    });
        cluster.on( 'exit', function( worker, code, signal ) {
        console.log( 'worker ' + worker.process.pid + ' died.' );
    });
} else {
    const express = require('express')
    const mongoose = require("mongoose")
    const passport = require("passport")
    const routes = require('./routes')
    const cors = require('cors')
    const app = express()
    const dotenv = require('dotenv')
    dotenv.config()

    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use('/uploads', express.static('uploads'))

    // const db = require('./config/key').mongoURI
    // mongoose.connect(db,
    // { 
    //     useNewUrlParser: true, 
    //     useUnifiedTopology: true,
    //     useCreateIndex: true,
    //     useFindAndModify: false
    // })
    // .then(() => console.log('Success connect'))
    // .catch(err => console.log(err))
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
}