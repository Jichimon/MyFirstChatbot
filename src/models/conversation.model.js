var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const conversationModel = new Schema({
    platform: {
        type: String,
        required: [true, 'platform is mandatory']
    },
    contacted: {
        type: Boolean
    },
    startDate: {
        type: Date,
    },
    targetUser: {
        type: mongoose.Schema.Types.ObjectId  ,
        ref: 'TargetUser'  
    }
});


conversationModel.methods.toString = () => {
    return 'Platform: ' + this.platform + 
    ' | contacted: ' + this.contacted + 
    ' | start date: ' + this.startDate + 
    ' | target user: ' + this.targetUser.name;
}

conversationModel.statics.add = function (aConversation, callback) {
    this.create(aConversation, callback);
}

conversationModel.statics.findByTargerUser = async function (aTargetUser) {
    return await this.find({ targetUser: aTargetUser });
}

module.exports = mongoose.model('Conversation', conversationModel);