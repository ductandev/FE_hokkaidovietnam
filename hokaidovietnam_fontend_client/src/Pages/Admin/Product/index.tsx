import { useMemo } from "react";

import DataGrid from "@/Components/DataGrid/Datagrid";
import MetricCard from "@/Components/Metrics/MetricCard";
import { Button } from "@/Components/ui/button";
import { HPagination } from "@/Components/Pagination";
import PageSize from "@/Components/PageSize";
import { Input } from "@/Components/ui/input"

import { LuPackageSearch } from "react-icons/lu";
import { LiaBoxSolid } from "react-icons/lia";

function AdminProduct() {
    const Metrics = useMemo(() => {
        return [
            {
                icon: <LuPackageSearch />,
                label: "Số lượng sản phẩm",
                index: 55,
                format: "sản phẩm"
            },
            {
                icon: <LiaBoxSolid />,
                label: "Loại sản phẩm",
                index: 5,
                format: "loại"
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
                Sản phẩm
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
                    Tạo sản phẩm
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

export default AdminProduct;