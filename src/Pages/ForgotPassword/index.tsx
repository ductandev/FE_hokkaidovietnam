import InputFrm from "@/Components/Input/InputFrm";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import { postForgotPassword } from "@/Apis/Auth/Auth.api";
import Loading from "@/Components/Loading/Loading";
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export interface UserForgotPasswordFrm {
    email: string;
}

export default function ForgotPassword() {
    const keywordRef = useRef('');
    const [keyword, setKeyword] = useSearchParams();
    console.log("🚀 keyword:", keyword);

    // const getTokenKeyword = async (keyword) => {
    //     const result = await axios({
    //         url: `http://localhost:3000/forgot-password?token=${keyword}`,
    //         method: 
    //     })
    // }

    // useEffect(() => {
    //     const kWord = keyword.get('token');
    //     if(kWord !== ''){

    //     }
    // })


    const { isLoading, mutateAsync }: any = useMutation({
        mutationFn: (email: string) => {
            return postForgotPassword(email);
        },
        onSuccess: () => {
            toast.success(`Đã gửi email đổi mật khẩu!`, {
                position: "top-center",
            });
        },
        onError: () => {
            toast.error(`Đã xảy ra lỗi`, {
                position: "top-center",
            });
        },
    });

    const loginFrm = useFormik<UserForgotPasswordFrm>({
        initialValues: {
            email: "",
        },
        validationSchema: yup.object().shape({
            email: yup
                .string()
                .required("Email không được bỏ trống!")
                .email("Email không hợp lệ!"),
        }),
        onSubmit: (values: UserForgotPasswordFrm) => {
            mutateAsync(values);
        },
    });

    return (
        <>
            {isLoading ? (
                <Loading></Loading>
            ) : (
                <div className="container mx-auto pt-[50px] leading-none">
                    <form
                        className="sm:w-[564px] max-w-full mx-auto"
                        onSubmit={loginFrm.handleSubmit}
                    >
                        <p className="text-zinc-400 mb-[30px]">
                            Bạn đã quên mật khẩu? Vui lòng nhập địa chỉ email của bạn. Bạn sẽ nhận được liên kết để tạo mật khẩu mới qua email.
                        </p>

                        <div className="mb-[32px]">
                            <InputFrm
                                id="email"
                                name="email"
                                label="Email"
                                required
                                onInput={loginFrm.handleChange}
                                onBlur={loginFrm.handleChange}
                                disabled={false}
                            />
                            {loginFrm.errors.email && (
                                <p className="text-rose-500 text-sm mt-1">{loginFrm.errors.email}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={!loginFrm.isValid}
                            className="w-full bg-black text-white h-[60px] hover:bg-gray-400"
                        >
                            Lấy lại tài khoản
                        </button>
                    </form>

                    <div className="sm:w-[564px] max-w-full mx-auto flex justify-between gap-5 mt-[50px] mb-[30px]">
                        <a href="/login" className="text-center font-medium underline underline-offset-8">
                            Đăng nhập?
                        </a>
                        <a href="/register" className="text-center font-medium mb-6 underline underline-offset-8">
                            Đăng ký
                        </a>
                    </div>
                </div>
            )}
        </>
    );
}
