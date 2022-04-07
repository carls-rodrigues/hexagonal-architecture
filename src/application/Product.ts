export default interface ProductInterface { 
  IsValid(): boolean | Error;
  Enable(): boolean | Error;
  Disable(): boolean | Error;
  GetId(): string;
  GetName(): string;
  GetStatus(): string;
  GetPrice(): number;
}
const STATUS = {
  ENABLED: 'enabled',
  DISABLED: 'disabled',
}

export class Product implements ProductInterface {
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

  IsValid(): boolean | Error {
    throw new Error("Method not implemented.");
  }
  Enable(): boolean | Error {
    if (this.price > 0) {
      this.status = STATUS.ENABLED;
      return true;
    }
    return new Error('the price must be greater than zero to enable the product');
  }
  Disable(): boolean | Error {
    throw new Error("Method not implemented.");
  }
  GetId(): string {
    return this.id;
  }
  GetName(): string {
    return this.name;
  }
  GetStatus(): string {
    return this.status;
  }
  GetPrice(): number {
    return this.price;
  }
}