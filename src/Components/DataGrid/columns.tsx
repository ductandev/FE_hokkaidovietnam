"use client"

import { formatCurrency, formatTime } from "@/Helper/helper"
import { Customer } from "@/Types/Customer.type";
import { Product } from "@/Types/Product.type"
import { ColumnDef } from "@tanstack/react-table"

export type Order = {
    index: number
    ma_don_hang: string | number
    ten_khach_hang: string
    ngay_tao: string
    thanh_tien: number
    thanh_toan: "cod" | "cash"
    trang_thai: "done" | "undeliver" | "cancel"
    hanh_dong: any
};

export const columnsOrder: ColumnDef<Order>[] = [
    {
        accessorKey: "index",
        header: "Số thứ tự",
    },
    {
        accessorKey: "don_hang_id",
        header: "Mã đơn hàng",
    },
    {
        accessorKey: "ho_ten",
        header: "Tên khách hàng",
    },
    {
        accessorKey: "thoi_gian_dat_hang",
        header: "Ngày",
        cell: ({ row }: any) => {
            return <div className="flex items-center justify-start">
                <span>
                    {formatTime(row.original.thoi_gian_dat_hang, "dd/mm/yyyy hh:mm")}
                </span>
            </div>
        },
    },
    {
        accessorKey: "tong_tien",
        header: "Thành tiền",
        cell: ({ row }: any) => {
            return <div className="flex items-center justify-start">
                <span>
                    {formatCurrency(row.original.tong_tien)}
                </span>
            </div>
        },
    },
    {
        accessorKey: "HinhThucThanhToan",
        header: "Thanh toán",
        cell: ({ row }: any) => {
            return <div className="flex items-center justify-start">
                <span>
                    {row.original.HinhThucThanhToan.ten_hinh_thuc_thanh_toan}
                </span>
            </div>
        },
    },
    {
        accessorKey: "TrangThaiDonHang",
        header: "Trạng thái",
        cell: ({ row }: any) => {
            return <div className="flex items-center justify-start">
                <span>
                    {row.original.TrangThaiDonHang.ten_trang_thai_don_hang}
                </span>
            </div>
        },
    },
    {
        accessorKey: "hanh_dong",
        header: "Hành động",
        cell: ({ row }) => {
            return <div className="flex items-center justify-start">
                <span className="mr-4" >{svgEdit}</span>
                <span >{svgDelete}</span>
            </div>
        },
    },
];

export const columnsProduct: ColumnDef<Product>[] = [
    {
        accessorKey: "index",
        header: "Số thứ tự",
    },
    {
        accessorKey: "ten_san_pham",
        header: "Tên sản phẩm",
        cell: ({ row }: any) => {
            return <div className="flex items-center justify-start">
                <span className="mr-4" style={{
                    maxWidth: 32,
                    maxHeight: 32,
                }}>
                    <img src={row.original.hinh_anh[0]} alt={'hinh anh render'} />
                </span>
                <span>
                    {row.original.ten_san_pham}
                </span>
            </div>
        },
    },
    {
        accessorKey: "loai_san_pham_id",
        header: "Loại sản phẩm",
        cell: ({ row }: any) => {
            return <div className="flex items-center justify-start">
                <span >
                    {row?.original?.renderProductType}
                </span>
            </div>
        },
    },
    {
        accessorKey: "so_luong_trong_kho",
        header: "Số lượng trong kho",
    },
    {
        accessorKey: "gia_ban",
        header: "Giá tiền",
        cell: ({ row }: any) => {
            return <div className="flex items-center justify-start">
                <span>
                    {formatCurrency(row.original.gia_ban)}
                </span>
            </div>
        },
    },
    {
        accessorKey: "trang_thai_san_pham",
        header: "Trạng thái",
        cell: ({ row }: any) => {
            return <div className="flex items-center justify-start">
                <span >
                    {row?.original?.renderProductStatus}
                </span>
            </div>
        },
    },
    {
        accessorKey: "hanh_dong",
        header: "Hành động",
        cell: ({ row }: any) => {
            return <div className="flex items-center justify-start">
                <span className="mr-4"
                // onClick={row.original.onEdit}
                >{svgEdit}</span>
                <span
                    onClick={() => {
                        row.original.onRemove(row.original.san_pham_id)
                    }}
                >{svgDelete}</span>
            </div>
        },
    },
];

export const columnsCustomer: ColumnDef<Customer>[] = [
    {
        accessorKey: "index",
        header: "Số thứ tự",
    },
    {
        accessorKey: "ho_ten",
        header: "Tên khách hàng",
    },
    {
        accessorKey: "don_da_mua",
        header: "Đơn đã mua",
        cell: ({ row }: any) => {
            return <div className="flex items-center justify-start">
                <span >
                    {row?.original?.DonHang.length}
                </span>
            </div>
        },
    },
    {
        accessorKey: "dia_chi",
        header: "Địa chỉ",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "so_dien_thoai",
        header: "Số điện thoại",
    },
    {
        accessorKey: "hanh_dong",
        header: "Hành động",
        cell: ({ row }) => {
            return <div className="flex items-center justify-start">
                <span className="mr-4" >{svgEdit}</span>
                <span >{svgDelete}</span>
            </div>
        },
    },
];


// "lien_he_id": 25,
// "trang_thai_lien_he_id": 1,
// "ho_ten": "Tấn",
// "email": "admin@example.com",
// "noi_dung": "TESSSSSSSSSSSSSSSSs",
// "isDelete": false,
// "TrangThaiLienHe": {
//   "trang_thai_lien_he_id": 1,
//   "ten_trang_thai_lien_he": "Chưa gọi",
//   "isDelete": false
// }

export const columnsContact: ColumnDef<Customer>[] = [
    {
        accessorKey: "index",
        header: "Số thứ tự",
    },
    {
        accessorKey: "ho_ten",
        header: "Họ tên",
    },
    {
        accessorKey: "noi_dung",
        header: "Nội dung",
    },
    {
        accessorKey: "email",
        header: "email",
    },
    {
        accessorKey: "hanh_dong",
        header: "Hành động",
        cell: ({ row }) => {
            return <div className="flex items-center justify-start">
                <span className="mr-4" >{svgEdit}</span>
                <span >{svgDelete}</span>
            </div>
        },
    },
];

const svgEdit = <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
    <path d="M11.625 4.5H4.625C4.09457 4.5 3.58586 4.71071 3.21079 5.08579C2.83571 5.46086 2.625 5.96957 2.625 6.5V20.5C2.625 21.0304 2.83571 21.5391 3.21079 21.9142C3.58586 22.2893 4.09457 22.5 4.625 22.5H18.625C19.1554 22.5 19.6641 22.2893 20.0392 21.9142C20.4143 21.5391 20.625 21.0304 20.625 20.5V13.5" stroke="#624DE3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M19.125 2.99998C19.5228 2.60216 20.0624 2.37866 20.625 2.37866C21.1876 2.37866 21.7272 2.60216 22.125 2.99998C22.5228 3.39781 22.7463 3.93737 22.7463 4.49998C22.7463 5.06259 22.5228 5.60216 22.125 5.99998L12.625 15.5L8.625 16.5L9.625 12.5L19.125 2.99998Z" stroke="#624DE3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>

const svgDelete = <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
    <path d="M3.625 6.5H5.625H21.625" stroke="#A30D11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M8.625 6.5V4.5C8.625 3.96957 8.83571 3.46086 9.21079 3.08579C9.58586 2.71071 10.0946 2.5 10.625 2.5H14.625C15.1554 2.5 15.6641 2.71071 16.0392 3.08579C16.4143 3.46086 16.625 3.96957 16.625 4.5V6.5M19.625 6.5V20.5C19.625 21.0304 19.4143 21.5391 19.0392 21.9142C18.6641 22.2893 18.1554 22.5 17.625 22.5H7.625C7.09457 22.5 6.58586 22.2893 6.21079 21.9142C5.83571 21.5391 5.625 21.0304 5.625 20.5V6.5H19.625Z" stroke="#A30D11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M10.625 11.5V17.5" stroke="#A30D11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M14.625 11.5V17.5" stroke="#A30D11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>