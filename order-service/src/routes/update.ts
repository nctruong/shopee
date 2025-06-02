import express,  { Request, Response, NextFunction} from 'express';
import { requireAuth, validateRequest } from '@willnguyen/shopee-common';

const router = express.Router()

router.put('/api/order/:id', requireAuth, validateRequest,
    async (req: Request, res: Response) => {
        res.status(200).json({ status: 'success' });
    }
)

export { router as updateOrderRouter }
