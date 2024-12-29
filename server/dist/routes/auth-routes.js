"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_js_1 = require("../models/user.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// export const login = async (req: Request, res: Response) => {
//   // TODO: If the user exists and the password is correct, return a JWT token
// };
const router = (0, express_1.Router)();
// POST /login - Login a user
//router.post('/login', login);
// POST /auth/login - Handle login
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        // Check if the user exists
        const user = yield user_js_1.User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
        // Compare the provided password with the stored password
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
        // // Generate a JWT token
        // const token = jwt.sign(
        //   { username: user.username },
        //   process.env.JWT_SECRET as string,
        //   { expiresIn: '1h' } // Token expires in 1 hour
        // );
        // Generate a JWT token
        const token = jsonwebtoken_1.default.sign({ username: user.username }, process.env.JWT_SECRET || 'default_secret', // Fallback for JWT_SECRET
        { expiresIn: '1h' } // Token expires in 1 hour
        );
        // Send the token to the client
        //res.json({ token });
        return res.json({ token });
    }
    catch (err) {
        //res.status(500).json({ message: 'Server Error' });
        const error = err;
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
}));
exports.default = router;
