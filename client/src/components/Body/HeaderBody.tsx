import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../../context/chat/ChatContext';
import { SocketContext } from '../../context/SocketContext';
import { socketEvents } from '../../config/socketEvents';

export const HeaderBody = () => {
  const { socket } = useContext(SocketContext);
  const { chatState } = useContext(ChatContext);

  const [userTyping, setUserTyping] = useState(null);

  useEffect(() => {
    if (socket === null) return;
    socket.on(socketEvents.CLIENT.TYPING, (a: any) =>
      chatState.activeChat === a ? setUserTyping(a) : null
    );
    socket.on(socketEvents.CLIENT.STOP_TYPING, () => setUserTyping(null));
  }, [chatState.activeChat, socket]);

  const user = chatState.users.find((user: any) =>
    user.uid === chatState.activeChat ? user.firstName : null
  );

  return (
        <div className="row body-heading">
          <div className="col-sm-1 col-xs-1">
              <div className="body-heading-avatar-icon">
                <img src={user.avatar} alt="" />
              </div>
          </div>
          <div className="col-sm-10 col-xs-10">
          <div className="col-sm-8 col-xs-10 body-heading-name">
                <h5> {user.firstName} {user.lastName}{" "} </h5> <span><small> {userTyping ? `${user.firstName} is typing` : null} </small></span>
          </div>
          </div>
          <div className="col-sm-1 col-xs-1 body-heading-online">
                {
                      ( user.online )
                      ? <span className="pull-right align-middle" style={{color : "#58D68D ", fontSize: "0.5em"}}><i className="fas fa-circle"></i></span>
                      : <span className="pull-right align-middle" style={{color : "#EC7063", fontSize: "0.5em"}}><i className="fas fa-circle"></i></span>
                }
          </div>
        </div>
  );
};
