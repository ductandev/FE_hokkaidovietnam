import React, { useState } from "react";
import { ProductType } from "@/Types/ProductType.type";

import "./styles.scss";

interface IProps {
    options: Array<ProductType>
    onHandleToggleTab: Function
    isShowSummary?: boolean
    summaryIndex?: number;
    defaultTab: string | number;
}

export const CategoryTabs: React.FC<IProps> = (props: IProps) => {
    const { options, onHandleToggleTab, isShowSummary = false, summaryIndex = 0, defaultTab } = props;
    const [activeTab, setActiveTab] = useState(defaultTab);

    const handleToggleTab = (value: string | number) => {
        setActiveTab(value)
        onHandleToggleTab && onHandleToggleTab(value)
    }

    return <div className="categoryTabs">
        <div className="categoryTabs-menu">
            {options.map((tab: ProductType, index) => {
                return <div
                    className={`categoryTabs-menuItem ${activeTab === tab.loai_san_pham_id ? "categoryTabs-menuItem__active" : ""}`}
                    key={index}
                    onClick={() => {
                        handleToggleTab(tab.loai_san_pham_id)
                    }}>
                    {tab.ten_loai_san_pham}
                </div>
            })}
        </div>

        <div className="categoryTabs-summary" >
            {isShowSummary && <p>{summaryIndex} Sản phẩm</p>}
        </div>
    </div >
}