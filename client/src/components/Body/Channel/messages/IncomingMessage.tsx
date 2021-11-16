import React, { useEffect, useState } from 'react';
import { fetchWithToken } from '../../../../helpers/fetch';
import { getTime } from '../../../../helpers/getTime';
import { scrollToBottom } from '../../../../helpers/scrollToBottom';

export const ChannelIncomingMessage = ({ msg }: { msg: any }) => {
	const [user, setUser] = useState("");

	useEffect(() => {
		fetchWithToken(`channel/users/${msg.from}`)
			.then((response:any) => {
				setUser(response.user.firstName);
				scrollToBottom("message");
			});
	}, [msg.from]);

	return (
		<div className="incoming_msg">
			<div className="received_msg">
				<p>
					<span className="channel_user_from"> {user} said: </span>
					{msg.message}
				</p>
				<span className="time_date"> {getTime(msg.createdAt)}</span>
			</div>
		</div>
	);
};