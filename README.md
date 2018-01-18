# alexa-quiz-sample
A sample quiz skill for Alexa

## Requirements
Install these prior to moving on to setup.  No need to set up the ASK CLI until the "Setup" phase.
* Node.js >= 4.5
* [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html)

## Glossary
* intent: *different methods or functions that your skill can call*
* invocation: *the phrase you use to get your skill's attention*


## Setup
1. Initialize the ASK CLI:
    `ask init`
    1. Create a new profile called `default`
    1. Pick the AWS profile that has the appropriate permissions for Alexa and Lambda
    
1. Start a new project with `ask new` and name the skill.  This will create a few new directories for the skill.
1. Install tne npm dependencies in `/lambda/custom`:
    ```
    $ cd lambda/custom
    $ npm install
    ```
1. Open `SKILL_NAME/models/en-US.json` file and change the invocation name from `hello world` to something of your choosing. For example, `airtalk quiz`
1. Deploy the app:  `ask deploy`
   
   Make note of the Skill Id that is created. You can also see the skill id through the [Alexa developer console](https://developer.amazon.com/edw/home.html#/skills).
   
1. Enable the app through that Alexa developer console.
   
1. Simulate talking to the skill:
    ```
    $ ask simulate -l en-US -t "tell airtalk quiz hello"
    ```
    You should get a JSON response back with `"status": "SUCCESSFUL"` in the body.

1. You can also test out your skill using the [Alexa developer console](https://developer.amazon.com/edw/home.html#/skills) and clicking through to Test > Go to Test Simulator.


## Files

Starting from the skill directory, here are some files to take note of:
* `./skill.json` Where you can modify the skill name, description, and example phrases.
* `./models/*.json` For this example, we're using `en-US.json`.  This is where you can change the invocation name, intents, and sample phrases to invoke the intents.
* `./lambda/custom/index.js` The meat of the skill. Where you can edit quiz questions and answers.


## Tutorial
1. Customize the skill's greeting.