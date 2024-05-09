import { useMemo, useState } from "react";

// import DataGrid from "@/Components/DataGrid/Datagrid";
import MetricCard from "@/Components/Metrics/MetricCard";
import { Button } from "@/Components/ui/button";
import { HPagination } from "@/Components/Pagination";
import PageSize from "@/Components/PageSize";
import { Input } from "@/Components/ui/input"

import { FaRegUser } from "react-icons/fa";
import useDebouncedCallback from "@/Hooks/useDebounceCallback";
import { useCustomerList } from "@/Hooks/useCustomer";
import DataGrid from "@/Components/DataGrid/Datagrid";

function AdminCustomer() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState("");
    const [debouncedValue, setDebouncedValue] = useState("");

    const {
        isLoading,
        data
    } = useCustomerList({ page, pageSize, search: debouncedValue });

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

    const handleChangeDebounced = (value: string) => {
        setPage(1);
        setDebouncedValue(value);
    };

    const [debouncedCallback] = useDebouncedCallback(handleChangeDebounced, 500, [search]);

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
                        defaultValue={pageSize}
                        onChange={(size: number) => {
                            setPage(1);
                            setPageSize(size)
                        }}
                    />

                    <Input placeholder="Tìm kiếm"
                        value={search}
                        onChange={(event) => {
                            debouncedCallback(event.target.value);
                            setSearch(event.target.value)
                        }}
                    />
                </div>

                <Button>
                    Tạo sản phẩm
                </Button>
            </div>

            {isLoading ? <>
                <p>Đang tải</p>
            </> :
                <DataGrid
                    data={data?.content}
                    type={'customer'}
                    page={page}
                    pageSize={pageSize}
                />
            }


            <HPagination
                total={data?.total || 0}
                pageSize={pageSize}
                current={page}
                onChangePage={(page: number) => {
                    setPage(page)
                }}
            />
        </div>
    )
}

export default AdminCustomer;