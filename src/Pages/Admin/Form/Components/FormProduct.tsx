import { Controller } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useDeferredValue } from 'react';

import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';
import Selection from "@/Components/Selection";
import ImageUpload from '@/Components/ImageUpload';
import { ScrollArea } from '@/Components/ui/scroll-area';

import { getProductTypes } from '@/Apis/Product/ProductType.api';
import { isEmpty, isNumberKey, isNumberMobile } from '@/Helper/helper';

function FormProduct(props: any) {
    const { control, errorsMgs } = props;

    const { isLoading, data: productType }: any = useQuery({
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

    const productTypeDeffered = useDeferredValue(productType?.data?.content)

    return (
        <ScrollArea className="h-[76vh]">
            <Controller
                control={control}
                name='ten_san_pham'
                render={({ field }) => {
                    return <div className='mx-3 my-2'>
                        <Input
                            {...field}
                            placeholder='Nhập tên sản phẩm'
                            error={errorsMgs?.ten_san_pham?.message || ""}
                        />
                    </div>
                }}
            />

            {isLoading ? <p>Đang tải loại sản phẩm</p> : <Controller
                control={control}
                name='loai_san_pham_id'
                render={({ field }) => {
                    return <div className='mx-3 my-2'>
                        <Selection
                            title="Loại sản phẩm"
                            placeholder="Chọn loại sản phẩm"
                            options={productTypeDeffered}
                            displayKey={"ten_loai_san_pham"}
                            onChanged={(_: any, value: any) => {
                                field.onChange(parseInt(value));
                            }}
                            defaultValue={field.value}
                            valueKey={"loai_san_pham_id"}
                            error={errorsMgs?.loai_san_pham_id?.message || ""}
                            {...field}
                        />
                    </div>
                }}
            />}


            <div className='grid grid-cols-2'>
                <Controller
                    control={control}
                    name='gia_ban'
                    render={({ field }) => {
                        return <div className='mx-3 my-2'>
                            <Input
                                {...field}
                                onKeyPress={(e) => {
                                    if (!isNumberKey(e)) {
                                        e.preventDefault();
                                    }
                                }}
                                onKeyUp={(e) => {
                                    isNumberMobile(e)
                                }}
                                endIcon='đ'
                                placeholder='Nhập giá bán'
                                error={errorsMgs?.gia_ban?.message || ""}
                            />
                        </div>
                    }}
                />

                <Controller
                    control={control}
                    name='gia_giam'
                    render={({ field }) => {
                        return <div className='mx-3 my-2'>
                            <Input
                                {...field}
                                onKeyPress={(e) => {
                                    if (!isNumberKey(e)) {
                                        e.preventDefault();
                                    }
                                }}
                                onKeyUp={(e) => {
                                    isNumberMobile(e)
                                }}
                                endIcon='đ'
                                placeholder='Nhập giá giảm'
                                error={errorsMgs?.gia_giam?.message || ""}
                            />
                        </div>
                    }}
                />
            </div>

            <Controller
                control={control}
                name='so_luong_trong_kho'
                render={({ field }) => {
                    return <div className='mx-3 my-2'>
                        <Input
                            {...field}
                            onKeyPress={(e) => {
                                if (!isNumberKey(e)) {
                                    e.preventDefault();
                                }
                            }}
                            onKeyUp={(e) => {
                                isNumberMobile(e)
                            }}
                            endIcon='Số lượng'
                            placeholder='Nhập số lượng'
                            error={errorsMgs?.so_luong_trong_kho?.message || ""}
                        />
                    </div>
                }}
            />

            <Controller
                control={control}
                name='mo_ta'
                render={({ field }) => {
                    return <div className='mx-3 my-2'>
                        <Textarea
                            {...field}
                            placeholder='Nhập mô tả sản phẩm'
                        />

                        {
                            errorsMgs?.mo_ta?.message?.length && (
                                <p className="my-1 text-red-700 text-sm" >
                                    {errorsMgs?.mo_ta?.message}
                                </p>
                            )
                        }
                    </div>
                }}
            />

            <Controller
                control={control}
                name='thong_tin_chi_tiet'
                render={({ field }) => {
                    return <div className='mx-3 my-2'>
                        <Textarea
                            {...field}
                            placeholder='Nhập thông tin chi tiết'
                        />

                        {
                            errorsMgs?.thong_tin_chi_tiet?.message?.length && (
                                <p className="my-1 text-red-700 text-sm" >
                                    {errorsMgs?.thong_tin_chi_tiet?.message}
                                </p>
                            )
                        }
                    </div>
                }}
            />

            <Controller
                control={control}
                name='hinh_anh'
                render={({ field }) => {
                    return <div className='mx-3 mt-6'>
                        <ImageUpload
                            value={field.value}
                            onChange={(urls: any) => {
                                field.onChange(urls)
                            }}
                        />

                        {
                            errorsMgs?.hinh_anh?.message?.length && (
                                <p className="my-1 text-red-700 text-sm" >
                                    {errorsMgs?.hinh_anh?.message}
                                </p>
                            )
                        }
                    </div>
                }}
            />

            <Button disabled={!isEmpty(errorsMgs)} type='submit' className='fixed bottom-[80px] mx-3 mt-6 w-full'>Tạo sản phẩm</Button>
        </ScrollArea>
    )
}

export default FormProduct;