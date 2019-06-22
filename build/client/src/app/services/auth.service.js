"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let AuthService = class AuthService {
    constructor(http) {
        this.http = http;
        // OJO!
        // CAMBIAR AL MUDAR A HEROKU
        this.url = 'http://localhost:3000';
        // this.leerToken();
    }
    login(tutor) {
        const authData = Object.assign({}, tutor);
        return this.http.post(`${this.url}/api/auth/login`, authData);
    }
    crearTutor(tutor) {
        const authData = Object.assign({}, tutor);
        return this.http.post(`${this.url}/api/auth/registro`, authData);
    }
    logout(tutor) {
    }
    guardarToken(idToken) {
        this.userToken = idToken;
        localStorage.setItem('token', idToken);
    }
    leerToken() {
        if (localStorage.getItem('token')) {
            this.userToken = localStorage.getItem('token');
        }
        else {
            this.userToken = '';
        }
        return this.userToken;
    }
};
AuthService = __decorate([
    core_1.Injectable({
        providedIn: 'root'
    })
], AuthService);
exports.AuthService = AuthService;
