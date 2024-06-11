import * as yup from "yup";

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const checkoutValidationSchema = yup.object().shape(
    {
        email: yup
            .string()
            .matches(emailRegEx, "Vui lòng nhập đúng định dạng email")
            .required("Email không được để trống")
            .max(255, "Email tối đa 255 ký tự"),

        ho_ten: yup
            .string()
            .required("Họ và tên không được để trống")
            .max(255, "Họ và tên tối đa 255 ký tự"),

        dia_chi: yup
            .string()
            .required("Địa chỉ không được để trống")
            .max(255, "Địa chỉ tối đa 255 ký tự"),

        so_dien_thoai: yup
            .string()
            .required("Số điện thoại không được để trống")
            .matches(phoneRegExp, "Vui lòng nhập đúng số điện thoại")
            .min(10, "Số điện thoại phải có ít nhất 10 số")
            .max(10, "Số điện thoại có tối đa 10 số"),

        tinh_thanh_id: yup
            .string()
            .required("Vui lòng chọn tỉnh/thành phố"),

        quan_id: yup
            .string()
            .required("Vui lòng chọn quận/huyện"),

        phuong_id: yup
            .string()
            .required("Vui lòng chọn phường/xã")
    }
);