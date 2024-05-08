import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import Banner from '@/Components/Banner'
import { ImageGallery } from "@/Components/ImageGallery/ImageGallery"
import { EmblaOptionsType } from 'embla-carousel';
import ProductInformation from './components/ProductInformation/ProductInformation';
import { ProductDetailSkeleton } from './components/Skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Divider } from '@/Components/Divider';

import { getProduct } from '@/Apis/Product/Product.api';

import Slider1 from "@/assets/image/detail/slide-1.png"
import Slider2 from "@/assets/image/detail/slide-2.png"
import Slider3 from "@/assets/image/detail/slide-3.png"
import Slider4 from "@/assets/image/detail/slide-4.png"

export default function ProductDetail() {
    const OPTIONS: EmblaOptionsType = {};
    const { id } = useParams();

    const { isLoading, data }: any = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProduct(id as string),
        enabled: id !== undefined,
    });

    const slideImages = [
        Slider1,
        Slider2,
        Slider3,
        Slider4
    ];

    return (
        <main>
            <Banner title="Thông tin sản phẩm" />

            {
                isLoading ? <ProductDetailSkeleton /> :
                    <div className='container grid grid-cols-2 mb-24 my-7'>
                        <ImageGallery
                            slides={slideImages}
                            options={OPTIONS}
                            customClass="pr-28"
                        />

                        <ProductInformation {...data?.data?.content} />
                    </div>
            }

            <div className="container mb-10">
                <Divider />
            </div>

            <div className='container text-center w-full'>
                <Tabs defaultValue="account" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="password">Password</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">Make changes to your account here.</TabsContent>
                    <TabsContent value="password">Change your password here.</TabsContent>
                </Tabs>
            </div>
        </main>
    )
}