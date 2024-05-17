import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { useLocalStorage } from "@/Hooks/useLocalStorage";

import { UserLogin, UserRegister } from "@/Types/Auth.type";
import { loginUser, registerUser } from "@/Apis/Auth/Auth.api";

export interface authContextState {
    signIn: Function,
    signUp: Function,
    signOut: Function,
    isLogin: any
    isAdmin: boolean
}

export interface AppProviderProps {
    children?: any;
}

export const AuthContext = React.createContext<authContextState>({
    signIn: () => { },
    signUp: () => { },
    signOut: () => { },
    isLogin: false,
    isAdmin: false,
});

export const ACCESS_TOKEN_KEY = 'hk_tk_access';
export const HK_ROLE = "hk_role";

export const AuthProvider = function (props: AppProviderProps) {
    const { setItem, removeItem, getItem } = useLocalStorage();

    const [isLogin, setIsLogin] = useState<any>(getItem(ACCESS_TOKEN_KEY));
    const getDefaultRole: any = getItem(HK_ROLE) || 0
    const [isAdmin, setIsAdmin] = useState<boolean>(parseInt(getDefaultRole) === 1);

    const { mutateAsync: mutateAsyncLogin }: any = useMutation({
        mutationFn: (body: UserLogin) => {
            return loginUser(body)
        },
        onError: (error: any) => {
            const mgs = error.response.data.message
            toast.error(mgs);
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
            const token = response.data.token;
            setItem(ACCESS_TOKEN_KEY, token);
            setItem(HK_ROLE, response.data.content.vai_tro_id);
            setIsLogin(true);
            setIsAdmin(response.data.content.vai_tro_id === 1);

            toast.success("Đăng nhập thành công!");
            // * Redirect sang admin page
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
        removeItem(HK_ROLE);
        removeItem(ACCESS_TOKEN_KEY);
        setIsLogin(false)
        setIsAdmin(false)
    }

    const authContextState = {
        signIn,
        signUp,
        signOut,
        isLogin,
        isAdmin
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
