"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
class AuthRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/getone/:id', authController_1.authController.getOneName);
        this.router.get('/:id', authController_1.authController.getOne);
        this.router.post('/registro', authController_1.authController.create);
        this.router.put('/:id', authController_1.authController.update);
        this.router.post('/login', authController_1.authController.login);
        this.router.get('/logout', authController_1.authController.logout);
    }
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
