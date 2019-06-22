import { Request, Response } from 'express';
import pool from '../database';
const helpers =  require('../lib/helpers');
const bcrypt = require('bcryptjs');

class AuthController {

    public async getOneName(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const users = await pool.query('SELECT * FROM user WHERE id = ?', [id]);
        if (users.length > 0) {
            return res.json(users[0].nombre);
        }
        res.status(404).json({ text: "El usuario no existe" });
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const users = await pool.query('SELECT * FROM user WHERE id = ?', [id]);
        if (users.length > 0) {
            users[0].contrasena = null;
            return res.json(users[0]);
        }
        res.status(404).json({ text: "El usuario no existe" });
    }

    public async create(req: Request, res: Response): Promise<any> {

        const rows = await pool.query('SELECT * FROM user WHERE email = ?', [req.body.email]);
        if (rows.length > 0){
            return res.status(400).json({ text:'Usuario existente'});
        }

        req.body.contrasena = await bcrypt.hash(req.body.contrasena, 10);
        const result = await pool.query('INSERT INTO user set ?', [req.body]);
        req.body.id = result.insertId;
        pool.query('INSERT INTO galeria set iduser = ?', req.body.id)
        return res.send({token: req.body.id})
        
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        req.body.contrasena = await bcrypt.hash(req.body.contrasena, 10);
        await pool.query('UPDATE user set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "Tutor actualizado" });
    }

    public async login(req: Request, res: Response): Promise<any>{
        const rows = await pool.query('SELECT * FROM user WHERE email = ?', [req.body.email]);
        if (rows.length > 0){
            const user = rows[0];
            const validPassword = await bcrypt.compare(req.body.contrasena, user.contrasena)
        if (validPassword){
        return res.send({token: user.id})
        }else{
        return res.status(404).json({ text: "Contraseña incorrecta" });
        }

        }else{
        return res.status(404).json({ text: "Usuario no existente" });
        }
        
    }

    public async logout(){
        
    }

}

export const authController = new AuthController;