import { http } from "@/lib/utils";

import { UserLogin, UserRegister } from '@/Types/Auth.type';

const Models = {
    signin: "auth/sign-in",
    signup: 'auth/sign-up'
};

export const loginUser = (body: UserLogin) => {
    return http.post<UserLogin>(`${Models.signin}`, body)
}

export const registerUser = (body: UserRegister) => {
    return http.post<UserRegister>(`${Models.signup}`, body)
}

