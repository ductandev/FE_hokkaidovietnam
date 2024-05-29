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

export type Customers = Array<Customer>