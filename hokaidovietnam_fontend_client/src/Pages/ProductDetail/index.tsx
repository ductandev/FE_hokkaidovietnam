import Banner from '@/Components/Banner'
import { ImageGallery } from "@/Components/ImageGallery/ImageGallery"
import { EmblaOptionsType } from 'embla-carousel';
import ProductInformation from './components/ProductInformation/ProductInformation';

import Slider1 from "@/assets/image/detail/slide-1.png"
import Slider2 from "@/assets/image/detail/slide-2.png"
import Slider3 from "@/assets/image/detail/slide-3.png"
import Slider4 from "@/assets/image/detail/slide-4.png"

export default function ProductDetail() {
    const OPTIONS: EmblaOptionsType = {};

    const slideImages = [
        Slider1,
        Slider2,
        Slider3,
        Slider4
    ]

    return (
        <main>
            <Banner title="Thông tin sản phẩm" />

            <div className='container grid grid-cols-2 mb-24 my-7'>
                <ImageGallery
                    slides={slideImages}
                    options={OPTIONS}
                    customClass="pr-28"
                />

                <ProductInformation />
            </div>
        </main>
    )
}