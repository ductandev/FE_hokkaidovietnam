import { addProduct, getProductSummary, getProducts, removeProduct, updateProduct } from "@/Apis/Product/Product.api";

import {
    useMutation,
    useQuery,
    useQueryClient
} from "react-query";

import { toast } from "react-toastify";

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
        keepPreviousData: false,
        retry: 0,
        refetchOnWindowFocus: true
    });

    return { isLoading, data: data?.data }
}

export const useProduct = ({ page, search, pageSize }: any) => {
    const queryClient = useQueryClient();

    const addProductMutation = useMutation({
        mutationFn: (body: any) => addProduct(body),
        onSuccess: (_, id) => {
            const key = ['products', `${page}_${search}_${pageSize}`];

            toast.success(`Tạo thành công sản phẩm`);
            queryClient.invalidateQueries({ queryKey: key, exact: true })
        }
    });

    const removeProductMutation = useMutation({
        mutationFn: (id: number | string) => removeProduct(id),
        onSuccess: (_, id) => {
            const key = ['products', `${page}_${search}_${pageSize}`];

            toast.success(`Xóa thành công product với id là ${id}`);
            queryClient.invalidateQueries({ queryKey: key, exact: true })
        }
    });

    const updateProductMutation = useMutation({
        mutationFn: ({ id, product }: any) => updateProduct(id, product),
        onSuccess: (data,) => {
            const key = ['products', `${page}_${search}_${pageSize}`]
            const id = data?.data?.content?.san_pham_id;
            const newData = data?.data?.content;

            let existingProducts: any = queryClient.getQueryData(key);

            const updatedProducts = existingProducts?.data?.content?.map((item: any) => {
                if (+item.san_pham_id === +id) {
                    return newData;
                } else {
                    return item;
                }
            });

            existingProducts = {
                ...existingProducts,
                data: {
                    ...existingProducts.data,
                    content: updatedProducts
                }
            };

            queryClient.setQueryData(key, existingProducts);
        }
    })

    // * Sửa sản phẩm
    const edit = (id: string | number, product: any) => {
        updateProductMutation.mutate({ id, product } as any, {
            onSuccess: (_) => {
                toast.success('Update thành công!')
            }
        })
    };

    // * Xoá sản phẩm
    const remove = (id: string | number) => {
        removeProductMutation.mutate(id)
    };

    // * Thêm sản phẩm
    const add = (payload: any) => {
        addProductMutation.mutateAsync(payload)
    };

    return { edit, remove, add }
}