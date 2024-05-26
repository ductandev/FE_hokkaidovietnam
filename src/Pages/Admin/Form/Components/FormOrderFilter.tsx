import { Controller } from 'react-hook-form';
import { useAddress } from '@/Hooks/useAddress/useAddress';

import { Input } from '@/Components/ui/input';
import Selection from "@/Components/Selection";
import { Button } from '@/Components/ui/button';
import { Label } from '@/Components/ui/label';
import { ScrollArea } from '@/Components/ui/scroll-area';

import { ORDER_STATUS } from '../constants';

function FormOrderFilter(props: any) {
    const { control, errorsMgs, setValue, watch, reset } = props;
    const { getProvince, getDistrict, getWard }: any = useAddress();

    const watchDistrict = getDistrict(watch("tinh_thanh_id"));
    const watchWard = getWard(watch("quan_id"));

    return (
        <ScrollArea className='h-[80vh]'>
            <div>
                <div className='grid grid-cols-2'>
                    <Controller
                        control={control}
                        name='ho_ten'
                        render={({ field }) => {
                            return <div className='ml-3 mr-1'>
                                <Label>Tên khách hàng</Label>
                                <Input
                                    {...field}
                                    placeholder='Nhập tên khách hàng cần tìm'
                                />
                            </div>
                        }}
                    />

                    <Controller
                        control={control}
                        name='so_dien_thoai'
                        render={({ field }) => {
                            return <div className='ml-1 mr-3'>
                                <Label>Số điện thoại</Label>

                                <Input
                                    {...field}
                                    placeholder='Nhập số điện thoại cần tìm'
                                />
                            </div>
                        }}
                    />
                </div>

                <Controller
                    control={control}
                    name='status'
                    render={({ field }) => {
                        return <div className='mx-3 my-2'>
                            <Label>Trạng thái đơn hàng</Label>

                            <Selection
                                title="Trạng thái"
                                placeholder="Chọn trạng thái cần tìm"
                                options={ORDER_STATUS}
                                displayKey={"label"}
                                onChanged={(_: any, value: any) => {
                                    field.onChange(parseInt(value));
                                }}
                                defaultValue={field.value}
                                valueKey={"value"}
                                {...field}
                            />
                        </div>
                    }}
                />

                <div className='grid grid-cols-2'>
                    <Controller
                        control={control}
                        name='dia_chi'
                        render={({ field }) => {
                            return <div className='ml-3 mr-1'>
                                <Label>Địa chỉ</Label>

                                <Input
                                    {...field}
                                    placeholder='Nhập địa chỉ cần tìm'
                                />
                            </div>
                        }}
                    />

                    <Controller
                        name="tinh_thanh_id"
                        control={control}
                        render={({ field }: any) => {
                            return (
                                <div className='mr-3 ml-1'>
                                    <Label>Tỉnh/Thành phố</Label>

                                    <Selection
                                        title="Tỉnh thành"
                                        placeholder="Chọn tỉnh thành"
                                        options={getProvince()}
                                        displayKey={"name"}
                                        onChanged={(_: any, value: any) => {
                                            field.onChange(value);
                                            setValue("quan_id", "")
                                            setValue("phuong_id", "")
                                        }}
                                        defaultValue={field.value}
                                        valueKey={"id"}
                                        error={errorsMgs?.tinh_thanh_id?.message || ""}
                                        {...field}
                                    />
                                </div>
                            );
                        }}
                    />
                </div>

                <div className='grid grid-cols-2 my-3'>
                    <Controller
                        name="quan_id"
                        control={control}
                        render={({ field }: any) => {

                            return (
                                <div className='ml-3 mr-1'>
                                    <Label>Quận/Huyện</Label>

                                    <Selection
                                        title="Quận huyện"
                                        placeholder="Chọn quận huyện"
                                        options={watchDistrict}
                                        displayKey={"name"}
                                        disabled={!watch("tinh_thanh_id")}
                                        onChanged={(_: any, value: any) => {
                                            field.onChange(value);
                                            setValue("phuong_id", "")
                                        }}
                                        defaultValue={field.value}
                                        valueKey={"id"}
                                        error={errorsMgs?.quan_id?.message || ""}
                                        {...field}
                                    />
                                </div>
                            );
                        }}
                    />

                    <Controller
                        name="phuong_id"
                        control={control}
                        render={({ field }: any) => {
                            return (
                                <div className='ml-1 mr-3'>
                                    <Label>Phường/Xã</Label>

                                    <Selection
                                        title="Phường xã"
                                        placeholder="Chọn phường/xã"
                                        options={watchWard}
                                        displayKey={"name"}
                                        onChanged={(_: any, value: any) => {
                                            field.onChange(value);
                                        }}
                                        disabled={!watch("quan_id")}
                                        defaultValue={field.value}
                                        valueKey={"id"}
                                        error={errorsMgs?.phuong_id?.message || ""}
                                        {...field}
                                    />
                                </div>
                            );
                        }}
                    />

                </div>
            </div>

            <div className='mx-3 my-5'>
                <Button
                    type="button"
                    variant='outline'
                    className='my-4 w-full'
                    onClick={() => {
                        reset()
                    }}
                >
                    Làm mới
                </Button>

                <Button type='submit' className='w-full'>Xác nhận</Button>
            </div>
        </ScrollArea>
    )
}

export default FormOrderFilter