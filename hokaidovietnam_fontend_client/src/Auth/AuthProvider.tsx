import React, { useContext, useState } from "react";
import { useMutation } from "react-query";
import { useLocalStorage } from "@/Hooks/useLocalStorage";

import { UserLogin, UserRegister } from "@/Types/Auth.type";
import { loginUser, registerUser } from "@/Apis/Auth/Auth.api";

export interface authContextState {
    signIn: Function,
    signUp: Function,
    signOut: Function,
    isLogin: any
}

export interface AppProviderProps {
    children?: any;
}

export const AuthContext = React.createContext<authContextState>({
    signIn: () => { },
    signUp: () => { },
    signOut: () => { },
    isLogin: false
});

export const ACCESS_TOKEN_KEY = 'hk_tk_access';

export const AuthProvider = function (props: AppProviderProps) {
    const { setItem, removeItem, getItem } = useLocalStorage();

    const [isLogin, setIsLogin] = useState<any>(getItem(ACCESS_TOKEN_KEY));

    const { mutateAsync: mutateAsyncLogin }: any = useMutation({
        mutationFn: (body: UserLogin) => {
            return loginUser(body)
        }
    })

    const { mutateAsync: mutateAsyncRegister }: any = useMutation({
        mutationFn: (body: UserRegister) => {
            return registerUser(body)
        }
    })

    const signIn = async (payload: UserLogin) => {
        try {
            const response = await mutateAsyncLogin(payload);
            const token = response.data.content;
            setItem(ACCESS_TOKEN_KEY, token);
            setIsLogin(true)
        } catch (error) {
            console.log(error);
        }

    }

    const signUp = async (payload: UserRegister) => {
        try {
            await mutateAsyncRegister(payload);
        } catch (error) {
            console.log(error);
        }
    }

    const signOut = () => {
        // ! Clear token
        removeItem(ACCESS_TOKEN_KEY);
        setIsLogin(false)
    }

    const authContextState = {
        signIn,
        signUp,
        signOut,
        isLogin
    } as authContextState;

    return (
        <AuthContext.Provider value={authContextState}>
            {props.children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
};
