const  { SessionClient } = require('@google-cloud/dialogflow');
const serviceAccount = require('../service-account.json');


async function SendToBot(senderID, message) {
    const queryInput = message;
    const sessionId = senderID;

    const sessionClient = new SessionClient( { credentials: serviceAccount } );

    const session = sessionClient.sessionPath('topicos-chatbot-lfqe', sessionId);

    const responses = await sessionClient.detectIntent( {session, queryInput} );
    
    const result = responses[0].queryResult;

    var textResponse = result.fulfillmentMessages.text;
    return textResponse;
};

module.exports = {SendToBot};