type HinhAnh = {
    url: string;
};

export interface Product {
    san_pham_id: number
    loai_san_pham_id: number
    ten_san_pham: string
    hinh_anh: HinhAnh
    gia_ban: number
    gia_giam: number
    mo_ta_chi_tiet: number
    don_vi_tinh: string
    trang_thai_san_pham: boolean
    so_luong_trong_kho: number
    isDelete: boolean
}

export type Products = Pick<Product, 'san_pham_id'>[]
