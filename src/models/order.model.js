var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const orderModel = new Schema({
    orderNumber: {
        type: Number,
        required: [true, 'order number is mandatory']
    },
    amount: {
        type: Number,
        required: [true, 'amount number is mandatory']
    },
    orderDate: {
        type: Date,
        required: [true, 'order date is mandatory']
    },
    targetUser: {
        type: mongoose.Schema.Types.ObjectId  ,
        ref: 'TargetUser',
        required: [true, 'target user is mandatory']         
    },
    conversation: {
        type: mongoose.Schema.Types.ObjectId  ,
        ref: 'Conversation'       
    },
    shipment: {
        type: mongoose.Schema.Types.ObjectId  ,
        ref: 'ShipmentType'  
    }
});


orderModel.methods.toString = () => {
    return 'Order number: ' + this.orderNumber + 
    ' | User: ' + this.targetUser.name + 
    ' | Shipment: ' + this.shipment.name + 
    ' | order date: ' + this.orderDate + 
    ' | amount: ' + this.amount;
}

orderModel.statics.add = function (aOrder, callback) {
    this.create(aOrder, callback);
}

orderModel.statics.findByTargerUser = async function (aTargetUser) {
    return await this.find({ targetUser: aTargetUser });
}

module.exports = mongoose.model('Order', orderModel);