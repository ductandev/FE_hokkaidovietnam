type HinhAnh = {
    url: string;
};

export interface Product {
    san_pham_id: number
    loai_san_pham_id: number
    ten_san_pham: string
    hinh_anh: Array<HinhAnh>
    gia_ban: number
    gia_giam: number
    mo_ta_chi_tiet: number
    don_vi_tinh: string
    trang_thai_san_pham: boolean
    so_luong_trong_kho: number
    isDelete: boolean
}

export interface ProductCreate {
    loai_san_pham_id: number;
    ten_san_pham: string;
    gia_ban: number;
    gia_giam: number;
    mo_ta: string;
    thong_tin_chi_tiet: string;
    don_vi_tinh: string;
    trang_thai_san_pham: boolean;
    so_luong_trong_kho: number;
    san_pham_noi_bat: boolean;
    san_pham_lien_quan: Array<any>;
    hinh_anh: Array<any>
}

export type Products = Pick<Product, 'san_pham_id'>[]
