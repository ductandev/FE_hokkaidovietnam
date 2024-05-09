import { Products, Product } from '@/Types/Product.type'
import { http } from "@/lib/utils"

const Models = {
    list: 'product/pagination',
    item: 'get-product-by-id'
};

export const getProducts = (
    page: number | string,
    limit: number | string,
    typeId: number | string,
    search: string,
    signal?: AbortSignal) =>
    http.get<Products>(`${Models.list}`, {
        params: {
            page,
            limit,
            typeID: typeId,
            ...(search && { search: search })
        },
        signal
    });

export const getProduct = (id: number | string) => http.get<Product>(`${Models.item}/${id}`)
