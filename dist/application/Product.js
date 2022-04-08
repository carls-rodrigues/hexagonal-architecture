"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
var STATUS = {
    ENABLED: 'enabled',
    DISABLED: 'disabled',
};
var Product = /** @class */ (function () {
    function Product(name, price) {
        this.id = (0, crypto_1.randomUUID)();
        this.name = name;
        this.price = price;
        this.status = STATUS.DISABLED;
    }
    Product.prototype.IsValid = function () {
        var idValidator = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
        if (this.status === "") {
            this.status = STATUS.DISABLED;
        }
        if (this.status !== STATUS.ENABLED && this.status !== STATUS.DISABLED) {
            return new Error('the status must be enabled or disabled');
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
    };
    Product.prototype.Enable = function () {
        if (this.price > 0) {
            this.status = STATUS.ENABLED;
            return true;
        }
        return new Error('the price must be greater than zero to enable the product');
    };
    Product.prototype.Disable = function () {
        if (this.price === 0) {
            this.status = STATUS.DISABLED;
            return true;
        }
        return new Error('the price must be zero in order to have the product disabled');
    };
    Product.prototype.GetId = function () {
        return this.id;
    };
    Product.prototype.GetName = function () {
        return this.name;
    };
    Product.prototype.GetStatus = function () {
        return this.status;
    };
    Product.prototype.GetPrice = function () {
        return this.price;
    };
    return Product;
}());
exports.default = Product;
