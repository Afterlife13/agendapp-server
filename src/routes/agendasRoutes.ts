import { Router } from 'express';

import { agendasController } from '../controllers/agendasController';

class AgendasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //LISTA DE AGENDAS
        this.router.get('/:id', agendasController.list);
        this.router.get('/activar/:id', agendasController.activate);
        this.router.get('/desactivar/:id', agendasController.deactivate);
        this.router.delete('/:id', agendasController.delete);
        
        //AGENDA
        this.router.put('/:id', agendasController.update)
        this.router.get('/getone/:id', agendasController.getOne);
        this.router.post('/', agendasController.create);
        this.router.post('/link/', agendasController.link);
    }

}

const agendasRoutes = new AgendasRoutes();
export default agendasRoutes.router;