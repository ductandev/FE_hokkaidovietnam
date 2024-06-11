import InputFrm from "@/Components/Input/InputFrm";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import { postChangePassword, postForgotPassword } from "@/Apis/Auth/Auth.api";
import Loading from "@/Components/Loading/Loading";
import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export interface UserForgotPasswordFrm {
    email: string;
}

export interface UserPasswordFrm {
    newPassword: string;
}

export default function ForgotPassword() {
    const tokenRef = useRef('');
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            tokenRef.current = token;
            searchParams.delete('token');

            setSearchParams(searchParams);
        }
    }, [searchParams, setSearchParams]);


    const { isLoading, mutateAsync: forgotPasswordMutateAsync }: any = useMutation({
        mutationFn: (email: string) => {
            return postForgotPassword(email);
        },
        onSuccess: () => {
            toast.success(`Đã gửi email đổi mật khẩu!`, {
                position: "top-center",
            });
        },
        onError: () => {
            toast.error(`Đã xảy ra lỗi !`, {
                position: "top-center",
            });
        },
    });


    const { mutateAsync: changePasswordMutateAsync }: any = useMutation({
        mutationFn: (data: { token: string; newPassword: string }) => {
            return postChangePassword(data.token, data.newPassword);
        },
        onSuccess: () => {
            toast.success(`Đã đổi mật khẩu thành công!`, {
                position: "top-center",
            });
        },
        onError: (error) => {
            toast.error(`Đã xảy ra lỗi !`, {
                position: "top-center",
            });
        },
    });

    const emailFrm = useFormik<UserForgotPasswordFrm>({
        initialValues: {
            email: "",
        },
        validationSchema: yup.object().shape({
            email: yup
                .string()
                .required("Email không được bỏ trống!")
                .email("Email không hợp lệ!"),
        }),
        onSubmit: async (values: UserForgotPasswordFrm) => {
            try {
                await forgotPasswordMutateAsync(values);
            } catch (error) {
                console.error(error);
            }
        },
    });

    const changePassFrm = useFormik<UserPasswordFrm>({
        initialValues: {
            newPassword: "",
        },
        validationSchema: yup.object().shape({
            newPassword: yup
                .string()
                .required("Mật khẩu không được bỏ trống!")
                .min(6, "Mật khẩu phải từ 6 đến 32 ký tự.")
                .max(32, "Mật khẩu phải từ 6 đến 32 ký tự."),
        }),
        onSubmit: async (values: UserPasswordFrm) => {
            try {
                await changePasswordMutateAsync({ token: tokenRef.current, newPassword: values });
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } catch (error) {
                console.error(error);
            }
        },
    });

    return (
        <>
            {isLoading ? (
                <Loading></Loading>
            ) : (

                tokenRef.current ? (
                    <div className="container mx-auto pt-[50px] leading-none">
                        <form
                            className="sm:w-[564px] max-w-full mx-auto"
                            onSubmit={changePassFrm.handleSubmit}
                        >
                            <div className="mb-[32px]">
                                <InputFrm
                                    id="newPassword"
                                    name="newPassword"
                                    label="Nhập mật khẩu mới"
                                    required
                                    onInput={changePassFrm.handleChange}
                                    onBlur={changePassFrm.handleBlur}
                                    disabled={false}
                                />
                                {changePassFrm.errors.newPassword && (
                                    <p className="text-rose-500 text-sm mt-1">{changePassFrm.errors.newPassword}</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={!changePassFrm.isValid || changePassFrm.isSubmitting}
                                className="w-full bg-black text-white h-[60px] hover:bg-gray-400"
                            >
                                Đổi mật khẩu
                            </button>
                        </form>
                    </div>

                ) : (
                    <div className="container mx-auto pt-[50px] leading-none">
                        <form
                            className="sm:w-[564px] max-w-full mx-auto"
                            onSubmit={emailFrm.handleSubmit}
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
                                    onInput={emailFrm.handleChange}
                                    onBlur={emailFrm.handleChange}
                                    disabled={false}
                                />
                                {emailFrm.errors.email && (
                                    <p className="text-rose-500 text-sm mt-1">{emailFrm.errors.email}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={!emailFrm.isValid}
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
                )
            )}
        </>
    );
}
