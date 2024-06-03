"use client"

import { formatCurrency, formatTime, paymentTransform } from "@/Helper/helper"
import { Customer } from "@/Types/Customer.type";
import { News } from "@/Types/News.type";
import { Product } from "@/Types/Product.type"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "../ui/badge";
import Selection from "@/Components/Selection";

export type Order = {
    index: number
    don_hang_id: number
    ma_don_hang: string | number
    ten_khach_hang: string
    ngay_tao: string
    thanh_tien: number
    thanh_toan: 1 | 2
    trang_thai: "done" | "undeliver" | "cancel"
    onEdit: any;
    onRemove: any
};

export const STATUS_ORDER = [
    {
        label: "Chưa xác nhận",
        value: 1
    },
    {
        label: "Chưa giao",
        value: 2
    },
    {
        label: "Đang giao",
        value: 3
    },
    {
        label: "Hoàn thành",
        value: 4
    },
    {
        label: "Huỷ",
        value: 5
    }
];

export const STATUS_CONTACT = [
    {
        label: "Chưa gọi",
        value: 1
    },
    {
        label: "Đã gọi",
        value: 2
    },
    {
        label: "Spam",
        value: 3
    },
];

export const columnsOrder: ColumnDef<Order>[] | any = [
    {
        accessorKey: "index",
        header: "Số thứ tự",
        width: 5,
    },
    {
        accessorKey: "don_hang_id",
        header: "Mã đơn hàng",
        width: 5,

    },
    {
        accessorKey: "ho_ten",
        header: "Tên khách hàng",
        width: 20,

    },
    {
        accessorKey: "thoi_gian_dat_hang",
        header: "Ngày",
        width: 20,
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
        width: 20,
        cell: ({ row }: any) => {
            return <div className="flex items-center justify-start">
                <span>
                    {formatCurrency(row.original.tong_tien)}
                </span>
            </div>
        },
    },
    {
        accessorKey: "hinh_thuc_thanh_toan_id",
        header: "Thanh toán",
        width: 20,
        cell: ({ row }: any) => {
            return <div className="flex items-center justify-start">
                <span>
                    <Badge variant="default">
                        {paymentTransform(row.original.hinh_thuc_thanh_toan_id)}
                    </Badge>
                </span>
            </div>
        },
    },
    {
        accessorKey: "trang_thai_don_hang_id",
        header: "Trạng thái",
        width: 25,
        cell: ({ row }: any) => {
            return <div className="max-w-[140px] flex items-center justify-start">
                <Selection
                    type="tag"
                    defaultValue={row.original.trang_thai_don_hang_id}
                    options={STATUS_ORDER}
                    valueKey="value"
                    displayKey="label"
                    name='trang_thai_don_hang_id'
                    title='Trạng thái đơn hàng'
                    onChanged={(_: any, value: any) => {
                        row.original.onChangeStatus(row.original.don_hang_id, value)
                    }}
                />
            </div>
        },
    },
    {
        accessorKey: "hanh_dong",
        header: "Hành động",
        width: 20,

        cell: ({ row }: any) => {
            return <div className="flex items-center justify-start">
                <span className="mr-4" onClick={() => {
                    row.original.onEdit(row.original.don_hang_id, row.original)
                }}>{svgEdit}</span>
                <span onClick={() => {
                    row.original.onRemove(row.original.don_hang_id)
                }}>{svgDelete}</span>
            </div>
        },
    },
];

export const columnsProduct: ColumnDef<Product>[] | any = [
    {
        accessorKey: "index",
        header: "Số thứ tự",
        width: 5,
    },
    {
        accessorKey: "ten_san_pham",
        header: "Tên sản phẩm",
        width: 25,
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
        width: 20,
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
        width: 10,
    },
    {
        accessorKey: "gia_ban",
        header: "Giá tiền",
        width: 10,
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
        width: 20,
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
        width: 10,
        cell: ({ row }: any) => {
            return <div className="flex items-center justify-start">
                <span className="mr-4"
                    onClick={() => {
                        row.original.onEdit(row.original.san_pham_id, row.original)
                    }}
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

export const columnsCustomer: ColumnDef<Customer>[] | any = [
    {
        accessorKey: "index",
        header: "Số thứ tự",
        width: 5
    },
    {
        accessorKey: "ho_ten",
        header: "Tên khách hàng",
        width: 25
    },
    {
        accessorKey: "don_da_mua",
        header: "Đơn đã mua",
        width: 7,
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
        width: 25,
        cell: ({ row }: any) => {
            return <div className="flex items-center justify-start">
                <span >
                    {row?.original?.address}
                </span>
            </div>
        },
    },
    {
        accessorKey: "email",
        header: "Email",
        width: 15,

    },
    {
        accessorKey: "so_dien_thoai",
        header: "Số điện thoại",
        width: 10,

    },
    {
        accessorKey: "hanh_dong",
        header: "Hành động",
        width: 10,

        cell: ({ row }: any) => {
            return <div className="flex items-center justify-start">
                <span className="mr-4"
                    onClick={() => {
                        row.original.onEdit(row.original.nguoi_dung_id)
                    }}
                >{svgEdit}</span>

                <span onClick={() => {
                    row.original.onRemove(row.original.nguoi_dung_id)
                }}>{svgDelete}</span>
            </div>
        },
    },
];

export const columnsContact: ColumnDef<any>[] | any = [
    {
        accessorKey: "index",
        header: "Số thứ tự",
        width: 5,
    },
    {
        accessorKey: "ho_ten",
        header: "Họ tên",
        width: 20,
    },
    {
        accessorKey: "noi_dung",
        header: "Nội dung",
        width: 20
    },
    {
        accessorKey: "email",
        header: "email",
        width: 15
    },
    {
        accessorKey: "TrangThaiLienHe.trang_thai_lien_he_id",
        header: "Trạng thái liên hệ",
        width: 25,
        cell: ({ row }: any) => {

            return <div className="max-w-[140px] flex items-center justify-start">
                <Selection
                    type="label"
                    defaultValue={row.original.TrangThaiLienHe.trang_thai_lien_he_id}
                    options={STATUS_CONTACT}
                    valueKey="value"
                    displayKey="label"
                    name='trang_thai_lien_he_id'
                    title='Trạng thái liên hệ'
                    onChanged={(_: any, value: any) => {
                        row.original.onChangeStatus(row.original.lien_he_id, value)
                    }}
                />
            </div>
        },
    },
    {
        accessorKey: "hanh_dong",
        header: "Hành động",
        width: 10,
        cell: ({ row }: any) => {
            return <div className="flex items-center justify-start">
                <span
                    onClick={() => {
                        row.original.onRemove(row.original.lien_he_id)
                    }}
                >
                    {svgDelete}</span>
            </div>
        },
    },
];

export const columnsNews: ColumnDef<News>[] | any = [
    {
        accessorKey: "index",
        header: "Số thứ tự",
        width: 5,
    },
    {
        accessorKey: "hinh_anh",
        header: "Hình ảnh",
        width: 25,
        cell: ({ row }: any) => {
            return <div className="flex items-center justify-start">
                <span className="mr-4" style={{
                    maxWidth: 50,
                    maxHeight: 50,
                }}>
                    <img src={row.original.hinh_anh[0]} alt={'hinh anh render'} />
                </span>
            </div>
        },
    },
    {
        accessorKey: "tieu_de",
        header: "Tiêu đề",
        width: 25,

    },
    {
        accessorKey: "mo_ta",
        header: "Mô tả",
        width: 25,

        cell: ({ row }: any) => {
            return <div className="flex items-center justify-start">
                <p> {row.original.mo_ta.length > 150 ? row.original.mo_ta.substr(0, 50) + ' ...' : row.original.mo_ta} </p>
            </div>
        },
    },
    {
        accessorKey: "hanh_dong",
        header: "Hành động",
        width: 15,

        cell: ({ row }: any) => {
            return <div className="flex items-center justify-start">
                <span
                    className="md:block hidden mr-4"
                    onClick={() => {
                        row.original.onEdit(row.original.tin_tuc_id)
                    }}
                >
                    {svgEdit}
                </span>

                <span
                    onClick={() => {
                        row.original.onRemove(row.original.tin_tuc_id)
                    }}
                >
                    {svgDelete}
                </span>
            </div>
        },
    },
];

const svgEdit = <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
    <path d="M11.625 4.5H4.625C4.09457 4.5 3.58586 4.71071 3.21079 5.08579C2.83571 5.46086 2.625 5.96957 2.625 6.5V20.5C2.625 21.0304 2.83571 21.5391 3.21079 21.9142C3.58586 22.2893 4.09457 22.5 4.625 22.5H18.625C19.1554 22.5 19.6641 22.2893 20.0392 21.9142C20.4143 21.5391 20.625 21.0304 20.625 20.5V13.5" stroke="#624DE3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19.125 2.99998C19.5228 2.60216 20.0624 2.37866 20.625 2.37866C21.1876 2.37866 21.7272 2.60216 22.125 2.99998C22.5228 3.39781 22.7463 3.93737 22.7463 4.49998C22.7463 5.06259 22.5228 5.60216 22.125 5.99998L12.625 15.5L8.625 16.5L9.625 12.5L19.125 2.99998Z" stroke="#624DE3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
</svg>

const svgDelete = <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
    <path d="M3.625 6.5H5.625H21.625" stroke="#A30D11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.625 6.5V4.5C8.625 3.96957 8.83571 3.46086 9.21079 3.08579C9.58586 2.71071 10.0946 2.5 10.625 2.5H14.625C15.1554 2.5 15.6641 2.71071 16.0392 3.08579C16.4143 3.46086 16.625 3.96957 16.625 4.5V6.5M19.625 6.5V20.5C19.625 21.0304 19.4143 21.5391 19.0392 21.9142C18.6641 22.2893 18.1554 22.5 17.625 22.5H7.625C7.09457 22.5 6.58586 22.2893 6.21079 21.9142C5.83571 21.5391 5.625 21.0304 5.625 20.5V6.5H19.625Z" stroke="#A30D11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.625 11.5V17.5" stroke="#A30D11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14.625 11.5V17.5" stroke="#A30D11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
</svg>