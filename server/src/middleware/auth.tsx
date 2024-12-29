import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
 // TODO: verify the token exists and add the user data to the request object
 
 // Get the token from the Authorization header
 const token = req.header('Authorization')?.replace('Bearer ', '');

 if (!token) {
   return res.status(401).json({ message: 'Access Denied' });
 }

 // Verify the token using the JWT secret
 jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: JwtPayload) => {
   if (err) {
     return res.status(403).json({ message: 'Invalid Token' });
   }
   
   // Attach the user data to the request object
   req.user = (decoded as JwtPayload).username;
   next();
 });  
};
