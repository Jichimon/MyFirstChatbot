var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const imageModel = new Schema({
    name: {
        type: String,
        required: [true, 'name is mandatory']
    },
    data: {
        type: mongoose.SchemaTypes.Buffer,
        required: [true, 'data is mandatory']
    },
    description: {
        type: String,
    },
    size: {
        type: Number,
    },
    height: {
        type: Number,
    },
    width: {
        type: Number,
    }
});


imageModel.methods.toString = () => {
    return 'name: ' + this.name + 
    ' | description: ' + this.description + 
    ' | size: ' + this.size;
}


imageModel.statics.add = function (aImage, callback) {
    this.create(aImage, callback);
}

imageModel.statics.findByName = function (aName, callback) {
    this.findOne({ name: aName }, callback);
}

module.exports = mongoose.model('Image', imageModel);