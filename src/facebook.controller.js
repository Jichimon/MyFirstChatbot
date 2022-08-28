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
    if (req.body.object != "page") {
        return;
    }

    //revisamos cada una de las entradas
    req.body.entry.forEach(element => {
        element.messaging.forEach( event => {
            //si el evento contiene un mensaje,
            //procesamos el mensaje
            if (event.message) {
                processEvent(event);
            }
        });
    });
}


function processEvent(event) {
    var senderID = event.sender.id;
    var message = event.message;

    if (message.text) {
        respondToMessage(senderID);
    }
}


function respondToMessage(senderID){
    var response = generateResponse();
    let body = {
        "recipient": {
            "id": senderID
        },
        "message": response
    }

    send(body);
}



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
}


function generateResponse() {
    return "que pasa perro"
}