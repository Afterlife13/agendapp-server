"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const helpers = require('../lib/helpers');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const session = require('express-session');
class AuthController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield database_1.default.query('SELECT * FROM user');
            res.json(games);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield database_1.default.query('SELECT * FROM user WHERE email = ?', [req.body.email]);
            if (rows.length > 0) {
                return res.json({ message: 'El usuario ya existe en la base de datos' });
            }
            req.body.contrasena = yield bcrypt.hash(req.body.contrasena, 10);
            const result = yield database_1.default.query('INSERT INTO user set ?', [req.body]);
            req.body.id = result.insertId;
            console.log(req.body);
            return req.body;
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield database_1.default.query('SELECT * FROM user WHERE email = ?', [req.body.email]);
            if (rows.length > 0) {
                const user = rows[0];
                const validPassword = yield bcrypt.compare(req.body.contrasena, user.contrasena);
                if (validPassword) {
                    return res.send({ token:  });
                }
                else {
                    return res.json({ message: 'Contraseña incorrecta ' });
                }
            }
            else {
                return res.json({ message: 'El usuario especificado no existe' });
            }
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.authController = new AuthController;
