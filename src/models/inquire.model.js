var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const inquireModel = new Schema({
    count: {
        type: Number,
        required: [true, 'count is mandatory']
    },
    product: {
        type: mongoose.Schema.Types.ObjectId  ,
        ref: 'Product',
        required: [true, 'product is mandatory']         
    },
    prospect: {
        type: mongoose.Schema.Types.ObjectId  ,
        ref: 'Prospect',
        required: [true, 'prospect is mandatory']         
    },
    lastTime: {
        type: Date
    }
});


inquireModel.methods.toString = () => {
    return 'product: ' + this.product.name + 
    ' | prospect: ' + this.prospect.firstName + 
    ' | count: ' + this.count;
}

inquireModel.statics.add = function (aInquire, callback) {
    this.create(aInquire, callback);
}

inquireModel.statics.findByProspectAndProduct = async function (aProspect, aProduct) {
    return await this.findOne({ prospect: aProspect._id, product: aProduct._id }).exec();
}

inquireModel.statics.findByProspect = async function (aProspect) {
    return await this.find({ prospect: aProspect }).exec();
}

inquireModel.statics.findByProduct = async function (aProduct) {
    return await this.find({ product: aProduct }).exec();
}

module.exports = mongoose.model('Inquire', inquireModel);