const request = require("request");
const dialogFlow = require('./providers/dialogflow.service');

exports.verifyWebhookConnection = async function (req, res, next) {
    // verificar el token
    var token = process.env.VERIFICATION_TOKEN;
    if (req.query["hub.verify_token"] === token) {
        console.log("webhook verificado!");
        res.status(200).send(req.query["hub.challenge"]);
    } else {
        console.error("Verificación del token fallida.");
        res.status(403).send('Verificacion del token fallida');
    }
};

exports.captureEvent = async function (req, res, next) {
    var messageSended;
    //Verificamos si el evento es de una página
    if (req.body.object == "page") {
        //revisamos cada una de las entradas
        req.body.entry.forEach( function (element) {
            element.messaging.forEach( function(event) {
                //si el evento contiene un mensaje,
                //procesamos el mensaje
                if (event.message) {
                    messageSended = processEvent(event);
                }
            });
        });
        res.send('evento ejecutado!');
    }

    res.status(400);
};


function processEvent(event) {
    var senderID = event.sender.id;
    var message = event.message;

    if (message.text) {
        return respondToMessage(senderID, message.text);
    } else {
        console.log("el evento message no tiene text");
    }
    
};


async function respondToMessage(senderID, message){
    var dialogFlowResponse = await dialogFlow.SendToBot(senderID, message);
    console.log("DialogFlow Response: " + dialogFlowResponse.toString());

        let body = {
            "recipient": {
                "id": senderID
            },
            "message": {
                "text" : dialogFlowResponse.toString()
            }
        }; 

        await send(body);

};


async function send(request_body){

    console.log("Request body: " + request_body);
    await request(
        {
            "uri": "https://graph.facebook.com/v2.6/me/messages",
            "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
            "method": "POST",
            "json": request_body
        }, 
        (err, res, body) => {
            console.error('error:', err); 
            console.log('statusCode:', res && res.statusCode); 
            console.log('body:', body);
            return body; 
        })
};
