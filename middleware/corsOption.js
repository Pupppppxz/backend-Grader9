const whitelist = [
    "https://www.ceboostup.com", 
    "https://mostsecret.ceboostup.com", 
    "184.22.195.128",
    "110.168.53.199"
]

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Sorry, you are not allowed to join the party!'))
        }
    }
}

var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

module.exports = { corsOptionsDelegate, corsOptions }