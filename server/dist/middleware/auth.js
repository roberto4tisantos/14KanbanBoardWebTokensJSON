import jwt from 'jsonwebtoken';
export const authenticateToken = (/** @type {{ header: (arg0: string) => string; user: any; }} */ req, /** @type {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: { message: string; }): void; new (): any; }; }; }} */ res, /** @type {() => void} */ next) => {
    // TODO: verify the token exists and add the user data to the request object
    // Get the token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }
    // Verify the token using the JWT secret
    // @ts-ignore
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid Token' });
        }
        // Attach the user data to the request object
        // @ts-ignore
        req.user = decoded.username;
        next();
    });
};
