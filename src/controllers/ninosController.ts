import { Request, Response } from 'express';

import pool from '../database';

class NinosController {

    public async prueba(req: Request, res: Response): Promise<any> {
        return res.json("Servidor funcionando")
    }

    public async list(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const ninos = await pool.query('SELECT * FROM nino WHERE iduser = ?', [id]);
        if (ninos.length > 0) {
            return res.json(ninos);
        }
        res.status(404).json({ text: "No existen niños creados" });
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const ninos = await pool.query('SELECT * FROM nino WHERE id = ?', [id]);
        if (ninos.length > 0) {
            return res.json(ninos[0].nombre);
        }
        res.status(404).json({ text: "El niño no existe" });
    }

    public async create(req: Request, res: Response): Promise<any> {
        const rows = await pool.query('SELECT * FROM nino WHERE nick = ?', [req.body.nick]);
        if (rows.length > 0){
            return res.status(400).json({ text:'Usuario existente'});
        }
        const result = await pool.query('INSERT INTO nino set ?', [req.body]);
        res.json({ message: 'Niño guardado' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE nino set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "Niño actualizado" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM nino WHERE id = ?', [id]);
        res.json({ message: "Niño borrado" });
    }

    public async link(req: Request, res: Response): Promise<any>{
        const rows = await pool.query('SELECT * FROM nino WHERE nick = ?', [req.body.nick]);
        if (rows.length > 0){
            const nino = rows[0];

        if (nino.pin == req.body.pin){
        nino.id = null;
        nino.iduser = req.body.iduser;
        await pool.query('INSERT INTO nino set ?', nino);
        res.json({ message: "Niño vinculado y añadido" });
        }else{
        return res.status(404).json({ text: "Pin incorrecto" });
        }

        }else{
        return res.status(404).json({ text: "El niño no existe" });
        }
    }
}

export const ninosController = new NinosController;