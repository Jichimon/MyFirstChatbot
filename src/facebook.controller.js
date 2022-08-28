const request = require("request");

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
        if (messageSended) {
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }
    } else {
        console.log("evento no aceptado");
        res.sendStatus(403);
    }
};


function processEvent(event) {
    var senderID = event.sender.id;
    var message = event.message;

    if (message.text) {
        return respondToMessage(senderID);
    } else {
        console.log("el evento message no tiene text");
        return false;
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
        return send(body);

    } else {
        console.log("el mensaje de respuesta no se generó");
        return false;
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
            if (res.message_id) {
                console.log('Mensaje enviado!');
                return true;
            } else {
                console.log("No se envió el mensaje -- " + err);
                return false;
            }
        });
};


function generateResponse() {
    return "que pasa perro";
};