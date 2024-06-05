import { GrClose } from "react-icons/gr";
import { IoSearchSharp } from "react-icons/io5";


// ! React Library
import { Fragment, useCallback, useDeferredValue, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useCartStorage } from "@/Hooks/useCartStorage";
import { useDispatch } from "react-redux";
import { actions } from "@/Redux/actions/cart.action";

// ! Component
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
};

const DEFAULT_QUANTITY = 1;

export default function Search() {
    const dispatch: any = useDispatch();

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [typeId, setTypeId] = useState<number>(0);
    const [detailProduct, setDetailProduct] = useState<Product>();
    const [page, setPage] = useState(1);
    const [quantityState, setQuantityState] = useState<number>(DEFAULT_QUANTITY);
    const [searchValue, setSearchValue] = useState("");
    const { saveCartStorage } = useCartStorage();
    const { isLogin } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const { isLoading: isLoadingProductList, data: productList }: any = useQuery({
        queryKey: ['products', page, typeId, searchValue],
        queryFn: () => {
            const controller = new AbortController();

            setTimeout(() => {
                controller.abort()
            }, 5000);
            return getProducts(page, PAGE_SIZE, typeId, searchValue, controller.signal);
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
            }, 5000);
            return getProductTypes(controller.signal);
        },
        keepPreviousData: true,
        retry: 0
    });

    const handleToggleModal = (visible: boolean) => {
        setIsVisible(visible);

        if (!visible) {
            setQuantityState(DEFAULT_QUANTITY);
        }
    };

    const addProductMutation = useMutation({
        mutationFn: (body: any) => addtoCart(body),
        onSuccess: (_) => {
            setQuantityState(DEFAULT_QUANTITY);
        },
    });

    const renderXMLBody = () => {
        // Lấy tên loại sản phẩm từ deferredProductType
        const productTypeName = detailProduct?.loai_san_pham_id != null
            ? deferredProductType.find((type: { loai_san_pham_id: number; }) => type.loai_san_pham_id === detailProduct.loai_san_pham_id)?.ten_loai_san_pham
            : '';

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 mt-12 sm:mt-0">
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
                        <span className="font-light text-base text-[#777171]">
                            Thương hiệu <span className="font-medium text-black">{productTypeName}</span>
                        </span>
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

                    <span className="text-sm font-light text-[#777171]">
                        Gọi đặt mua: <span className="font-medium text-black">0904 229 229</span> để nhanh chóng đặt hàng
                    </span>
                </div>
            </div>
        );
    };

    const deferredProductList = useDeferredValue(productList?.data?.content || []);
    const filteredProductList = deferredProductList.filter((product: Product) => product.trang_thai_san_pham === true);
    const deferredProductType = useDeferredValue(productType?.data?.content || []);

    const handleQuantityChanged = (quantity: number) => {
        setQuantityState(quantity);
    };

    const onMutateCartSuccess = (payload: any) => {
        const resolveCart = HandleAddCart(payload);

        // * convert JSON string để lưu xuống local storage
        saveCartStorage(resolveCart);

        // * Thao tác với state cart trong reducer
        dispatch(actions.setCart(resolveCart));

        toast.success("Thêm giỏ hàng thành công", {
            position: "bottom-center"
        });
    };

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
        }

        onMutateCartSuccess(payload);
    };

    const handleShowDetailProduct = useCallback(
        (san_pham_id: string | number) => {
            handleToggleModal(true);

            const findProductById: Product = deferredProductList.find((prod: Product) => prod.san_pham_id === san_pham_id);
            setDetailProduct(findProductById);
        },
        [deferredProductList],
    );



    return (
        <main>
            <div className="flex justify-between items-center p-5 sm:p-10">
                <h2 className="text-2xl sm:text-[32px] leading-none font-light">
                    Tìm kiếm
                </h2>
                <a href="/">
                    <GrClose className="w-6 h-6" />
                </a>
            </div>

            <div className="flex justify-center mt-6 md:mt-10">
                <div className="border-b-2 hover:border-b-gray-800 duration-1000 w-4/5 md:w-[600px] flex items-end">
                    <input
                        className="outline-none w-full md:text-xl mb-2"
                        type="text"
                        placeholder="Tìm sản phẩm"
                        value={searchValue}
                        onChange={handleChange}
                    />
                    <IoSearchSharp className="ml-4 mb-2 text-gray-600 size-6 lg:size-9" />
                </div>
            </div>


            <Modal
                visible={isVisible}
                onChangeVisible={handleToggleModal}
                renderHeader={null}
                renderBody={renderXMLBody()}
            />

            <div style={{ border: "none" }} className="container lg:mb-14 lg:mt-16">
                {!isLoadingProductType && (
                    <CategoryTabs
                        options={[TAB_TYPE_ALL, ...deferredProductType]}
                        onHandleToggleTab={(typeId: number) => {
                            setTypeId(typeId);
                            setPage(1);
                        }}
                        isShowSummary={true}
                        summaryIndex={productList?.data.total}
                        defaultTab={0}
                        display="hidden"
                        className="border-0"
                        margin="mx-auto"
                        fontSize="
                        lg:text-xl 
                        md:mx-6 
                        relative 
                        cursor-pointer 
                        after:absolute 
                        after:left-0 
                        after:bottom-0 
                        after:h-0.5 
                        after:bg-black
                        after:transition-all
                        after:duration-500"
                    />
                )}
            </div>

            {isLoadingProductList ? (
                <div className="container grid grid-cols-3 grid-md-cols-4 gap-5">
                    {Array.from(Array(PAGE_SIZE).keys()).map((_, idx) => {
                        return <ProductCard key={idx} isSkeleton />;
                    })}
                </div>
            ) : (
                <>
                    {deferredProductList.length ? (
                        <div className="container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {filteredProductList.map((product: Product, idx: any) => {
                                return (
                                    <Fragment key={`${product.san_pham_id}_${idx}`}>
                                        <ProductCard
                                            className="w-full h-[200px] md:h-[250px] xl:h-[300px]"
                                            {...product}
                                            onShowDetail={(san_pham_id: string | any) => {
                                                handleShowDetailProduct(san_pham_id);
                                            }}
                                        />
                                    </Fragment>
                                );
                            })}
                        </div>
                    ) : (
                        <BlankPage
                            text="Không có sản phẩm nào"
                            subText="Vui lòng chọn danh mục khác"
                            isHaveColor
                        />
                    )}

                    <div className="w-full mx-auto pt-10 pb-10">
                        <HPagination
                            total={productList?.data.total}
                            pageSize={8}
                            current={page}
                            onChangePage={(page: number) => {
                                setPage(page);
                            }}
                        />
                    </div>
                </>
            )}
        </main>
    );
}