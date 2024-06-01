/**
 * @Author Mạnh Đạt Võ
 * @Created_at 1/6/2024
 * @Edited_at 1/6/2024
 * @From Product Front End Developer
 * @Email vomanhdat10998@gmail.com
*/

import { memo, useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';

// ! Components
import EditorMCE from '@/Components/Editor';
import ImageUpload from '@/Components/ImageUpload';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';

// ! Constants, helpers and APIs
import { articleValidation } from '../Form/Components/schema.validate';
import { DEFAULT_ARTICLE_FORM } from '../Form/constants';
import { getNestedError } from '@/Helper/helper';
import { addNews, getDetailNews, updateNews } from '@/Apis/News/News.api';

function AdminNewsEditorPage() {
    const { id }: any = useParams();
    const isEditStatus = Boolean(id);
    const refEditor: any = useRef(null);
    const navigate = useNavigate();

    // Apis handle Create 
    const { mutateAsync: createNewsAsync }: any = useMutation({
        mutationFn: (body: any) => {
            return addNews(body)
        },
        onSuccess: () => {
            // ! Redirect to admin listing news when success
            navigate("/admin/news");
        },
        onError: (error: any) => {
            const mgs = error.response.data.message
            toast.error(mgs);
        }
    });

    const { mutateAsync: editNewsAsync }: any = useMutation({
        mutationFn: (body: any) => {
            return updateNews(body.id, {
                hinh_anh: body.hinh_anh,
                mo_ta: body.mo_ta,
                tieu_de: body.tieu_de,
                noi_dung: body.noi_dung
            });
        },
        onSuccess: () => {
            // ! Redirect to admin listing news when success
            navigate("/admin/news");
        },
        onError: (error: any) => {
            const mgs = error.response.data.message
            toast.error(mgs);
        }
    });

    const { isLoading, data }: any = useQuery({
        queryKey: ['media', `${id}`],
        queryFn: () => {
            return getDetailNews(id)
        },
        keepPreviousData: true,
        retry: 0,
        enabled: isEditStatus
    });


    const {
        handleSubmit,
        formState: { errors },
        reset,
        clearErrors,
        control,
        ...formProps
    } = useForm<any>({
        mode: "onChange",
        defaultValues: DEFAULT_ARTICLE_FORM,
        resolver: yupResolver(articleValidation),
    });

    useEffect(() => {
        if (!isLoading) {
            reset(data?.data?.content)
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, data])

    const handleOnSubmitForm = async (values: any) => {
        let mainValues = { ...values };
        const getContent = refEditor.current.getContentTrigger()

        mainValues = {
            ...mainValues,
            noi_dung: getContent
        }

        if (isEditStatus) {
            // ! edit news
            mainValues = {
                ...mainValues,
                id
            };

            editNewsAsync(mainValues);
        } else {
            // ! create news
            createNewsAsync(mainValues);
        }
    };

    return (
        <form onSubmit={handleSubmit((values: any) => handleOnSubmitForm(values))} className='px-10'>
            {/* Intro Block */}
            <h2 className='text-center text-2xl'>
                {!isEditStatus ? "Tạo bài viết mới" : "Chỉnh sửa bài viết"}
            </h2>

            <p className='text-center text-base text-gray-400 my-2'>
                Hãy nhanh trí Preview bài viết trước khi gửi để có được kết quả mong muốn
            </p>

            {/* Form Block */}
            <div>
                <Label>Tiêu đề bài viết</Label>

                <Controller
                    control={control}
                    name='tieu_de'
                    render={({ field }: any) => {
                        return <div className='my-2'>
                            <Input
                                {...field}
                                placeholder='Nhập tiêu đề bài viết'
                                error={getNestedError(field.name, errors)}
                            />
                        </div>
                    }}
                />

                <Label>Banner</Label>

                <Controller
                    control={control}
                    name='hinh_anh'
                    render={({ field }) => {
                        return <div className='my-4'>
                            <ImageUpload
                                {...formProps}
                                onChange={(urls: any) => {
                                    field.onChange(urls)
                                }}
                                name={field.name}
                                multiple={false}
                            />

                            {
                                getNestedError(field.name, errors) && (
                                    <p className="my-1 text-red-700 text-sm" >
                                        {getNestedError(field.name, errors)}
                                    </p>
                                )
                            }
                        </div>
                    }}
                />

                <Label>Mô tả</Label>

                <Controller
                    control={control}
                    name='mo_ta'
                    render={({ field }) => {
                        return <div className='my-2'>
                            <Textarea
                                {...field}
                                placeholder='Nhập mô tả bài viết'
                            />

                            {
                                getNestedError(field.name, errors) && (
                                    <p className="my-1 text-red-700 text-sm" >
                                        {getNestedError(field.name, errors)}
                                    </p>
                                )
                            }
                        </div>
                    }}
                />

                <Label className='mt-4'>Phần nội dung</Label>

                <Controller
                    control={control}
                    name='noi_dung'
                    render={({ field }) => {
                        return <div className='my-2'>
                            <EditorMCE className="mt-4" ref={refEditor} defaultValues={field.value} />

                            {
                                getNestedError(field.name, errors) && (
                                    <p className="my-1 text-red-700 text-sm" >
                                        {getNestedError(field.name, errors)}
                                    </p>
                                )
                            }
                        </div>
                    }}
                />
            </div>

            <div className='my-4'>
                <Button className='mr-4' type="submit">
                    Xác nhận
                </Button>

                <Button variant={'outline'} type='button'>
                    Preview
                </Button>
            </div>
        </form>
    )
}

export default memo(AdminNewsEditorPage)