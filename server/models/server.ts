// Express server
import  express, {Application} from "express";
import { createServer, Server as HttpServer } from "http";
import { Server as socketio } from "socket.io";
import path from "path";
import cors from "cors";
import { authRouter } from "../routes/auth";
import { messagesRouter } from "../routes/messages";
import Sockets from './sockets';
import { dbConnection } from '../database/config';
import { channelRouter } from "../routes/channel";

export class Server {
    private readonly app: Application;
    private readonly port: number | undefined | string;
    private readonly server: HttpServer;
    private readonly io: socketio;

    constructor() {

        this.app  = express();
        this.port = process.env.PORT;

        // Connect to DB
        dbConnection();

        // Http server
        this.server = createServer( this.app );
        
        // Configuraciones de sockets
        this.io = new socketio( this.server, { /* options */ } );

        this.middlewares();
    }

    private middlewares() {

        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );
        this.app.use( cors() );
        this.app.use( express.json() );
        
        // API End Points
        this.app.use( '/api/login', authRouter );
        this.app.use( '/api/messages', messagesRouter );
        this.app.use( '/api/channel', channelRouter );
    }

    private setSockets() {
        new Sockets( this.io );
    }

    execute() {

        // Initializing sockets
        this.setSockets();

        // Initializing server
        this.server.listen( this.port, () => {
            console.log('Server listening on port:', this.port );
        });
    }

}