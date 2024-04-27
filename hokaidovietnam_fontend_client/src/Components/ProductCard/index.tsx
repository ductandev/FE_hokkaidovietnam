import React from "react";
import { useNavigate } from "react-router-dom";

import { formatCurrency } from "@/Helper/helper";
import { Product } from "@/Types/Product.type";

import "./styles.scss";

export type PropTypes = {
    onShowDetail: Function
}

export type MergedType = PropTypes & Product;


export const ProductCard: React.FC<MergedType> = (props: MergedType) => {
    const {
        gia_ban,
        san_pham_id,
        ten_san_pham,
        onShowDetail
    } = props;

    const navigate = useNavigate();

    const handleClickDetail = (_id: number | string) => {
        navigate(`/product/${_id}`)
    };

    return <div
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
    </div>
}