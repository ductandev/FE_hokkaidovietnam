import { useMemo } from "react";

// import DataGrid from "@/Components/DataGrid/Datagrid";
import MetricCard from "@/Components/Metrics/MetricCard";
import { Button } from "@/Components/ui/button";
import { HPagination } from "@/Components/Pagination";
import PageSize from "@/Components/PageSize";
import { Input } from "@/Components/ui/input"

import { FaRegUser } from "react-icons/fa";


function AdminCustomer() {
    const Metrics = useMemo(() => {
        return [
            {
                icon: <FaRegUser />,
                label: "Khách hàng",
                index: 55,
                format: "khách"
            },
        ]
    }, []);

    return (
        <div>
            <div className="flex items-center">
                {Metrics.map((metric, index) => {
                    return <MetricCard {...metric} key={index} />
                })}
            </div>

            <h2 className="text-center uppercase text-xl font-semibold">
                Khách hàng
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
                    Tạo khách hàng
                </Button>
            </div>

            {/* <DataGrid /> */}

            <HPagination
                total={200}
                pageSize={8}
                current={2}
                onChangePage={(page: number) => { }}
            />
        </div>
    )
}

export default AdminCustomer;