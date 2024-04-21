import { ProductType } from '@/Types/ProductType.type'
import http from "@/lib/utils"


const Models = {
    list: 'product-type/get-all-product-type',
};

export const getProductTypes = (
    signal?: AbortSignal) =>
    http.get<ProductType>(`${Models.list}`, {
        signal
    })

