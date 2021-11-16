import React, { createContext, useReducer } from 'react';
import { chatReducer } from "./chatReducer"
import { initialState } from '../types/types';

export const ChatContext = createContext({} as any);
    
export const ChatProvider: React.FC  = ({ children }) => {

    const [ chatState, dispatch ] = useReducer(chatReducer, initialState);

    return (
        <ChatContext.Provider value={{
            chatState,
            dispatch
        }}>
            { children }
        </ChatContext.Provider>
    )
}