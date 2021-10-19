import React from 'react';
import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import { AppRouter } from "./router/AppRouter";
import { ChatProvider } from "./context/chat/ChatContext";

function ChatApp() {
  return (
    <ChatProvider>
      <AuthProvider>
        <SocketProvider>
          <AppRouter />
        </SocketProvider>
      </AuthProvider>
    </ChatProvider>
  );
}

export default ChatApp;
