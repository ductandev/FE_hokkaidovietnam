import { useState } from "react";
import { useDispatch } from "react-redux";
import { useCartStorage } from "@/Hooks/useCartStorage";

import { Divider } from "@/Components/Divider"
import Quantity from "@/Components/Quantity/Quantity"
import { Button } from "@/Components/ui/button"

import { HandleAddCart, formatCurrency } from "@/Helper/helper"
import { actions } from "@/Redux/actions/cart.action";

import { Product } from "@/Types/Product.type";

const DEFAULT_QUANTITY = 1;

const ProductInformation: React.FC<Product> = (props: Product) => {
    const {
        ten_san_pham,
        trang_thai_san_pham,
        gia_ban,
        mo_ta_chi_tiet,
        so_luong_trong_kho
    } = props;

    const { saveCartStorage } = useCartStorage();
    const dispatch: any = useDispatch();

    const [quantityState, setQuantityState] = useState<number>(DEFAULT_QUANTITY);

    const handleAddCart = () => {
        const payload = {
            ...props,
            quantity: quantityState
        }

        const resolveCart = HandleAddCart(payload)

        // * convert JSON string để lưu xuống local storage
        saveCartStorage(resolveCart);

        // * Thao tác với state cart trong reducer
        dispatch(actions.setCart(resolveCart));
    };

    const handleQuantityChanged = (quantity: number) => {
        setQuantityState(quantity);
    }

    return <div><div className="text-black">
        <h3 className="text-4xl font-light">{ten_san_pham}</h3>

        <div className="mt-5">
            <span className="font-light text-base text-[#777171]">
                Thương hiệu:
                <span className="font-medium text-black ml-1">Hokkaido</span>
            </span>

            <span className="mx-2">|</span>

            <span className="font-light text-base text-[#777171]">
                Tình trạng:
                <span className="font-medium text-black ml-1">{trang_thai_san_pham ? "Còn hàng" : "Hết hàng"}</span>
            </span>
        </div>

        <p className="mt-8 font-normal text-4xl">{formatCurrency(gia_ban)}</p>

        <p className="font-light text-secondary text-base mt-5">
            {mo_ta_chi_tiet}
        </p>

        <Divider className="my-6" />


        <div className="my-6 flex">
            <div className="mr-1">
                <Quantity
                    defaultValue={1}
                    hasPreventByLimit
                    limit={so_luong_trong_kho}
                    onChanged={handleQuantityChanged}
                />
            </div>

            <div className="ml-1 flex-1">
                <Button
                    size={'cart'}
                    variant={'cart-btn'}
                    onClick={handleAddCart}
                >
                    Thêm vào giỏ hàng
                </Button>
            </div>
        </div>


        <span className="text-base font-light text-[#777171]">Gọi đặt mua: <span className="font-medium text-black">0904 229 229</span> để nhanh chóng đặt hàng</span>
    </div>
    </div>
}

export default ProductInformation