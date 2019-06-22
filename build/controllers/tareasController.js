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
class TareasController {
    listDias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const dias = yield database_1.default.query('SELECT dia.id iddia, dia.dia dia, dia.idagenda idagenda, agenda.id idagenda, agenda.nombre nombre, agenda.activa activa, agenda.idnino idnino ' +
                'FROM dia INNER JOIN agenda ON dia.idagenda = agenda.id WHERE agenda.id = ?', [id]);
            if (dias.length > 0) {
                return res.json(dias);
            }
            res.status(404).json({ text: "No existen dias creados" });
        });
    }
    getOneDia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const dias = yield database_1.default.query('SELECT * FROM dia WHERE id = ?', [id]);
            if (dias.length > 0) {
                return res.json(dias[0]);
            }
            res.status(404).json({ text: "No existe el dia" });
        });
    }
    listTareasManana(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const tareas = yield database_1.default.query('SELECT tarea.id id, tarea.nombre nombre, tarea.horaInicio horaInicio, tarea.horaFinal horaFinal, tarea.duracion duracion, tarea.orden orden, tarea.estado estado, tarea.horario horario, tarea.idtareapadre idtareapadre, tarea.idpictograma idpictograma, tarea.iddia iddia, pictograma.id idpictograma, pictograma.pictoByN pictoByN, pictograma.pictoColor pictoColor, pictograma.pictoDibujo pictoDibujo, pictograma.pictoReal pictoReal, pictograma.nivel nivel, pictograma.categoria categoria, pictograma.idgaleria idgaleria ' +
                'FROM tarea LEFT JOIN pictograma ON tarea.idpictograma = pictograma.id WHERE tarea.iddia = ? AND tarea.horario = "manana" ORDER BY tarea.orden ', [id]);
            if (tareas.length > 0) {
                return res.json(tareas);
            }
            res.status(404).json({ text: "No existen tareas creadas" });
        });
    }
    listTareasTarde(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const tareas = yield database_1.default.query('SELECT tarea.id id, tarea.nombre nombre, tarea.horaInicio horaInicio, tarea.horaFinal horaFinal, tarea.duracion duracion, tarea.orden orden, tarea.estado estado, tarea.horario horario, tarea.idtareapadre idtareapadre, tarea.idpictograma idpictograma, tarea.iddia iddia, pictograma.id idpictograma, pictograma.pictoByN pictoByN, pictograma.pictoColor pictoColor, pictograma.pictoDibujo pictoDibujo, pictograma.pictoReal pictoReal, pictograma.nivel nivel, pictograma.categoria categoria, pictograma.idgaleria idgaleria ' +
                'FROM tarea LEFT JOIN pictograma ON tarea.idpictograma = pictograma.id WHERE tarea.iddia = ? AND tarea.horario = "tarde" ORDER BY tarea.orden ', [id]);
            if (tareas.length > 0) {
                return res.json(tareas);
            }
            res.status(404).json({ text: "No existen tareas creadas" });
        });
    }
    listTareasNoche(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const tareas = yield database_1.default.query('SELECT tarea.id id, tarea.nombre nombre, tarea.horaInicio horaInicio, tarea.horaFinal horaFinal, tarea.duracion duracion, tarea.orden orden, tarea.estado estado, tarea.horario horario, tarea.idtareapadre idtareapadre, tarea.idpictograma idpictograma, tarea.iddia iddia, pictograma.id idpictograma, pictograma.pictoByN pictoByN, pictograma.pictoColor pictoColor, pictograma.pictoDibujo pictoDibujo, pictograma.pictoReal pictoReal, pictograma.nivel nivel, pictograma.categoria categoria, pictograma.idgaleria idgaleria ' +
                'FROM tarea LEFT JOIN pictograma ON tarea.idpictograma = pictograma.id WHERE tarea.iddia = ? AND tarea.horario = "noche" ORDER BY tarea.orden ', [id]);
            if (tareas.length > 0) {
                return res.json(tareas);
            }
            res.status(404).json({ text: "No existen tareas creadas" });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const tareas = yield database_1.default.query('SELECT * FROM tarea WHERE tarea.id = ?', [id]);
            if (tareas.length > 0) {
                return res.json(tareas[0]);
            }
            res.status(404).json({ text: "La tarea no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query('INSERT INTO tarea set ?', [req.body]);
            res.json({ message: 'Tarea creada' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE tarea set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "Tarea actualizada" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM tarea WHERE id = ?', [id]);
            res.json({ message: "Tarea borrada" });
        });
    }
}
exports.tareasController = new TareasController;
