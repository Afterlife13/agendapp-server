import { Router } from 'express';

import { ninosController } from '../controllers/ninosController';

class NinosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/:id', ninosController.list);
        this.router.get('/getone/:id', ninosController.getOne);
        this.router.post('/', ninosController.create);
        this.router.put('/:id', ninosController.update);
        this.router.delete('/:id', ninosController.delete);
        this.router.post('/link/', ninosController.link);
    }

}

const ninosRoutes = new NinosRoutes();
export default ninosRoutes.router;