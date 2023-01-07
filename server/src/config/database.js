const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://127.0.0.1:27017'; // Connection URL
//const url = 'mongodb://23sale_db:23sale_matkhau121@localhost:27017'; // host
const dbName = 'mastoffer'; // Database Name

var state = {
    db: null,
    client: null,
}

exports.connect = function (done) {
    if (state.db) return done()

    MongoClient.connect(url, { useNewUrlParser: true, poolSize: 10 }, function (err, client) {
        if (err) {
            console.log('=========ERR CONNECT MONGO================');
            console.log(err);
            console.log('=========ERR CONNECT MONGO================');
            return done(err)
        }

        const db = client.db(dbName);
        state.db = db;
        state.client = client;
        
        done()
    })
}

exports.get = function () {
    return state.db
}

exports.client = function () {
    return state.client
}

exports.close = function (done) {
    if (state.db) {
        state.db.close(function (err, result) {
            state.db = null
            state.mode = null
            done(err)
        })
    }
}