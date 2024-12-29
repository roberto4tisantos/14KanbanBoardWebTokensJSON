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
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: verify the token exists and add the user data to the request object
    var _a;
    // Get the token from the Authorization header
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }
    try {
        // Verify the token using the JWT secret
        const decoded = yield jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Attach the user data to the request object
        req.user = { username: decoded.username };
        next(); // Call the next middleware or route handler
        return; // Explicit return after calling next()
    }
    catch (err) {
        return res.status(403).json({ message: 'Invalid Token' });
    }
    // Verify the token using the JWT secret
    //jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: JwtPayload) => {
    //   jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => { 
    //    if (err) {
    //      return res.status(403).json({ message: 'Invalid Token' });
    //    }
    //    // Attach the user data to the request object
    //   //  req.user = (decoded as JwtPayload).username;
    //    // Attach the user data to the request object
    //    const payload = decoded as JwtPayload;
    //    req.user = { username: payload.username };  
    //    next();
    //  }); 
});
exports.authenticateToken = authenticateToken;
