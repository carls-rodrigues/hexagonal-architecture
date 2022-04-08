"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var PgPromiseConnectionAdapter_1 = __importDefault(require("../adapters/db/PgPromiseConnectionAdapter"));
var ProductDb_1 = __importDefault(require("../adapters/db/ProductDb"));
var ProductService_1 = __importDefault(require("../application/ProductService"));
var database = PgPromiseConnectionAdapter_1.default.getInstance();
var productDbAdapter = new ProductDb_1.default(database);
var productService = new ProductService_1.default(productDbAdapter);
productService.Create('Arroz Tio João 5Kg', 12.50).then(function (product) { return console.log(product); });
// productService.Get('02fe4f79-e069-4d29-9227-75ceef229992').then(data => console.log(data))
