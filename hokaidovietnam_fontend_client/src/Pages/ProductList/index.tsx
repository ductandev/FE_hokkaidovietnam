import { Fragment, useState } from "react"

import Banner from '@/Components/Banner'
import { CategoryTabs, TOption } from '@/Components/CategoryTab'
import { ProductCard } from "@/Components/ProductCard";
import { HPagination } from "@/Components/Pagination";
import Modal from "@/Components/Modal/Modal";
import { formatCurrency } from "@/Helper/helper";
import { Divider } from "@/Components/Divider";


import Slider1 from "@/assets/image/detail/slide-1.png"
import Slider2 from "@/assets/image/detail/slide-2.png"
import Slider3 from "@/assets/image/detail/slide-3.png"
import Slider4 from "@/assets/image/detail/slide-4.png"
import { ImageGallery } from "@/Components/ImageGallery";

const TAB_LIST: Array<TOption> = [
    {
        label: "Tất cả sản phẩm",
        value: 0
    },
    {
        label: "Sữa Hokkaido",
        value: 1
    },
    {
        label: "Sữa Dairy",
        value: 2
    },
    {
        label: "Kem Hokkaido",
        value: 3
    },
    {
        label: "Kem Hokkaido",
        value: 4
    }
];

const PRODUCTS: Array<any> = [
    {
        id: "_pid1",
        ten_san_pham: "Sữa tươi nguyên chất 200ml",
        product_price: "50000"
    },
    {
        id: "_pid2",
        ten_san_pham: "Sữa tươi nguyên chất 200ml",
        product_price: "50000"
    },
    {
        id: "_pid3",
        ten_san_pham: "Sữa tươi nguyên chất 200ml",
        product_price: "50000"
    },
    {
        id: "_pid4",
        ten_san_pham: "Sữa tươi nguyên chất 200ml",
        product_price: "50000"
    },
    {
        id: "_pid5",
        ten_san_pham: "Sữa tươi nguyên chất 200ml",
        product_price: "50000"
    },
    {
        id: "_pid6",
        ten_san_pham: "Sữa tươi nguyên chất 200ml",
        product_price: "50000"
    },
    {
        id: "_pid7",
        ten_san_pham: "Sữa tươi nguyên chất 200ml",
        product_price: "50000"
    },
    {
        id: "_pid8",
        ten_san_pham: "Sữa tươi nguyên chất 200ml",
        product_price: "50000"
    },
];

export default function Products() {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const handleToggleModal = (visible: boolean) => {
        setIsVisible(visible)
    };

    const slideImages = [
        Slider1,
        Slider2,
        Slider3,
        Slider4
    ]


    const renderXMLFooter = () => {
        return <div className="grid grid-cols-2 mt-12">
            <div>
                <ImageGallery
                    slides={slideImages}
                    options={{}}
                    customClass="pr-28"
                    showArrow
                />
            </div>

            <div className="text-center text-black">
                <h3 className="text-2xl font-light">Sữa nguyên chất 200ml</h3>

                <div className="my-5">
                    <span className=" font-light text-base text-[#777171]">Thương hiệu <span className="font-medium text-black">Hokkaido</span></span>
                </div>

                <p className="font-normal text-4xl">{formatCurrency(50000)}</p>

                <p className="font-light text-sm mt-3">
                    BÍ MẬT CỦA SỮA NGUYÊN CHẤT HOKKAIDO LÀM CÁC BÉ SAY MÊ NẰM Ở CON SỐ 3.6*! <br />
                    Theo số liệu của Hiệp hội Sữa Nhật Bản, con số 3.6 trong sữa thể hiện hàm hàm lượng chất béo trong sữa là 3.6%, hương vị thơm, đậm đà béo hơn hẳn so với các loại sữa tươi thông thường khác.
                    Sữa nguyên kem Hokkaido không đường, vị ngọt thanh tự nhiên, béo ngậy, ngon đúng gu các bé yêu thích. <br />
                    Đảm bảo vị sữa ngon khác biệt hẳn với các loại sữa bột thông thường khác.<br />
                    Xuất xứ: Nhật Bản
                </p>

                <div className="my-6 grid grid-cols-2">
                    <div>quantity component</div>
                    <div>button component</div>
                </div>

                <Divider className="my-6" />

                <span className="text-sm font-light text-[#777171]">Gọi đặt mua: <span className="font-medium text-black">0904 229 229</span> để nhanh chóng đặt hàng</span>
                d</div>
        </div>
    }

    return (
        <main >
            <Banner title="Cửa hàng" />

            <Modal
                visible={isVisible}
                onChangeVisible={handleToggleModal}
                renderHeader={null}
                renderBody={renderXMLFooter()}
            />

            <div className='container mb-16 mt-24'>
                <CategoryTabs
                    options={TAB_LIST}
                    onHandleToggleTab={() => { }}
                    isShowSummary={true}
                    summaryIndex={30}
                    defaultTab={0}
                />
            </div>

            <div className="container grid grid-cols-4 gap-5">
                {PRODUCTS.map((product, idx) => {
                    return <Fragment key={`${product.id}_${idx}`}>
                        <ProductCard {...product} onShowDetail={() => {
                            handleToggleModal(true)
                        }} />
                    </Fragment>
                })}


            </div>

            <div className="w-full mx-auto pt-10 pb-10">
                <HPagination total={30} pageSize={8} current={3} />
            </div>
        </main>
    )
}