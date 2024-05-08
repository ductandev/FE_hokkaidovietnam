import { useMemo, useState } from "react";

// import DataGrid from "@/Components/DataGrid/Datagrid";
import MetricCard from "@/Components/Metrics/MetricCard";
import { Button } from "@/Components/ui/button";
import { HPagination } from "@/Components/Pagination";
import PageSize from "@/Components/PageSize";
import { Input } from "@/Components/ui/input"

import { IoCartOutline } from "react-icons/io5";
import { BsWallet2 } from "react-icons/bs";
import { BsBoxSeam } from "react-icons/bs";
import { useOrderList } from "@/Hooks/useOrder";
import useDebouncedCallback from "@/Hooks/useDebounceCallback";

function AdminOrder() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState("");
    const [debouncedValue, setDebouncedValue] = useState("");

    const handleChangeDebounced = (value: string) => {
        setDebouncedValue(value);
    };

    const [debouncedCallback] = useDebouncedCallback(handleChangeDebounced, 500, [search]);

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

    const { isLoading, data } = useOrderList({ page, pageSize, search: debouncedValue });

    console.log({ data })

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
                        onChange={(size: number) => {
                            setPageSize(size)
                        }}
                    />

                    <Input placeholder="Tìm kiếm" value={search} onChange={(event) => {
                        debouncedCallback(event.target.value);

                        setSearch(event.target.value)
                    }} />
                </div>



                <Button>
                    Tạo đơn hàng
                </Button>
            </div>

            {!isLoading && <>
                {/* <DataGrid /> */}

                <HPagination
                    total={30}
                    pageSize={pageSize}
                    current={page}
                    onChangePage={(page: number) => {
                        setPage(page)
                    }}
                />
            </>}
        </div>
    )
}

export default AdminOrder;