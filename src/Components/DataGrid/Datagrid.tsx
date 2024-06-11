import { useDeferredValue, useEffect, useState } from "react";
import { useAddress } from "@/Hooks/useAddress/useAddress";

import { columnsContact, columnsCustomer, columnsNews, columnsOrder, columnsProduct } from "./columns";
import { DataTable } from "./data-table";
import ProductStatus from "../ProductStatus";

import { ProductType } from "@/Types/ProductType.type";

enum EnumTableDefine {
    product = 'product',
    order = 'order',
    customer = 'customer',
    contact = 'contact',
    news = 'news',
};

type PropsType = {
    data: Array<any>;
    type: EnumTableDefine | string;
    pageSize: number;
    page: number;
    addon?: any;
    onHandleRemove?: Function;
    onHandleEdit?: Function;
    onChangeStatus?: Function;
}

export default function DataGrid(props: PropsType) {
    const {
        data,
        type,
        pageSize,
        page,
        addon,
        onHandleRemove,
        onHandleEdit,
        onChangeStatus
    } = props;

    const { buildAddressFromId } = useAddress();

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
                    onEdit: (id: any, product: any) => {
                        onHandleEdit && onHandleEdit(id, product)
                    },
                    onRemove: (id: string | number) => {
                        onHandleRemove && onHandleRemove(id)
                    }
                }
            }
            else if (type === 'order') {
                return {
                    ...object,
                    index: position + paged,
                    onChangeStatus: (id: any, status: any) => {
                        onChangeStatus && onChangeStatus(id, status)
                    },
                    onEdit: (id: any, order: any) => {
                        onHandleEdit && onHandleEdit(id, order)
                    },
                    onRemove: (id: any) => {
                        onHandleRemove && onHandleRemove(id)
                    }
                }
            }
            else if (type === "customer") {
                return {
                    ...object,
                    index: position + paged,
                    address: buildAddressFromId({
                        dia_chi: object.dia_chi,
                        phuong_id: object.phuong_id,
                        quan_id: object.quan_id,
                        tinh_thanh_id: object.tinh_thanh_id,
                    }),
                    onRemove: (id: any) => {
                        onHandleRemove && onHandleRemove(id)
                    },
                    onEdit: (id: any) => {
                        onHandleEdit && onHandleEdit(id)
                    }
                }
            }
            else if (type === "contact") {
                return {
                    ...object,
                    index: position + paged,
                    onRemove: (id: any) => {
                        onHandleRemove && onHandleRemove(id)
                    },
                    onChangeStatus: (id: any, status: any) => {
                        onChangeStatus && onChangeStatus(id, status)
                    },
                }
            }
            else if (type === "news") {
                return {
                    ...object,
                    index: position + paged,
                    onRemove: (id: any) => {
                        onHandleRemove && onHandleRemove(id)
                    },
                    onEdit: (id: any) => {
                        onHandleEdit && onHandleEdit(id)
                    },
                }
            }
            else {
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
        customer: columnsCustomer,
        contact: columnsContact,
        news: columnsNews
    }

    return (
        <div className="py-10">
            <DataTable columns={columnType[type]} data={deferredValue} />
        </div>
    )
}
