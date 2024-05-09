import { useMemo, useState } from "react";
import { useProducts } from "@/Hooks/useProduct";
import useDebouncedCallback from "@/Hooks/useDebounceCallback";

import DataGrid from "@/Components/DataGrid/Datagrid";
import MetricCard from "@/Components/Metrics/MetricCard";
import { Button } from "@/Components/ui/button";
import { HPagination } from "@/Components/Pagination";
import { Input } from "@/Components/ui/input";
import PageSize from "@/Components/PageSize";

import { LuPackageSearch } from "react-icons/lu";
import { LiaBoxSolid } from "react-icons/lia";
import { useQuery } from "react-query";
import { getProductTypes } from "@/Apis/Product/ProductType.api";

function AdminProduct() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState("");
    const [debouncedValue, setDebouncedValue] = useState("");

    const {
        isLoading,
        data
    } = useProducts({ page, pageSize, search: debouncedValue });

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
                index: 55,
                format: "sản phẩm"
            },
            {
                icon: <LiaBoxSolid />,
                label: "Loại sản phẩm",
                index: 5,
                format: "loại"
            },
        ];
    }, []);

    return (
        <div>
            <div className="flex items-center">
                {Metrics.map((metric, index) => {
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
                        className="mr-6"
                        defaultValue={pageSize}
                        onChange={(size: number) => {
                            setPage(1);
                            setPageSize(size)
                        }}
                    />

                    <Input placeholder="Tìm kiếm"
                        value={search}
                        onChange={(event) => {
                            debouncedCallback(event.target.value);
                            setSearch(event.target.value)
                        }}
                    />
                </div>

                <Button>
                    Tạo sản phẩm
                </Button>
            </div>

            {isLoading || isLoadingProductType ? <>
                <p>Đang tải</p>
            </> :
                <DataGrid
                    data={data?.content}
                    type={'product'}
                    page={page}
                    pageSize={pageSize}
                    addon={productType?.data?.content}
                />
            }


            <HPagination
                total={data?.total || 0}
                pageSize={pageSize}
                current={page}
                onChangePage={(page: number) => {
                    setPage(page)
                }}
            />
        </div>
    )
}

export default AdminProduct;