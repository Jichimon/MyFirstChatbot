var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const orderDetailsModel = new Schema({
    orderLineNumber: {
        type: Number,
        required: [true, 'order line number is mandatory']
    },
    quantity: {
        type: Number
    },
    singleProductPrice: {
        type: Number,
    },
    order: {
        type: mongoose.Schema.Types.ObjectId  ,
        ref: 'Order'       
    },
    product: {
        type: mongoose.Schema.Types.ObjectId  ,
        ref: 'Product'  
    }
});


orderDetailsModel.methods.toString = () => {
    return 'Order number: ' + this.orderNumber + 
    ' | User: ' + this.targetUser.name + 
    ' | Shipment: ' + this.shipment.name + 
    ' | order date: ' + this.orderDate + 
    ' | amount: ' + this.amount;
}

orderDetailsModel.statics.add = function (aOrderDetail, callback) {
    this.create(aOrderDetail, callback);
}

orderDetailsModel.statics.findByTargerUser = async function (aTargetUser) {
    return await this.find({ targetUser: aTargetUser });
}

module.exports = mongoose.model('OrderDetails', orderDetailsModel);