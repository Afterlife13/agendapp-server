import { Request, Response } from 'express';

import pool from '../database';

class AgendasController {

    /*LISTA DE AGENDAS*/
    public async list(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const agendas = await pool.query('SELECT * FROM agenda WHERE idnino = ?', [id]);
        console.log(agendas.length);
        if (agendas.length > 0) {
            return res.json(agendas);
        }
        res.status(404).json({ text: "No existen agendas creadas" });
    }

    public async activate(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const agendas = await pool.query('SELECT * FROM agenda WHERE id = ?', [id]);
        const idnino = agendas[0].idnino;
        
        await pool.query('UPDATE agenda SET activa = 0 WHERE idnino = ?', idnino);
        await pool.query('UPDATE agenda SET activa = 1 WHERE id = ? AND idnino = ?', [id, idnino]);
        
        res.json({ message: "Agenda activada" });
    }

    public async deactivate(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const agendas = await pool.query('SELECT * FROM agenda WHERE id = ?', [id]);
        const idnino = agendas[0].idnino;
        await pool.query('UPDATE agenda SET activa = 0 WHERE id = ? AND idnino = ?', [id, idnino]);
        res.json({ message: "Agenda desactivada" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM dia WHERE idagenda = ?', [id]);
        await pool.query('DELETE FROM agenda WHERE id = ?', [id]);
        res.json({ message: "Agenda borrada" });
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const agenda = await pool.query('SELECT * FROM agenda WHERE id = ?', [id]);
        if (agenda.length > 0) {
            return res.json(agenda[0]);
        }
        res.status(404).json({ text: "La agenda no existe" });
    }

    public async create(req: Request, res: Response): Promise<any> {
        const result = await pool.query('INSERT INTO agenda set ?', [req.body]);
        req.body.id = result.insertId;
        await pool.query('INSERT INTO dia set dia="Lunes", idagenda= ?', req.body.id);
        await pool.query('INSERT INTO dia set dia="Martes", idagenda= ?', req.body.id);
        await pool.query('INSERT INTO dia set dia="Miércoles", idagenda= ?', req.body.id);
        await pool.query('INSERT INTO dia set dia="Jueves", idagenda= ?', req.body.id);
        await pool.query('INSERT INTO dia set dia="Viernes", idagenda= ?', req.body.id);
        await pool.query('INSERT INTO dia set dia="Sábado", idagenda= ?', req.body.id);
        await pool.query('INSERT INTO dia set dia="Domingo", idagenda= ?', req.body.id);
        
        res.json({ message: 'Agenda guardada' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE agenda set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "Agenda actualizada" });
    }

    public async link(req: Request, res: Response): Promise<any>{
        const rows = await pool.query('SELECT * FROM agenda WHERE id = ?', [req.body.id]);
        if (rows.length > 0){
            const agenda = rows[0];

        agenda.id = null;
        agenda.idnino = req.body.idnino;
        await pool.query('INSERT INTO agenda set ?', agenda);
        res.json({ message: "Agenda vinculada y añadida" });

        }else{
        return res.status(404).json({ text: "La agenda no existe" });
        }
    }
}

export const agendasController = new AgendasController;