import React, { useContext } from 'react';

import { ChatContext } from '../../context/chat/ChatContext';
import { fetchWithToken } from '../../helpers/fetch';
import { scrollToBottom } from '../../helpers/scrollToBottom';

import { types } from '../../context/types/types';

export const SidebarChannelsList = ({ channel } : { channel: any }) => {

    const { chatState, dispatch } = useContext( ChatContext );
    const { activeChat } = chatState;

    const onClick = async() => {

        dispatch({
            type: types.activateChat,
            payload: channel.uid
        });

        // Cargar los mensajes del canal
        const resp = await fetchWithToken(`messages/channel/${ channel.uid }`);

        dispatch({
            type: types.loadMessages,
            payload: resp.messages
        });

        scrollToBottom('messages');
    }

    return (
        <div
			className={`row sidebar-user ${ (channel.uid === activeChat) && 'active_chat' }`}
			onClick={onClick}
			title={`Join to ${channel.name} ${ channel.type }!`}
			id="sidebarItem"
      	>
            <div className="col-sm-2 col-xs-2">
				<div className="sidebar-user-avatar">
					<img src="../images/icons/channel.png" alt="" />
				</div>
            </div>
            <div className="col-sm-9 col-xs-9">
				<div className="row">
					<div className="col-sm-8 col-xs-8 sidebar-user-name">
						<span > { channel.name } - Channel </span>
					</div>
				</div>
				<div className="row sidebar-user-email">
						<span> { channel.type } </span>
				</div>
            </div>
        </div>
    )
}