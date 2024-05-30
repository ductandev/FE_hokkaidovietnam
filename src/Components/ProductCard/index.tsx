import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/Auth/AuthProvider";
import { useMutation } from "react-query";
import { useCartStorage } from "@/Hooks/useCartStorage";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { Skeleton } from "../ui/skeleton";

import { HandleAddCart, formatCurrency } from "@/Helper/helper";
import { Product } from "@/Types/Product.type";
import { actions } from "@/Redux/actions/cart.action";
import { addtoCart } from "@/Apis/Cart/Cart.api";


import "./styles.scss";

export type PropTypes = {
    onShowDetail?: Function;
    isSkeleton?: Boolean;
    className?: string;
}

export type MergedType = PropTypes & Product;

const DEFAUT_QUANTITY = 1;

export const ProductCard: React.FC<PropTypes | MergedType | any> = (props: PropTypes | MergedType | any) => {
    const {
        gia_ban,
        san_pham_id,
        ten_san_pham,
        onShowDetail,
        isSkeleton = false,
        hinh_anh,
        className = "w-full h-[250px] md:h-[350px] xl:h-[400px]"
    } = props;

    const { isLogin } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { saveCartStorage } = useCartStorage();
    const handleClickDetail = (_id: number | string) => {
        navigate(`/product/${_id}`)
    };

    const SkeletonProduct = () => {
        return <div className="flex flex-col space-y-3">
            <Skeleton className="h-96 w-full" />

            <div className="mx-auto space-y-2 w-full">
                <Skeleton className="my-4 h-4 w-full" />
                <Skeleton className="h-4 w-full" />
            </div>
        </div>
    }

    const addProductMutation = useMutation({
        mutationFn: (body: any) => addtoCart(body),
        onSuccess: (_) => {
            console.log('Thêm giỏ hàng thành công')
        },
    });

    const onMutateCartSuccess = (payload: any) => {
        const resolveCart = HandleAddCart(payload)

        // * convert JSON string để lưu xuống local storage
        saveCartStorage(resolveCart);

        // * Thao tác với state cart trong reducer
        dispatch(actions.setCart(resolveCart));

        toast.success("Thêm giỏ hàng thành công", {
            position: "bottom-center"
        })
    }

    const handleAddCart = () => {
        const payload = {
            ...props,
            so_luong: DEFAUT_QUANTITY
        };

        if (isLogin) {
            let newPayload: any = {
                san_pham_id: san_pham_id,
                so_luong: DEFAUT_QUANTITY
            };

            addProductMutation.mutate(newPayload);
        }

        onMutateCartSuccess(payload);
    }

    return <>
        {isSkeleton ? SkeletonProduct() : <div
            className="cursor-pointer w-full"
        >
            <div className="w-[170px] md:w-[230px] lg:w-[250px] h-fit group mx-auto">
                <div className="relative overflow-hidden">
                    <div
                        onClick={() => {
                            if (window.innerWidth <= 992) return; // Chỉ thực hiện khi ở chế độ di động

                            onShowDetail && onShowDetail(san_pham_id);
                        }}
                    >
                        <div>
                            <img
                                src={hinh_anh[0] || ""}
                                alt=""
                                className={`mx-auto ${className} object-cover`}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="hidden lg:block">
                            <div className="absolute h-[70px] w-full bg-slate-500/0 flex items-end justify-end -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <button
                                    className="bg-black text-white w-full h-[70px]"
                                    onClick={handleAddCart}
                                >
                                    Thêm vào giỏ hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <h3
                    className="text-[13px] md:text-base my-4 font-light"
                    onClick={() => {
                        handleClickDetail(san_pham_id);
                    }}
                >
                    {ten_san_pham}
                </h3>
                <p className="mb-7 text-sm md:text-base font-medium">
                    {formatCurrency(gia_ban)}
                </p>
            </div>
        </div>}
    </>
}