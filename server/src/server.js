import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
const cors = require('cors');

const forceDatabaseRefresh = false;
const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all origins (or customize it for specific origins)
app.use(cors());  // This allows requests from any origin

// Manually set CORS headers for OPTIONS requests
app.options('/auth', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all origins (or specify your frontend domain)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');  // Allowed methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');  // Allowed headers
    res.sendStatus(204);  // No content for the preflight request
});

// Define the /auth route with a GET method
app.get('/auth', (req, res) => {
    res.json({ message: 'Authentication endpoint' });
});

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));
app.use(express.json());
app.use(routes);
sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});