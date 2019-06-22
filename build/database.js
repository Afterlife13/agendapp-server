"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const keys_1 = __importDefault(require("./keys"));
const pool = mysql_1.default.createConnection(keys_1.default.database);
pool.connect(function (err) {
    if (err) {
        throw err;
    }
    console.log("Conected to DB");
});
exports.default = pool;
