// ! React Library
import { Fragment, useCallback, useDeferredValue, useState } from "react"
import { useQuery } from "react-query";

// ! Component
import Banner from '@/Components/Banner'
import { CategoryTabs } from '@/Components/CategoryTab'
import { ProductCard } from "@/Components/ProductCard";
import { HPagination } from "@/Components/Pagination";
import { Divider } from "@/Components/Divider";
import { ImageGallery } from "@/Components/ImageGallery";
import Modal from "@/Components/Modal/Modal";
import BlankPage from "@/Components/BlankPage/BlankPage";

// ! Assests
import Slider1 from "@/assets/image/detail/slide-1.png";
import Slider2 from "@/assets/image/detail/slide-2.png";
import Slider3 from "@/assets/image/detail/slide-3.png";
import Slider4 from "@/assets/image/detail/slide-4.png";

// ! Helpers
import { formatCurrency } from "@/Helper/helper";

// ! Apis and Types
import { getProducts } from "@/Apis/Product.api";
import { getProductTypes } from "@/Apis/ProductType.api";

import { Product } from "@/Types/Product.type";
import Quantity from "@/Components/Quantity/Quantity";
import { Button } from "@/Components/ui/button";

const PAGE_SIZE = 8;
const TAB_TYPE_ALL = {
    loai_san_pham_id: 0,
    ten_loai_san_pham: "Tất cả",
    isDelete: false
}

export default function Products() {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [typeId, setTypeId] = useState<number>(0);
    const [detailProduct, setDetailProduct] = useState<Product>();
    const [page, setPage] = useState(1);

    const { isLoading: isLoadingProductList, data: productList }: any = useQuery({
        queryKey: ['products', page, typeId],
        queryFn: () => {
            const controller = new AbortController();

            setTimeout(() => {
                controller.abort()
            }, 5000)
            return getProducts(page, PAGE_SIZE, typeId, controller.signal)
        },
        keepPreviousData: true,
        retry: 0
    });

    const { isLoading: isLoadingProductType, data: productType }: any = useQuery({
        queryKey: ['productType'],
        queryFn: () => {
            const controller = new AbortController();

            setTimeout(() => {
                controller.abort()
            }, 5000)
            return getProductTypes(controller.signal)
        },
        keepPreviousData: true,
        retry: 0
    });

    const handleToggleModal = (visible: boolean) => {
        setIsVisible(visible);
    };

    const slideImages = [
        Slider1,
        Slider2,
        Slider3,
        Slider4
    ]

    const renderXMLBody = () => {
        return <div className="grid grid-cols-2 mt-12">
            <div>
                <ImageGallery
                    slides={slideImages}
                    options={{}}
                    customClass="pr-10 w-full"
                    showArrow
                />
            </div>

            <div className="text-center text-black">
                <h3 className="text-2xl font-light">{detailProduct?.ten_san_pham}</h3>

                <div className="my-5">
                    <span className=" font-light text-base text-[#777171]">Thương hiệu <span className="font-medium text-black">Hokkaido</span></span>
                </div>

                <p className="font-normal text-4xl">{formatCurrency(50000)}</p>

                <p className="font-light text-sm mt-3">
                    {detailProduct?.mo_ta_chi_tiet}
                </p>

                <div className="my-6 grid grid-cols-2">
                    <div className="mr-1">
                        <Quantity defaultValue={1} />
                    </div>

                    <Button className="ml-1 w-full h-full rounded-none text-lg" size={"lg"} >
                        Thêm vào giỏ hàng
                    </Button>
                </div>

                <Divider className="my-6" />

                <span className="text-sm font-light text-[#777171]">Gọi đặt mua: <span className="font-medium text-black">0904 229 229</span> để nhanh chóng đặt hàng</span>
            </div>
        </div>
    }

    const deferredProductList = useDeferredValue(productList?.data?.content || []);
    const deferredProductType = useDeferredValue(productType?.data?.content || []);

    const handleShowDetailProduct = useCallback(
        (san_pham_id: string | number) => {
            handleToggleModal(true);

            const findProductById: Product = deferredProductList.find((prod: Product) => prod.san_pham_id === san_pham_id)
            setDetailProduct(findProductById)
        },
        [deferredProductList],
    )

    return (
        <main >
            <Banner title="Cửa hàng" />

            <Modal
                visible={isVisible}
                onChangeVisible={handleToggleModal}
                renderHeader={null}
                renderBody={renderXMLBody()}
            />

            <div className='container mb-16 mt-24'>
                {!isLoadingProductType && <CategoryTabs
                    options={[
                        TAB_TYPE_ALL,
                        ...deferredProductType
                    ]}
                    onHandleToggleTab={(typeId: number) => {
                        setTypeId(typeId)
                        setPage(1)
                    }}
                    isShowSummary={true}
                    summaryIndex={productList?.data.total}
                    defaultTab={0}
                />}
            </div>


            {isLoadingProductList ? <>Đang tải</> : <>
                {deferredProductList.length ? <div className="container grid grid-cols-4 gap-5">
                    {deferredProductList.map((product: Product, idx: any) => {
                        return <Fragment key={`${product.san_pham_id}_${idx}`}>
                            <ProductCard
                                {...product}
                                onShowDetail={(san_pham_id: string | any) => {
                                    handleShowDetailProduct(san_pham_id)
                                }}
                            />
                        </Fragment>
                    })}
                </div> : <BlankPage text="Không có sản phẩm nào" subText="Vui lòng chọn danh mục khác" isHaveColor />}


                <div className="w-full mx-auto pt-10 pb-10">
                    <HPagination
                        total={productList?.data.total}
                        pageSize={8}
                        current={page}
                        onChangePage={(page: number) => {
                            setPage(page)
                        }}
                    />
                </div>
            </>}
        </main>
    )
}