import { Customers } from '@/Types/Customer.type';
import { httpGuard } from "@/lib/utils"

const Models = {
    list: 'contact/pagination',
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