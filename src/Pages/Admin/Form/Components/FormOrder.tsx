import { Controller } from 'react-hook-form';
import { useAddress } from '@/Hooks/useAddress/useAddress'

import Selection from "@/Components/Selection";
import { Textarea } from '@/Components/ui/textarea';

import { Input } from '@/Components/ui/input';

function FormOrder(props: any) {
    const { control, errorsMgs, setValue, watch } = props;
    const { getProvince, getDistrict, getWard }: any = useAddress();

    const watchDistrict = getDistrict(watch("tinh_thanh_id"));
    const watchWard = getWard(watch("quan_id"));

    return (
        <div className='mx-3'>
            <Controller
                name="email"
                control={control}
                render={({ field }: any) => {
                    return (
                        <div className="mb-4">
                            <Input
                                placeholder="Email"
                                error={errorsMgs?.email?.message || ""}
                                {...field}
                            />
                        </div>
                    );
                }}
            />

            <Controller
                name="ho_ten"
                control={control}
                render={({ field }: any) => {
                    return (
                        <div className="mb-4">
                            <Input
                                placeholder="Họ và tên"
                                error={errorsMgs?.ho_ten?.message || ""}
                                {...field}
                            />
                        </div>
                    );
                }}
            />

            <Controller
                name="so_dien_thoai"
                control={control}
                render={({ field }: any) => {
                    return (
                        <div className="mb-4">
                            <Input
                                startIcon={"+84"}
                                placeholder="Số điện thoại"
                                error={errorsMgs?.so_dien_thoai?.message || ""}
                                {...field}
                            />
                        </div>
                    );
                }}
            />

            <Controller
                name="dia_chi"
                control={control}
                render={({ field }: any) => {
                    return (
                        <div className="mb-4">
                            <Input
                                placeholder="Địa chỉ"
                                error={errorsMgs?.dia_chi?.message || ""}
                                {...field}
                            />
                        </div>
                    );
                }}
            />

            <Controller
                name="tinh_thanh_id"
                control={control}
                render={({ field }: any) => {
                    return (
                        <div className="mb-4">
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

            <Controller
                name="quan_id"
                control={control}
                render={({ field }: any) => {

                    return (
                        <div className="mb-4">
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
                        <div className="mb-4">
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

            <Controller
                name="ghi_chu"
                control={control}
                render={({ field }: any) => {
                    return (
                        <>
                            <Textarea
                                className={`h-[69px] sm:h-[104px] w-full mb-5 pt-1 text-sm`}
                                placeholder="Ghi chú (tùy chọn)"
                                {...field}
                            />
                        </>
                    );
                }}
            />
        </div>
    )
}

export default FormOrder;