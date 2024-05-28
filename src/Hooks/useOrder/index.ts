import { useMutation, useQuery, useQueryClient } from "react-query";

// * Custom Apis
import { editStatus, getOrderSummary, getOrders, removeOrder } from "@/Apis/Order/Order.api";
import { toast } from "react-toastify";

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

export const useOrder = ({ page, pageSize = DEFAULT_PAGE_SIZE, queryFilter = "" }: TypeListOrder) => {
    const queryClient = useQueryClient();

    // * Sửa trạng thái đơn hàng
    const editStatusOrder = useMutation({
        mutationFn: (body: any) => editStatus(body.id, {
            trang_thai_don_hang_id: body.status
        }),
        onSuccess: (data) => {
            const key = ['orders', `${page}_${pageSize}_${queryFilter}`];
            const id = data?.data?.content?.don_hang_id;
            const newData = data?.data?.content;

            let existingOrders: any = queryClient.getQueryData(key);

            const updatedOrders = existingOrders?.data?.content?.map((item: any) => {
                if (+item.don_hang_id === +id) {
                    return newData;
                } else {
                    return item;
                }
            });

            existingOrders = {
                ...existingOrders,
                data: {
                    ...existingOrders.data,
                    content: updatedOrders
                }
            };
            queryClient.setQueryData(key, existingOrders);

            toast.success("Chỉnh sửa trạng thái thành công");
        }
    });
    const removeOrderMutation = useMutation({
        mutationFn: (id: number | string) => removeOrder(id),
        onSuccess: (_, id) => {
            const key = ['orders', `${page}_${pageSize}_${queryFilter}`];

            toast.success(`Xóa thành công đơn hàng với id là ${id}`);
            queryClient.invalidateQueries({ queryKey: key, exact: true })
        }
    });

    return { editStatusOrder, removeOrderMutation }
}