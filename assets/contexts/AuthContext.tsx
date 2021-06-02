import React, { useContext, useEffect, useState } from 'react'
import { Login, Register } from '../api/Auth';
import { destroyToken } from '../utils/destroyToken';

type ContextProps = {
    currentUser: {token: string},
    executeLogin: any,
    removeToken: VoidFunction,
    user: {
        id: number,
        email: string
    }
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
    const [user, setUser] = useState<{id: number, email: string}>({id:1, email:""});

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

        fetch("/api/user/get-current", {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `BEARER ${currentUser.token}`
            }
        }).then(response => response.json())
        .then(data => setUser(data));
    }, [currentUser.token]);

    useEffect(() => {
        setCurrentUser({...currentUser, token: localStorage.getItem('token')});
    }, [])

    const value = {
        currentUser,
        executeLogin,
        executeRegister,
        removeToken,
        user
    }
    
    return (
        <AuthContext.Provider value={value}>
           {children} 
        </AuthContext.Provider>
    )
}
