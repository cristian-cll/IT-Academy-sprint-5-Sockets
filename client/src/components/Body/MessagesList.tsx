import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/chat/ChatContext';

import { IncomingMessage } from './messages/IncomingMessage';
import { OutgoingMessage } from './messages/OutgoingMessage';
import { InputMessage } from './InputMessage';
import { HeaderBody } from './HeaderBody';

export const MessagesList = () => {

    const { chatState } = useContext( ChatContext );
    const { auth } = useContext( AuthContext );


    return (
        <>
            <HeaderBody />
            {/* <!-- Historia inicio --> */}


{/* <!-- Historia inicio --> */}
        <div 
            id="messages"
            className="msg_history"
        >
                {
                    chatState.messages && chatState.messages
                    .sort((a:any,b:any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
                    .map( (msg: { to: string | undefined; _id: React.Key | null | undefined; }) => (
                        ( msg.to === auth.uid )
                            ? <IncomingMessage key={ msg._id } msg={ msg } />
                            : <OutgoingMessage key={ msg._id } msg={ msg } />
                    ))
                }

        </div>


           <InputMessage />
        </>
    )
}
