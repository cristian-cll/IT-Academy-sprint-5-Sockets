import React, { useContext } from 'react';

import { ChatContext } from '../../context/chat/ChatContext';
import { fecthWithToken } from '../../helpers/fetch';
import { scrollToBottom } from '../../helpers/scrollToBottom';

import { types } from '../../context/types/types';

export const SidebarUserList = ({ user } : { user: any }) => {

    const { chatState, dispatch } = useContext( ChatContext );
    const { activeChat } = chatState;

    const onClick = async() => {

        dispatch({
            type: types.activateChat,
            payload: user.uid
        });

        // Cargar los mensajes del chat
        const resp = await fecthWithToken(`messages/${ user.uid }`);

        dispatch({
            type: types.loadMessages,
            payload: resp.messages
        });

        scrollToBottom('messages');
    }

    return (
        

          <div 
            className={`row sidebar-user ${ (user.uid === activeChat) && 'active_chat' }`}
            onClick={ onClick }
            title={`Talk with ${user.firstName} ${ user.lastName }!`}
          >
            <div className="col-sm-2 col-xs-2">
              <div className="sidebar-user-avatar">
                <img src={user.avatar} alt="" />
              </div>
            </div>
            <div className="col-sm-9 col-xs-9">
              <div className="row">
                <div className="col-sm-8 col-xs-8 sidebar-user-name">
                  <span > { user.firstName } { user.lastName } </span>
                </div>
              </div>
              <div className="row sidebar-user-email">
                <span> { user.email } </span>
              </div>
            </div>
            <div className="col-sm-1 col-xs-1 sidebar-user-status">
              {
                    ( user.online )
                        ? <i className="fas fa-circle" style={{color : "#58D68D"}} />
                        : <i className="fas fa-circle" style={{color : "#EC7063"}} />
              }
            </div>
          </div>
        
    )
}
