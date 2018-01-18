# Tutorial

1. Customize the skill invocation, description, and sample phrases.
1. Change the greeting to something customized.
1. Create an intent to ask a quiz question.
1. Add an intent to get the user's answer.
    * tricky part is custom intent schema
    * if it's not the last question, we need a way to get to the next question
1. Add a way to show a score.


* `emitWithState("TargetHandlerName")` transfers one state handler to another