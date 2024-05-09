export interface Order {
    so_phieu: string;
    nguoi_dung_id: number;
    thoi_gian_dat_hang: string;
    thoi_gian_giao_hang: string;
    trang_thai_dat_hang: boolean;
}

export type Orders = Array<Order>