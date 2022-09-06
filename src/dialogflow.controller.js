const  { SessionClient } = require('@google-cloud/dialogflow');
const serviceAccount = require('../service-account.json');


async function SendToBot(senderID, message) {
    const queryInput = message;
    const sessionId = senderID;

    const sessionClient = new SessionsClient( { credentials: serviceAccount } );

    const sessionPath = sessionClient.projectAgentSessionPath('topicos-chatbot-lfqe', sessionId);

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message,
                languageCode: 'es',
            },
        },
    };

    const responses = await sessionClient.detectIntent(request);
    
    const result = responses[0].queryResult;

    console.log(result);

    var textResponse = result.fulfillmentMessages.text;
    return textResponse;
};

module.exports = {SendToBot};