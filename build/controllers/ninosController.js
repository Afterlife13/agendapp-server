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
class NinosController {
    prueba(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.json("Servidor funcionando");
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const ninos = yield database_1.default.query('SELECT * FROM nino WHERE iduser = ?', [id]);
            if (ninos.length > 0) {
                return res.json(ninos);
            }
            res.status(404).json({ text: "No existen niños creados" });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const ninos = yield database_1.default.query('SELECT * FROM nino WHERE id = ?', [id]);
            if (ninos.length > 0) {
                return res.json(ninos[0].nombre);
            }
            res.status(404).json({ text: "El niño no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield database_1.default.query('SELECT * FROM nino WHERE nick = ?', [req.body.nick]);
            if (rows.length > 0) {
                return res.status(400).json({ text: 'Usuario existente' });
            }
            const result = yield database_1.default.query('INSERT INTO nino set ?', [req.body]);
            res.json({ message: 'Niño guardado' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE nino set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "Niño actualizado" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM nino WHERE id = ?', [id]);
            res.json({ message: "Niño borrado" });
        });
    }
    link(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield database_1.default.query('SELECT * FROM nino WHERE nick = ?', [req.body.nick]);
            if (rows.length > 0) {
                const nino = rows[0];
                if (nino.pin == req.body.pin) {
                    nino.id = null;
                    nino.iduser = req.body.iduser;
                    yield database_1.default.query('INSERT INTO nino set ?', nino);
                    res.json({ message: "Niño vinculado y añadido" });
                }
                else {
                    return res.status(404).json({ text: "Pin incorrecto" });
                }
            }
            else {
                return res.status(404).json({ text: "El niño no existe" });
            }
        });
    }
}
exports.ninosController = new NinosController;
