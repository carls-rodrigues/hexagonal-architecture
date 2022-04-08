"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_promise_1 = __importDefault(require("pg-promise"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var PgPromiseConnectionAdapter = /** @class */ (function () {
    function PgPromiseConnectionAdapter() {
        this.pgp = (0, pg_promise_1.default)()("postgres://".concat(process.env.DB_USERNAME, ":").concat(process.env.DB_PASSWORD, "@").concat(process.env.DB_HOST, ":").concat(process.env.DB_PORT, "/").concat(process.env.DB_DATABASE));
    }
    PgPromiseConnectionAdapter.getInstance = function () {
        if (!PgPromiseConnectionAdapter.instance) {
            PgPromiseConnectionAdapter.instance = new PgPromiseConnectionAdapter();
        }
        return PgPromiseConnectionAdapter.instance;
    };
    PgPromiseConnectionAdapter.prototype.query = function (statement, params) {
        return this.pgp.query(statement, params);
    };
    return PgPromiseConnectionAdapter;
}());
exports.default = PgPromiseConnectionAdapter;
