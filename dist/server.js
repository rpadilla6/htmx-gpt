"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT || 3000;
// Serve static files from the dist directory
app.use(express_1.default.static(path_1.default.join(__dirname, '../dist')));
// GET endpoint that returns "Hello, world!"
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
