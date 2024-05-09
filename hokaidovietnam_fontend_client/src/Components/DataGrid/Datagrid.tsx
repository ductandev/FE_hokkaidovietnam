import { useDeferredValue, useEffect, useState } from "react";

import { columnsCustomer, columnsOrder, columnsProduct } from "./columns";
import { DataTable } from "./data-table";
import ProductStatus from "../ProductStatus";

import { ProductType } from "@/Types/ProductType.type";

enum EnumTableDefine {
    product = 'product',
    order = 'order',
    customer = 'customer',
};

type PropsType = {
    data: Array<any>;
    type: EnumTableDefine | string;
    pageSize: number;
    page: number;
    addon?: any
}

export default function DataGrid(props: PropsType) {
    const { data, type, pageSize, page, addon } = props;

    const [defaultDataTable, setDefaultDataTable] = useState(data);


    const renderProductTypeXML = (loai_san_pham_id: number) => {
        return addon.find((y: ProductType) => y.loai_san_pham_id === loai_san_pham_id).ten_loai_san_pham
    }

    const renderProductStatusXML = (trang_thai_san_pham: number) => {
        return <ProductStatus status={trang_thai_san_pham} />
    }


    useEffect(() => {
        const result = data?.map((object, idx) => {
            const position = idx + 1;
            const paged = pageSize * (page - 1);

            if (type === 'product') {
                return {
                    ...object,
                    index: position + paged,
                    renderProductType: renderProductTypeXML(object.loai_san_pham_id),
                    renderProductStatus: renderProductStatusXML(object.trang_thai_san_pham),
                }
            } else {
                return {
                    ...object, index: position + paged
                }
            }

        });

        setDefaultDataTable(result);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, page, pageSize]);


    const deferredValue = useDeferredValue(defaultDataTable);

    const columnType: any = {
        product: columnsProduct,
        order: columnsOrder,
        customer: columnsCustomer
    }

    return (
        <div className="py-10">
            <DataTable columns={columnType[type]} data={deferredValue} />
        </div>
    )
}
