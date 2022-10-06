
const mongoose = require('mongoose');
const uri = process.env.MONGO_DB_STRING_CONNECTION;


mongoose.connect(
    uri, 
    { useNewUrlParser: true, 
        useUnifiedTopology: true, 
    }
);

mongoose.Promise = global.Promise;

var db = mongoose.connection;


Connect = () => {
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
        console.log("Connected successfully");
});
}

Disconnect = () => {
    db.close();
}

module.exports = { Connect, Disconnect };
