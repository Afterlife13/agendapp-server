"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pictogramasController_1 = require("../controllers/pictogramasController");
class PictogramasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/galeria/:id', pictogramasController_1.pictogramasController.getGaleria);
        this.router.get('/:id', pictogramasController_1.pictogramasController.list);
        this.router.get('/getone/:id', pictogramasController_1.pictogramasController.getOne);
        this.router.get('/search/:id/:termino', pictogramasController_1.pictogramasController.listBusqueda);
        this.router.post('/', pictogramasController_1.pictogramasController.create);
        this.router.put('/:id', pictogramasController_1.pictogramasController.update);
        this.router.delete('/:id', pictogramasController_1.pictogramasController.delete);
    }
}
const pictogramasRoutes = new PictogramasRoutes();
exports.default = pictogramasRoutes.router;
