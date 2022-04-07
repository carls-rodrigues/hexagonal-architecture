import Product from "../../src/application/Product"
import faker from 'faker';
import { randomUUID } from 'crypto'
let STATUS: { ENABLED: string, DISABLED: string };
describe('test Product', () => {
  beforeAll(() => {
     STATUS = {
      ENABLED: 'enabled',
      DISABLED: 'disabled',
    }
  })
  test('testing Product Enable when price is greater than zero', () => {
    const product = new Product(faker.commerce.productName(), 10);
    expect(product.Enable()).toBe(true);
  })
  test('testing Product Enable when price is <= zero', () => {
    const product = new Product(faker.commerce.productName(), 0);
    expect(product.Enable()).toBeInstanceOf(Error);
    expect(product.Enable()).toEqual(new Error('the price must be greater than zero to enable the product'));
  })
  test('testing Product Disable when price is greater than zero', () => {
    const product = new Product(faker.commerce.productName(), 10);
    expect(product.Disable()).toBeInstanceOf(Error);
    expect(product.Disable()).toEqual(new Error('the price must be zero in order to have the product disabled'))
  })
  test('testing Product Disable when price is equal zero', () => {
    const product = new Product(faker.commerce.productName(), 0);
    expect(product.Disable()).toBe(true);
  })
  test('testing Product IsValid', () => {
    const product = new Product(faker.commerce.productName(), 0);
    product.name = "hello";
    product.price = 10;
    product.status = STATUS.DISABLED;
    product.id = randomUUID();
    expect(product.IsValid()).toBe(true);
    product.status = 'INVALID';
    expect(product.IsValid()).toEqual(new Error('the status must be enabled or disabled'))
    product.status = STATUS.ENABLED;
    product.status = '';
    product.IsValid();
    expect(product.status).toEqual(STATUS.DISABLED);
    product.status = STATUS.ENABLED;
    product.price = -10;
    expect(product.IsValid()).toEqual(new Error('the price must be greater than zero'))
    product.price = 10;
    product.name = "";
    expect(product.IsValid()).toEqual(new Error('the name must be defined'))
    product.name = faker.commerce.productName();
    product.id = "INVALID";
    expect(product.IsValid()).toEqual(new Error('the id must be a valid uuid'));
    product.id = randomUUID();
  })
  test('testing Product Getters', () => {
    const product = new Product(faker.commerce.productName(), 0);
    expect(product.GetId()).toBe(product.id);
    expect(product.GetName()).toBe(product.name);
    expect(product.GetStatus()).toBe(product.status);
    expect(product.GetPrice()).toBe(product.price);
  })
})
