export interface Customer {
    ho_ten: string
    email: string
    mat_khau: string
    dia_chi: string
    so_dien_thoai: string
    gioi_tinh: string
    onRemove?: any
    nguoi_dung_id: string | number
    onEdit?: any
}

export interface CustomerEdit {
    nguoi_dung_id: number;
    ho_ten: string,
    email: string,
    mat_khau: string,
    so_dien_thoai: string,
    dia_chi: string,
    phuong_id: string,
    quan_id: string,
    tinh_thanh_id: string,
    gioi_tinh: string,
}


export type Customers = Array<Customer>