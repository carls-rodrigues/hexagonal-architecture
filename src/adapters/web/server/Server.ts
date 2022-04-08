import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { ProductServiceInterface } from "../../../application/ProductService";
import { MakeProductHandler } from "../handler/Product";
import AppError from "../handler/AppError";

export default class WebServer {
  constructor(private readonly productService: ProductServiceInterface) { }
  
  public Serve() {
    const app = express();
    app.use(express.json());
    app.use('/', MakeProductHandler(express.Router(), this.productService));
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      if(err instanceof AppError) {
        return res.status(err.status).send({ error: err.message })
      }
      return res.status(500).json({
        error: 'Internal server error'

      })
    })
    return app
  }
}