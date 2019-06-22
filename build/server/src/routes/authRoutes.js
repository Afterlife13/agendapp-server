"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const passport = require('passport');
const helpers = require('../lib/helpers');
const bcrypt = require('bcryptjs');
//const { isLoggedIn } = require('../lib/auth');
class AuthRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', authController_1.authController.list);
        this.router.post('/registro', authController_1.authController.create);
        this.router.post('/login', authController_1.authController.login);
        this.router.get('/logout', authController_1.authController.logout);
    }
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
