import Banner from '@/Components/Banner'
import ImageGallery2 from "@/Components/ImageGallery"
import { Button } from '@/Components/ui/button'

export default function Detail() {
    return (
        <main>
            <Banner title="Thông tin sản phẩm" />

            <div>
                <ImageGallery2 />

                <Button>abc</Button>
            </div>
        </main>
    )
}