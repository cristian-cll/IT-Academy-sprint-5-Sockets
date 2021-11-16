import { useCallback, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Socket } from "socket.io-client";
import { socketEvents } from '../config/socketEvents';


export const useSocket = ( serverPath: string ) => {
    
    const [ socket, setSocket ] = useState<Socket | null >(null)
    const [ online, setOnline ] = useState(false);

    const connectSocket = useCallback( () => {

        const token = localStorage.getItem('token') || "{}"

        const socketTemp = io( serverPath, { 
            transports: ['websocket'],
            autoConnect: true,
            forceNew: true,
            query: {
                'x-token': token
            }
        });
        setSocket( socketTemp );
    },[ serverPath ]);

    const disconnectSocket = useCallback( () => {
        if(socket === null) return;
        socket.disconnect();
    },[ socket ]);

    
    useEffect(() => {
        if(socket === null) return;
        setOnline( socket.connected );
    }, [socket])

    useEffect(() => {
        if(socket === null) return;
        socket.on(socketEvents.connection, () => setOnline( true ));
    }, [ socket ])

    useEffect(() => {
        if(socket === null) return;
        socket.on(socketEvents.disconnection, () => setOnline( false ));
    }, [ socket ])

    

    return {
        socket,
        online,
        connectSocket,
        disconnectSocket,
    }
}