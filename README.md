# alexa-quiz-sample
A sample quiz skill for Alexa.  Make sure to install the requirements, read the rest of this doc, and complete the Setup steps before heading over to the [tutorial](tutorial.md).

## Requirements
Install these prior to moving on to setup.  No need to set up the ASK CLI until the "Setup" phase.
* Node.js >= 4.5
* [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html)
* An AWS profile that has permissions for Alexa Skills Kit, Lambda, and Role Creation.
* An Amazon developer account (developer.amazon.com) **note:** this is separate from your AWS account, so make sure you set this up too.

## Setup
1. Create a new project directory to store your Alexa skills. `cd` into that directory. 

1. Initialize the ASK CLI:
    `ask init`
    1. Create a new profile called `default`
    1. Pick the AWS profile that has the appropriate permissions for Alexa and Lambda

## Glossary
* intent: *different methods or functions that your skill can call*
* invocation: *the phrase you use to get your skill's attention*
        