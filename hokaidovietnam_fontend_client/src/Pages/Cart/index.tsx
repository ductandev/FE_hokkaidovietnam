import BlankPage from "@/Components/BlankPage/BlankPage";
import Quantity from "@/Components/Quantity/Quantity";
import { FaRegTrashAlt } from "react-icons/fa";

// ! Redux
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@/Redux/actions/cart.action";
import { selectCart } from "@/Redux/selectors/cart.selector";

// ! hooks & helpers
import { useCartStorage } from "@/Hooks/useCartStorage";
import { formatCurrency, summaryPriceInCart } from "@/Helper/helper";

import { Product } from "@/Types/Product.type";
import { Button } from "@/Components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const { saveCartStorage } = useCartStorage();
    const cartState = useSelector(selectCart);
    const dispatch: any = useDispatch();
    const navigate = useNavigate();

    const handleChangedQuantity = (san_pham_id: number, quantity: number) => {
        const findIndexItem = cartState.findIndex(product => product.san_pham_id === san_pham_id);
        let result: Array<any> = [...cartState];

        result[findIndexItem] = {
            ...result[findIndexItem],
            quantity
        }

        dispatch(actions.setCart(result));
        saveCartStorage(result)
    }

    const handleDeleteProduct = (san_pham_id: number) => {
        const findIndexItem = cartState.findIndex(product => product.san_pham_id === san_pham_id);
        let result: Array<any> = [...cartState];

        result.splice(findIndexItem, 1);

        dispatch(actions.setCart(result))
        saveCartStorage(result)
    }

    const renderData = (): JSX.Element[] => {
        return cartState.map((item: Product, index) => {
            let {
                quantity,
                ten_san_pham,
                gia_ban,
                so_luong_trong_kho,
                san_pham_id
            }: any = item;

            return (
                <div
                    className={`
                    grid 
                    grid-cols-10
                    h-[100px]
                    lg:h-[150px] 
                    lg:px-11
                    border-b-[#989494] 
                    md:border-b-[1.5px]`}
                    key={index}>

                    <div className="col-span-6 sm:col-span-4 flex items-center">
                        <img className="
                        w-[75px] l
                        g:w-[115px]
                        lg:me-11
                        h-auto" src={`https://source.unsplash.com/random`} alt={"cart_image"} />

                        <div className="pt-[6px]">
                            <p className="text-xs lg:text-base text-[#777171] mb-[15px] md:mb-5">{ten_san_pham}</p>
                            <p className="text-xs lg:text-base font-semibold">{formatCurrency(gia_ban)}</p>
                        </div>
                    </div>


                    <div className="col-span-2 flex flex-row justify-center items-center  text-[#929292]">
                        <Quantity
                            hasPreventByLimit
                            limit={so_luong_trong_kho}
                            defaultValue={+quantity}
                            onChanged={(quantity: number) => {
                                handleChangedQuantity(san_pham_id, quantity)
                            }}
                        />
                    </div>

                    <div className={`col-span-2 sm:col-span-4 flex flex-row justify-end items-center gap-4 text-[#777171]`}>
                        <p className="hidden sm:block text-xs lg:text-base">Tổng tiền:
                            <span className="ps-5 text-xs lg:text-base font-semibold text-black">{formatCurrency(gia_ban * quantity)}</span>
                        </p>

                        <p
                            className="lg:ms-[100px] text-xl flex flex-row items-center cursor-pointer"
                            onClick={() => {
                                handleDeleteProduct(san_pham_id)
                            }}
                        >
                            <FaRegTrashAlt className="inline me-2" />

                            <span className="hidden md:block text-sm lg:text-xl">Xóa</span>
                        </p>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className={`container mx-aut`}>
            <div className="flex justify-center pt-[17px] sm:pt-[27px]">
                <h1 className={`
                p-[17px]
                text-xl
                sm:text-2xl
                font-bold
                sm:font-medium
                text-center
                sm:border-b-[1.5px]
                sm:border-b-black
            `}>Giỏ Hàng Của Bạn <span className="hidden sm:inline">({cartState.length} sản phẩm)</span></h1>
            </div>

            {cartState.length ? <div className="sm:mt-8 md:mt-12 lg:mt-[77px] border-b-[#989494] border-b-[1.5px] md:border-none">
                {renderData()}
            </div>
                : <div className="sm:mt-8 md:mt-12 lg:mt-[77px] border-b-[#989494] border-b-[1.5px] md:border-none">
                    <BlankPage text="Giỏ hàng trống" subText="Vui lòng thêm sản phẩm để có thể đặt hàng ngay" />
                </div>
            }


            <div className="mt-6 md:mt-11 text-end">
                {cartState.length ? <div className="flex flex-row justify-start md:justify-end items-center">
                    <p className="text-base 
                    md:text-xl
                    font
                    text-[#777171]
                    me-5
                    md:me-[145px]">
                        Thành tiền:
                    </p>

                    <p className="text-base md:text-[32px] font-semibold ">{summaryPriceInCart(cartState)}</p>
                </div> : null}


                <div>
                    <Button
                        className={`
                            md:ms-6
                            md:mt-11
                            md:inline
                        `}
                        variant={'order-btn-light'}
                        onClick={() => {
                            navigate("/products")
                        }}
                    >
                        Tiếp tục mua hàng
                    </Button>

                    <Button
                        className={`
                        md:ms-6
                        md:mt-11
                        `}
                        variant={'order-btn-dark'}
                        disabled={!cartState.length}
                        onClick={() => {
                            navigate("/checkout")
                        }}
                    >
                        Đặt hàng ngay
                    </Button>

                    <Button
                        className={`
                            md:ms-6
                            md:mt-11
                            md:inline
                            md:hidden
                        `}
                        variant={'order-btn-light'}
                        onClick={() => {
                            navigate("/products")
                        }}
                    >
                        Tiếp tục mua hàng
                    </Button>
                </div>
            </div>
        </div>
    )
}