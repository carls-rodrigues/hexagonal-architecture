import AppError from "../adapters/web/handler/AppError";
import Product from "./Product";

export interface ProductServiceInterface { 
  Get(id: string): Promise<Product>;
  Create(name: string, price: number): Promise<Product>;
  Enable(product: Product): Promise<Product>;
  Disable(product: Product): Promise<Product>;
}

export interface ProductReader {
  Get(id: string): Promise<Product>;
}

export interface ProductWriter { 
  Save(product: Product): Promise<Product>;
}

export interface ProductPersistenceInterface extends ProductReader, ProductWriter { }

export default class ProductService implements ProductServiceInterface {
  constructor(private readonly persistence: ProductPersistenceInterface) { }
  async Get(id: string): Promise<Product> {
    const product = await this.persistence.Get(id);
    if (!product) { 
      throw new AppError("Product not found", 404);
    }
    return product;
  }
  async Create(name: string, price: number): Promise<Product> {
    const product = new Product(name, price);
    const hasError = product.IsValid();
    if (hasError instanceof Error) { 
      throw new AppError(hasError.message);
    }
    const result = await this.persistence.Save(product);
    if (result instanceof Error) { 
      throw new AppError(result.message);
    }
    return result;
  }
  async Enable(product: Product): Promise<Product> {
    const productEnable = product.Enable();
    if (productEnable instanceof Error) { 
      throw new AppError(productEnable.message);
    }
    const result = await this.persistence.Save(product);
    if (result instanceof Error) { 
      throw new AppError(result.message);
    }
    return result;
  }
  async Disable(product: Product): Promise<Product> {
    const productDisable = product.Disable();
    if (productDisable instanceof Error) { 
      throw new AppError(productDisable.message);
    }
    const result = await this.persistence.Save(product);
    if (result instanceof Error) { 
      throw new AppError(result.message);
    }
    return result;
  }

  
}