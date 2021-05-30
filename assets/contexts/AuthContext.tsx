import React, { useContext, useEffect, useState } from 'react'
import { Login } from '../api/Auth';

type ContextProps = {
    currentUser: any,
    executeLogin: any
}

type StateProps = {
    token: string
}

const AuthContext = React.createContext<Partial<ContextProps>>({});

export const useAuth = () => {
    return useContext(AuthContext);    
}

export const AuthProvider: React.FC = ({children}) => {
    const [currentUser, setCurrentUser] = useState<StateProps>({token: ""});

    const executeLogin = (email: string, password: string) => {
        Login(email, password)
        .then(data => setCurrentUser(data));
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
        executeLogin
    }
    return (
        <AuthContext.Provider value={value}>
           {children} 
        </AuthContext.Provider>
    )
}
