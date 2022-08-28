const { request } = require("../app");

exports.verifyWebhookConnection = async function (req, res, next) {
    // verificar el token
    var token = process.env.VERIFICATION_TOKEN;
    if (req.query["hub.verify_token"] === token) {
        console.log("webhook verificado!");
        res.status(200).send(req.query["hub.challenge"]);
    } else {
        console.error("Verificación del token fallida.");
        res.sendStatus(403);
    }
};

exports.captureEvent = async function (req, res, next) {

    //Verificamos si el evento es de una página
    if (req.body.object == "page") {
        //revisamos cada una de las entradas
        req.body.entry.forEach(function (element) {
            element.messaging.forEach( function(event) {
                //si el evento contiene un mensaje,
                //procesamos el mensaje
                if (event.message) {
                    processEvent(event);
                }
            });
        });
        res.sendStatus(200);
    } else {
        console.log("evento no aceptado");
    }
};


function processEvent(event) {
    var senderID = event.sender.id;
    var message = event.message;

    if (message.text) {
        respondToMessage(senderID);
    } else {
        console.log("el evento message no tiene text");
    }
    
};


function respondToMessage(senderID){
    var response = generateResponse();

    if (response){
        let body = {
            "recipient": {
                "id": senderID
            },
            "message": response
        };   
        send(body);

    } else {
        console.log("el mensaje de respuesta no se generó");
    }
};


function send(body){
    request(
        {
            "uri": "https://graph.facebook.com/v2.6/me/messages",
            "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
            "method": "POST",
            "json": body
        }, 
        (err, res, next) => {
            if (!err) {
                console.log('Mensaje enviado!');
            } else {
                console.log("No se pudo enviar el mensaje: " + err);
            }
        });
};


function generateResponse() {
    return "que pasa perro";
};