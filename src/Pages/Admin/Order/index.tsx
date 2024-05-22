import { useMemo, useState } from "react";
import useDebouncedCallback from "@/Hooks/useDebounceCallback";
import { useOrderList, useOrderSummary } from "@/Hooks/useOrder";

import DataGrid from "@/Components/DataGrid/Datagrid";
import MetricCard from "@/Components/Metrics/MetricCard";
import { HPagination } from "@/Components/Pagination";
import PageSize from "@/Components/PageSize";
import { Input } from "@/Components/ui/input"

import { IoCartOutline } from "react-icons/io5";
import { BsWallet2 } from "react-icons/bs";
import { BsBoxSeam } from "react-icons/bs";
import { DrawerDialog } from "../Form";

function AdminOrder() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState("");
    const [debouncedValue, setDebouncedValue] = useState("");
    const [isVisibleAdd, setIsVisibleAdd] = useState(false);

    const { isLoading, data } = useOrderList({ page, pageSize, search: debouncedValue });
    const { isLoading: isLoadingSummary, data: dataSummary } = useOrderSummary();

    const handleChangeDebounced = (value: string) => {
        setDebouncedValue(value);
    };

    const [debouncedCallback] = useDebouncedCallback(handleChangeDebounced, 500, [search]);

    const Metrics = useMemo(() => {
        return [
            {
                icon: <BsBoxSeam />,
                label: "Tổng đơn hàng",
                index: dataSummary?.content?.totalOrderStatusDone,
                format: "đơn"
            },
            {
                icon: <IoCartOutline />,
                label: "Đơn hàng trong tháng",
                index: dataSummary?.content?.totalOderOnMonth,
                format: "đơn"
            },
            {
                icon: <BsWallet2 />,
                label: "Doanh số",
                index: dataSummary?.content?.nestSaleSummary,
                format: "currency"
            }
        ];

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataSummary]);

    return (
        <div>
            <div className="flex items-center">
                {!isLoadingSummary && Metrics.map((metric, index) => {
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
                        className="mr-3 w-full"
                        defaultValue={pageSize}
                        onChange={(size: number) => {
                            setPage(1);
                            setPageSize(size)
                        }}
                    />

                    <Input
                        placeholder="Tìm kiếm"
                        value={search}
                        onChange={(event) => {
                            debouncedCallback(event.target.value);
                            setSearch(event.target.value)
                        }}
                        className="w-[230px]"
                    />
                </div>

                <DrawerDialog
                    label={'Tạo đơn hàng'}
                    isVisible={isVisibleAdd}
                    onHandleToogleVisible={(visible: boolean) => {
                        setIsVisibleAdd(visible)
                    }}
                    context='order'
                />
            </div>

            {isLoading ? <>
                <p>Đang tải</p>
            </> :
                <DataGrid
                    data={data?.content || []}
                    type={'order'}
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

export default AdminOrder;