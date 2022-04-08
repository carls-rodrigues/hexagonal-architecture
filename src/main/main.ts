import PgPromiseConnectionAdapter from "../adapters/db/PgPromiseConnectionAdapter";
import ProductDb from "../adapters/db/ProductDb";
import WebServer from "../adapters/web/server/Server";
import ProductService from "../application/ProductService";

const database = PgPromiseConnectionAdapter.getInstance();
const productDbAdapter = new ProductDb(database);
const productService = new ProductService(productDbAdapter);
// productService.Create('Arroz Tio João 5Kg', 12.50).then(product => console.log(product));
// // productService.Get('02fe4f79-e069-4d29-9227-75ceef229992').then(data => console.log(data))

const webServer = new WebServer(productService)
webServer.Serve().listen(3000, () => console.log('Server running on port 3000'))