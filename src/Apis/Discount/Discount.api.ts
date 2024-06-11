import { http } from "@/lib/utils"

const Models = {
    checkout: 'discount/check',
};

export const checkDiscount = (
    discount: string,
    signal?: AbortSignal) =>
    http.get<any>(`${Models.checkout}`, {
        params: {
            name: discount
        },
        signal
    });