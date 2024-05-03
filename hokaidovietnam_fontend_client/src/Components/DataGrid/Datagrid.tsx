import { columnsOrder } from "./columns"
import { DataTable } from "./data-table"


export default function DataGrid() {
    const data: any = [
        {
            index: 1,
            ma_don_hang: "#123556",
            ten_khach_hang: "Nguyễn Thị Bé Ba",
            ngay_tao: "12/12/2022",
            thanh_tien: 120000,
            thanh_toan: "cod",
            trang_thai: "done",
            hanh_dong: {
                edit: () => {
                    console.log("edit")
                },
                delete: () => {
                    console.log("delete")
                }
            }
        },
        {
            index: 2,
            ma_don_hang: "#123526",
            ten_khach_hang: "Nguyễn Thị Bé Hai",
            ngay_tao: "12/12/2022",
            thanh_tien: 120000,
            thanh_toan: "cash",
            trang_thai: "cancel",
            hanh_dong: {
                edit: () => {
                    console.log("edit")
                },
                delete: () => {
                    console.log("delete")
                }
            }
        },
    ]

    return (
        <div className="py-10">
            <DataTable columns={columnsOrder} data={data} />
        </div>
    )
}
