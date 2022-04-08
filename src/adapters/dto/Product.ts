import Product from "../../application/Product";
import AppError from "../web/handler/AppError";

export default class ProductDTO {
  id: string;
  name: string;
  price: number;
  status: string;
  constructor(id: string, name: string, price: number, status: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.status = status;
  }
  bindProduct(product: Product): Product { 
    if (this.id) {
      product.id = this.id;
    }
    product.name = this.name;
    product.price = this.price;
    product.status = this.status;

    if (product.IsValid()) {
      throw new AppError("Invalid product", 400);
    }
    return product;
  }
  getProduct() {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      status: this.status
    }
  }
}