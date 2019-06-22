"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const agendasController_1 = require("../controllers/agendasController");
class AgendasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //LISTA DE AGENDAS
        this.router.get('/:id', agendasController_1.agendasController.list);
        this.router.get('/activar/:id', agendasController_1.agendasController.activate);
        this.router.get('/desactivar/:id', agendasController_1.agendasController.deactivate);
        this.router.delete('/:id', agendasController_1.agendasController.delete);
        //AGENDA
        this.router.put('/:id', agendasController_1.agendasController.update);
        this.router.get('/getone/:id', agendasController_1.agendasController.getOne);
        this.router.post('/', agendasController_1.agendasController.create);
        this.router.post('/link/', agendasController_1.agendasController.link);
    }
}
const agendasRoutes = new AgendasRoutes();
exports.default = agendasRoutes.router;
