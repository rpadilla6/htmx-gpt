# htmx-gpt

Silly little hackfest idea to hook up chatgpt4 to act as an backend to return HTMX.
<img width="598" alt="image" src="https://github.com/rpadilla6/htmx-gpt/assets/11849093/94bc08de-98ed-4cf6-89fd-b67004621e9a">


## Setup

To run, first you will need to create an Azure OpenAI resource within Azure, here is some more info: https://learn.microsoft.com/en-us/azure/ai-services/openai/overview.

Once you have created a resource, you will need to create a deployment, in my case I used gpt4. This is easiest through the Azure Portal, and once the deployment is created you should have all you need to fill out the .env file.

## Running

To run, you will need to have node installed, and then run `npm install` to install the dependencies. Once that is done, you can run `npm start` to start the server. You can then navigate to http://localhost:3000 (or whatever port you have specified using .env) to see the app. 

## Using
Enter what you would want generated in the textarea and see chatgpt return it as htmx, it should load directly into the div right below the form. WARNING: Make sure to monitor that it isn't returning a bunch of htmx-trigger="load" items, because those cause it to call itself again on load, which will continue racking up charges on your account. I made a note in the system prompt not to do this but sometimes it may do it anyway :(

### Examples:
> Create an example ecommerce site layout for an eyewear brand, using only html and css.

> Show me an animating oreo that when clicked will send a request to /bite that returns a new oreo with a bite out of it to replace that one.

> Show me a classic finnish breakfast using only html and css

and follow up with

> Now have it so that when I click on a breakfast item it calls /eat and replaces that item with something else
