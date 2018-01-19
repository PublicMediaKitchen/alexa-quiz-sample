'use strict';
var Alexa = require("alexa-sdk");

// For detailed tutorial on how to making a Alexa skill,
// please visit us at http://alexa.design/build


exports.handler = function(event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = "amzn1.ask.skill.0744c589-8202-46c3-8807-b211a68b3bfc";
    alexa.registerHandlers(handlers, quizHandlers);
    alexa.execute();
};

const repromptSpeech = "Sorry, I didn't get that. Are you ready to rumble?";

const states = {
  QUIZ: "_QUIZ"
};

const QUIZ_CONTENT = [
  { question: "How many sides does a square have?", answer: "4" },
  { question: "How many sides does a triangle have?", answer: "3"},
  { question: "How many languages does a linguist know?", answer: "0"}
];

function getQuestion(counter) {
  return QUIZ_CONTENT[counter].question;
}

function getAnswer(counter) {
  return QUIZ_CONTENT[counter].answer;
}

const handlers = {
    'LaunchRequest': function () {
      this.response.speak("Hello, this is Captain Planet. Are you ready to rumble?").listen(repromptSpeech);
        this.emit(":responseReady");
    },
    'AMAZON.StopIntent' : function() {
        this.response.speak('Bye');
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent' : function() {
        this.response.speak("You can try: 'alexa, hello world' or 'alexa, ask hello world my" +
            " name is awesome Aaron'");
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent' : function() {
        this.response.speak('Bye');
        this.emit(':responseReady');
    },
    "AMAZON.YesIntent" : function() {
      this.handler.state = states.QUIZ;
      this.emitWithState('Quiz');
    },
    'Unhandled' : function() {
        this.response.speak("Sorry, I didn't get that. You can try: 'alexa, hello world'" +
            " or 'alexa, ask hello world my name is awesome Aaron'");
    }
};

const quizHandlers = Alexa.CreateStateHandler(states.QUIZ, {
  "Quiz": function() {
    this.attributes["counter"] = 0;
    this.attributes["score"] = 0;
    this.attributes["response"] = "";
    this.emit(":ask", "How many sides does a square have?");
  },
  "AskQuestion": function() {
    let question = getQuestion(this.attributes["counter"]);
    this.emit(":ask", this.attributes["response"] + " " + question);
  },
  "AnswerIntent": function() {
    let correctAnswer = getAnswer(this.attributes["counter"]);
    let userAnswer = this.event.request.intent.slots.UserAnswer.value.toString().toLowerCase();
    let response = "";
    if (correctAnswer == userAnswer) {
      response = "Good job!";
      this.attributes["score"]++;
    } else {
      response = "Too bad, so sad.";
    }
    this.attributes["counter"]++;

    if (this.attributes["counter"] < QUIZ_CONTENT.length) {
      this.attributes["response"] = response;
      this.emitWithState("AskQuestion");
    } else {
      this.response.speak(`Well done. You got ${this.attributes["score"]} out of ${QUIZ_CONTENT.length} correct.`);
      this.emit(":responseReady");
    }
  },
  "Unhandled": function() {
    this.response.speak(repromptSpeech);
  },
});