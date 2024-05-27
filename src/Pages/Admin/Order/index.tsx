import { useMemo, useState } from "react";
import { useOrder, useOrderList, useOrderSummary } from "@/Hooks/useOrder";

import DataGrid from "@/Components/DataGrid/Datagrid";
import MetricCard from "@/Components/Metrics/MetricCard";
import { HPagination } from "@/Components/Pagination";
import PageSize from "@/Components/PageSize";

import { IoCartOutline } from "react-icons/io5";
import { BsWallet2 } from "react-icons/bs";
import { BsBoxSeam } from "react-icons/bs";
import { DrawerDialog } from "../Form";
import { DEFAULT_ORDER_FILTER_FORM } from "../Form/constants";
import { buildQueryString } from "@/Helper/helper";

function AdminOrder() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isVisibleAdd, setIsVisibleAdd] = useState(false);
    const [isVisibleDetail, setIsVisibleDetail] = useState(false);
    const [detialOfOrder, setDetailOfOrder] = useState({})
    const [queryFilter, setQueryFilter] = useState("?status=0");

    const { editStatusOrder } = useOrder({ page, pageSize, queryFilter });
    const { isLoading, data } = useOrderList({ page, pageSize, queryFilter });
    const { isLoading: isLoadingSummary, data: dataSummary } = useOrderSummary();

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

    const handleChangeStatusOrder = (id: any, status: any) => {
        editStatusOrder.mutateAsync({
            id, status
        })
    }

    const handleClickDetail = (id: any) => {
        setDetailOfOrder(id)
        setIsVisibleDetail(true)
    }

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
                </div>

                <DrawerDialog
                    label={'Bộ lọc'}
                    isVisible={isVisibleAdd}
                    onHandleToogleVisible={(visible: boolean) => {
                        setIsVisibleAdd(visible)
                    }}
                    context='orderFilter'
                    onHandleSubmit={(values: any) => {
                        setQueryFilter(buildQueryString(values))
                    }}
                    defaultValues={DEFAULT_ORDER_FILTER_FORM}
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
                    onChangeStatus={handleChangeStatusOrder}
                    onHandleEdit={handleClickDetail}
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

            <DrawerDialog
                isShowButton={false}
                isVisible={isVisibleDetail}
                onHandleToogleVisible={(visible: boolean) => {
                    setIsVisibleDetail(visible)
                }}
                label="Chi tiết đơn hàng"
                context='orderDetail'
                defaultValues={detialOfOrder}
            />
        </div>
    )
}

export default AdminOrder;