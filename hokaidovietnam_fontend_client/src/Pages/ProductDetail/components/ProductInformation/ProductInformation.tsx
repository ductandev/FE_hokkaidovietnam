import { Divider } from "@/Components/Divider"
import { formatCurrency } from "@/Helper/helper"

type PropsType = {

}

const ProductInformation: React.FC<PropsType> = () => {
    return <div><div className="text-black">
        <h3 className="text-4xl font-light">Sữa nguyên chất 200ml</h3>

        <div className="mt-5">
            <span className="font-light text-base text-[#777171]">
                Thương hiệu:
                <span className="font-medium text-black ml-1">Hokkaido</span>
            </span>

            <span className="mx-2">|</span>

            <span className="font-light text-base text-[#777171]">
                Tình trạng:
                <span className="font-medium text-black ml-1">Còn hàng</span>
            </span>
        </div>

        <span className="font-light text-base text-[#777171]">
            Mã:
            <span className="font-medium text-black ml-1">004-1</span>
        </span>

        <p className="mt-8 font-normal text-4xl">{formatCurrency(50000)}</p>

        <p className="font-light text-secondary text-base mt-5">
            BÍ MẬT CỦA SỮA NGUYÊN CHẤT HOKKAIDO LÀM CÁC BÉ SAY MÊ NẰM Ở CON SỐ 3.6*! <br />
            Theo số liệu của Hiệp hội Sữa Nhật Bản, con số 3.6 trong sữa thể hiện hàm hàm lượng chất béo trong sữa là 3.6%, hương vị thơm, đậm đà béo hơn hẳn so với các loại sữa tươi thông thường khác.
            Sữa nguyên kem Hokkaido không đường, vị ngọt thanh tự nhiên, béo ngậy, ngon đúng gu các bé yêu thích. <br />
            Đảm bảo vị sữa ngon khác biệt hẳn với các loại sữa bột thông thường khác.<br />
            Xuất xứ: Nhật Bản
        </p>

        <Divider className="my-6" />


        <div className="my-6 grid grid-cols-2">
            <div>quantity component</div>
            <div>button component</div>
        </div>


        <span className="text-base font-light text-[#777171]">Gọi đặt mua: <span className="font-medium text-black">0904 229 229</span> để nhanh chóng đặt hàng</span>
    </div>
    </div>
}

export default ProductInformation