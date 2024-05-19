// ! React Library
import { Fragment, useCallback, useDeferredValue, useState } from "react"
import { useMutation, useQuery } from "react-query";
import { useCartStorage } from "@/Hooks/useCartStorage";
import { useDispatch } from "react-redux";
import { actions } from "@/Redux/actions/cart.action";

// ! Component
import Banner from '@/Components/Banner'
import { CategoryTabs } from '@/Components/CategoryTab'
import { ProductCard } from "@/Components/ProductCard";
import { HPagination } from "@/Components/Pagination";
import { Divider } from "@/Components/Divider";
import { ImageGallery } from "@/Components/ImageGallery";
import Modal from "@/Components/Modal/Modal";
import BlankPage from "@/Components/BlankPage/BlankPage";
import Quantity from "@/Components/Quantity/Quantity";
import { Button } from "@/Components/ui/button";

// ! Helpers
import { HandleAddCart, formatCurrency } from "@/Helper/helper";

// ! Apis and Types
import { getProducts } from "@/Apis/Product/Product.api";
import { getProductTypes } from "@/Apis/Product/ProductType.api";
import { Product } from "@/Types/Product.type";
import { toast } from "react-toastify";
import { useAuth } from "@/Auth/AuthProvider";
import { addtoCart } from "@/Apis/Cart/Cart.api";

const PAGE_SIZE = 8;

const TAB_TYPE_ALL = {
    loai_san_pham_id: 0,
    ten_loai_san_pham: "Tất cả",
    isDelete: false
}

const DEFAULT_QUANTITY = 1

export default function Products() {
    const dispatch: any = useDispatch();

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [typeId, setTypeId] = useState<number>(0);
    const [detailProduct, setDetailProduct] = useState<Product>();
    const [page, setPage] = useState(1);
    const [quantityState, setQuantityState] = useState<number>(DEFAULT_QUANTITY);
    const { saveCartStorage } = useCartStorage();
    const { isLogin } = useAuth();


    const { isLoading: isLoadingProductList, data: productList }: any = useQuery({
        queryKey: ['products', page, typeId],
        queryFn: () => {
            const controller = new AbortController();

            setTimeout(() => {
                controller.abort()
            }, 5000)
            return getProducts(page, PAGE_SIZE, typeId, "", controller.signal)
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

        if (!visible) {
            setQuantityState(DEFAULT_QUANTITY)
        }
    };

    const addProductMutation = useMutation({
        mutationFn: (body: any) => addtoCart(body),
        onSuccess: (_) => {
            setQuantityState(DEFAULT_QUANTITY);
        },
    });

    const renderXMLBody = () => {
        return <div className="grid grid-cols-1 md:grid-cols-2 mt-12">
            <div>
                <ImageGallery
                    slides={detailProduct?.hinh_anh || []}
                    options={{}}
                    customClass="md:pr-10 w-full"
                    showArrow
                />
            </div>

            <div className="text-center text-black">
                <h3 className="mt-4 md:mt-0 text-xl font-light">{detailProduct?.ten_san_pham}</h3>

                <div className="my-3 md:my-5">
                    <span className=" font-light text-base text-[#777171]">Thương hiệu <span className="font-medium text-black">Hokkaido</span></span>
                </div>

                <p className="font-normal text-2xl md:text-4xl">{formatCurrency(detailProduct?.gia_ban || 0)}</p>

                <p className="font-light text-sm mt-3">
                    {detailProduct?.mo_ta}
                </p>

                <div className="my-6 flex items-center justify-center flex-col sm:flex-row">
                    <div className="pr-1 sm:mb-0 mb-4">
                        <Quantity
                            defaultValue={DEFAULT_QUANTITY}
                            limit={detailProduct?.so_luong_trong_kho}
                            onChanged={handleQuantityChanged}
                            hasPreventByLimit
                        />
                    </div>

                    <div className="w-full sm:flex-1 ml-0 sm:ml-1">
                        <Button
                            size={'cart'}
                            variant={'cart-btn'}
                            onClick={handleCart}
                        >
                            Thêm vào giỏ hàng
                        </Button>
                    </div>

                </div>

                <Divider className="my-6" />

                <span className="text-sm font-light text-[#777171]">Gọi đặt mua: <span className="font-medium text-black">0904 229 229</span> để nhanh chóng đặt hàng</span>
            </div>
        </div >
    }

    const deferredProductList = useDeferredValue(productList?.data?.content || []);
    const deferredProductType = useDeferredValue(productType?.data?.content || []);

    const handleQuantityChanged = (quantity: number) => {
        setQuantityState(quantity);
    }

    const onMutateCartSuccess = (payload: any) => {
        const resolveCart = HandleAddCart(payload)

        // * convert JSON string để lưu xuống local storage
        saveCartStorage(resolveCart);

        // * Thao tác với state cart trong reducer
        dispatch(actions.setCart(resolveCart));

        toast.success("Thêm giỏ hàng thành công", {
            position: "bottom-center"
        });
    }

    const handleCart = () => {
        const payload = {
            ...detailProduct,
            so_luong: quantityState
        };

        if (isLogin) {
            let payloadPost: any = {
                san_pham_id: payload.san_pham_id,
                so_luong: quantityState
            };

            addProductMutation.mutate(payloadPost);
        };

        onMutateCartSuccess(payload);
    }

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


            {isLoadingProductList ? <div className="container grid grid-cols-3 grid-md-cols-4 gap-5">
                {Array.from(Array(PAGE_SIZE).keys()).map((_, idx) => {
                    return <ProductCard
                        key={idx}
                        isSkeleton
                    />
                })}
            </div> : <>
                {deferredProductList.length ? <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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