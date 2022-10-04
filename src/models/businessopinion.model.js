var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const businessOpinionModel = new Schema({
    points: {
        type: Number,
        required: [true, 'points is mandatory']
    },
    comment: {
        type: String,
    },
    prospect: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prospect',
        required: [true, 'prospect date is mandatory']         
    }
});


businessOpinionModel.methods.toString = () => {
    return 'points: ' + this.points + 
    ' | prospect: ' + this.prospect.name + 
    ' | comment: ' + this.comment;
}

businessOpinionModel.statics.add = function (anOpinion, callback) {
    this.create(anOpinion, callback);
}

businessOpinionModel.statics.findByProspect = function (aProspect, callback) {
    this.find({ prospect: aProspect }, callback);
}

module.exports = mongoose.model('BusinessOpinion', businessOpinionModel);