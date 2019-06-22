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
class PictogramasController {
    getGaleria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const pictogramas = yield database_1.default.query('SELECT * FROM galeria WHERE iduser = ?', [id]);
            if (pictogramas.length > 0) {
                return res.json(pictogramas[0].id);
            }
            res.status(404).json({ text: "No existe la galeria" });
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const pictogramas = yield database_1.default.query('SELECT * FROM pictograma WHERE idgaleria = ? ORDER BY nombre', [id]);
            if (pictogramas.length > 0) {
                return res.json(pictogramas);
            }
            res.status(404).json({ text: "No existen pictogramas creados" });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const pictogramas = yield database_1.default.query('SELECT * FROM pictograma WHERE id = ?', [id]);
            if (pictogramas.length > 0) {
                return res.json(pictogramas[0]);
            }
            res.status(404).json({ text: "El pictograma no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield database_1.default.query('SELECT * FROM pictograma WHERE nombre = ? AND idgaleria = ?', [req.body.nombre, req.body.idgaleria]);
            if (rows.length > 0) {
                return res.status(400).json({ text: 'Nombre existente' });
            }
            yield database_1.default.query('INSERT INTO pictograma set ?', [req.body]);
            const pictograma = yield database_1.default.query('SELECT * FROM pictograma WHERE nombre = ? AND idgaleria = ?', [req.body.nombre, req.body.idgaleria]);
            res.json(pictograma[0]);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE pictograma set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "Pictograma actualizado" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE tarea set idpictograma = NULL WHERE idpictograma = ?', [id]);
            yield database_1.default.query('DELETE FROM pictograma WHERE id = ?', [id]);
            res.json({ message: "Pictograma borrado" });
        });
    }
    listBusqueda(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, termino } = req.params;
            const pictogramas = yield database_1.default.query('SELECT * FROM pictograma WHERE idgaleria = ? AND nombre LIKE "%"?"%" ORDER BY nombre', [id, termino]);
            if (pictogramas.length > 0) {
                return res.json(pictogramas);
            }
            res.status(404).json({ text: "No existen pictogramas creados" });
        });
    }
}
exports.pictogramasController = new PictogramasController;
