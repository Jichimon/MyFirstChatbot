var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const attachmentModel = new Schema({
    url: {
        type: String,
        required: [true, 'url is mandatory']
    },
    attachmentType: {
        type: String
    },
    message: {
        type: mongoose.Schema.Types.ObjectId  ,
        ref: 'Message'  
    }
});


attachmentModel.methods.toString = () => {
    return 'url: ' + this.url + 
    ' | attachment type: ' + this.attachmentType + 
    ' | message: ' + this.message.content;
}

attachmentModel.statics.add = function (aAttachment, callback) {
    this.create(aAttachment, callback);
}

module.exports = mongoose.model('Attachment', attachmentModel);