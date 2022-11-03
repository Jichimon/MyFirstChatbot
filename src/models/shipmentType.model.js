var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const shipmentTypeModel = new Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId  ,
        ref: 'Order',
        required: [true, 'order date is mandatory']         
    },
    name: {
        type: String,
        required: [true, 'name is mandatory']
    },
    orderNumber: {
        type: Number,
        required: [true, 'order number is mandatory']
    },
    targetUserId: {
        type: String,
        required: [true, 'target user is mandatory']
    },
    shipmentDate: {
        type: Date,
        required: [true, 'shipment date is mandatory']
    }
});


shipmentTypeModel.methods.toString = () => {
    return 'name: ' + this.name + 
    ' | order: ' + this.order.id + 
    ' | order number: ' + this.orderNumber + 
    ' | target user: ' + this.targetUserId + 
    ' | shipment date: ' + this.shipmentDate;
}

shipmentTypeModel.statics.add = function (aShipmentType, callback) {
    this.create(aShipmentType, callback);
}

shipmentTypeModel.statics.findByName = async function (aName) {
    return await this.findOne({ name: aName }).exec();
}

shipmentTypeModel.statics.findByOrder = async function (aOrder) {
    return await this.findOne({ order: aOrder }).exec();
}

module.exports = mongoose.model('ShipmentType', shipmentTypeModel);