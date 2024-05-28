import {
    OrderCreate,
    Orders
} from '@/Types/Order.type';

import { http, httpGuard } from "@/lib/utils";

const Models = {
    list: 'order/pagination',
    summary: "order/summary",
    create: 'order',
    item: 'order'
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

export const editStatus = (id: any, payload: any) => {
    return httpGuard.patch<any>(`${Models.create}/${id}`, payload)
}


export const removeOrder = (id: any) => {
    return httpGuard.delete<any>(`${Models.create}/${id}`)
}


export const getOrderDetail = (orderID: number | string) => httpGuard.get<any>(`${Models.item}/${orderID}`)
