import { useMemo, useState } from "react";
import useDebouncedCallback from "@/Hooks/useDebounceCallback";
import {
    // useContact,
    useContactList
} from "@/Hooks/useContact";

import DataGrid from "@/Components/DataGrid/Datagrid";
import MetricCard from "@/Components/Metrics/MetricCard";
import { HPagination } from "@/Components/Pagination";
import { Input } from "@/Components/ui/input";
import PageSize from "@/Components/PageSize";

import { LuPackageSearch } from "react-icons/lu";
// import { LiaBoxSolid } from "react-icons/lia";

function AdminContact() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState("");
    const [debouncedValue, setDebouncedValue] = useState("");

    const {
        isLoading,
        data
    } = useContactList({ page, pageSize, search: debouncedValue });
    // const { add, edit, remove } = useContact({ page, pageSize, search: debouncedValue });

    const handleChangeDebounced = (value: string) => {
        setPage(1);
        setDebouncedValue(value);
    };

    const [debouncedCallback] = useDebouncedCallback(handleChangeDebounced, 500, [search]);

    const Metrics = useMemo(() => {
        return [
            {
                icon: <LuPackageSearch />,
                label: "Tổng số liên hệ",
                index: 1000000,
                format: "liên hệ"
            },
            // {
            //     icon: <LiaBoxSolid />,
            //     label: "Loại sản phẩm",
            //     index: 200000,
            //     format: "loại"
            // },
        ];

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div className="flex items-center">
                {Metrics.map((metric, index) => {
                    return <MetricCard {...metric} key={index} />
                })}
            </div>

            <h2 className="text-center uppercase text-xl font-semibold">
                Liên hệ
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

            {
                isLoading ? <>
                    <p>Đang tải</p>
                </> : <DataGrid
                    data={data?.content}
                    type={'contact'}
                    page={page}
                    pageSize={pageSize}
                // onHandleRemove={remove}
                // onHandleEdit={edit}
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
        </div >
    )
}

export default AdminContact;