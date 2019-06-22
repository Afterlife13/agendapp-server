import { Request, Response } from 'express';

import pool from '../database';

class PictogramasController {

    public async getGaleria(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const pictogramas = await pool.query('SELECT * FROM galeria WHERE iduser = ?', [id]);
        if (pictogramas.length > 0) {
            return res.json(pictogramas[0].id);
        }
        res.status(404).json({ text: "No existe la galeria" });
    }

    public async list(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const pictogramas = await pool.query('SELECT * FROM pictograma WHERE idgaleria = ? ORDER BY nombre', [id]);
        if (pictogramas.length > 0) {
            return res.json(pictogramas);
        }
        res.status(404).json({ text: "No existen pictogramas creados" });
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const pictogramas = await pool.query('SELECT * FROM pictograma WHERE id = ?', [id]);
        if (pictogramas.length > 0) {
            return res.json(pictogramas[0]);
        }
        res.status(404).json({ text: "El pictograma no existe" });
    }

    public async create(req: Request, res: Response): Promise<any> {
        const rows = await pool.query('SELECT * FROM pictograma WHERE nombre = ? AND idgaleria = ?', [req.body.nombre, req.body.idgaleria]);
        if (rows.length > 0){
            return res.status(400).json({ text:'Nombre existente'});
        }
        await pool.query('INSERT INTO pictograma set ?', [req.body]);

        const pictograma = await pool.query('SELECT * FROM pictograma WHERE nombre = ? AND idgaleria = ?', [req.body.nombre, req.body.idgaleria]);
        res.json(pictograma[0]);
    }

    public async update(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        await pool.query('UPDATE pictograma set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "Pictograma actualizado" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE tarea set idpictograma = NULL WHERE idpictograma = ?', [id])
        await pool.query('DELETE FROM pictograma WHERE id = ?', [id]);
        res.json({ message: "Pictograma borrado" });
    }

    public async listBusqueda(req: Request, res: Response): Promise<any> {
        const { id, termino } = req.params;
        const pictogramas = await pool.query('SELECT * FROM pictograma WHERE idgaleria = ? AND nombre LIKE "%"?"%" ORDER BY nombre', [id, termino]);
        if (pictogramas.length > 0) {
            return res.json(pictogramas);
        }
        res.status(404).json({ text: "No existen pictogramas creados" });
    }

}

export const pictogramasController = new PictogramasController;