import { Router } from 'express';
import authRoutes from './auth-routes.jsx';
import apiRoutes from './api/index.jsx';
import { authenticateToken } from '../middleware/auth.jsx';

const router = Router();

router.use('/auth', authRoutes);
// TODO: Add authentication to the API routes
//router.use('/api', apiRoutes);

// Protect API routes with authentication
router.use('/api', authenticateToken, apiRoutes);

export default router;
