import { NavLink } from "react-router-dom";

import { IoCartOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { AiOutlineProduct } from "react-icons/ai";
import { IoIosContacts } from "react-icons/io";
import { GrArticle } from "react-icons/gr";

import "./styles.scss";

function SidebarAdmin() {
    const menu = [
        {
            name: "Đơn hàng",
            to: "order",
            icon: <IoCartOutline />
        },
        {
            name: "Khách hàng",
            to: "customer",
            icon: <CiUser />
        },
        {
            name: "Sản phẩm",
            to: "product",
            icon: <AiOutlineProduct />
        },
        {
            name: "Liên hệ",
            to: "contact",
            icon: <IoIosContacts />
        },
        {
            name: "Tin tức",
            to: "news",
            icon: <GrArticle />
        },
    ];

    return (
        <nav className='sidebar-admin'>
            <div className="flex items-center justify-center">
                <span>{svgDashboard}</span>

                <span className="hidden lg:block text-xl font-semibold ml-1">Dashboard</span>
            </div>

            <div className="flex items-center justify-center my-2">
                <ul className="sidebar-admin-menu">
                    {menu.map((item, index) => {
                        return <NavLink
                            className={({ isActive }) =>
                                isActive ? "active sidebar-admin-menu-item" : "sidebar-admin-menu-item"
                            }
                            to={item.to}
                            key={index}
                        >
                            <p className="hidden lg:block pl-10">{item.name}</p>

                            <span className="block lg:hidden text-2xl">{item.icon}</span>
                        </NavLink>
                    })}
                </ul>
            </div>
        </nav>
    )
}

export default SidebarAdmin

const svgDashboard = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="6" height="6" rx="1" stroke="black" strokeWidth="2" strokeLinejoin="round" />
    <rect x="4" y="14" width="6" height="6" rx="1" stroke="black" strokeWidth="2" strokeLinejoin="round" />
    <rect x="14" y="14" width="6" height="6" rx="1" stroke="black" strokeWidth="2" strokeLinejoin="round" />
    <rect x="14" y="4" width="6" height="6" rx="1" stroke="black" strokeWidth="2" strokeLinejoin="round" />
</svg>