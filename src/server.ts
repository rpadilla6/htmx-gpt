import { AzureKeyCredential, OpenAIClient } from '@azure/openai';

import ChatSetup from './ChatSetup.json';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { setLogLevel } from '@azure/logger';

setLogLevel('info');

dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
const port = process.env.PORT || 3000;

// Initialize the OpenAI API
const client = new OpenAIClient(
  process.env.OPENAI_RESOURCE || '',
  new AzureKeyCredential(process.env.OPENAI_KEY || '')
);

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, '../dist')));

const messages = [{ role: 'system', content: ChatSetup.systemPrompt }];

app.all('/*', async (req, res) => {
  try {
    const { payload } = req.body;
    messages.push({
      role: 'user',
      content: `This prompt came to the following route: ${req.originalUrl}. Using that as API context, this is the payload to that route: ${payload}`,
    });
    const events = client.listChatCompletions(
      process.env.OPENAI_DEPLOYMENT || '',
      messages,
      ChatSetup.chatParameters
    );

    let response = '';
    for await (const event of events) {
      for (const choice of event.choices) {
        const delta = choice.delta?.content;
        if (delta !== undefined) {
          response += delta;
        }
      }
    }
    messages.push({ role: 'system', content: response });

    // Keep history to a max of 10
    if (messages.length > 10) {
      messages.splice(1, 2);
    }
    res.send(response);
  } catch (e) {
    console.log(e);
    res.send('<div>Something went wrong. Try again!</div>');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
