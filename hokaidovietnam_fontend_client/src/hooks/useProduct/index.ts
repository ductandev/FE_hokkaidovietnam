import { getProductSummary, getProducts } from "@/Apis/Product/Product.api";
import { useQuery } from "react-query";

type TypeListProduct = {
    page: string | number;
    pageSize: string | number;
    search: string;
}
const PAGE_SIZE = 10;

export const useProducts = ({ page, pageSize = PAGE_SIZE, search = "" }: TypeListProduct) => {
    const { isLoading, data }: any = useQuery({
        queryKey: ['products', `${page}_${search}_${pageSize}`],
        queryFn: () => {
            const controller = new AbortController();

            setTimeout(() => {
                controller.abort()
            }, 5000);

            return getProducts(page, pageSize, 0, search, controller.signal)
        },
        keepPreviousData: true,
        retry: 0
    });

    return { isLoading, data: data?.data }
};

export const useProductSummary = () => {
    const { isLoading, data }: any = useQuery({
        queryKey: ['product_summary'],
        queryFn: () => {
            const controller = new AbortController();

            setTimeout(() => {
                controller.abort()
            }, 5000);

            return getProductSummary(controller.signal)
        },
        keepPreviousData: true,
        retry: 0
    });

    return { isLoading, data: data?.data }
}

export const useProduct = () => {
    const editProduct = () => { } // * Sửa sản phẩm
    const deleteProduct = () => { } // * Xoá sản phẩm
    const addProduct = () => { } // * Thêm sản phẩm

    return { editProduct, deleteProduct, addProduct }
}