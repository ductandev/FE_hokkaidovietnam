import React, { useContext, useState } from "react";
import { ToastOptions, toast } from "react-toastify";
import { useMutation } from "react-query";
import { useLocalStorage } from "@/Hooks/useLocalStorage";

import { UserLogin, UserRegister } from "@/Types/Auth.type";
import { loginUser, registerUser } from "@/Apis/Auth/Auth.api";
import { PREFIX } from "@/Hooks/useCartStorage";
import { httpGuard } from "@/lib/utils";

const toastOptions: ToastOptions<{}> = {
    position: "top-center",
    autoClose: 400,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
};

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
        },
        onError: (error: any) => {
            const mgs = error.response.data.message
            toast.error(mgs);
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

            // Xoá giỏ hàng local
            removeItem(PREFIX);


            // Thay đổi header instance của httpGuard 
            httpGuard.defaults.headers["authorization"] = `bearer ${token}`

            // Show message
            toast.success("Đăng nhập thành công!", toastOptions);
            // * Redirect sang admin page
        } catch (error) {
            console.log(error);
        }

    }

    const signUp = async (payload: UserRegister) => {
        try {
            const response = await mutateAsyncRegister(payload);

            // Show message
            toast.success("Đăng ký tài khoản thành công!");
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const signOut = () => {
        removeItem(HK_ROLE);  // ! Clear role
        removeItem(ACCESS_TOKEN_KEY); // ! Clear token
        removeItem(PREFIX); // ! Clear cart

        setIsLogin(false)
        setIsAdmin(false)

        toast.success('Đăng xuất thành công !', toastOptions);

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
