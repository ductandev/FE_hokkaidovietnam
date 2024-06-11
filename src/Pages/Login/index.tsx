import { Link, Navigate, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@/Auth/AuthProvider";

import { GrClose } from "react-icons/gr";

import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";

import { loginValidationSchema } from "./login.validate";
import { isEmpty } from "@/Helper/helper";


export interface UserLoginFrm {
    email_or_phone: string;
    mat_khau: string;
    remember: boolean;
}

export default function Login() {
    const { isLogin, signIn } = useAuth();
    const navigate = useNavigate();
    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<any>({
        mode: "onChange",
        resolver: yupResolver(loginValidationSchema),
        defaultValues: {
            email_or_phone: "",
            mat_khau: "",
        },
    });

    if (isLogin) {
        return <Navigate to="/" />;
    }

    const SErrors: any = errors;

    const handleOnSubmitForm = (values: any) => {
        signIn(values);
    }

    return (
        <div className="container">
            <div className="flex justify-between items-center p-5 sm:p-10">
                <h2 className="text-2xl sm:text-[32px] leading-none font-light">Tài Khoản Của Tôi</h2>

                <span
                    onClick={() => {
                        navigate(-1)
                    }}
                    className="cursor-pointer"
                >
                    <GrClose className="w-6 h-6" />
                </span>
            </div>

            <div className="container mx-auto pt-[20px] sm:pt-[50px] leading-none">
                <h2
                    className={`
                    sm:pb-[10px] 
                    mb-[75px]
                    text-xl 
                    text-center 
                    font-medium 
                    underline 
                    underline-offset-8
                    `}>Đăng Nhập
                </h2>

                <form
                    className="sm:w-[400px] mx-auto"
                    onSubmit={handleSubmit((values) => handleOnSubmitForm(values))}
                >
                    <div >
                        <Controller
                            name="email_or_phone"
                            control={control}
                            render={({ field }: any) => {
                                return (
                                    <div className="mb-6">
                                        <Input
                                            className="md:h-14 h-10 md:text-lg"
                                            placeholder="Nhập email hoặc số điện thoại"
                                            error={SErrors?.email_or_phone?.message || ""}
                                            {...field}
                                        />
                                    </div>
                                );
                            }}
                        />
                    </div>

                    <div className="mb-6">
                        <Controller
                            name="mat_khau"
                            control={control}
                            render={({ field }: any) => {
                                return (
                                    <div className="mb-4">
                                        <Input
                                            className="md:h-14 h-10 md:text-lg"
                                            placeholder="Nhập mật khẩu của bạn"
                                            error={SErrors?.mat_khau?.message || ""}
                                            type="password"
                                            {...field}
                                        />
                                    </div>
                                );
                            }}
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={!isEmpty(errors)}
                        className="w-full bg-black text-white h-14 text-base"
                    >Đăng nhập
                    </Button>
                </form>

                <div
                    className={`
                    sm:w-[400px] 
                    max-w-full 
                    mx-auto 
                    flex 
                    justify-between
                    gap-5 
                    mt-[50px] 
                    mb-[30px]
                    `}>
                    <Link to="/forgot-password"
                        className="
                        text-center 
                        font-medium 
                        underline
                        underline-offset-8">Quên mật khẩu ?
                    </Link>

                    <Link to="/register"
                        className="
                        text-center 
                        font-medium
                        mb-6
                        underline
                        underline-offset-8">Đăng ký tài khoản
                    </Link>
                </div>
            </div>
        </div>
    );
}
