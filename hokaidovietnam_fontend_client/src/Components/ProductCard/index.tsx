import React from "react";
import { useNavigate } from "react-router-dom";

import { Skeleton } from "../ui/skeleton";

import { formatCurrency } from "@/Helper/helper";
import { Product } from "@/Types/Product.type";

import "./styles.scss";

export type PropTypes = {
    onShowDetail?: Function;
    isSkeleton?: Boolean
}

export type MergedType = PropTypes & Product;


export const ProductCard: React.FC<PropTypes | MergedType | any> = (props: PropTypes | MergedType | any) => {
    const {
        gia_ban,
        san_pham_id,
        ten_san_pham,
        onShowDetail,
        isSkeleton = false
    } = props;

    const navigate = useNavigate();

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

    return <>
        {isSkeleton ? SkeletonProduct() : <div
            className="cursor-pointer w-full"
        >
            <div className="h-96 w-full" onClick={() => {
                onShowDetail && onShowDetail(san_pham_id)
            }}>
                <img src="https://source.unsplash.com/random" alt="" className="mx-auto max-w-full h-full" />
            </div>

            <div className="text-center">
                <h3 className="text-base my-4 font-light"
                    onClick={() => {
                        handleClickDetail(san_pham_id)
                    }}
                >{ten_san_pham}</h3>
                <p className="mb-7">{formatCurrency(gia_ban)}</p>
            </div>
        </div>}
    </>
}