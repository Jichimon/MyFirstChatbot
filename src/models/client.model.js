var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const validateEmail = function(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/;
    return re.test(email);
};

const clientModel = new Schema({
    docNumber: {
        type: String,
        unique: true,
        required: false
    },
    Address: {
        type: String,
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'El email es obligatorio'],
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Por favor, ingrese un email Válido'],
        match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/]
    },
    phone: {
        type: String
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

clientModel.statics.add = async function (aClient) {
    return this.create(aClient).exec();
}

clientModel.statics.findByProspect = async function (aProspect) {
    return this.find({ prospect: aProspect }).exec();
}

clientModel.statics.findByDocNumber = async function (aDocNumber) {
    return this.findOne({ docNumber: aDocNumber }).exec();
}

clientModel.statics.ValidateEmail = validateEmail;

module.exports = mongoose.model('Client', clientModel);