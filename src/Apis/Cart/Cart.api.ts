import { httpGuard } from "@/lib/utils"

const Models = {
    getCartByUser: 'cart',
    delete: 'cart',
    put: 'cart',
    addToCart: "cart"
};

export const getCartByUser = (
    signal?: AbortSignal) =>
    httpGuard.get<any>(`${Models.getCartByUser}`, {
        signal
    });


export const addtoCart = (payload: any) =>
    httpGuard.post<any>(`${Models.getCartByUser}`, payload);

export const deleteProductInCart = (product_id: any) =>
    httpGuard.delete<any>(`${Models.delete}/${product_id}`);


export const putProductInCart = (payload: any) =>
    httpGuard.put<any>(`${Models.put}`, payload);


