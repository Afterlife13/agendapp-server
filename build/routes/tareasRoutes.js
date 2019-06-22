"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tareasController_1 = require("../controllers/tareasController");
class TareasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:id', tareasController_1.tareasController.listDias);
        this.router.get('/getonedia/:id', tareasController_1.tareasController.getOneDia);
        this.router.get('/getmanana/:id', tareasController_1.tareasController.listTareasManana);
        this.router.get('/gettarde/:id', tareasController_1.tareasController.listTareasTarde);
        this.router.get('/getnoche/:id', tareasController_1.tareasController.listTareasNoche);
        this.router.get('/getone/:id', tareasController_1.tareasController.getOne);
        this.router.post('/', tareasController_1.tareasController.create);
        this.router.put('/:id', tareasController_1.tareasController.update);
        this.router.delete('/:id', tareasController_1.tareasController.delete);
    }
}
const tareasRoutes = new TareasRoutes();
exports.default = tareasRoutes.router;
