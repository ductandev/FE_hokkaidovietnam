import { Controller } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useDeferredValue } from 'react';

import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';
import Selection from "@/Components/Selection";
import ImageUpload from '@/Components/ImageUpload';

import { getProductTypes } from '@/Apis/Product/ProductType.api';
import { getNestedError, isEmpty, isNumberKey, isNumberMobile } from '@/Helper/helper';

function FormProduct(props: any) {
    const { control, errorsMgs, watch, setValue } = props;

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


    const productTypeDeffered = useDeferredValue(productType?.data?.content);

    return (
        <>
            <Controller
                control={control}
                name='ten_san_pham'
                render={({ field }) => {
                    return <div className='mx-3 my-2'>
                        <Input
                            {...field}
                            placeholder='Nhập tên sản phẩm'
                            error={getNestedError(field.name, errorsMgs)}
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
                            error={getNestedError(field.name, errorsMgs)}
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
                                error={getNestedError(field.name, errorsMgs)}
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
                                error={getNestedError(field.name, errorsMgs)}
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
                            error={getNestedError(field.name, errorsMgs)}
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
                            getNestedError(field.name, errorsMgs) && (
                                <p className="my-1 text-red-700 text-sm" >
                                    {getNestedError(field.name, errorsMgs)}
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
                            getNestedError(field.name, errorsMgs) && (
                                <p className="my-1 text-red-700 text-sm" >
                                    {getNestedError(field.name, errorsMgs)}
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
                            onChange={(urls: any) => {
                                field.onChange(urls)
                            }}
                            watch={watch}
                            name={field.name}
                            setValue={setValue}
                        />

                        {
                            getNestedError(field.name, errorsMgs) && (
                                <p className="my-1 text-red-700 text-sm" >
                                    {getNestedError(field.name, errorsMgs)}
                                </p>
                            )
                        }
                    </div>
                }}
            />

            <div className='mx-3'>
                <Button disabled={!isEmpty(errorsMgs)} type='submit' className=' mt-6 w-[100%]'>Lưu</Button>
            </div>
        </>
    )
}

export default FormProduct;