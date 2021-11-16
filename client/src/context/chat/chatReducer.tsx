import { types } from "../types/types";


export const chatReducer = ( state: any, action:any ) => {


    switch ( action.type ) {

        case types.closeSession:
            return {
                uid: '',
                activeChat: null,
                users: [], 
                messages: [],
                channels: [...state.channels]
            }
        
        
        case types.usersLoaded:
            return {
                ...state,
                users: [ ...action.payload ]
            }
        
        case types.activateChat:
            if ( state.activeChat === action.payload ) return state;

            return {
                ...state,
                activeChat: action.payload,
                messages: []
            }


        case types.newMessage:
            if ( state.activeChat === action.payload.from || 
                 state.activeChat === action.payload.to   
            ) {
                //const messages = state.messages || [];
                
                return {
                    ...state,
                    //messages: [ ...messages, action.payload ]
                    messages: [ ...state.messages, action.payload ]
                }
            } else {
                return state;
            }
            
        case types.loadMessages:
            return {
                ...state,
                messages: action.payload
            }

        case types.channelMessage:
            if ( state.activeChat === action.payload.to ) {
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };
            } else {
                return state;
            }

        case types.channelCreated:
            return {
                ...state,
                channels: [...state.channels, action.payload],
            };

        case types.channelsList:
            return {
                ...state,
                channels: [...action.payload],
            };
            
        default:
            return state;
    }

}