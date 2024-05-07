import { useMemo } from "react";

import DataGrid from "@/Components/DataGrid/Datagrid";
import MetricCard from "@/Components/Metrics/MetricCard";
import { Button } from "@/Components/ui/button";
import { HPagination } from "@/Components/Pagination";
import PageSize from "@/Components/PageSize";
import { Input } from "@/Components/ui/input"

import { IoCartOutline } from "react-icons/io5";
import { BsWallet2 } from "react-icons/bs";
import { BsBoxSeam } from "react-icons/bs";

function AdminOrder() {
    const Metrics = useMemo(() => {
        return [
            {
                icon: <BsBoxSeam />,
                label: "Tổng đơn hàng",
                index: 55,
                format: "đơn"
            },
            {
                icon: <IoCartOutline />,
                label: "Đơn hàng trong tháng",
                index: 25,
                format: "đơn"
            },
            {
                icon: <BsWallet2 />,
                label: "Doanh số",
                index: 999000000,
                format: "currency"
            }
        ]
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center">
                {Metrics.map((metric, index) => {
                    return <MetricCard {...metric} key={index} />
                })}
            </div>

            <h2 className="text-center uppercase text-xl font-semibold">
                Đơn hàng
            </h2>

            <div className="p-4 mt-8 flex justify-between items-center">
                <div className="flex justify-between items-center">
                    <PageSize
                        options={[10, 20, 50]}
                        className="mr-6"
                        defaultValue={10}
                    />

                    <Input placeholder="Tìm kiếm" />
                </div>



                <Button>
                    Tạo đơn hàng
                </Button>
            </div>

            <DataGrid />

            <HPagination
                total={200}
                pageSize={8}
                current={2}
                onChangePage={(page: number) => { }}
            />
        </div>
    )
}

export default AdminOrder;