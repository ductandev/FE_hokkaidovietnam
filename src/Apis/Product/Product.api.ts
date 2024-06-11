import { Products, Product, ProductCreate } from '@/Types/Product.type'
import { http, httpGuard } from "@/lib/utils"

const Models = {
    list: 'product/pagination',
    item: 'product',
    summary: "product/summary",
    create: "product",
    update: "product/info"
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

export const getProductSummary = (
    signal?: AbortSignal) =>
    http.get(`${Models.summary}`, {
        signal
    });

export const addProduct = (body: ProductCreate) => {
    return httpGuard.post<any>(`${Models.create}`, body)
}


export const removeProduct = (id: string | number) => {
    return httpGuard.delete<any>(`${Models.create}/${id}`)
}

export const updateProduct = (id: string | number, body: any) => {
    return httpGuard.patch<any>(`${Models.update}/${id}`, body)
}

export const getProduct = (id: number | string) => http.get<Product>(`${Models.item}/${id}`)
