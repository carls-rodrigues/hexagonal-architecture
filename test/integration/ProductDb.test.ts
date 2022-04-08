import PgPromiseConnectionAdapter from "../../src/adapters/db/PgPromiseConnectionAdapter"
import ProductDb from "../../src/adapters/db/ProductDb";
import Product from '../../src/application/Product';
import faker from 'faker';

test('', async  () => {
  const connection = PgPromiseConnectionAdapter.getInstance()
  const productDb = new ProductDb(connection);
  const product = await productDb.Get('6fc5bbd6-b077-4a8a-ae34-6beb56cd71a4')
  expect(product).not.toBeInstanceOf(Error)
})
// test('', async  () => {
//   const connection = PgPromiseConnectionAdapter.getInstance()
//   const productDb = new ProductDb(connection);
//   const id = '6fc5bbd6-b077-4a8a-ae34-6beb56cd71a4'
//   const product = new Product(faker.commerce.productName(), Number(faker.commerce.price()))
//   product.IsValid()
//   product.id = id
//   product.Enable()
//   const rows = await productDb.Save(product);
// })