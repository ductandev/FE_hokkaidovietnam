import { useMutation, useQuery, useQueryClient } from "react-query";

// * Custom Apis
import { getCustomerSummary, getCustomers, removeCustomer } from "@/Apis/Customer/Customer.api";
import { toast } from "react-toastify";

type TypeListCustomer = {
    page: string | number;
    pageSize: string | number;
    search: string;
}
const DEFAULT_PAGE_SIZE = 10;

export const useCustomerList = ({ page, pageSize = DEFAULT_PAGE_SIZE, search = "" }: TypeListCustomer) => {

    const { isLoading, data }: any = useQuery({
        queryKey: ['customer', `${page}_${search}_${pageSize}`],
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

export const useCustomerSummary = () => {
    const { isLoading, data }: any = useQuery({
        queryKey: ['customer_summary'],
        queryFn: () => {
            const controller = new AbortController();

            setTimeout(() => {
                controller.abort()
            }, 5000);

            return getCustomerSummary(controller.signal)
        },
        keepPreviousData: true,
        retry: 0
    });

    return { isLoading, data: data?.data }
}


export const useCustomer = ({ page, search, pageSize }: any) => {
    const queryClient = useQueryClient();

    const removeCustomerMutation = useMutation({
        mutationFn: (id: number | string) => removeCustomer(id),
        onSuccess: (_, id) => {
            const key = ['customer', `${page}_${search}_${pageSize}`];

            toast.success(`Xóa thành công khách hàng với id là ${id}`);

            queryClient.invalidateQueries({ queryKey: key, exact: true })
        }
    });

    const remove = (id: string | number) => {
        removeCustomerMutation.mutate(id)
    };


    return { remove }
}