import { Router } from 'express';

import { tareasController } from '../controllers/tareasController';

class GamesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/:id', tareasController.listDias);
        this.router.get('/getonedia/:id', tareasController.getOneDia);
        this.router.get('/getmanana/:id', tareasController.listTareasManana);
        this.router.get('/gettarde/:id', tareasController.listTareasTarde);
        this.router.get('/getnoche/:id', tareasController.listTareasNoche);
        this.router.get('/getone/:id', tareasController.getOne);
        this.router.post('/', tareasController.create);
        this.router.put('/:id', tareasController.update);
        this.router.delete('/:id', tareasController.delete);
    }

}

const gamesRoutes = new GamesRoutes();
export default gamesRoutes.router;