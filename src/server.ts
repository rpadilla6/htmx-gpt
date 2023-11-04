import dotenv from 'dotenv';
import express from 'express';
import path from 'path';

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, '../dist')));

// GET endpoint that returns "Hello, world!"
app.post('/generate', (req, res) => {
  console.log(req);
  res.send('Hello, world!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
