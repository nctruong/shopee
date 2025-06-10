import express, { Request, Response } from 'express';
import { Product } from '../models/product';

const router = express.Router();

router.get('/api/products', async (req: Request, res: Response) => {
  const page = parseInt(<string>req.query.page) | 1;
  const pageSize = parseInt(<string>req.query.pageSize) | 12

  const products = await Product.find({
    orderId: undefined,
  }).skip((page - 1) * pageSize).limit(pageSize);
  const total = await Product.countDocuments(products)

  res.send({data: products, meta: {page: page, pageSize: pageSize, total}});
});

export { router as indexProductRouter };
