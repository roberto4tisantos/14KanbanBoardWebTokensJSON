const forceDatabaseRefresh = false;
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
const app = express();
const PORT = process.env.PORT || 3001;
// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
// Connect to the database before starting the Express.js server
sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
    console.log(`Connected to database successfully.`);
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});
