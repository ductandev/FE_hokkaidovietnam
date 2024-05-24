import { GrClose } from "react-icons/gr";

import { Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "@/Auth/AuthProvider";

import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidationSchema } from "./register.validate";
import { Controller, useForm } from "react-hook-form";
import Selection from "@/Components/Selection";
import { useAddress } from "@/Hooks/useAddress/useAddress";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { Label } from "@/Components/ui/label";
import { isEmpty } from "@/Helper/helper";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

export interface UserRegisterFrm {
    ho_ten: string,
    email: string,
    mat_khau: string,
    so_dien_thoai: string,
    dia_chi: string,
    gioi_tinh: string,
}

export default function Register() {
    const { isLogin, signUp } = useAuth();
    const navigate = useNavigate();
    const { getProvince, getDistrict, getWard }: any = useAddress();

    const {
        handleSubmit,
        control,
        formState: { errors },
        watch,
        setValue
    } = useForm<any>({
        mode: "onChange",
        resolver: yupResolver(registerValidationSchema),
        defaultValues: {
            email: "",
            ho_ten: "",
            so_dien_thoai: "",
            dia_chi: "",
            tinh_thanh_id: "",
            quan_id: "",
            phuong_id: "",
            gioi_tinh: "nam"
        },
    });

    const SErrors = errors

    if (isLogin) {
        return <Navigate to="/" />;
    }


    const handleOnSubmitForm = async (values: any) => {
        try {
            await signUp(values);
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (error) {
            console.error("Đăng ký thất bại:", error);
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center p-5 sm:px-10">
                <h2 className="text-2xl sm:text-[32px] leading-none font-light">Đăng Ký Tài Khoản</h2>

                <span
                    onClick={() => {
                        navigate(-1)
                    }}
                    className="cursor-pointer"
                >
                    <GrClose className="w-6 h-6" />
                </span>
            </div>

            <div className="container mx-auto leading-none">
                <h2
                    className={`
                    pb-[10px] 
                    mb-[20px]

                    text-xl 
                    text-center 
                    font-medium 
                    underline 
                    underline-offset-8
                    `}>Đăng Ký
                </h2>

                <form
                    className="sm:w-[400px] max-w-full mx-auto"
                    onSubmit={handleSubmit((values) => handleOnSubmitForm(values))}
                >
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }: any) => {
                            return (
                                <div className="mb-4">
                                    <Input
                                        placeholder="Email"
                                        error={SErrors?.email?.message || ""}
                                        {...field}
                                    />
                                </div>
                            );
                        }}
                    />

                    <Controller
                        name="mat_khau"
                        control={control}
                        render={({ field }: any) => {
                            return (
                                <div className="mb-4">
                                    <Input
                                        type="password"
                                        placeholder="Mật khẩu"
                                        error={SErrors?.mat_khau?.message || ""}
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
                                        error={SErrors?.ho_ten?.message || ""}
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
                                        placeholder="Số điện thoại"
                                        error={SErrors?.so_dien_thoai?.message || ""}
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
                                        error={SErrors?.dia_chi?.message || ""}
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
                                        error={SErrors?.tinh_thanh_id?.message || ""}
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
                                        options={getDistrict(watch("tinh_thanh_id"))}
                                        displayKey={"name"}
                                        disabled={!watch("tinh_thanh_id")}
                                        onChanged={(_: any, value: any) => {
                                            field.onChange(value);
                                            setValue("phuong_id", "")
                                        }}
                                        defaultValue={field.value}
                                        valueKey={"id"}
                                        error={SErrors?.quan_id?.message || ""}
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
                                        options={getWard(watch("quan_id"))}
                                        displayKey={"name"}
                                        onChanged={(_: any, value: any) => {
                                            field.onChange(value);
                                        }}
                                        disabled={!watch("quan_id")}
                                        defaultValue={field.value}
                                        valueKey={"id"}
                                        error={SErrors?.phuong_id?.message || ""}
                                        {...field}
                                    />
                                </div>
                            );
                        }}
                    />

                    <div className='mb-[20px] flex items-center'>
                        <Controller
                            name="gioi_tinh"
                            control={control}
                            render={({ field }: any) => {
                                return (
                                    <RadioGroup defaultValue={field.value} onChange={(event: any) => {
                                        field.onChange(event.target.value)
                                    }} >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="nam" id="nam" />

                                            <Label htmlFor="nam" className="text-base">Nam</Label>
                                        </div>

                                        <div className="flex items-center space-x-2 mt-2">
                                            <RadioGroupItem value="nữ" id="nữ" />
                                            <Label htmlFor="nữ" className="text-base">Nữ</Label>
                                        </div>
                                    </RadioGroup>
                                );
                            }}
                        />

                    </div>

                    <Button
                        disabled={!isEmpty(errors)}
                        type="submit"
                        className="w-full bg-black text-white h-14 text-base"
                    >
                        Đăng kí tài khoản
                    </Button>
                </form>

                <div
                    className={`
                    sm:w-[400px] 
                    max-w-full 
                    mx-auto 
                    flex 
                    justify-center
                    gap-5 
                    my-[30px] 
                    `}>
                    <a
                        href="/login"
                        className="
                        text-center 
                        font-medium 
                        underline
                        underline-offset-8">
                        Quay về Đăng nhập
                    </a>
                </div>
            </div>
        </div>
    );
}