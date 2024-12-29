"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forceDatabaseRefresh = false;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const index_jsx_1 = __importDefault(require("./routes/index.jsx"));
const index_jsx_2 = require("./models/index.jsx");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Serves static files in the entire client's dist folder
app.use(express_1.default.static('../client/dist'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(index_jsx_1.default);
// Connect to the database before starting the Express.js server
index_jsx_2.sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
    console.log(`Connected to database successfully.`);
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});
