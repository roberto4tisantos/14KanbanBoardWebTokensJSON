import { Router } from 'express';
import { ticketRouter } from './ticket-routes.jsx';
import { userRouter } from './user-routes.jsx';

const router = Router();

router.use('/tickets', ticketRouter);
router.use('/users', userRouter);

export default router;
