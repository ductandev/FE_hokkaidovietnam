import { useMemo, useState } from "react";
import { useProduct, useProductSummary, useProducts } from "@/Hooks/useProduct";
import { useQuery } from "react-query";
import useDebouncedCallback from "@/Hooks/useDebounceCallback";

import DataGrid from "@/Components/DataGrid/Datagrid";
import MetricCard from "@/Components/Metrics/MetricCard";
import { HPagination } from "@/Components/Pagination";
import { Input } from "@/Components/ui/input";
import PageSize from "@/Components/PageSize";
import { DrawerDialog } from "../Form";

import { LuPackageSearch } from "react-icons/lu";
import { LiaBoxSolid } from "react-icons/lia";
import { getProductTypes } from "@/Apis/Product/ProductType.api";

function AdminProduct() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState("");
    const [debouncedValue, setDebouncedValue] = useState("");
    const [isVisibleAdd, setIsVisibleAdd] = useState(false);

    const {
        isLoading,
        data
    } = useProducts({ page, pageSize, search: debouncedValue });
    const { isLoading: isLoadingSummary, data: dataSummary } = useProductSummary();


    const { edit, remove } = useProduct({ page, pageSize, search: debouncedValue });

    const { isLoading: isLoadingProductType, data: productType }: any = useQuery({
        queryKey: ['productType'],
        queryFn: () => {
            const controller = new AbortController();

            setTimeout(() => {
                controller.abort()
            }, 5000)
            return getProductTypes(controller.signal)
        },
        keepPreviousData: true,
        retry: 0
    });

    const handleChangeDebounced = (value: string) => {
        setPage(1);
        setDebouncedValue(value);
    };

    const [debouncedCallback] = useDebouncedCallback(handleChangeDebounced, 500, [search]);

    const Metrics = useMemo(() => {
        return [
            {
                icon: <LuPackageSearch />,
                label: "Số lượng sản phẩm",
                index: dataSummary?.content?.totalProduct,
                format: "sản phẩm"
            },
            {
                icon: <LiaBoxSolid />,
                label: "Loại sản phẩm",
                index: dataSummary?.content?.totalTypeProduct,
                format: "loại"
            },
        ];

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataSummary]);

    return (
        <div>
            <div className="flex items-center">
                {!isLoadingSummary && Metrics.map((metric, index) => {
                    return <MetricCard {...metric} key={index} />
                })}
            </div>

            <h2 className="text-center uppercase text-xl font-semibold">
                Sản phẩm
            </h2>

            <div className="p-4 mt-8 flex justify-between items-center">
                <div className="flex justify-between items-center">
                    <PageSize
                        options={[10, 20, 50]}
                        className="mr-3 w-full"
                        defaultValue={pageSize}
                        onChange={(size: number) => {
                            setPage(1);
                            setPageSize(size)
                        }}
                    />

                    <Input
                        placeholder="Tìm kiếm"
                        value={search}
                        onChange={(event) => {
                            debouncedCallback(event.target.value);
                            setSearch(event.target.value)
                        }}
                        className="w-[230px]"
                    />
                </div>

                <DrawerDialog
                    label={'Tạo sản phẩm'}
                    isVisible={isVisibleAdd}
                    onHandleToogleVisible={(visible: boolean) => {
                        setIsVisibleAdd(visible)
                    }}
                    context='product'
                />
            </div>

            {isLoading || isLoadingProductType ? <>
                <p>Đang tải</p>
            </> : <DataGrid
                data={data?.content}
                type={'product'}
                page={page}
                pageSize={pageSize}
                addon={productType?.data?.content}
                onHandleRemove={remove}
                onHandleEdit={edit}
            />}

            <HPagination
                total={data?.total || 0}
                pageSize={pageSize}
                current={page}
                onChangePage={(page: number) => {
                    setPage(page)
                }}
            />


        </div >
    )
}

export default AdminProduct;