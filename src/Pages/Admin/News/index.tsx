import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useDebouncedCallback from "@/Hooks/useDebounceCallback";
import { useNewsList, useNewsSummary } from "@/Hooks/useNews";
import { useMutation, useQueryClient } from "react-query";

import DataGrid from "@/Components/DataGrid/Datagrid";
import MetricCard from "@/Components/Metrics/MetricCard";
import { HPagination } from "@/Components/Pagination";
import { Input } from "@/Components/ui/input";
import PageSize from "@/Components/PageSize";
import { Button } from "@/Components/ui/button";
import { toast } from "react-toastify";

import { LuPackageSearch } from "react-icons/lu";

import { removeNews } from "@/Apis/News/News.api";

export interface UserNewsFrm {
    hinh_anh: string;
    tieu_de: string;
    mo_ta: string;
    noi_dung: string;
    bai_viet_lien_quan: Array<any>;
};

function AdminNews() {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState("");
    const [debouncedValue, setDebouncedValue] = useState("");
    const navigate = useNavigate();

    const { isLoading, data } = useNewsList({ page, pageSize, search: debouncedValue });
    const { isLoading: isLoadingSummary, data: dataSummary } = useNewsSummary();

    const removeNewsMutation = useMutation({
        mutationFn: (id: number | string) => removeNews(id),
        onSuccess: (_, id) => {
            const key = ['news', `${page}_${search}_${pageSize}`];

            toast.success(`Xóa thành công bài viết với id là ${id}`);
            queryClient.invalidateQueries({ queryKey: key, exact: true })
        }
    });


    const Metrics = useMemo(() => {
        return [
            {
                icon: <LuPackageSearch />,
                label: "Tổng số tin tức",
                index: dataSummary?.content?.totalNews,
                format: "tin tức"
            },
        ];
    }, [dataSummary]);

    const handleChangeDebounced = (value: string) => {
        setPage(1);
        setDebouncedValue(value);
    };

    const [debouncedCallback] = useDebouncedCallback(handleChangeDebounced, 500, [search]);

    const handleRemove = (id: any) => {
        removeNewsMutation.mutate(id)
    }

    const handleEdit = (id: any) => {
        navigate(`/admin/news-editor/${id}`)
    }

    return (
        <div>
            <div className="flex items-center flex-wrap">
                {!isLoadingSummary && Metrics.map((metric, index) => (
                    <MetricCard {...metric} key={index} />
                ))}
            </div>

            <h2 className="text-center uppercase text-xl font-semibold">Tin tức</h2>

            <div className="p-4 mt-8 flex justify-between items-center">
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
                </div>

                <Button asChild>
                    <Link to={"/admin/news-editor"}>
                        Tạo bài viết mới
                    </Link>
                </Button>
            </div>

            {isLoading ? (
                <p>Đang tải</p>
            ) : (
                <DataGrid
                    data={data?.content}
                    type={'news'}
                    page={page}
                    pageSize={pageSize}
                    onHandleRemove={handleRemove}
                    onHandleEdit={handleEdit}
                />
            )}

            <HPagination
                total={data?.total || 0}
                pageSize={pageSize}
                current={page}
                onChangePage={(page: number) => {
                    setPage(page);
                }}
            />
        </div>
    );
}

export default AdminNews;
