import { Request, Response } from 'express';

import pool from '../database';

class TareasController {

    public async listDias(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const dias = await pool.query('SELECT dia.id iddia, dia.dia dia, dia.idagenda idagenda, agenda.id idagenda, agenda.nombre nombre, agenda.activa activa, agenda.idnino idnino ' +
         'FROM dia INNER JOIN agenda ON dia.idagenda = agenda.id WHERE agenda.id = ?', [id]);
        if (dias.length > 0) {
            return res.json(dias);
        }
        res.status(404).json({ text: "No existen dias creados" });
    }

    public async getOneDia(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const dias = await pool.query('SELECT * FROM dia WHERE id = ?', [id]);
        if (dias.length > 0) {
            return res.json(dias[0]);
        }
        res.status(404).json({ text: "No existe el dia" });
    }

    public async listTareasManana(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const tareas = await pool.query('SELECT tarea.id id, tarea.nombre nombre, tarea.horaInicio horaInicio, tarea.horaFinal horaFinal, tarea.duracion duracion, tarea.orden orden, tarea.estado estado, tarea.horario horario, tarea.idtareapadre idtareapadre, tarea.idpictograma idpictograma, tarea.iddia iddia, pictograma.id idpictograma, pictograma.pictoByN pictoByN, pictograma.pictoColor pictoColor, pictograma.pictoDibujo pictoDibujo, pictograma.pictoReal pictoReal, pictograma.nivel nivel, pictograma.categoria categoria, pictograma.idgaleria idgaleria '+
         'FROM tarea LEFT JOIN pictograma ON tarea.idpictograma = pictograma.id WHERE tarea.iddia = ? AND tarea.horario = "manana" ORDER BY tarea.orden ', [id]);
        if (tareas.length > 0) {
            return res.json(tareas);
        }
        res.status(404).json({ text: "No existen tareas creadas" });
    }

    public async listTareasTarde(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const tareas = await pool.query('SELECT tarea.id id, tarea.nombre nombre, tarea.horaInicio horaInicio, tarea.horaFinal horaFinal, tarea.duracion duracion, tarea.orden orden, tarea.estado estado, tarea.horario horario, tarea.idtareapadre idtareapadre, tarea.idpictograma idpictograma, tarea.iddia iddia, pictograma.id idpictograma, pictograma.pictoByN pictoByN, pictograma.pictoColor pictoColor, pictograma.pictoDibujo pictoDibujo, pictograma.pictoReal pictoReal, pictograma.nivel nivel, pictograma.categoria categoria, pictograma.idgaleria idgaleria '+
         'FROM tarea LEFT JOIN pictograma ON tarea.idpictograma = pictograma.id WHERE tarea.iddia = ? AND tarea.horario = "tarde" ORDER BY tarea.orden ', [id]);
        if (tareas.length > 0) {
            return res.json(tareas);
        }
        res.status(404).json({ text: "No existen tareas creadas" });
    }

    public async listTareasNoche(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const tareas = await pool.query('SELECT tarea.id id, tarea.nombre nombre, tarea.horaInicio horaInicio, tarea.horaFinal horaFinal, tarea.duracion duracion, tarea.orden orden, tarea.estado estado, tarea.horario horario, tarea.idtareapadre idtareapadre, tarea.idpictograma idpictograma, tarea.iddia iddia, pictograma.id idpictograma, pictograma.pictoByN pictoByN, pictograma.pictoColor pictoColor, pictograma.pictoDibujo pictoDibujo, pictograma.pictoReal pictoReal, pictograma.nivel nivel, pictograma.categoria categoria, pictograma.idgaleria idgaleria '+
         'FROM tarea LEFT JOIN pictograma ON tarea.idpictograma = pictograma.id WHERE tarea.iddia = ? AND tarea.horario = "noche" ORDER BY tarea.orden ', [id]);
        if (tareas.length > 0) {
            return res.json(tareas);
        }
        res.status(404).json({ text: "No existen tareas creadas" });
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const tareas = await pool.query('SELECT * FROM tarea WHERE tarea.id = ?', [id]);
        if (tareas.length > 0) {
            return res.json(tareas[0]);
        }
        res.status(404).json({ text: "La tarea no existe" });
    }

    public async create(req: Request, res: Response): Promise<any> {
        const result = await pool.query('INSERT INTO tarea set ?', [req.body]);
        res.json({ message: 'Tarea creada' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE tarea set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "Tarea actualizada" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM tarea WHERE id = ?', [id]);
        res.json({ message: "Tarea borrada" });
    }
}

export const tareasController = new TareasController;