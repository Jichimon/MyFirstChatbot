const dialogFlow = require('../providers/dialogflow.service');

exports.TestDialogFlowConnection = async function (req, res, next) {

    const senderID = 'tester';
    const message = req.body.message;
    var response;
    try {
        response = await dialogFlow.SendToBot(senderID, message);
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(402).send(error.details);
    }
}
