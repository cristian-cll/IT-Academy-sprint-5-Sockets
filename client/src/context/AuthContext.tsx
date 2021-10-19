import React, {createContext, useCallback, useContext, useState} from "react"
import { fecthWithoutToken, fecthWithToken } from "../helpers/fetch";
import { types } from "./types/types";
import { ChatContext } from "./chat/ChatContext";


type State = {

    uid?: string | null,
    checking: boolean,
    logged: boolean,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    avatar?: string | undefined
}
  

const initialState: State = {

    uid: null,
    checking: false,
    logged: false,
    firstName: null,
    lastName: null,
    email: null,
    avatar: ""

}

export interface IAuth {
    googleLogin: (object:any) => Promise<any>;
    login: (email:string, Password: string) => Promise<object>;
    logout: () => void;
    verifyToken: () => void;
    register: (firstName: string, lastName: string, email: string, password: string, avatar: string) => Promise<any>;
    auth: State;
}

export const AuthContext = createContext<IAuth>({} as IAuth);


export const AuthProvider: React.FC = ({children})  => {


    const [auth, setAuth] = useState(initialState);
    const { dispatch } = useContext(ChatContext);

    
    const googleLogin = async (payload:any) => {


        if (payload.ok) {
            localStorage.setItem("token", payload.token)

            const {user} = payload;

            setAuth({
                uid: user.uid,
                checking: false,
                logged: true,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                avatar: user.avatar
            });
        }
    }

    const login = async (email: any, password: any) => {

        const res = await fecthWithoutToken('login', {email, password}, "POST")

        if (res.ok) {
            localStorage.setItem("token", res.token)

            const {user} = res;

            setAuth({
                uid: user.uid,
                checking: false,
                logged: true,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                avatar: user.avatar
            });

        }

        return res.ok;
    }

    const register = async (firstName: any, lastName:any, email: any, password: any, avatar: any) => {
        
        const res = await fecthWithoutToken('login/new', {firstName, lastName, email, password, avatar}, "POST");

        if (res.ok) {
            localStorage.setItem("token", res.token)

            const {user} = res;

            setAuth({
                uid: user.uid,
                checking: false,
                logged: true,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                avatar: user.avatar
            });

            return true;
        }

        return res.msg;
    }
    
    const verifyToken = useCallback( async () => {

        const token = localStorage.getItem('token');

        // If token doesn't exist
        if(!token) {

            setAuth({
                uid: null,
                checking: false,
                logged: false,
                firstName: null,
                lastName: null,
                email: null,
                avatar: undefined
            })

            return false;
        }

        // Renew the token
        const res = await fecthWithToken('login/renew');

        if (res.ok) {
            localStorage.setItem("token", res.token)

            const {user} = res;

            setAuth({
                uid: user.uid,
                checking: false,
                logged: true,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                avatar: user.avatar
            });

            return true;
        } else {
            setAuth({
                uid: null,
                checking: false,
                logged: false,
                firstName: null,
                lastName: null,
                email: null,
                avatar: undefined
        });

        return false;
        }
        
    }, []);

    const logout = () => {

        // delete localstorage
        localStorage.removeItem("token");

        dispatch({
            type: types.closeSession
        });
        
        setAuth({
            checking: false,
            logged: false,
        });

    }

    return (
        <AuthContext.Provider value={{
            googleLogin,
            auth,
            login,
            register,
            verifyToken,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}