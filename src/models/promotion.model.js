var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const promotionModel = new Schema({
    code: {
        type: String,
        required: [true, 'name is mandatory']
    },
    name: {
        type: String,
        required: [true, 'name is mandatory']
    },
    startDate: {
        type: Date,
        required: [true, 'start date is mandatory']
    },
    endDate: {
        type: Date,
        required: [true, 'end date is mandatory']
    }
});


promotionModel.methods.toString = () => {
    return 'name: ' + this.name + 
    ' | description: ' + this.description + 
    ' | price: ' + this.price;
}

promotionModel.statics.add = function (aPromo, callback) {
    this.create(aPromo, callback);
}

promotionModel.statics.findByName = async function (aName) {
    return await this.findOne({ name: aName }).exec();
}

promotionModel.statics.findByCode = async function (aCode) {
    return await this.findOne({ code: aCode }).exec();
}


promotionModel.statics.getCurrentPromotion = async function() {
    return await this.findOne({ code: "01P1" }).exec();
}

module.exports = mongoose.model('Promotion', promotionModel);