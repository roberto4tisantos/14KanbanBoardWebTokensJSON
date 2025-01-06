import jwt from 'jsonwebtoken';
export const authenticateToken = async (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    // Get the token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }
    try {
        // Verify the token using the JWT secret
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
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
};
