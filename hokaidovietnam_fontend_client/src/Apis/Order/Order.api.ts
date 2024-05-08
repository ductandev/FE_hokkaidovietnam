import { Order, Orders } from '@/Types/Order.type';

import http from "@/lib/utils";

const Models = {
    list: 'order/pagination',
    item: 'order/get-product-by-id'
};

export const getOrders = (
    page: number | string,
    limit: number | string,
    search: string,
    signal?: AbortSignal) =>
    http.get<Orders>(`${Models.list}`, {
        params: {
            page,
            limit,
            ...(search && { search }),
        },
        signal
    });

export const getOrder = (orderID: number | string) => http.get<Order>(`${Models.item}/${orderID}`)
