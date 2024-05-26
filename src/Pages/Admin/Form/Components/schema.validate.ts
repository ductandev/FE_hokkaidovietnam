import * as yup from "yup";

export const productCreateValidationSchema = yup.object().shape(
    {
        ten_san_pham: yup
            .string()
            .required("Tên sản phẩm không được để trống")
            .max(255, "Tên sản phẩm tối đa 255 ký tự"),

        thong_tin_chi_tiet: yup
            .string()
            .required("Thông tin chi tiết không được để trống"),

        so_luong_trong_kho: yup
            .string()
            .required("Số lượng trong kho không được để trống"),

        mo_ta: yup
            .string()
            .required("Mô tả không được để trống"),

        loai_san_pham_id: yup
            .string()
            .required("Vui lòng chọn loại sản phẩm"),

        hinh_anh: yup
            .array()
            .of(
                yup
                    .string()
                    .url('Đây không phải là một URL hợp lệ')
            )
            .min(1, 'Hình ảnh không được trống')
            .required('Trường hình ảnh là bắt buộc'),

        gia_giam: yup
            .string()
            .required("Giá giảm không được để trống"),

        gia_ban: yup
            .string()
            .required("Giá bán không được để trống")
    }
);