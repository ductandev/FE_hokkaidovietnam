import { useQuery } from "react-query";

// * Custom Apis
import { getOrderSummary, getOrders } from "@/Apis/Order/Order.api";

type TypeListOrder = {
    page: string | number;
    pageSize: string | number;
    queryFilter: string;
}
const DEFAULT_PAGE_SIZE = 10;

export const useOrderList = ({ page, pageSize = DEFAULT_PAGE_SIZE, queryFilter = "" }: TypeListOrder) => {
    const { isLoading, data }: any = useQuery({
        queryKey: ['orders', `${page}_${pageSize}_${queryFilter}`],
        queryFn: () => {
            const controller = new AbortController();

            setTimeout(() => {
                controller.abort()
            }, 5000);

            return getOrders(page, pageSize, queryFilter, controller.signal)
        },
        keepPreviousData: true,
        retry: 0
    });

    return { isLoading, data: data?.data }
}

export const useOrderSummary = () => {
    const { isLoading, data }: any = useQuery({
        queryKey: ['orders_summary'],
        queryFn: () => {
            const controller = new AbortController();

            setTimeout(() => {
                controller.abort()
            }, 5000);

            return getOrderSummary(controller.signal)
        },
        keepPreviousData: true,
        retry: 0
    });

    return { isLoading, data: data?.data }
}

export const useOrder = () => {
    const editOrder = () => { } // * Sửa đơn hàng

    const deleteOrder = () => { } // * Xoá đơn hàng

    const addOrder = () => { } // * Thêm đơn hàng

    return { editOrder, deleteOrder, addOrder }
}