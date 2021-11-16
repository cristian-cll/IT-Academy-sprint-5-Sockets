import React from 'react';
import { getTime } from '../../../../helpers/getTime';

export const IncomingMessage = ({ msg }: { msg: any }) => {

  return (
    <div className="incoming_msg">
      <div className="received_msg">
          <p>{msg.message}</p>
          <span className="time_date"> {getTime(msg.createdAt)}</span>
      </div>
    </div>
  );
};