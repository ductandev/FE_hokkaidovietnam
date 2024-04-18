import React, { useState } from "react";


import "./styles.scss";

export interface TOption {
    label: string,
    value: string | number;
}

interface IProps {
    options: Array<TOption>
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
            {options.map((tab, index) => {
                return <div
                    className={`categoryTabs-menuItem ${activeTab === tab.value ? "categoryTabs-menuItem__active" : ""}`}
                    key={index}
                    onClick={() => {
                        handleToggleTab(tab.value)
                    }}>
                    {tab.label}
                </div>
            })}
        </div>

        <div className="categoryTabs-summary" >
            {isShowSummary && <p>{summaryIndex} Sản phẩm</p>}
        </div>
    </div >
}