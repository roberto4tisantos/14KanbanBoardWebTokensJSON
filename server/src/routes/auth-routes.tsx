import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// export const login = async (req: Request, res: Response) => {
//   // TODO: If the user exists and the password is correct, return a JWT token
// };

const router = Router();

// POST /login - Login a user
//router.post('/login', login);
// POST /auth/login - Handle login
router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Compare the provided password with the stored password
    const isMatch = await bcrypt.compare(password, user.password);
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
    const token = jwt.sign(
    { username: user.username },
    process.env.JWT_SECRET || 'default_secret', // Fallback for JWT_SECRET
    { expiresIn: '1h' } // Token expires in 1 hour
  );    

    // Send the token to the client
    //res.json({ token });
    return res.json({ token });
  } catch (err) {
    //res.status(500).json({ message: 'Server Error' });
    const error = err as Error;
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

export default router;
