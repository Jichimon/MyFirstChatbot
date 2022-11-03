var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const userTypeModel = new Schema({
    name: {
        type: String,
        required: [true, 'name is mandatory']
    }
});


userTypeModel.methods.toString = () => {
    return 'name: ' + this.name ;
}

userTypeModel.statics.add = function (aUserType, callback) {
    this.create(aUserType, callback);
}

userTypeModel.statics.findByName = async function (aName) {
    return await this.findOne({ name: aName }).exec();
}

module.exports = mongoose.model('UserType', userTypeModel);