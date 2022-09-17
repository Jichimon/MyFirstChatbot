const dialogflowSE = require('@google-cloud/dialogflow');
const dialogflowCX = require('@google-cloud/dialogflow-cx'); 
const serviceAccount = require('../../service-account.json');

const PROJECT_ID = serviceAccount.project_id;
const LOCATION = 'us-central1-dialogflow.googleapis.com';
const AGENT_ID = '886dc785-a787-4fe8-b605-6337928487b9';
const LANGUAGE_CODE = 'es';


async function SendToBot(senderID, message) {
    return dialogFlowCX(senderID, message);
};


async function dialogFlowCX(senderID, message) {
    const sessionId = senderID;
    const sessionClient = new dialogflowCX.SessionsClient({ credentials: serviceAccount, apiEndpoint: LOCATION});
    const sessionPath = sessionClient.projectLocationAgentSessionPath(
        PROJECT_ID,
        'us-central1',
        AGENT_ID,
        sessionId
    );

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message
            },
            languageCode: LANGUAGE_CODE
        },
    };

    const responses = await sessionClient.detectIntent(request); 
    const result = responses[0].queryResult;
    var responseMessages = result.responseMessages;
    return loadTextMessages(responseMessages);
}

async function dialogFlowSE(senderID, message) {
    const sessionId = senderID;
    const sessionClient = new dialogflowSE.SessionsClient( { credentials: serviceAccount } );
    const sessionPath = sessionClient.projectAgentSessionPath(PROJECT_ID, sessionId);
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message,
                languageCode: LANGUAGE_CODE,
            },
        },
    };
    const responses = await sessionClient.detectIntent(request); 
    const result = responses[0].queryResult;
    console.log(result);
    var textResponse = result.fulfillmentText;
    return textResponse;
}

function loadTextMessages(responseMessages) {
    var textResponses = [];
    responseMessages.forEach(
        item => {
            textResponses.push(item.text.text);
        }
    );
    return textResponses;
}

module.exports = {SendToBot};