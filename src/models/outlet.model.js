var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const outletModel = new Schema({
    stock: {
        type: Number,
        required: [true, 'stock is mandatory']
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
});


outletModel.methods.toString = () => {
    return 'product: ' + this.product.name + 
    ' | promotion: ' + this.promotion.name + 
    ' | stock: ' + this.stock;
}

outletModel.statics.add = function (aOutlet, callback) {
    this.create(aOutlet, callback);
}

outletModel.statics.findByPromotion = async function (aPromo) {
    return await this.find({ promotion: aPromo });
}

outletModel.statics.findByProduct = async function (aProduct) {
    return await this.find({ product: aProduct });
}

module.exports = mongoose.model('Outlet', outletModel);