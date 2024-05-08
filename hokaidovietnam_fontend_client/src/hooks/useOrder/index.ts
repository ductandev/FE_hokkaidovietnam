import { useQuery } from "react-query";

// * Custom Apis
import { getOrders } from "@/Apis/Order/Order.api";

type TypeListOrder = {
    page: string | number;
    pageSize: string | number;
    search: string;
}
const PAGE_SIZE = 10;

export const useOrderList = ({ page, pageSize = PAGE_SIZE, search = "" }: TypeListOrder) => {
    const { isLoading, data }: any = useQuery({
        queryKey: ['orders', `${page}_${search}`],
        queryFn: () => {
            const controller = new AbortController();

            setTimeout(() => {
                controller.abort()
            }, 5000)
            return getOrders(page, pageSize, search, controller.signal)
        },
        keepPreviousData: true,
        retry: 0
    });

    return { isLoading, data }
}

export const useOrder = () => {


    const editOrder = () => { } // * Sửa đơn hàng

    const deleteOrder = () => { } // * Xoá đơn hàng

    const addOrder = () => { } // * Thêm đơn hàng

    return { editOrder, deleteOrder, addOrder }
}