"use client"

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
}

export const columnsOrder: ColumnDef<Order>[] = [
    {
        accessorKey: "index",
        header: "Số thứ tự",
    },
    {
        accessorKey: "ma_don_hang",
        header: "Mã đơn hàng",
    },
    {
        accessorKey: "ten_khach_hang",
        header: "Tên khách hàng",
    },
    {
        accessorKey: "ngay_tao",
        header: "Ngày tạo",
    },
    {
        accessorKey: "thanh_tien",
        header: "Thành tiền",
    },
    {
        accessorKey: "thanh_toan",
        header: "Thanh toán",
    },
    {
        accessorKey: "hanh_dong",
        header: "Hành động",
        cell: ({ row }) => {
            return <div className="flex items-center justify-start">
                <span className="mr-4" onClick={row.original.hanh_dong.edit}>{svgEdit}</span>
                <span onClick={row.original.hanh_dong.delete}>{svgDelete}</span>
            </div>
        },
    },
]

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