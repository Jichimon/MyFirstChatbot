var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const messageModel = new Schema({
    content: {
        type: String,
        required: [true, 'content is mandatory']
    },
    sender: {
        type: String
    },
    datetime: {
        type: Date,
    },
    conversation: {
        type: mongoose.Schema.Types.ObjectId  ,
        ref: 'Conversation'  
    },
    messageType: {
        type: String
    }
});


messageModel.methods.toString = () => {
    return 'Content: ' + this.content + 
    ' | sender: ' + this.sender + 
    ' | datetime: ' + this.datetime + 
    ' | conversation: ' + this.conversation;
}

messageModel.statics.add = function (aMessage, callback) {
    this.create(aMessage, callback);
}

module.exports = mongoose.model('Message', messageModel);