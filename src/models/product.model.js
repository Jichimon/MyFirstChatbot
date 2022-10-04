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
    price: {
        type: Number,
        required: [true, 'price is mandatory']
    },
    description: {
        type: String,
    },
    productType: {
        type: Number,
        required: [true, 'product-type is mandatory']
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


productModel.methods.toString = () => {
    return 'name: ' + this.name + 
    ' | description: ' + this.description + 
    ' | price: ' + this.price + 
    ' | size: ' + this.size + 
    ' | weight: ' + this.weight + 
    ' | capacity: ' + this.capacity;
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