'use strict';

var AllFunctions = require('./AllFunctions'),
    elementsList = require('./phoneList');

var APP_ID = "";

var ElementIdentifier = function () {
    AllFunctions.call(this, APP_ID);
};

ElementIdentifier.prototype = Object.create(AllFunctions.prototype);
ElementIdentifier.prototype.constructor = ElementIdentifier;

ElementIdentifier.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    var speechText = "Welcome to the Luther College Directory! You can ask a question like, what's the phone number of the career center.";
    var repromptText = "If you need help with this skill, just say help me.";
    response.ask(speechText, repromptText);
};

ElementIdentifier.prototype.intentHandlers = {
    "DirectoryNumberIntent": function (intent, session, response) {
        var atomicWeightSlot = intent.slots.Item,
            elementName;
        if (atomicWeightSlot && atomicWeightSlot.value){
            elementName = atomicWeightSlot.value.toLowerCase();
        }

        var cardTitle = "Answer: " + elementName,
            atomicWeightReturn = elementsList[elementName],
            speechOutput,
            repromptOutput;
        if (atomicWeightReturn) {
            speechOutput = {
                speech: atomicWeightReturn,
                type: AllFunctions.speechOutputType.PLAIN_TEXT
            };
            response.tellWithCard(speechOutput, cardTitle, atomicWeightReturn);
        } else {
            var speech;
            if (elementName) {
                speech = "I'm sorry, I currently do not know the phone number for " + elementName + ". What else can I help with?";
            } else {
                speech = "I'm sorry, I currently do not know that phone number. What else can I help with?";
            }
            speechOutput = {
                speech: speech,
                type: AllFunctions.speechOutputType.PLAIN_TEXT
            };
            repromptOutput = {
                speech: "What else can I help with?",
                type: AllFunctions.speechOutputType.PLAIN_TEXT
            };
            response.ask(speechOutput, repromptOutput);
        }
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        var speechText = "You can ask questions such as, what's the phone number of the career center, or, you can say exit... Now, what can I help you with?";
        var repromptText = "You can say things like, what's the phone number for the help desk, or you can say exit... Now, what can I help you with?";
        var speechOutput = {
            speech: speechText,
            type: AllFunctions.speechOutputType.PLAIN_TEXT
        };
        var repromptOutput = {
            speech: repromptText,
            type: AllFunctions.speechOutputType.PLAIN_TEXT
        };
        response.ask(speechOutput, repromptOutput);
    }
};

exports.handler = function (event, context) {
    var howTo = new ElementIdentifier();
    howTo.execute(event, context);
};