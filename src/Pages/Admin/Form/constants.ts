export const DEFAULT_ORDER_FILTER_FORM = {
    ho_ten: "",
    status: 0,
    dia_chi: "",
    phuong_id: "",
    quan_id: "",
    tinh_thanh_id: "",
    so_dien_thoai: ""
}

export const DEFAULT_PRODUCT_ADD_FORM = {
    loai_san_pham_id: "",
    ten_san_pham: "",
    gia_ban: "",
    so_luong_trong_kho: "",
    gia_giam: "",
    mo_ta: "",
    thong_tin_chi_tiet: "",
    hinh_anh: [],
}

export const ORDER_STATUS: any = [
    {
        label: 'Tất cả',
        value: 0
    },
    {
        label: 'Hoàn thành',
        value: 1
    },
    {
        label: 'Chưa giao',
        value: 2
    },
    {
        label: 'Huỷ',
        value: 3
    },
];