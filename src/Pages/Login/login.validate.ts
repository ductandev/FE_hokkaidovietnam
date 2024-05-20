import * as yup from "yup";

export const loginValidationSchema = yup.object().shape(
    {
        email_or_phone: yup
            .string()
            .required("Email hoặc số điện thoại không được để trống")
            .max(255, "Email hoặc số điện thoại tối đa 255 ký tự"),

        mat_khau: yup
            .string()
            .required("Mật khẩu không được để trống")
            .min(6, "Mật khẩu có ít nhất 6 ký tự"),
    }
);