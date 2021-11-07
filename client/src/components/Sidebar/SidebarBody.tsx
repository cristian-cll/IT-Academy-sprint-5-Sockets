import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/chat/ChatContext';
import { SidebarUserList } from './SidebarUserList';
import { SidebarChannelsList } from './SidebarChannelsList';
import { CreateChannel } from './CreateChannel';

// Bootstrap features
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'


export const SidebarBody = () => {
	const { chatState } = useContext(ChatContext);
	const { auth } = useContext(AuthContext);

	const { uid } = auth;

	const [users, setUsers] = useState([]);
	const [channels, setChannels] = useState([]);

	const searchUsers = (value: any) => {
		setUsers(
			chatState.users.filter((user: any) =>
				(user.firstName.toLowerCase() + " " + user.lastName.toLowerCase()).includes(value.trim().toLowerCase())
			)
		);
	};

	const searchChannels = (value: any) => {
		setChannels(
			chatState.channels.filter((channel: any) =>
				(channel.name.toLowerCase()).includes(value.trim().toLowerCase())
			)
		);

	};

	useEffect(() => {
		setUsers(chatState.users);
		setChannels(chatState.channels);
	}, [chatState.channels, chatState.users]);

	return (
		<>

			<div className="sidebar-container-users">
				<Tabs defaultActiveKey="users" id="uncontrolled-tab-example" className="mb-3">
					<Tab eventKey="users" title="Users">
						<div className="row searchBox">
							<div className="col-sm-12">
								<input
									type="text"
									className="form-control"
									name="searchText"
									placeholder="Search contacts"
									onInput={(e:any) => searchUsers(e.target.value)}
								/>
							</div>
						</div>
						{
							users
								.filter( (user: { uid: string | undefined; }) => user.uid !== uid )
								.map( (user: { uid: React.Key | null | undefined; }) => (
									<SidebarUserList 
										key={ user.uid }
										user={ user }
									/>
								))
						}
					</Tab>
					<Tab eventKey="channels" title="Channels">
						<div className="row searchBox">
							<div className="col-sm-12">
								<input
									type="text"
									className="form-control"
									name="searchText"
									placeholder="Search channels"
									onInput={(e:any) => searchChannels(e.target.value)}
								/>
							</div>
						</div>
						<CreateChannel />
						{
							channels
							/* chatState && chatState.channels */
								.map((channel: { uid: React.Key | null | undefined; }) => (
								<SidebarChannelsList 
									key={channel.uid}
									channel={channel}
								/>
							))
						}
					
					</Tab>
				</Tabs>
			</div>

		</>
	);
};