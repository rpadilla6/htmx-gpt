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

// GET endpoint that returns "Hello, world!"
app.post('/generate', async (req, res) => {
  const { prompt } = req.body;
  messages.push({ role: 'user', content: prompt });
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
  if (messages.length > 10) {
    messages.splice(1, 2);
  }
  res.send(response);
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
