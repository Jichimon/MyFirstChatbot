var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const clientModel = new Schema({
    docNumber: {
        type: String,
        required: [true, 'docNumber is mandatory']
    },
    Address: {
        type: String,
    },
    age: {
        type: Number,
    },
    prospect: {
        type: mongoose.Schema.Types.ObjectId  ,
        ref: 'Prospect',
        required: [true, 'prospect date is mandatory']         
    },
});


clientModel.methods.toString = () => {
    return 'product: ' + this.product.name + 
    ' | prospect: ' + this.prospect.name + 
    ' | count: ' + this.count;
}

clientModel.statics.add = function (aClient, callback) {
    this.create(aClient, callback);
}

clientModel.statics.findByProspect = function (aProspect, callback) {
    this.find({ prospect: aProspect }, callback);
}

clientModel.statics.findByDocNumber = function (aDocNumber, callback) {
    this.findOne({ docNumber: aDocNumber }, callback);
}

module.exports = mongoose.model('Client', clientModel);