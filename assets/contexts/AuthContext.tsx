import React, { useContext, useEffect, useState } from 'react'
import { Login, Register } from '../api/Auth';
import { destroyToken } from '../utils/destroyToken';

type ContextProps = {
    currentUser: {token: string},
    executeLogin: any,
    removeToken: VoidFunction
}

type StateProps = {
    token: string 
}

const AuthContext = React.createContext<Partial<ContextProps>>({});

export const useAuth = () => {
    return useContext(AuthContext);    
}

export const AuthProvider: React.FC = ({children}) => {
    const [currentUser, setCurrentUser] = useState<StateProps>(() => {
        return {token: localStorage.getItem("token")}
    });

    const executeLogin = async (email: string, password: string) => {
        await Login(email, password)
        .then(data => setCurrentUser(data));
    }

    const executeRegister = (username: string, email: string, password: string) => {
        Register(username, email, password);
    }

    const removeToken = () => {
        destroyToken();
        setCurrentUser({...currentUser, token: ""});
    }

    useEffect(() => {
        if(currentUser.token === "") return;
        localStorage.setItem("token", currentUser.token);
    }, [currentUser.token]);

    useEffect(() => {
        setCurrentUser({...currentUser, token: localStorage.getItem('token')});
    }, [])

    const value = {
        currentUser,
        executeLogin,
        executeRegister,
        removeToken
    }
    
    return (
        <AuthContext.Provider value={value}>
           {children} 
        </AuthContext.Provider>
    )
}
