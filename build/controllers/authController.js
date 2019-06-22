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
const bcrypt = require('bcryptjs');
class AuthController {
    getOneName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const users = yield database_1.default.query('SELECT * FROM user WHERE id = ?', [id]);
            if (users.length > 0) {
                return res.json(users[0].nombre);
            }
            res.status(404).json({ text: "El usuario no existe" });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const users = yield database_1.default.query('SELECT * FROM user WHERE id = ?', [id]);
            if (users.length > 0) {
                users[0].contrasena = null;
                return res.json(users[0]);
            }
            res.status(404).json({ text: "El usuario no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield database_1.default.query('SELECT * FROM user WHERE email = ?', [req.body.email]);
            if (rows.length > 0) {
                return res.status(400).json({ text: 'Usuario existente' });
            }
            req.body.contrasena = yield bcrypt.hash(req.body.contrasena, 10);
            const result = yield database_1.default.query('INSERT INTO user set ?', [req.body]);
            req.body.id = result.insertId;
            database_1.default.query('INSERT INTO galeria set iduser = ?', req.body.id);
            return res.send({ token: req.body.id });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            req.body.contrasena = yield bcrypt.hash(req.body.contrasena, 10);
            yield database_1.default.query('UPDATE user set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "Tutor actualizado" });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield database_1.default.query('SELECT * FROM user WHERE email = ?', [req.body.email]);
            if (rows.length > 0) {
                const user = rows[0];
                const validPassword = yield bcrypt.compare(req.body.contrasena, user.contrasena);
                if (validPassword) {
                    return res.send({ token: user.id });
                }
                else {
                    return res.status(404).json({ text: "Contraseña incorrecta" });
                }
            }
            else {
                return res.status(404).json({ text: "Usuario no existente" });
            }
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.authController = new AuthController;
