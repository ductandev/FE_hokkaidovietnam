import {
    OrderCreate,
    Orders
} from '@/Types/Order.type';

import { http, httpGuard } from "@/lib/utils";

const Models = {
    list: 'order',
    summary: "order/summary",
    create: 'order',
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

export const getOrderSummary = (
    signal?: AbortSignal) =>
    httpGuard.get(`${Models.summary}`, {
        signal
    });


export const postOrder = (payload: OrderCreate) => {
    return http.post<OrderCreate>(`${Models.create}`, payload)
}


// export const getOrder = (orderID: number | string) => http.get<Order>(`${Models.item}/${orderID}`)
