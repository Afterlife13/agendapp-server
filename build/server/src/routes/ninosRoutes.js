"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ninosController_1 = require("../controllers/ninosController");
class GamesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', ninosController_1.ninosController.list);
        this.router.get('/:id', ninosController_1.ninosController.getOne);
        this.router.post('/', ninosController_1.ninosController.create);
        this.router.put('/:id', ninosController_1.ninosController.update);
        this.router.delete('/:id', ninosController_1.ninosController.delete);
    }
}
const gamesRoutes = new GamesRoutes();
exports.default = gamesRoutes.router;
