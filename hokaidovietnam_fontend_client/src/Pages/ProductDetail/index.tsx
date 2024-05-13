import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import Banner from '@/Components/Banner'
import { ImageGallery } from "@/Components/ImageGallery/ImageGallery"
import { EmblaOptionsType } from 'embla-carousel';
import ProductInformation from './components/ProductInformation/ProductInformation';
import { ProductDetailSkeleton } from './components/Skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Divider } from '@/Components/Divider';

import { getProduct, getProducts } from '@/Apis/Product/Product.api';
import BlankPage from '@/Components/BlankPage/BlankPage';
import { ProductCard } from '@/Components/ProductCard';
import { Fragment } from 'react/jsx-runtime';
import { useDeferredValue } from 'react';

export default function ProductDetail() {
    const OPTIONS: EmblaOptionsType = {};
    const { id }: any = useParams();
    const navigate = useNavigate();

    const { isLoading, data }: any = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProduct(id as string),
        enabled: id !== undefined,
    });

    const { isLoading: isLoadingProductList, data: productList }: any = useQuery({
        queryKey: ['product_list', id, data?.data?.content?.loai_san_pham_id],
        queryFn: () => {
            const controller = new AbortController();

            setTimeout(() => {
                controller.abort()
            }, 5000);

            return getProducts(1, 20, data?.data?.content?.loai_san_pham_id, "", controller.signal)
        },
        keepPreviousData: true,
        retry: 0
    });

    const RenderTabs = [
        {
            tabName: "Detail",
            value: "Thông tin chi tiết",
            container: <p className="mt-7 font-light text-secondary text-base">
                {data?.data?.content?.mo_ta}
            </p>
        },
        {
            tabName: "Rating",
            value: "Đánh giá",
            container: <>Chưa có đánh giá nào</>
        }
    ];

    const deferredProductList = useDeferredValue(productList?.data?.content || [])

    const handleClickDetail = (_id: number | string) => {
        navigate(`/product/${_id}`);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    };

    return (
        <main>
            <Banner title="Thông tin sản phẩm" />

            {
                isLoading ? <ProductDetailSkeleton /> :
                    <div className='container grid grid-cols-1 md:grid-cols-2 mb-24 my-7'>
                        <ImageGallery
                            slides={data?.data?.content?.hinh_anh}
                            options={OPTIONS}
                            customClass="imageGallery_detail md:pr-10 lg:pr-26"
                        />

                        <ProductInformation {...data?.data?.content} />
                    </div>
            }

            <div className="container mb-10">
                <Divider />
            </div>

            <div className='container text-center w-full'>
                <Tabs defaultValue="Detail">
                    <TabsList>
                        {RenderTabs.map((tab, index) => {
                            return <TabsTrigger key={index} value={tab.tabName}>{tab.value}</TabsTrigger>
                        })}
                    </TabsList>


                    {RenderTabs.map((tab, index) => {
                        return <TabsContent key={index} value={tab.tabName}>{tab.container}</TabsContent>
                    })}
                </Tabs>
            </div>

            <div className='container'>
                <h3 className="text-center mt-24 font-medium text-primary text-2xl">Sản phẩm liên quan</h3>

                {isLoadingProductList ? <div className="container grid grid-cols-3 grid-md-cols-4 gap-5 mt-10">
                    {Array.from(Array(4).keys()).map((_, idx) => {
                        return <ProductCard
                            key={idx}
                            isSkeleton
                        />
                    })}
                </div> : <>
                    {deferredProductList.length ? <div className="mt-10 container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {deferredProductList.filter((product: any) => parseInt(product.san_pham_id) !== parseInt(id)).slice(0, 4).map((product: any, idx: any) => {
                            return <Fragment key={`${product.san_pham_id}_${idx}`}>
                                <ProductCard
                                    {...product}
                                    onShowDetail={(san_pham_id: string | any) => {
                                        handleClickDetail(san_pham_id)
                                    }}
                                />
                            </Fragment>
                        })}
                    </div> : <BlankPage text="Không có sản phẩm nào" subText="Vui lòng chọn danh mục khác" isHaveColor />}
                </>}
            </div>
        </main>
    )
}