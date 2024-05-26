import { http, httpGuard } from "@/lib/utils";

import { UserLogin, UserRegister } from '@/Types/Auth.type';
import axios from "axios";

const Models = {
    signin: "auth/sign-in",
    signup: 'auth/sign-up',
    getInfo: 'auth/reload',
    forgotPassword: 'auth/forgot-password',
    resetPassword: 'auth/reset-password'
};

export const loginUser = (body: UserLogin) => {
    return http.post<UserLogin>(`${Models.signin}`, body)
}

export const registerUser = (body: UserRegister) => {
    return http.post<UserRegister>(`${Models.signup}`, body)
}

export const getInfo = (
    signal?: AbortSignal) =>
    httpGuard.get<any>(`${Models.getInfo}`, {
        signal
    });


export const postForgotPassword = (email: string) => {
    return http.post<string>(`${Models.forgotPassword}`, email)
}


export const postChangePassword = async (token: string, newPassword: string) => {
    const instance = axios.create({
        baseURL: process.env.REACT_APP_API_URL, // URL của API
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    return instance.put(`${Models.resetPassword}`, newPassword);
}