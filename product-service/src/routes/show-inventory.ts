import express, { Request, Response } from 'express';
import { NotFoundError } from '@willnguyen/shopee-common';
import { Inventory } from '../models/inventory';

const router = express.Router();

router.get('/api/products/:id/inventory', async (req: Request, res: Response) => {
    const inventory = await Inventory.find({productId: req.params.id});
    console.log(`product id: ${req.params.id}`)

    if (!inventory) {
        throw new NotFoundError();
    }

    res.send(inventory);
});

export { router as showInventoryRouter };
