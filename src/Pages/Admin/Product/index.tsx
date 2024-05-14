import { useMemo, useState } from "react";
import { useProduct, useProductSummary, useProducts } from "@/Hooks/useProduct";
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
    const { isLoading: isLoadingSummary, data: dataSummary } = useProductSummary();
    const { add, edit, remove } = useProduct({ page, pageSize, search: debouncedValue })

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

                <Button onClick={() => {
                    add({
                        loai_san_pham_id: 0,
                        ten_san_pham: "Sản phẩm tạo demo thử API",
                        gia_ban: 500000,
                        gia_giam: 50000,
                        mo_ta: "Mô tả vãi cả lìn",
                        thong_tin_chi_tiet: "Đã mô tả còn thông tin chi tiết nữa hài vcl",
                        don_vi_tinh: "Lon cái này cho thành enum nha má",
                        trang_thai_san_pham: true,
                        so_luong_trong_kho: 100,
                        hinh_anh: ["https://media.istockphoto.com/id/1401126607/vi/anh/khung-c%E1%BA%A3nh-tr%C3%AAn-kh%C3%B4ng-c%E1%BB%A7a-nh%E1%BB%AFng-t%C3%B2a-nh%C3%A0-ch%E1%BB%8Dc-tr%E1%BB%9Di-tuy%E1%BB%87t-%C4%91%E1%BA%B9p-d%E1%BB%8Dc-theo-d%C3%B2ng-s%C3%B4ng-tr%C3%AAn-b%E1%BA%A7u-tr%E1%BB%9Di.jpg?s=612x612&w=0&k=20&c=tKG0XCBB-k7AuUUNvH6VrCW7DjSojIGmrxJD6rcPabE="]
                    });
                }}>
                    Tạo sản phẩm
                </Button>

                {/* <Button onClick={() => {
                    // * 2 tham số: 1 là sanphamid , 2 là body
                    edit(1, {
                        don_vi_tinh: null,
                        gia_ban: 27000,
                        gia_giam: 0,
                        hinh_anh: ["http://res.cloudinary.com/dodirc71p/image/upload/v1714917822/dm9ohch92ekgfwlbkzlo.jpg"],
                        isDelete: false,
                        loai_san_pham_id: 1,
                        mo_ta: "– Dòng sữa tươi thuần khiết 100% được sản xuất tại Hokkaido – vùng đất khí hậu mát mẻ, nguồn nước và không khí sạch cùng những thảo nguyên xanh tạo ra không gian chăn nuôi tự nhiên vô cùng lý tưởng cho bò sữa.\n– Môi trường sống ưu đãi của Hokkaido đã tạo ra hương vị sữa độc quyền nhờ luôn giữ nguyên độ tươi ngon như vừa mới vắt, cùng sắc thái thanh nhẹ.\n– Bí mật của sữa Hokkaido làm các bé say mê nằm ở con số 3.6. Theo số liệu của Hiệp hội Sữa Nhật Bản, con số 3.6 trong sữa thể hiện hàm lượng chất béo có trong sữa, cao hơn hẳn so với các loại sữa tươi thông thường.\n– Đặc biệt, công nghệ sát khuẩn sữa cực nhanh trong vòng 2s nên sữa Hokkaido vẫn giữ nguyên được các vi khuẩn có lợi cho hệ miễn dịch cho bé ạ!\n",
                        san_pham_id: 1,
                        san_pham_lien_quan: null,
                        san_pham_noi_bat: false,
                        so_luong_trong_kho: 100,
                        ten_san_pham: "Sữa tươi nguyên chất 1L",
                        thong_tin_chi_tiet: "– Dòng sữa tươi thuần khiết 100% được sản xuất tại Hokkaido – vùng đất khí hậu mát mẻ, nguồn nước và không khí sạch cùng những thảo nguyên xanh tạo ra không gian chăn nuôi tự nhiên vô cùng lý tưởng cho bò sữa.\n– Môi trường sống ưu đãi của Hokkaido đã tạo ra hương vị sữa độc quyền nhờ luôn giữ nguyên độ tươi ngon như vừa mới vắt, cùng sắc thái thanh nhẹ.\n– Bí mật của sữa Hokkaido làm các bé say mê nằm ở con số 3.6. Theo số liệu của Hiệp hội Sữa Nhật Bản, con số 3.6 trong sữa thể hiện hàm lượng chất béo có trong sữa, cao hơn hẳn so với các loại sữa tươi thông thường.\n– Đặc biệt, công nghệ sát khuẩn sữa cực nhanh trong vòng 2s nên sữa Hokkaido vẫn giữ nguyên được các vi khuẩn có lợi cho hệ miễn dịch cho bé ạ!\n",
                        trang_thai_san_pham: true
                    })
                }}>
                    sửa sản phẩm
                </Button> */}
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