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
    targetUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TargetUser',
        required: [true, 'Target user is mandatory']         
    },
    message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',        
    }
});


businessOpinionModel.methods.toString = () => {
    return 'points: ' + this.points + 
    ' | user: ' + this.targetUser.name + 
    ' | comment: ' + this.comment +
    ' | message: ' + this.message.content;
}

businessOpinionModel.statics.add = function (anOpinion, callback) {
    this.create(anOpinion, callback);
}

businessOpinionModel.statics.findByTargetUser = function (aTargetUser, callback) {
    this.find({ targetUser: aTargetUser }, callback);
}

module.exports = mongoose.model('BusinessOpinion', businessOpinionModel);