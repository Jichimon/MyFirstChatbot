const request = require("request");
const dialogFlow = require('./providers/dialogflow.service');
const prospectService = require('./services/prospect.service');

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
            console.log("Se recibe un elemento del body ");
            console.log(element);
            element.messaging.forEach( function(event) {
                //si el evento contiene un mensaje,
                //procesamos el mensaje
                if (event.message != undefined) {
                    messageSended = processEvent(event);
                }
            });
        });
        res.send('evento ejecutado!');
    }

    res.status(400);
};


exports.captureEvent2 = async function (req, res, next) {
    var messageSended;
    //Verificamos si el evento es de una página
    if (req.body.object == "page") {
        //revisamos cada una de las entradas
        var entry = req.body.entry;
        var element = entry.element;
        var event = element.messaging.event;
        //si el evento contiene un mensaje,
        //procesamos el mensaje
        if (event.message) {
            messageSended = processEvent(event);
        }
        res.send('evento ejecutado!');
    }

    res.status(400);
}


function processEvent(event) {
    var senderID = event.sender.id;
    var message = event.message;

    if (message.text) {
        handleMessage(senderID, message.text);
    } else {
        console.log("el evento message no tiene text");
    }
    
};


async function handleMessage(senderID, message){
    console.log("El mensaje capturado de messenger es: " + message + " -- by: " + senderID);

    request(
        {
            "uri": "https://graph.facebook.com/v15.0/" + senderID + "/",
            "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
            "method": "GET",
        },
        (err, res, body) => {
            console.error('error:', err); 
            console.log('statusCode:', res && res.statusCode); 
            console.log('body:', body);
            var prospect = body;
            buildResponse(senderID, message, prospect);
        }
    );

};


async function buildResponse(senderID, message, prospect) {
    console.log(prospect);

    var existentProspect = await Prospect.findByPersonId(prospect.id);
    if (!existentProspect) {
        existentProspect = prospectService.createNewProspect(prospect);
    }

 
    var dialogFlowResponse = await dialogFlow.SendToBot(senderID, message, prospect);
    console.log("DialogFlow Response: " + dialogFlowResponse.toString() + " ... from: " + senderID);

        let body = {
            "recipient": {
                "id": senderID
            },
            "message": {
                "text" : dialogFlowResponse.toString()
            }
        }; 

        await send(body);
}

async function send(request_body){
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
            response = body;
        }
    );
};

