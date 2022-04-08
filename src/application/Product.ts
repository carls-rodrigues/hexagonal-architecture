import { randomUUID } from 'crypto';

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

export default class Product implements ProductInterface {
  id: string;
  name: string;
  price: number;
  status: string;

  constructor(name: string, price: number) { 
    this.id = randomUUID();
    this.name = name;
    this.price = price;
    this.status = STATUS.DISABLED;
  }

  IsValid(): boolean | Error {
    const idValidator = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
    if (this.status === "") {
      this.status = STATUS.DISABLED;
    }
    if (this.status !== STATUS.ENABLED && this.status !== STATUS.DISABLED) { 
      return new Error('the status must be enabled or disabled');
    }
    if (isNaN(this.price)) {
      return new Error('the price must be a number');
     }
    if (this.price < 0) { 
      return new Error('the price must be greater than zero');
    }
    if (this.name === "" || this.name === undefined || this.name === null) {
      return new Error('the name must be defined');
    }
    if (!idValidator.test(this.id)) { 
      return new Error('the id must be a valid uuid');
    }
    return true;
  }
  Enable(): boolean | Error {
    if (this.price > 0) {
      this.status = STATUS.ENABLED;
      return true;
    }
    return new Error('the price must be greater than zero to enable the product');
  }
  Disable(): boolean | Error {
    if (this.price === 0) { 
      this.status = STATUS.DISABLED;
      return true;
    }
    return new Error('the price must be zero in order to have the product disabled');
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