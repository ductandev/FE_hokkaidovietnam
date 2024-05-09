import {
    // Order,
    Orders
} from '@/Types/Order.type';

import { httpGuard } from "@/lib/utils";

const Models = {
    list: 'order',
};

export const getOrders = (
    page: number | string,
    limit: number | string,
    search: string,
    signal?: AbortSignal) =>
    httpGuard.get<Orders>(`${Models.list}`, {
        params: {
            page,
            limit,
            ...(search && { search }),
        },
        signal
    });

// export const getOrder = (orderID: number | string) => http.get<Order>(`${Models.item}/${orderID}`)
