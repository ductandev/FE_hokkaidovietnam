import { useQuery } from "react-query";

// * Custom Apis
import { getCustomers } from "@/Apis/Customer/Customer.api";

type TypeListCustomer = {
    page: string | number;
    pageSize: string | number;
    search: string;
}
const DEFAULT_PAGE_SIZE = 10;

export const useCustomerList = ({ page, pageSize = DEFAULT_PAGE_SIZE, search = "" }: TypeListCustomer) => {
    const { isLoading, data }: any = useQuery({
        queryKey: ['customer', `${page}_${search}`],
        queryFn: () => {
            const controller = new AbortController();

            setTimeout(() => {
                controller.abort()
            }, 5000);

            return getCustomers(page, pageSize, search, controller.signal)
        },
        keepPreviousData: true,
        retry: 0
    });

    return { isLoading, data: data?.data }
}


export const useCustomer = () => {
    const editCustomer = () => { } // * Sửa đơn hàng
    const deleteCustomer = () => { } // * Xoá đơn hàng
    const addCustomer = () => { } // * Thêm đơn hàng

    return { editCustomer, deleteCustomer, addCustomer }
}