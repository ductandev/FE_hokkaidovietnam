import React from "react";
import { useNavigate } from "react-router-dom";

import { formatCurrency } from "@/Helper/helper";

import "./styles.scss";

export type TProductCard = {
    _id: number | string;
    product_name: string | any,
    product_price: number
}

export const ProductCard: React.FC<TProductCard> = (props: TProductCard) => {
    const { product_name, product_price, _id } = props;
    const navigate = useNavigate();

    const handleClickDetail = (_id: number | string) => {
        navigate(`/product/${_id}`)
    };

    return <div
        className="cursor-pointer w-full"
        onClick={() => {
            handleClickDetail(_id)
        }}>

        <div className="h-96 w-full">
            <img src="https://source.unsplash.com/random" alt="" className="mx-auto max-w-full h-full" />
        </div>

        <div className="text-center">
            <h3 className="text-base my-4 font-light">{product_name}</h3>
            <p className="mb-7">{formatCurrency(product_price)}</p>
        </div>
    </div>
}