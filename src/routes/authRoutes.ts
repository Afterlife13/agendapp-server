import { Router } from 'express';

import { authController } from '../controllers/authController';

class AuthRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/getone/:id', authController.getOneName);
        this.router.get('/:id', authController.getOne);
        this.router.post('/registro', authController.create);
        this.router.put('/:id', authController.update);
        this.router.post('/login', authController.login);
        this.router.get('/logout', authController.logout);

    }

}

const authRoutes = new AuthRoutes();
export default authRoutes.router;