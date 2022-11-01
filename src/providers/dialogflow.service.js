const dialogflowSE = require('@google-cloud/dialogflow');
const dialogflowCX = require('@google-cloud/dialogflow-cx'); 
const serviceAccount = require('../../service-account.json');
const { getAllProducts, getProductsInCurrentPromotion, getProductInfo } = require('../services/product.service');
const clientService = require('../services/client.service');

const PROJECT_ID = serviceAccount.project_id;
const LOCATION = 'us-central1-dialogflow.googleapis.com';
const AGENT_ID = '886dc785-a787-4fe8-b605-6337928487b9';
const LANGUAGE_CODE = 'es';


async function SendToBot(senderID, message, prospect) {
    return dialogFlowCX(senderID, message, prospect);
};


async function dialogFlowCX(senderID, message, prospect) {
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
    }

    const responses = await sessionClient.detectIntent(request); 
    const result = responses[0].queryResult;
    return getIntentResult(result, prospect);
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

function getIntentResult(result, prospect){

    if (result.intent == null) {
        var responseMessages = result.responseMessages;
            return loadTextMessages(responseMessages);
    }

    var intent = result.intent.displayName;

    switch(intent) {
        case "productos_intent":
            return getAllProducts();
            break;
        case "promocion_intent":
            return getProductsInCurrentPromotion();
        case "product_info_intent":
            var productName = result.parameters.fields.product_mochila_ent.stringValue;
            console.log(productName);
            return getProductInfo(productName, prospect);
            break;
        case "datos_intent":
            var email = result.parameters.fields.email.stringValue;
            console.log(email);
            var clientInfo = { email: email };
            return clientService.saveClient(clientInfo, prospect);
        default:
            var responseMessages = result.responseMessages;
            return loadTextMessages(responseMessages);
    }

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