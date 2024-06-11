import { CustomerEdit, Customers } from '@/Types/Customer.type';
import { httpGuard } from "@/lib/utils"

const Models = {
    list: 'user/pagination',
    summary: 'user/summary',
    remove: "user",
    detail: "user",
    edit: 'user'
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

export const patchCustomer = (id: any, payload: CustomerEdit) => {
    return httpGuard.patch<CustomerEdit>(`${Models.edit}/${id}`, payload)
}

export const removeCustomer = (id: string | number) => {
    return httpGuard.delete<any>(`${Models.remove}/${id}`)
}

export const getCustomerDetail = (id: string | number) => {
    return httpGuard.get<any>(`${Models.detail}/${id}`)
}