import express,  { Request, Response, NextFunction} from 'express';
import { requireAuth, validateRequest } from '@willnguyen/shopee-common';

const router = express.Router()

router.post('/api/orders', requireAuth, validateRequest,
    async (req: Request, res: Response) => {
        res.status(200).json({ status: 'success' });
    }
)

export { router as createOrderRouter }
