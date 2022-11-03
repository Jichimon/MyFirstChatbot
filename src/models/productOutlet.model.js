var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const productOutletModel = new Schema({
    stock: {
        type: Number,
        required: [true, 'stock is mandatory']
    },
    name: {
        type: String,
        required: [true, 'name is mandatory']
    },
    product: {
        type: mongoose.Schema.Types.ObjectId  ,
        ref: 'Product',
        required: [true, 'product date is mandatory']         
    },
    promotion: {
        type: mongoose.Schema.Types.ObjectId  ,
        ref: 'Promotion',
        required: [true, 'promotion date is mandatory']         
    },
    outletPrice: {
        type: Number,
        required: [true, 'outletPrice is mandatory']
    },
    description: {
        type: String,
    }
});


productOutletModel.methods.toString = () => {
    return 'product: ' + this.product.name + 
    ' | promotion: ' + this.promotion.name + 
    ' | stock: ' + this.stock + 
    ' | outletPrice: ' + this.outletPrice + 
    ' | description: ' + this.description;
}

productOutletModel.statics.add = function (aOutlet, callback) {
    this.create(aOutlet, callback);
}

productOutletModel.statics.findByPromotion = async function (aPromo) {
    return await this.find({ promotion: aPromo });
}

productOutletModel.statics.findByProduct = async function (aProduct) {
    return await this.find({ product: aProduct });
}

module.exports = mongoose.model('Outlet', productOutletModel);