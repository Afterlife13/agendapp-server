import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
const bodyParser = require('body-parser');

//Rutas de la API
import agendasRoutes from './routes/agendasRoutes';
import ninosRoutes from './routes/ninosRoutes';
import authRoutes from './routes/authRoutes';
import tareasRoutes from './routes/tareasRoutes';
import pictogramasRoutes from './routes/pictogramasRoutes';

class Server {

    public app: Application;

    constructor(){
        this.app = express();

        //Settings
        this.app.set('port', process.env.PORT || 3000); // process.env.PORT || 3000

        //Middlewares
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json());
        
        //Routes
        this.routes();
    }
    

    routes(): void{
        this.app.use('/api/ninos', ninosRoutes);
        this.app.use('/api/auth', authRoutes);
        this.app.use('/api/agendas',agendasRoutes);
        this.app.use('/api/tareas', tareasRoutes);
        this.app.use('/api/pictogramas', pictogramasRoutes);
    }

    start(): void{
        this.app.listen(this.app.get('port'), () => {
            console.log('Server en puerto', this.app.get('port'))
        });
    }
}

const server = new Server();
server.start();