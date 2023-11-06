# htmx-gpt

Silly little hackfest idea to hook up chatgpt4 to act as an backend to return HTMX.

## Setup

To run, first you will need to create an Azure OpenAI resource within Azure, here is some more info: https://learn.microsoft.com/en-us/azure/ai-services/openai/overview.

Once you have created a resource, you will need to create a deployment. This is easiest through the Azure Portal, and once the deployment is created you should have all you need to fill out the .env file.

## Running

To run, you will need to have node installed, and then run `npm install` to install the dependencies. Once that is done, you can run `npm start` to start the server. You can then navigate to http://localhost:3000 (or whatever port you have specified using .env) to see the app.
