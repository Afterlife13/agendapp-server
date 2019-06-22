"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
const { database } = require('./keys');
//Rutas de la API
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const gamesRoutes_1 = __importDefault(require("./routes/gamesRoutes"));
const ninosRoutes_1 = __importDefault(require("./routes/ninosRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        require('./lib/passport');
        //Settings
        this.app.set('port', process.env.PORT || 3000);
        //Middlewares
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(session({
            secret: 'AgendappSessionKey',
            resave: false,
            saveUninitialized: false,
        }));
        this.app.use(flash());
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use(validator());
        this.app.use((req, res, next) => {
            //this.app.locals.message = req.flash('message');
            //this.app.locals.success = req.flash('success');
            this.app.locals.user = req.user;
            next();
        });
        //Routes
        this.routes();
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/api/games', gamesRoutes_1.default);
        this.app.use('/api/ninos', ninosRoutes_1.default);
        this.app.use('/api/auth', authRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server en puerto', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
