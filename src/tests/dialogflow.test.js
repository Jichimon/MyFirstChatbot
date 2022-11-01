const dialogFlow = require('../providers/dialogflow.service');

exports.TestDialogFlowConnection = async function (req, res, next) {

    const senderID = 'tester';
    const message = req.body.message;
    const prospect = req.body.prospect;
    var response;
    try {
        response = await dialogFlow.SendToBot(senderID, message, prospect);
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(402).send(error.details);
    }
}
