import { Router } from 'express';

import { pictogramasController } from '../controllers/pictogramasController';

class PictogramasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/galeria/:id', pictogramasController.getGaleria);
        this.router.get('/:id', pictogramasController.list);
        this.router.get('/getone/:id', pictogramasController.getOne);
        this.router.get('/search/:id/:termino', pictogramasController.listBusqueda);
        this.router.post('/', pictogramasController.create);
        this.router.put('/:id', pictogramasController.update);
        this.router.delete('/:id', pictogramasController.delete);
    }

}

const pictogramasRoutes = new PictogramasRoutes();
export default pictogramasRoutes.router;