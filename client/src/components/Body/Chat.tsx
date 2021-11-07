import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/chat/ChatContext';

import { IncomingMessage } from './PersonalMessage/messages/IncomingMessage';
import { OutgoingMessage } from './PersonalMessage/messages/OutgoingMessage';
import { InputMessage } from './PersonalMessage/InputMessage';
import { HeaderBody } from './PersonalMessage/HeaderBody';
import { ChannelHeaderBody } from './Channel/HeaderBody';
import { ChannelIncomingMessage } from './Channel/messages/IncomingMessage';
import { ChannelInputMessage } from './Channel/InputMessage';
import { ChannelOutgoingMessage } from './Channel/messages/OutgoingMessage';

export const MessagesList = () => {

    const { chatState } = useContext( ChatContext );
    const { auth } = useContext( AuthContext );

    const channels = chatState.channels;
    const uid = chatState.activeChat;
  
    const result = channels.filter((channel: { uid: any; }) => channel.uid === uid);


    if(result[0] !== undefined){

        return (
            <>
        
                <ChannelHeaderBody />
    
                {/* <!-- Historia inicio --> */}
                
                <div id="messages" className="msg_history">
                    {
                        chatState.messages && chatState.messages
                            .sort((a:any,b:any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
                            .map( (msg: { from: string | undefined; uid: React.Key | null | undefined; }) => (
                                //<ChannelIncomingMessage key={ msg.uid } msg={ msg } />
                                ( msg.from !== auth.uid )
                                ? <ChannelIncomingMessage key={ msg.uid } msg={ msg } />
                                : <ChannelOutgoingMessage key={ msg.uid } msg={ msg } />
                               
                            ))
                    }
                </div>
    
    
               <ChannelInputMessage />
            </>
        )

    }

    return (
        <>
        
            <HeaderBody />

            {/* <!-- Historia inicio --> */}
            
            <div id="messages" className="msg_history">
                {
                    chatState.messages && chatState.messages
                        .sort((a:any,b:any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
                        .map( (msg: { to: string | undefined; uid: React.Key | null | undefined; }) => (
                            ( msg.to === auth.uid )
                                ? <IncomingMessage key={ msg.uid } msg={ msg } />
                                : <OutgoingMessage key={ msg.uid } msg={ msg } />
                        ))
                }
            </div>

            <InputMessage />

        </>

    )
    
}
