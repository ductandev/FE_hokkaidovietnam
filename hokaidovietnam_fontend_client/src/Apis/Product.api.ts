import { Products, Product } from '@/Types/Product.type'
import http from "@/lib/utils"

const Models = {
    list: 'products-pagination',
    item: 'product'
};

export const getProducts = (
    page: number | string,
    limit: number | string,
    typeId: number | string,
    signal?: AbortSignal) =>
    http.get<Products>(`${Models.list}`, {
        params: {
            page,
            limit,
            typeID: typeId
        },
        signal
    })

export const getProduct = (id: number | string) => http.get<Product>(`${Models.item}/${id}`)
