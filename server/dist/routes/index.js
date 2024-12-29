"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_jsx_1 = __importDefault(require("./auth-routes.jsx"));
const index_jsx_1 = __importDefault(require("./api/index.jsx"));
const auth_jsx_1 = require("../middleware/auth.jsx");
const router = (0, express_1.Router)();
router.use('/auth', auth_routes_jsx_1.default);
// TODO: Add authentication to the API routes
//router.use('/api', apiRoutes);
// Protect API routes with authentication
router.use('/api', auth_jsx_1.authenticateToken, index_jsx_1.default);
exports.default = router;
