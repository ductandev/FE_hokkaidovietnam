import InputFrm from "@/Components/Input/InputFrm";
import { GrClose } from "react-icons/gr";

import { Navigate } from "react-router-dom";

import { useFormik } from "formik";
import { useAuth } from "@/Auth/AuthProvider";

import * as yup from "yup";

export interface UserRegisterFrm {
    ho_ten: string,
    email: string,
    mat_khau: string,
    so_dien_thoai: string,
    dia_chi: string,
    gioi_tinh: string,
}

export default function Register() {
    const { isLogin, signUp } = useAuth();

    const registerFrm = useFormik<UserRegisterFrm>({
        initialValues: {
            ho_ten: "",
            email: "",
            mat_khau: "",
            so_dien_thoai: "",
            dia_chi: "",
            gioi_tinh: "Nam",
        },
        validationSchema: yup.object().shape({
            ho_ten: yup
                .string()
                .required("Họ và tên không được bỏ trống!")
                .matches(/^[a-z A-Z\s áàảạãăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệiíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ ÁÀẢẠÃĂẮẰẲẴẶÂẤẦẨẪẬÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴĐ]+$/, "Tên chỉ được chứa chữ cái."),
            email: yup
                .string()
                .required("Email không được bỏ trống!")
                .email("Email không hợp lệ!"),
            mat_khau: yup
                .string()
                .required("Mật khẩu không được bỏ trống!")
                .min(6, "Mật khẩu phải từ 6 đến 32 ký tự.")
                .max(32, "Mật khẩu phải từ 6 đến 32 ký tự."),
            so_dien_thoai: yup
                .string()
                .required("Số điện thoại không được bỏ trống!")
                .matches(/\d$/, "Vui lòng chỉ điền số!")
                .min(10, "Số điện tối thiểu là 10 số!")
                .max(10, "Số điện tối đa là 10 số!"),
            dia_chi: yup
                .string()
                .required("Địa chỉ không được bỏ trống!"),
            gioi_tinh: yup
                .string()
        }),
        onSubmit: (values: UserRegisterFrm) => {
            console.log("🚀 ", values);
            signUp(values);
        },
    });

    if (isLogin) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <div className="flex justify-between items-center p-5 sm:px-10">
                <h2 className="text-2xl sm:text-[32px] leading-none font-light">Đăng Ký Tài Khoản</h2>
                <a href="/">
                    <GrClose className="w-6 h-6" />
                </a>
            </div>

            <div className="container mx-auto leading-none">
                <h2
                    className={`
                    pb-[10px] 
                    mb-[20px]

                    text-xl 
                    text-center 
                    font-medium 
                    underline 
                    underline-offset-8
                    `}>Đăng Ký
                </h2>

                <form
                    className="sm:w-[400px] max-w-full mx-auto"
                    onSubmit={registerFrm.handleSubmit}
                >
                    <div className="mb-[20px]">
                        <InputFrm
                            id="email"
                            name="email"
                            label="Email"
                            required
                            onInput={registerFrm.handleChange}
                            onBlur={registerFrm.handleChange}
                            disabled={false}
                        />
                        {registerFrm.errors.email && (
                            <p className="text-rose-500 text-sm mt-1">{registerFrm.errors.email}</p>
                        )}
                    </div>
                    <div className="mb-[20px]">
                        <InputFrm
                            id="mat_khau"
                            name="mat_khau"
                            type="password"
                            label="Mật Khẩu"
                            required
                            onInput={registerFrm.handleChange}
                            onBlur={registerFrm.handleChange}
                            disabled={false}
                        />
                        {registerFrm.errors.mat_khau && (
                            <p className="text-rose-500 text-sm mt-1">{registerFrm.errors.mat_khau}</p>
                        )}
                    </div>
                    <div className="mb-[20px]">
                        <InputFrm
                            id="ho_ten"
                            name="ho_ten"
                            label="Họ Và Tên"
                            required
                            onInput={registerFrm.handleChange}
                            onBlur={registerFrm.handleChange}
                            disabled={false}
                        />
                        {registerFrm.errors.ho_ten && (
                            <p className="text-rose-500 text-sm mt-1">{registerFrm.errors.ho_ten}</p>
                        )}
                    </div>
                    <div className="mb-[20px]">
                        <InputFrm
                            id="so_dien_thoai"
                            name="so_dien_thoai"
                            label="Số Điện Thoại"
                            required
                            onInput={registerFrm.handleChange}
                            onBlur={registerFrm.handleChange}
                            disabled={false}
                        />
                        {registerFrm.errors.so_dien_thoai && (
                            <p className="text-rose-500 text-sm mt-1">{registerFrm.errors.so_dien_thoai}</p>
                        )}
                    </div>
                    <div className="mb-[20px]">
                        <InputFrm
                            id="dia_chi"
                            name="dia_chi"
                            label="Địa chỉ"
                            required
                            onInput={registerFrm.handleChange}
                            onBlur={registerFrm.handleChange}
                            disabled={false}
                        />
                        {registerFrm.errors.dia_chi && (
                            <p className="text-rose-500 text-sm mt-1">{registerFrm.errors.dia_chi}</p>
                        )}
                    </div>
                    <div className='mb-[20px] flex items-center'>
                        <input
                            id='gioi_tinh1'
                            name='gioi_tinh'
                            type='radio'
                            value="Nam"
                            className="w-6 h-6 bg-[#e4e6eb] me-2"
                            style={{ border: "1px solid #e4e6eb" }}
                            onInput={registerFrm.handleChange}
                            onBlur={registerFrm.handleChange}
                            defaultChecked
                        />
                        <label htmlFor='gioi_tinh1' className='select-none ml-2 me-4'>Nam</label>
                        <input
                            id='gioi_tinh2'
                            name='gioi_tinh'
                            type='radio'
                            value="Nữ"
                            className="w-6 h-6 bg-[#e4e6eb] me-2"
                            style={{ border: "1px solid #e4e6eb" }}
                            onInput={registerFrm.handleChange}
                            onBlur={registerFrm.handleChange}
                        />
                        <label htmlFor='gioi_tinh2' className='select-none mx-2'>Nữ</label>
                    </div>

                    <button
                        type="submit"
                        disabled={!registerFrm.isValid}
                        className="w-full bg-black text-white h-[80px]"
                    >
                        Đăng ký
                    </button>
                </form>

                <div
                    className={`
                    sm:w-[400px] 
                    max-w-full 
                    mx-auto 
                    flex 
                    justify-center
                    gap-5 
                    my-[30px] 
                    `}>
                    <a
                        href="/login"
                        className="
                        text-center 
                        font-medium 
                        underline
                        underline-offset-8">
                        Quay về Đăng nhập !
                    </a>
                </div>
            </div>
        </div>
    );
}