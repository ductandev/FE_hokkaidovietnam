import { memo } from "react"

const ProductText = (props: any) => {
    const {
        product_name,
        product_brand,
        product_status,
        product_sku,
        product_price,
        product_description
    } = props;

    return <div>
        <h2>{product_name}</h2>

        <div>
            <span>Thương hiệu: <span>{product_brand}</span></span>
            <span>Tình trạng: <span>{product_status}</span></span>
            <span>Mã: <span>{product_sku}</span></span>
        </div>

        <p>{product_price}</p>
        <p>{product_description}</p>
    </div>
}

export default memo(ProductText)