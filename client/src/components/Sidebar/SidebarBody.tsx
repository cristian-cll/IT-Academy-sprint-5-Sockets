import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/chat/ChatContext';
import { SidebarUserList } from './SidebarUserList';

export const SidebarBody = () => {
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);

  const { uid } = auth;

  const [users, setUsers] = useState([]);

  const searchUsers = (value: any) => {
    setUsers(
      chatState.users.filter((user: any) =>
        (user.firstName.toLowerCase() + " " + user.lastName.toLowerCase()).includes(value.trim().toLowerCase())
      )
    );
  };

  useEffect(() => {
    setUsers(chatState.users);
  }, [chatState.users]);

  return (
    <>
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
        <div className="sidebar-container-users">
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
      </div>
    
    </>
  );
};