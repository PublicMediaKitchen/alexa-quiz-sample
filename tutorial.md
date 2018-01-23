# Tutorial
This tutorial is structured as a lab and is produced for Public Media Potluck's Alexa skill building session.

At the end of this tutorial, you will have a quiz skill that you can customize with your own content.

## References
It may be helpful to keep these references open in separate tabs while going through this tutorial.
* [alexa sdk (nodeJS)](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs)
* [custom interaction model](https://developer.amazon.com/docs/custom-skills/custom-interaction-model-reference.html)
* [alexa developer console dashboard](https://developer.amazon.com/edw/home.html#/skills)

## Files   
These files don't exist yet, but we will create them. Starting from the skill directory, here are some files to take note of:
* `./skill.json` Where you can modify the skill name, description, and example phrases.
* `./models/*.json` For this example, we're using `en-US.json`.  This is where you can change the invocation name, intents, and sample phrases to invoke the intents.
* `./lambda/custom/index.js` The meat of the skill. Where you can edit quiz questions and answers.
   


## Steps
1. Start a new project with `ask new` and name the skill.  This will create a few new directories for the skill.
1. Change directories into your newly created skill directory. Install tne npm dependencies in `/lambda/custom`:
    ```
    $ cd lambda/custom
    $ npm install
    ```
1. Open `SKILL_NAME/models/en-US.json` file and change the invocation name from `hello world` to something of your choosing. For example, `airtalk quiz`
1. Deploy the app:  `ask deploy`
   
   Make note of the Skill Id that is created. You can also see the skill id through the [Alexa developer console](https://developer.amazon.com/edw/home.html#/skills).
   
1. copy & paste the skill id into `index.js` here:
    ```
    var alexa = Alexa.handler(event, context);
    alexa.appId = "SKILL_ID_HERE";
    ```
   
1. Enable the app through that Alexa developer console.
   
1. Simulate talking to the skill:
    ```
    $ ask simulate -l en-US -t "tell airtalk quiz hello"
    ```
    You should get a JSON response back with `"status": "SUCCESSFUL"` in the body.

1. You can also test out your skill using the [Alexa developer console](https://developer.amazon.com/edw/home.html#/skills) and clicking through to Test > Go to Test Simulator.
1. Customize the skill invocation, description, and sample phrases.
1. Change the greeting to something customized.
1. Create an intent to ask a quiz question.
1. Add an intent to get the user's answer.
    * tricky part is custom intent schema
    * if it's not the last question, we need a way to get to the next question
1. Add a way to show a score.


* `emitWithState("TargetHandlerName")` transfers one state handler to another