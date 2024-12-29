"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticket_routes_jsx_1 = require("./ticket-routes.jsx");
const user_routes_jsx_1 = require("./user-routes.jsx");
const router = (0, express_1.Router)();
router.use('/tickets', ticket_routes_jsx_1.ticketRouter);
router.use('/users', user_routes_jsx_1.userRouter);
exports.default = router;
