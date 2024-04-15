import { Fragment } from "react"

import Banner from '@/Components/Banner'
import { CategoryTabs, TOption } from '@/Components/CategoryTab'
import { ProductCard } from "@/Components/ProductCard";
import { HPagination } from "@/Components/Pagination";
import { Divider } from "@/Components/Divider";

const TAB_LIST: Array<TOption> = [
    {
        label: "Tất cả sản phẩm",
        value: 0
    },
    {
        label: "Sữa Hokkaido",
        value: 1
    },
    {
        label: "Sữa Dairy",
        value: 2
    },
    {
        label: "Kem Hokkaido",
        value: 3
    },
    {
        label: "Kem Hokkaido",
        value: 4
    }
];

const PRODUCTS: Array<any> = [
    {
        id: "_pid1",
        product_name: "Sữa tươi nguyên chất 200ml",
        product_price: "50000"
    },
    {
        id: "_pid2",
        product_name: "Sữa tươi nguyên chất 200ml",
        product_price: "50000"
    },
    {
        id: "_pid3",
        product_name: "Sữa tươi nguyên chất 200ml",
        product_price: "50000"
    },
    {
        id: "_pid4",
        product_name: "Sữa tươi nguyên chất 200ml",
        product_price: "50000"
    },
    {
        id: "_pid5",
        product_name: "Sữa tươi nguyên chất 200ml",
        product_price: "50000"
    },
    {
        id: "_pid6",
        product_name: "Sữa tươi nguyên chất 200ml",
        product_price: "50000"
    },
    {
        id: "_pid7",
        product_name: "Sữa tươi nguyên chất 200ml",
        product_price: "50000"
    },
    {
        id: "_pid8",
        product_name: "Sữa tươi nguyên chất 200ml",
        product_price: "50000"
    },
];

export default function Products() {
    return (
        <main >
            <Banner title="Cửa hàng" />

            <div className='container mb-16 mt-24'>
                <CategoryTabs
                    options={TAB_LIST}
                    onHandleToggleTab={() => { }}
                    isShowSummary={true}
                    summaryIndex={30}
                    defaultTab={0}
                />
            </div>

            <div className="container grid grid-cols-4 gap-5">
                {PRODUCTS.map((product, idx) => {
                    return <Fragment key={`${product.id}_${idx}`}>
                        <ProductCard {...product} />
                    </Fragment>
                })}


            </div>

            <div className="w-full mx-auto pt-10 pb-10">
                <HPagination total={30} pageSize={8} current={3} />
            </div>

            <div className="container">
                <Divider className="pb-10" />
            </div>
        </main>
    )
}