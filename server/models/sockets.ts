import { userConnected, userDisconnected, saveMessage, getUsers } from '../controllers/SocketController';
import { checkToken } from "../helpers/jwt";
import { socketEvents } from '../config/socketEvents';

export default class Sockets {
    io: any;

    constructor( io: any ) {

        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        // On user connecting
        this.io.on(socketEvents.connection, async( socket:any ) => {

            const [ isValid, uid ] = checkToken( socket.handshake.query['x-token']  );

            if ( !isValid ) {
                console.log('unidentified socket');
                return socket.disconnect();
            }

            await userConnected( uid );

            // On user joining a room, in this case a another user 
            socket.join( uid );

            // Sending the users-list
            this.io.emit( socketEvents.SERVER.USERS_LIST, await getUsers() );

            // Sending a personal message
            socket.on( socketEvents.SERVER.PERSONAL_MESSAGE, async( payload: { to: any; from: any; } ) => {
                const message = await saveMessage( payload );
                this.io.to( payload.to ).emit( socketEvents.SERVER.PERSONAL_MESSAGE, message );
                this.io.to( payload.from ).emit( socketEvents.SERVER.PERSONAL_MESSAGE, message );
            });

            // On user typing
            socket.on(socketEvents.SERVER.TYPING, (payload: { to: any;}) => {
                this.io.to(payload.to).emit(socketEvents.SERVER.TYPING, uid);
            });

            // On user stopping typing
            socket.on(socketEvents.SERVER.STOP_TYPING, (payload: { to: any;}) => {
                this.io.to(payload.to).emit(socketEvents.SERVER.STOP_TYPING);
            });
        
            // On user disconnecting
            socket.on(socketEvents.disconnection, async() => {
                await userDisconnected( uid );
                this.io.emit( socketEvents.SERVER.USERS_LIST, await getUsers() )
            })
            
        
        });
    }


}