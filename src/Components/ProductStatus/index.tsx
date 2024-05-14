function ProductStatus(props: any) {
    const { status } = props
    return (
        <div>
            {status ? "Còn hàng" : "Hết hàng"}
        </div>
    )
}

export default ProductStatus