import React, { useContext, useRef, useState } from 'react';

import { AuthContext } from '../../../context/AuthContext';
import { ChatContext } from '../../../context/chat/ChatContext';
import { SocketContext } from '../../../context/SocketContext';
import { Picker } from 'emoji-mart';
import { socketEvents } from '../../../config/socketEvents';
import 'emoji-mart/css/emoji-mart.css'


export const InputMessage = () => {

    const [ message, setMessage ] = useState('');

    const [showEmoji, setShowEmoji] = useState(false);

    const emojiSelector: any = useRef();

    const { socket } : any = useContext( SocketContext );
    const { auth } = useContext( AuthContext );
    const { chatState } = useContext( ChatContext );

    const addEmoji = (e: any) => {
        let emoji = e.native;
        setMessage(prevMessage => prevMessage + emoji);
    };

    const handleAppClick = (e: any) => {
        !showEmoji ? setShowEmoji(true) : setShowEmoji(false); 
    }

    const onChange = ({ target } : { target: any}) => {
        setMessage( target.value );
    }


    const onSubmit = (ev: { preventDefault: () => void; }) => {
        ev.preventDefault();

        if ( message.length === 0 ){ return; }
        setMessage('');

        socket.emit( socketEvents.CLIENT.PERSONAL_MESSAGE, {
            from: auth.uid,
            to: chatState.activeChat,
            message
        });
    }


    const handleKeyUp = () => {

        socket.emit( socketEvents.CLIENT.TYPING, {
            to: chatState.activeChat,
        });

    }

    const stop = () => {
        setTimeout(()=> {
            socket.emit( socketEvents.CLIENT.STOP_TYPING, {
                to: chatState.activeChat,
            });
        },1000)

    }

    return (
        <form onSubmit={ onSubmit }>
            <div className="row body-input">
                
            <div className="col-sm-1 col-xs-1 body-input-emoji">
            <i 
                className="far fa-laugh"
                onClick={(e) => handleAppClick(e)} 
            ></i>

            </div>
            <div className="col-sm-10 col-xs-10">
            { showEmoji && 
                    (<span 
                        ref={el => emojiSelector.current = el} 
                        style={{ position: 'absolute', bottom: 60, left: 0}}>
                        <Picker onSelect={addEmoji} emojiSize={20} />
                    </span>)
                }
            <input 
                    type="text"
                    className="form-control" 
                    placeholder="Message..."
                    value={ message }
                    onChange={ onChange }
                    onKeyUp={() => {handleKeyUp(); stop()}}
            />
            </div>
            <div className="col-sm-1 col-xs-1 body-input-send">
                <i 
                className="fas fa-paper-plane" 
                aria-hidden="true"
                onClick={onSubmit} 
                />
            </div>
            </div>
        </form>
    )
}