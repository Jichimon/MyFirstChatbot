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
    var messageSended = false;
    //Verificamos si el evento es de una página
    if (req.body.object == "page") {
        //revisamos cada una de las entradas
        req.body.entry.forEach(function (element) {
            element.messaging.forEach( function(event) {
                //si el evento contiene un mensaje,
                //procesamos el mensaje
                if (event.message) {
                    messageSended = processEvent(event);
                }
            });
        });
        var text = "el mensaje se envio: " + messageSended;
        console.log(text);
        res.status(200).send(text);
    } else {
        console.log("evento no aceptado");
        res.status(403).send("evento no aceptado");
    }
};


async function processEvent(event) {
    var senderID = event.sender.id;
    var message = event.message;

    if (message.text) {
        return await respondToMessage(senderID, message.text);
    } else {
        console.log("el evento message no tiene text");
        return false;
    }
    
};


async function respondToMessage(senderID, message){
    var response = await generateResponse(senderID, message);

    if (response){
        let body = {
            "recipient": {
                "id": senderID
            },
            "message": response
        };   
        return send(body);

    } else {
        console.log("el mensaje de respuesta no se generó");
        return false;
    }
};


function send(request_body){
    request(
        {
            "uri": "https://graph.facebook.com/v2.6/me/messages",
            "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
            "method": "POST",
            "json": request_body
        }, 
        (err, res, body) => {
            if (!err) {
                console.log('Mensaje enviado!');
                return true;
            } else {
                console.log("No se envió el mensaje -- " + err);
                return false;
            }
        });
};

async function ToBot(senderID, message) {
    try {
        var response = await dialogFlow.SendToBot(senderID, message);
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
}



async function generateResponse(senderID, message){
    const botResponse = await ToBot(senderID, message);
    var text = generateTextResponse();
    var response = {
        "text" : botResponse
    }
    return response;
}



function generateTextResponse() {
    return "que pasa perro";
};