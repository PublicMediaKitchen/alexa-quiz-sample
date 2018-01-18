'use strict';
var Alexa = require("alexa-sdk");

// For detailed tutorial on how to making a Alexa skill,
// please visit us at http://alexa.design/build


exports.handler = function(event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers, quizHandlers);
    alexa.execute();
};

const states = {
  QUIZ: "_QUIZ"
};
const HELLO_MESSAGE = "Welcome to the Potluck Quiz! Are you ready?";
const HELP_MESSAGE = "Pardon me? Do you want to start the quiz? You can try: 'Alexa, tell Potluck Quiz I'm ready.'";

const QUIZ_CONTENT = [
  { question: "Where does California need to store natural gas?", answer: "underground"},
  { question: "What did the parents of starved Turpin plead? Guilty or not guilty?", answer: "not guilty"},
  { question: "What did UCLA recently ban at frat house events?", answer: "alcohol"}
];

function getQuestion(counter) {
  return QUIZ_CONTENT[counter].question;
}

function getCorrectAnswer(counter) {
  return QUIZ_CONTENT[counter].answer;
}

function compareAnswers(slots, correctAnswer) {
  for (let slot in slots) {
    if (slots[slot].value != undefined) {
      if (slots[slot].value.toString().toLowerCase() == correctAnswer.toString().toLowerCase()) {
        return true;
      }
    }
  }
  return false;
}

const handlers = {
    "LaunchRequest": function () {
      this.response.speak(HELLO_MESSAGE).listen(HELP_MESSAGE);
      this.emit(":responseReady");
    },
    "AMAZON.StopIntent" : function() {
        this.response.speak("Bye");
        this.emit(":responseReady");
    },
    "AMAZON.HelpIntent" : function() {
        this.response.speak(HELP_MESSAGE);
        this.emit(":responseReady");
    },
    "Unhandled" : function() {
        this.response.speak(HELP_MESSAGE);
    },
    "AMAZON.YesIntent": function() {
      this.handler.state = states.QUIZ;
      this.emitWithState("Quiz");
    },
    "AnswerIntent": function() {
      this.handler.state = states.QUIZ;
      this.emitWithState("AnswerIntent");
    }
};

const quizHandlers = Alexa.CreateStateHandler(states.QUIZ, {
  "Quiz": function() {
    this.attributes["counter"] = 0;
    this.attributes["score"] = 0;
    this.attributes["response"] = "";
    this.emitWithState("AskQuestion");
  },
  "AskQuestion": function() {
    let question = getQuestion(this.attributes["counter"]);
    question = this.attributes["response"] + " " + question;
    this.emit(":ask", question);
  },
  "AnswerIntent": function() {
    let response = "";
    let correctAnswer = getCorrectAnswer(this.attributes["counter"]);
    let correct = compareAnswers(this.event.request.intent.slots, correctAnswer);

    if (correct) {
      response = "Nice!";
      this.attributes["score"]++;
    } else {
      response = "Too bad, so sad."
    }
    this.attributes["counter"]++;

    if (this.attributes["counter"] < QUIZ_CONTENT.length) {
      this.attributes["response"] = response;
      this.emitWithState("AskQuestion");
    } else {
      const scoreResponse = `You scored ${this.attributes["score"]} out of ${QUIZ_CONTENT.length} questions right.`;
      this.response.speak(response + " " + scoreResponse + " See you next week for new questions.");
      this.emit(":responseReady");
    }
  },
  "Unhandled": function() {
    this.emitWithState("AnswerIntent");
  }
});