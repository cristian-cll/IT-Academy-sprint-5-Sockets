import React, { useContext } from 'react'
import { ChatContext } from '../../../context/chat/ChatContext';


export const ChannelHeaderBody = () => {
	
	const { chatState } = useContext(ChatContext);

	const channel = chatState.channels.find((channel: any) =>
		channel.uid === chatState.activeChat ? channel.name : null
	);

	return (
			<div className="row body-heading">
			<div className="col-sm-1 col-xs-1">
				<div className="body-heading-avatar-icon">
					<img src="../images/icons/channel.png" alt="" />
				</div>
			</div>
			<div className="col-sm-10 col-xs-10">
			<div className="col-sm-8 col-xs-10 body-heading-name">
					<h5> {channel.name}  </h5> <small>  - Channel Chat </small>
			</div>
			</div>
			<div className="col-sm-1 col-xs-1 body-heading-online">
		
			</div>
			</div>
	);
};