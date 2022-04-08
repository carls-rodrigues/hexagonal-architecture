import ProductInterface from "../../application/Product";
import Product from "../../application/Product";
import { ProductPersistenceInterface } from "../../application/ProductService";
import Connection from "./Connection";

export default class ProductDb implements ProductPersistenceInterface{
  constructor(readonly connection: Connection) { }

  async Get(id: string): Promise<Product> {
    const [data] = await this.connection.query(
      `
      SELECT * FROM products WHERE id = $1
      `,
      [id]);
    return data;
  }
  async Save(product: Product): Promise<Product> {
    let [{ count: rows }] = await this.connection.query('select count(*) from products where id = $1', [product.GetId()]);
    if (parseInt(rows) === 0) {
      return await this.Create(product);
    }
    await this.Update(product);
    return product
  }
  private async Create(product: Product): Promise<Product> {
    const [data] = await this.connection.query(
      `
        INSERT INTO products (id, name, price, status)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `,
      [
        product.GetId(),
        product.GetName(),
        product.GetPrice(),
        product.GetStatus()

      ])
    return data;
  }
  private async Update(product: Product): Promise<Product> { 
    const [data] = await this.connection.query(
      `
        UPDATE products
        SET name = $1, price = $2, status = $3
        WHERE id = $4
        RETURNING *
      `,
      [
        product.GetName(),
        product.GetPrice(),
        product.GetStatus(),
        product.GetId()
      ])
    return data;
  }
  private async Delete(product: ProductInterface): Promise<void> { 
    await this.connection.query('DELETE FROM products WHERE id = $1', [product.GetId()]);
  }
  
}