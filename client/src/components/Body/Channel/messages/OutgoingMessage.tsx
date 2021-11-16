import React from 'react'
import { getTime } from '../../../../helpers/getTime'

export const ChannelOutgoingMessage = ({ msg }: { msg: any }) => {
  return (
    <div className="outgoing_msg">
      <div className="sent_msg">
        <p>{msg.message}</p>
        <span className="time_date"> {getTime(msg.createdAt)} </span>
      </div>
    </div>
  );
};