
const mongoose = require('mongoose');
const uri = "mongodb+srv://topicos:G1nn0@topicos-my-first-chatbo.fzsac0o.mongodb.net/?retryWrites=true&w=majority";


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
