import { Router } from "express";
import { ProductServiceInterface } from "../../../application/ProductService";

export function MakeProductHandler(route: Router, service: ProductServiceInterface) {
  route.get('/product/:id', async (req, res) => { 
    const id = req.params.id;
    const product = await service.Get(id)
    if (!product) {
      return res.status(404).send({ error: 'Product not found' })
    }
    return res.status(200).json(product)
  });
  route.post('/product', async (req, res) => { 
    const { name, price } = req.body;
    const product = await service.Create(name, price)
    return res.status(200).json(product)
  });
  return route;
}