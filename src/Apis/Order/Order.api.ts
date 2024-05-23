import {
    OrderCreate,
    Orders
} from '@/Types/Order.type';

import { http, httpGuard } from "@/lib/utils";

const Models = {
    list: 'order/pagination',
    summary: "order/summary",
    create: 'order',
};

export const getOrders = (
    page: number | string,
    limit: number | string,
    queryFilter: string,
    signal?: AbortSignal) =>
    httpGuard.get<Orders>(`${Models.list}${queryFilter}`, {
        params: {
            page,
            limit,
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
