var mongoose = require('mongoose');
var Image = require('./image.model');
var Schema = mongoose.Schema;


const productModel = new Schema({
    code: {
        type: String,
        required: [true, 'name is mandatory']
    },
    name: {
        type: String,
        required: [true, 'name is mandatory']
    },
    basePrice: {
        type: Number,
        required: [true, 'basePrice is mandatory']
    },
    description: {
        type: String,
    },
    model: {
        type: String,
        required: [true, 'model is mandatory']
    },
    color: {
        type: String,
    },
    size: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    capacity: {
        type: Number,
    },
    images: {
        type: [ mongoose.Schema.Types.ObjectId ] ,
        ref: 'Image',
        required: false
            
    }
});


productModel.statics.toString = (p) => {
    return 'A la ' + p.name + 
    ', la describimos como ' + p.description + 
    ', cuesta ' + p.basePrice + 
    ' $us. con un tamaño de ' + p.size + 
    ' plg, pesando ' + p.weight + 
    ' kgs. y con una capacidad de ' + p.capacity + ' lts.';
}

productModel.statics.add = function (aProduct, callback) {
    this.create(aProduct, callback);
}

productModel.statics.findByName = async function (aName) {
    return await this.findOne({ name: aName }).exec();
}

productModel.statics.findByCode = async function (aCode) {
    return await this.findOne({ code: aCode }).exec();
}

module.exports = mongoose.model('Product', productModel);