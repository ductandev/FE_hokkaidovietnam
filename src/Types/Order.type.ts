export interface Order {
    so_phieu: string;
    nguoi_dung_id: number;
    thoi_gian_dat_hang: string;
    thoi_gian_giao_hang: string;
    trang_thai_dat_hang: boolean;
}

export interface OrderCreate {
    email: string,
    ho_ten: string,
    so_dien_thoai: string,
    dia_chi: string,
    phuong_id: string,
    quan_id: string,
    tinh_thanh_id: string,
    giao_dia_chi_khac: boolean,
    ghi_chu: string,
    hinh_thuc_thanh_toan_id: string,
    san_pham: Array<any>,
    tong_tien: string,
    ma_giam_gia: string,
    thoi_gian_dat_hang: string
}

export type Orders = Array<Order>