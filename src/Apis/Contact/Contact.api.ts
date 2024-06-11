import { Customers } from '@/Types/Customer.type';
import { httpGuard } from "@/lib/utils"

const Models = {
    list: 'contact/pagination',
    summary: 'contact/summary',
    remove: "contact",
    edit: 'contact'
};

export const getContacts = (
    page: number | string,
    limit: number | string,
    search: string,
    signal?: AbortSignal) =>
    httpGuard.get<Customers>(`${Models.list}`, {
        params: {
            page,
            limit,
            typeID: 0,
            ...(search && { search: search })
        },
        signal
    }
    );

export const getContactSummary = (
    signal?: AbortSignal) =>
    httpGuard.get(`${Models.summary}`, {
        signal
    });

export const removeContact = (id: string | number) => {
    return httpGuard.delete<any>(`${Models.remove}/${id}`)
}

export const editStatusContact = (id: any, payload: any) => {
    return httpGuard.patch<any>(`${Models.edit}/${id}`, payload)
}