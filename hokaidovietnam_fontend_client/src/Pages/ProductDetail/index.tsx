import Banner from 'src/Components/Banner'
import ImageGallery from 'src/Components/ImageGallery'



export default function Detail() {
    return (
        <main>
            <Banner title="Thông tin sản phẩm" />

            <div>
                <ImageGallery />
            </div>
        </main>
    )
}