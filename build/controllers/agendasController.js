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
class AgendasController {
    /*LISTA DE AGENDAS*/
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const agendas = yield database_1.default.query('SELECT * FROM agenda WHERE idnino = ?', [id]);
            console.log(agendas.length);
            if (agendas.length > 0) {
                return res.json(agendas);
            }
            res.status(404).json({ text: "No existen agendas creadas" });
        });
    }
    activate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const agendas = yield database_1.default.query('SELECT * FROM agenda WHERE id = ?', [id]);
            const idnino = agendas[0].idnino;
            yield database_1.default.query('UPDATE agenda SET activa = 0 WHERE idnino = ?', idnino);
            yield database_1.default.query('UPDATE agenda SET activa = 1 WHERE id = ? AND idnino = ?', [id, idnino]);
            res.json({ message: "Agenda activada" });
        });
    }
    deactivate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const agendas = yield database_1.default.query('SELECT * FROM agenda WHERE id = ?', [id]);
            const idnino = agendas[0].idnino;
            yield database_1.default.query('UPDATE agenda SET activa = 0 WHERE id = ? AND idnino = ?', [id, idnino]);
            res.json({ message: "Agenda desactivada" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM dia WHERE idagenda = ?', [id]);
            yield database_1.default.query('DELETE FROM agenda WHERE id = ?', [id]);
            res.json({ message: "Agenda borrada" });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const agenda = yield database_1.default.query('SELECT * FROM agenda WHERE id = ?', [id]);
            if (agenda.length > 0) {
                return res.json(agenda[0]);
            }
            res.status(404).json({ text: "La agenda no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query('INSERT INTO agenda set ?', [req.body]);
            req.body.id = result.insertId;
            yield database_1.default.query('INSERT INTO dia set dia="Lunes", idagenda= ?', req.body.id);
            yield database_1.default.query('INSERT INTO dia set dia="Martes", idagenda= ?', req.body.id);
            yield database_1.default.query('INSERT INTO dia set dia="Miércoles", idagenda= ?', req.body.id);
            yield database_1.default.query('INSERT INTO dia set dia="Jueves", idagenda= ?', req.body.id);
            yield database_1.default.query('INSERT INTO dia set dia="Viernes", idagenda= ?', req.body.id);
            yield database_1.default.query('INSERT INTO dia set dia="Sábado", idagenda= ?', req.body.id);
            yield database_1.default.query('INSERT INTO dia set dia="Domingo", idagenda= ?', req.body.id);
            res.json({ message: 'Agenda guardada' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE agenda set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "Agenda actualizada" });
        });
    }
    link(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield database_1.default.query('SELECT * FROM agenda WHERE id = ?', [req.body.id]);
            if (rows.length > 0) {
                const agenda = rows[0];
                agenda.id = null;
                agenda.idnino = req.body.idnino;
                yield database_1.default.query('INSERT INTO agenda set ?', agenda);
                res.json({ message: "Agenda vinculada y añadida" });
            }
            else {
                return res.status(404).json({ text: "La agenda no existe" });
            }
        });
    }
}
exports.agendasController = new AgendasController;
