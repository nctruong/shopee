import express, {Request, Response} from 'express';
import {body} from 'express-validator';
import {requireAuth, validateRequest} from '@willnguyen/shopee-common';
import {ProductCreatedPublisher} from '../events/publishers/product-created-publisher';
import {kafkaClient} from '../lib/kafka-wrapper';
import {createProduct} from '../models/concerns/create-product';
import {Inventory} from "../models/inventory";
import {ProductDoc} from "../models/product";

const router = express.Router();

async function publishToBroker(product: ProductDoc) {
  try {
    await new ProductCreatedPublisher(kafkaClient).publish({
      id: product.id,
      title: product.title,
      price: product.price,
      userId: product.userId,
      version: product.version,
    });
  } catch (err) {
    console.error('Failed to publish event to Kafka:', err);
  }
}

router.post(
  '/api/products',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price, quantity } = req.body;
    const product = await createProduct({
      title,
      price,
      userId: req.currentUser!.id,
      quantity
    });
    const inventory = await Inventory.findById(product.id);
    console.log(`inventory ${JSON.stringify(inventory)}`);

    await publishToBroker(product);

    res.status(201).send(product);
  }
);

export { router as createProductRouter };
