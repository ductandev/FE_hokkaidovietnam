import InputFrm from "@/Components/Input/InputFrm";
import { GrClose } from "react-icons/gr";

import { useFormik } from "formik";
import * as yup from "yup";


export interface UserLoginFrm {
    email: string;
    mat_khau: string;
    remember: boolean;
}

export default function Login() {

    const loginFrm = useFormik<UserLoginFrm>({
        initialValues: {
            email: "",
            mat_khau: "",
            remember: false,
        },
        validationSchema: yup.object().shape({
            email: yup
                .string()
                .required("Email không được bỏ trống!")
                .email("Email không hợp lệ!"),
            mat_khau: yup
                .string()
                .required("Mật khẩu không được bỏ trống!")
                .min(6, "Mật khẩu phải từ 6 đến 32 ký tự.")
                .max(32, "Mật khẩu phải từ 6 đến 32 ký tự."),
            remember: yup
                .boolean()
        }),
        onSubmit: (values: UserLoginFrm) => {
            console.log(values)
            // const actionApi = loginAsyncAction(values);
            // dispatch(actionApi);
        },
    });

    return (
        <div>
            <div className="flex justify-between items-center p-5 sm:p-10">
                <h2 className="text-2xl sm:text-[32px] leading-none font-light">Tài Khoản Của Tôi</h2>
                <a href="/">
                    <GrClose className="w-6 h-6" />
                </a>
            </div>

            <div className="container mx-auto pt-[50px] leading-none">
                <h2
                    className={`
                    pb-[10px] 
                    mb-[75px]

                    text-xl 
                    text-center 
                    font-medium 
                    underline 
                    underline-offset-8
                    `}>Đăng Nhập
                </h2>

                <form
                    className="sm:w-[400px] max-w-full mx-auto"
                    onSubmit={loginFrm.handleSubmit}
                >
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
                    <div className="mb-[30px]">
                        <InputFrm
                            id="mat_khau"
                            name="mat_khau"
                            type="password"
                            label="Mật khẩu"
                            required
                            onInput={loginFrm.handleChange}
                            onBlur={loginFrm.handleChange}
                            disabled={false}
                        />
                        {loginFrm.errors.mat_khau && (
                            <p className="text-rose-500 text-sm mt-1">{loginFrm.errors.mat_khau}</p>
                        )}
                    </div>
                    <div className='mb-[30px] flex items-center'>
                        <input
                            id='remember'
                            name='remember'
                            type='checkbox'
                            className="w-6 h-6 bg-[#e4e6eb] me-2"
                            style={{ border: "1px solid #e4e6eb" }}
                            onInput={loginFrm.handleChange}
                            onBlur={loginFrm.handleChange}
                        />
                        <label htmlFor='remember' className='select-none ml-2 text-zinc-400'>Duy trì đăng nhập</label>
                    </div>

                    <button
                        type="submit"
                        disabled={!loginFrm.isValid}
                        className="w-full bg-black text-white h-[80px]"
                    >
                        Đăng nhập
                    </button>
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
                    <a
                        href="/forgot-password"
                        className="
                        text-center 
                        font-medium 
                        underline
                        underline-offset-8">
                        Quên mật khẩu ?
                    </a>
                    <a
                        href="/register"
                        className="
                        text-center 
                        font-medium
                        mb-6
                        underline
                        underline-offset-8">
                        Đăng ký tài khoản
                    </a>

                </div>
            </div>
        </div>
    );
}
