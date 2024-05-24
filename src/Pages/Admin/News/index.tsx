import { useMemo, useRef, useState } from "react";
import useDebouncedCallback from "@/Hooks/useDebounceCallback";
import DataGrid from "@/Components/DataGrid/Datagrid";
import MetricCard from "@/Components/Metrics/MetricCard";
import { HPagination } from "@/Components/Pagination";
import { Input } from "@/Components/ui/input";
import PageSize from "@/Components/PageSize";
import { LuPackageSearch } from "react-icons/lu";
import { useNewsList, useNewsSummary } from "@/Hooks/useNews";
import { Button } from "@/Components/ui/button";

import { Editor } from '@tinymce/tinymce-react';
import tinymce from "tinymce";

import { useFormik } from "formik";
import * as yup from "yup";


export interface UserNewsFrm {
    hinh_anh: string;
    tieu_de: string;
    mo_ta: string;
    noi_dung: string;
    bai_viet_lien_quan: Array<any>;
}

function AdminNews() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState("");
    const [debouncedValue, setDebouncedValue] = useState("");

    const { isLoading, data } = useNewsList({ page, pageSize, search: debouncedValue });
    const { isLoading: isLoadingSummary, data: dataSummary } = useNewsSummary();

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


    const editorRef = useRef<any | null>(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };;


    const newsFrm = useFormik<UserNewsFrm>({
        initialValues: {
            hinh_anh: "",
            tieu_de: "",
            mo_ta: "",
            noi_dung: "",
            bai_viet_lien_quan: []
        },
        validationSchema: yup.object().shape({
            hinh_anh: yup
                .string()
                .required("Hình ảnh không được bỏ trống!"),
            tieu_de: yup
                .string()
                .required("Tiêu đề không được bỏ trống!"),
            mo_ta: yup
                .string()
                .required("Mô tả không được bỏ trống!"),
            noi_dung: yup
                .string(),
            bai_viet_lien_quan: yup
                .array()
        }),
        onSubmit: (values: UserNewsFrm) => {
            console.log(values)
            // const actionApi = loginAsyncAction(values);
            // dispatch(actionApi);
        },
    });


    return (
        <div>
            <div className="flex items-center">
                {!isLoadingSummary && Metrics.map((metric, index) => (
                    <MetricCard {...metric} key={index} />
                ))}
            </div>

            <h2 className="text-center uppercase text-xl font-semibold">Tin tức</h2>

            <div className="p-4 mt-8 flex justify-between items-center">
                <div className="flex justify-between items-center">
                    <PageSize
                        options={[10, 20, 50]}
                        className="mr-6"
                        defaultValue={pageSize}
                        onChange={(size: number) => {
                            setPage(1);
                            setPageSize(size);
                        }}
                    />
                    <Input
                        placeholder="Tìm kiếm"
                        value={search}
                        onChange={(event) => {
                            debouncedCallback(event.target.value);
                            setSearch(event.target.value);
                        }}
                    />
                </div>
                <Button>Tạo tin mới</Button>
            </div>

            {isLoading ? (
                <p>Đang tải</p>
            ) : (
                <DataGrid
                    data={data?.content}
                    type={'news'}
                    page={page}
                    pageSize={pageSize}
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

            <h2 className="text-center uppercase text-xl font-semibold">Thêm bài viết</h2>


            <form onSubmit={newsFrm.handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="hinh_anh">Ảnh tiêu đề</label>
                    <br />
                    <input id={"hinh_anh"} name={"hinh_anh"} type={"file"} onInput={newsFrm.handleChange} onBlur={newsFrm.handleBlur} />
                    {newsFrm.errors.hinh_anh && <p className='text-rose-500 text-sm mt-1'>{newsFrm.errors.hinh_anh} </p>}
                </div>

                <div className='form-group'>
                    <label htmlFor="tieu_de">Tiêu đề</label>
                    <br />
                    <Input id={"tieu_de"} name={"tieu_de"} type={"text"} onInput={newsFrm.handleChange} onBlur={newsFrm.handleBlur} />
                    {newsFrm.errors.tieu_de && <p className='text-rose-500 text-sm mt-1'>{newsFrm.errors.tieu_de} </p>}
                </div>

                <div className='form-group'>
                    <label htmlFor="mo_ta">Mô tả</label>
                    <br />
                    <Input id={"mo_ta"} name={"mo_ta"} type={"text"} onInput={newsFrm.handleChange} onBlur={newsFrm.handleBlur} />
                    {newsFrm.errors.mo_ta && <p className='text-rose-500 text-sm mt-1'>{newsFrm.errors.mo_ta} </p>}
                </div>

                <div className='form-group'>
                    <label htmlFor="noi_dung">Nội dung</label>
                    <br />
                    <Editor
                        id="noi_dung"
                        tagName="noi_dung"
                        textareaName="noi_dung"
                        apiKey='dazse2cf61esolietcm6fohrg0fd3nwtci0fv66ouesgweb1'
                        onInit={(_evt, editor) => editorRef.current = editor}
                        // initialValue="<p>This is the initial content of the editor.</p>"
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'emoticons', 'export', 'checklist',
                            ],
                            toolbar: 'undo redo | blocks fontfamily fontsize |' +
                                'forecolor | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify lineheight |' +
                                'bullist numlist checklist outdent indent |' +
                                'link image media table | emoticons charmap |' +
                                'removeformat | help',
                            toolbar_mode: 'wrap',
                            content_style: 'body { font-family:Arial,sans-serif; font-size: 14px }',
                            file_picker_callback: (cb, value, meta) => {
                                const input = document.createElement('input');
                                input.setAttribute('type', 'file');
                                input.setAttribute('accept', 'image/*');
                                input.onchange = (event) => {
                                    const target = event.target as HTMLInputElement;
                                    const file = target.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = () => {
                                            if (reader.result && tinymce.activeEditor) {
                                                const id = 'blobid' + (new Date()).getTime();
                                                const blobCache = tinymce.activeEditor.editorUpload.blobCache;
                                                const base64 = reader.result.toString().split(',')[1];
                                                const blobInfo = blobCache.create(id, file, base64);
                                                blobCache.add(blobInfo);
                                                cb(blobInfo.blobUri(), { title: file.name });
                                            }
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                };
                                input.click();
                            },
                        }}
                    />
                    {newsFrm.errors.noi_dung && <p className='text-rose-500 text-sm mt-1'>{newsFrm.errors.noi_dung} </p>}
                </div>


                <button
                    type="submit"
                    disabled={!newsFrm.isValid}
                    className="w-full bg-black text-white h-[60px]"
                >
                    Tạo bài viết
                </button>

            </form>




            <button onClick={log}>Log editor content</button>
        </div>
    );
}

export default AdminNews;
