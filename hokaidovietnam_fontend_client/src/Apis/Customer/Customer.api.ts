import { Customers } from '@/Types/Customer.type';
import { httpGuard } from "@/lib/utils"

const Models = {
    list: 'user/pagination',
    summary: 'user/summary',
};

export const getCustomers = (
    page: number | string,
    limit: number | string,
    search: string,
    signal?: AbortSignal) =>
    httpGuard.get<Customers>(`${Models.list}`, {
        params: {
            page,
            limit,
            vaiTroID: 0,
            ...(search && { search: search })
        },
        signal
    });

export const getCustomerSummary = (
    signal?: AbortSignal) =>
    httpGuard.get(`${Models.summary}`, {
        signal
    });

