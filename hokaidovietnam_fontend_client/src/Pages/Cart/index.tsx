import { FaRegTrashAlt } from "react-icons/fa";

export interface Product {
    id: number;
    image: string;
    title: string;
    price: number;
    quantity: number;
}

export default function Cart() {
    const arrData = [
        {
            id: 1,
            image: "sp4.png",
            title: "Sữa tươi nguyên chất 200ml",
            price: 500,
            quantity: 2,
        },
        {
            id: 2,
            image: "sp5.png",
            title: "Sữa tươi vị dâu 200ml",
            price: 500,
            quantity: 1,
        },
        {
            id: 3,
            image: "sp6.png",
            title: "Sữa tươi vị socola 200ml",
            price: 500,
            quantity: 1,
        },
    ];

    const renderData = (): JSX.Element[] => {
        return arrData.map((item: Product, index) => {
            let { id, image, title, price, quantity } = item;

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
                    key={id}>

                    <div className="col-span-6 sm:col-span-4 flex flex-row items-center ">
                        <img className="w-[75px] lg:w-[115px] lg:me-11" src={require(`assets/image/${image}`)} alt={image} />
                        <div className="pt-[6px]">
                            <p className="text-xs lg:text-base text-[#777171] mb-[15px] md:mb-5">{title}</p>
                            <p className="text-xs lg:text-base font-semibold">{price}.000đ</p>
                        </div>
                    </div>


                    <div className="col-span-2 flex flex-row justify-center items-center  text-[#929292]">
                        <div className="flex flex-row justify-center items-center md:border border-gray-300">
                            <button
                                className={`
                                border
                                md:border-none
                                rounded-full
                                md:rounded-none
                                w-[15px]
                                h-[15px]
                                leading-[15px]
                                md:w-[30px] 
                                md:h-[30px]
                                lg:w-[42px] 
                                lg:h-[42px]
                                text-xs
                                md:text-xl`}
                            >–</button>
                            <input
                                className={`
                                mx-[5px]
                                md:mx-0
                                border
                                md:border-none
                                rounded-full
                                md:rounded-none
                                w-[15px]
                                h-[15px]
                                md:w-[30px] 
                                md:h-[30px]
                                lg:w-[42px] 
                                lg:h-[42px]
                                text-center
                                text-[10px]
                                text-black
                                md:text-[#929292]
                                md:text-base
                                lg:text-xl`}
                                type="text"
                                value={quantity} />
                            <button
                                className={`
                                border
                                md:border-none
                                rounded-full
                                md:rounded-none
                                w-[15px]
                                h-[15px]
                                leading-[15px]
                                md:w-[30px] 
                                md:h-[30px]
                                lg:w-[42px] 
                                lg:h-[42px]
                                text-xs
                                md:text-xl`}
                            >+</button>
                        </div>
                    </div>

                    <div className={`col-span-2 sm:col-span-4 flex flex-row justify-end items-center gap-4 text-[#777171]`}>
                        <p className="hidden sm:block text-xs lg:text-base">Tổng tiền:
                            <span className="ps-5 text-xs lg:text-base font-semibold text-black">{price}.000đ</span>
                        </p>
                        <p className="lg:ms-[100px] text-xl flex flex-row items-center">
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
            `}>Giỏ Hàng Của Bạn <span className="hidden sm:inline">(4 sản phẩm)</span></h1>
            </div>

            <div className="sm:mt-8 md:mt-12 lg:mt-[77px] border-b-[#989494] border-b-[1.5px] md:border-none">
                {renderData()}
            </div>

            <div className="mt-6 md:mt-11 text-end">
                <div className="flex flex-row justify-start md:justify-end items-center">
                    <p className="text-base md:text-xl font text-[#777171] me-5 md:me-[145px]">Thành tiền:</p>
                    <p className="text-base md:text-[32px] font-semibold ">200.000đ</p>
                </div>

                <div>
                    <button
                        className={`
                        hidden
                        md:inline 
                        w-[200px] 
                        h-[55px] 
                        font-medium 
                        bg-[#D9D9D9] 
                    `}>Tiếp tục mua hàng</button>
                    <button
                        className={`
                        w-full 
                        h-[50px] 
                        md:w-[200px] 
                        md:h-[55px] 
                        bg-[#1E1E1E] 
                        text-white 
                        md:ms-6
                        mt-8
                        md:mt-11
                    `}>Đặt hàng ngay</button>

                    <div className="text-center">
                        <a
                            href="/cart"
                            className={`
                            inline-block
                            md:hidden 
                            text-xs
                            leading-6
                            text-[#777171]
                            font-medium 
                            border-b-[#989494] 
                            border-b-[1px]
                            mt-[18px]
                            `}
                            style={{ textAlign: "center" }}
                        >
                            Tiếp tục mua hàng
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}