import { useEffect, useMemo, useState } from "react";
import { useOrder, useOrderList, useOrderSummary } from "@/Hooks/useOrder";
import { useAddress } from "@/Hooks/useAddress/useAddress";
import { useParams } from "react-router-dom";
import dayjs from 'dayjs';

import DataGrid from "@/Components/DataGrid/Datagrid";
import MetricCard from "@/Components/Metrics/MetricCard";
import { HPagination } from "@/Components/Pagination";
import PageSize from "@/Components/PageSize";

import { IoCartOutline } from "react-icons/io5";
import { BsWallet2 } from "react-icons/bs";
import { BsBoxSeam } from "react-icons/bs";
import { DrawerDialog } from "../Form";
import { DEFAULT_ORDER_FILTER_FORM } from "../Form/constants";
import { buildQueryString, exportHandler, formatTime } from "@/Helper/helper";
import { Button } from "@/Components/ui/button";
import { exportOrder } from "@/Apis/Order/Order.api";

function AdminOrder() {
    const { id }: any = useParams();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isVisibleAdd, setIsVisibleAdd] = useState(false);
    const [isVisibleDetail, setIsVisibleDetail] = useState(false);
    const [detialOfOrder, setDetailOfOrder] = useState(0)
    const [queryFilter, setQueryFilter] = useState("?status=0");
    const { buildAddressFromId }: any = useAddress();

    const { editStatusOrder, removeOrderMutation } = useOrder({ page, pageSize, queryFilter });
    const { isLoading, data } = useOrderList({ page, pageSize, queryFilter });
    const { isLoading: isLoadingSummary, data: dataSummary } = useOrderSummary();
    const [isLoadingExport, setIsLoadingExport] = useState(false);

    useEffect(() => {
        if (id) {
            setIsVisibleDetail(true);
            setDetailOfOrder(id)
        }
    }, [id])


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

    const handleClickRemove = (id: any) => {
        removeOrderMutation.mutate(id)
    }

    const handleClickExport = async (range: any) => {
        setIsLoadingExport(true)
        const controller = new AbortController();

        setTimeout(() => {
            controller.abort()
        }, 5000);

        const data: any = await exportOrder(buildQueryString(range), controller.signal)
        const exportData = data?.data?.content;

        const payload = exportData.map((values: any) => {
            let result = {
                ...values,
                dia_chi: buildAddressFromId({
                    dia_chi: values.dia_chi,
                    phuong_id: values.phuong_id,
                    quan_id: values.quan_id,
                    tinh_thanh_id: values.tinh_thanh_id,
                }),
                thoi_gian_dat_hang: formatTime(values.thoi_gian_dat_hang, "dd/mm/yyyy hh:mm")
            }

            delete result['phuong_id']
            delete result['tinh_thanh_id']
            delete result['quan_id'];

            return result;
        })

        exportHandler(payload, { dateNF: 'dd/mm/yyyy;@', cellDates: true, raw: true })
        setIsLoadingExport(false);
    };

    return (
        <div>
            <div className="flex items-center flex-wrap">
                {!isLoadingSummary && Metrics.map((metric, index) => {
                    return <MetricCard {...metric} key={index} />
                })}
            </div>

            <h2 className="lg:mt-0 mt-5 text-lg text-center uppercase lg:text-xl font-semibold">
                Đơn hàng
            </h2>

            <div className="px-0 lg:p-4 mt-4 lg:mt-8 flex justify-between items-center">
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

                <div>
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
                        className="lg:h-[40px] h-[26px]"
                    />

                    <Button
                        className="lg:h-[40px] h-[26px] ml-3"
                        variant={"outline"}
                        disabled={isLoadingExport}
                        onClick={() => {
                            handleClickExport(
                                {
                                    startDate: dayjs().startOf("month").format(),
                                    endDate: dayjs().add(1, 'day').format()
                                }
                            )
                        }}
                    >
                        Xuất tháng
                    </Button>

                    <Button
                        className="lg:h-[40px] h-[26px] ml-3"
                        variant={"outline"}
                        disabled={isLoadingExport}
                        onClick={() => {
                            handleClickExport({
                                startDate: "",
                                endDate: ""
                            })
                        }}
                    >
                        Xuất All
                    </Button>
                </div>
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
                    onHandleRemove={handleClickRemove}
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
                label={`Chi tiết đơn hàng #${detialOfOrder}`}
                context='orderDetail'
                defaultValues={detialOfOrder}
            />
        </div>
    )
}

export default AdminOrder;