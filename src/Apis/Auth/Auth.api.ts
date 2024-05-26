import { http, httpGuard } from "@/lib/utils";

import { UserLogin, UserRegister } from '@/Types/Auth.type';

const Models = {
    signin: "auth/sign-in",
    signup: 'auth/sign-up',
    getInfo: 'auth/reload',
    forgotPassword: 'auth/forgot-password'
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
