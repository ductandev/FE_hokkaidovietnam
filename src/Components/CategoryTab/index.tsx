import React, { useState, useEffect } from "react";
import { ProductType } from "@/Types/ProductType.type";
import { FiFilter } from "react-icons/fi";
import "./styles.scss";

interface IProps {
    options: Array<ProductType>;
    onHandleToggleTab: Function;
    isShowSummary?: boolean;
    summaryIndex?: number;
    defaultTab: string | number;
    className?: string;
    display?: string;
    margin?: string;
    fontSize?: string;
}

export const CategoryTabs: React.FC<IProps> = (props: IProps) => {
    const {
        options,
        onHandleToggleTab,
        isShowSummary = false,
        summaryIndex = 0,
        defaultTab,
        className = "border-b border-gray-400",
        display,
        margin,
        fontSize,
    } = props;
    const [activeTab, setActiveTab] = useState(defaultTab);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
    const [isMenuVisible, setIsMenuVisible] = useState(false); // Thay đổi giá trị mặc định của biến isMenuVisible

    const handleToggleTab = (value: string | number) => {
        setActiveTab(value);
        onHandleToggleTab && onHandleToggleTab(value);
        setIsMenuVisible(false); // Ẩn modal khi bấm chọn tab
    };

    const toggleMenuVisibility = () => {
        setIsMenuVisible(!isMenuVisible); // Đảo ngược trạng thái của isMenuVisible khi bấm vào filter
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 1100);
            setIsMenuVisible(false); // Ẩn modal khi thay đổi kích thước màn hình
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className={`categoryTabs flex justify-between items-center pb-4 ${className}`}>
            {isMobileView ? (
                <div className="p-4">
                    <div className="flex items-start">
                        <div
                            className="filter-icon cursor-pointer"
                            onClick={toggleMenuVisibility}
                        >
                            <FiFilter className="text-xl text-[#777171]" />
                        </div>
                    </div>
                </div>
            ) : (
                <div className={`categoryTabs-menu ${margin}`}>
                    {options.map((tab: ProductType, index) => (
                        <div
                            className={`${fontSize} categoryTabs-menuItem ${activeTab === tab.loai_san_pham_id
                                ? "categoryTabs-menuItem__active after:w-full"
                                : "after:w-0"
                                }`}
                            key={index}
                            onClick={() => {
                                handleToggleTab(tab.loai_san_pham_id);
                            }}
                        >
                            {tab.ten_loai_san_pham}
                        </div>
                    ))}
                </div>
            )}

            {isShowSummary && (
                <div className={`categoryTabs-summary mr-4 ${display}`}>
                    <p>{summaryIndex} Sản phẩm</p>
                </div>
            )}

            {isMenuVisible && (
                <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg relative w-4/5 max-w-md">
                        <span
                            className="absolute top-2 right-2 text-xl cursor-pointer"
                            onClick={toggleMenuVisibility}
                        >
                            &times;
                        </span>
                        {options.map((tab: ProductType, index) => (
                            <div
                                key={index}
                                className={`p-2 cursor-pointer ${activeTab === tab.loai_san_pham_id ? "bg-gray-200" : ""
                                    }`}
                                onClick={() => {
                                    handleToggleTab(tab.loai_san_pham_id);
                                }}
                            >
                                {tab.ten_loai_san_pham}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};