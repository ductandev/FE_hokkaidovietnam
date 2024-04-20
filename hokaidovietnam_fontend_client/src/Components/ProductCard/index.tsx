import React from "react";
import { useNavigate } from "react-router-dom";

import { formatCurrency } from "@/Helper/helper";

import "./styles.scss";

export type TProductCard = {
    _id: number | string
    ten_san_pham: string | any
    product_price: number
    onShowDetail: Function
}

export const ProductCard: React.FC<TProductCard> = (props: TProductCard) => {
    const { ten_san_pham, product_price, _id, onShowDetail } = props;
    const navigate = useNavigate();

    const handleClickDetail = (_id: number | string) => {
        navigate(`/product/${_id}`)
    };

    return <div
        className="cursor-pointer w-full"
    >

        <div className="h-96 w-full" onClick={() => {
            onShowDetail && onShowDetail()
        }}>
            <img src="https://source.unsplash.com/random" alt="" className="mx-auto max-w-full h-full" />
        </div>

        <div className="text-center">
            <h3 className="text-base my-4 font-light"
                onClick={() => {
                    handleClickDetail(_id)
                }}
            >{ten_san_pham}</h3>
            <p className="mb-7">{formatCurrency(product_price)}</p>
        </div>
    </div>
}