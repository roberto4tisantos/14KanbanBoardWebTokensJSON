import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// interface DecodedToken {
//     username: string;
//     iat: number;
//     exp: number;
//   }

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    // TODO: verify the token exists and add the user data to the request object
    const authHeader = req.header('Authorization');
    // Get the token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }
    // Verify the token using the JWT secret
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid Token' });
        }
        // Attach the user data to the request object
        //const decodedToken = decoded as DecodedToken;
        req.user = { username: decodedToken.username };
        //req.user = decoded.username;
        next();
    });
};
