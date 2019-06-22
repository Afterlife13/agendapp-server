"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const bodyParser = require('body-parser');
//Rutas de la API
const agendasRoutes_1 = __importDefault(require("./routes/agendasRoutes"));
const ninosRoutes_1 = __importDefault(require("./routes/ninosRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const tareasRoutes_1 = __importDefault(require("./routes/tareasRoutes"));
const pictogramasRoutes_1 = __importDefault(require("./routes/pictogramasRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        //Settings
        this.app.set('port', process.env.PORT || 3000); // process.env.PORT || 3000
        //Middlewares
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        //Routes
        this.routes();
    }
    routes() {
        this.app.use('/api/ninos', ninosRoutes_1.default);
        this.app.use('/api/auth', authRoutes_1.default);
        this.app.use('/api/agendas', agendasRoutes_1.default);
        this.app.use('/api/tareas', tareasRoutes_1.default);
        this.app.use('/api/pictogramas', pictogramasRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server en puerto', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
