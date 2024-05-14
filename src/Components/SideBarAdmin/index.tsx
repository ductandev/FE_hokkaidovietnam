import { NavLink } from "react-router-dom"

import "./styles.scss";

function SidebarAdmin() {
    const menu = [
        {
            name: "Đơn hàng",
            to: "order"
        },
        {
            name: "Khách hàng",
            to: "customer"
        },
        {
            name: "Sản phẩm",
            to: "product"
        },
        {
            name: "Liên hệ",
            to: "contact"
        },
    ]
    return (
        <nav className='sidebar-admin'>
            <div className="flex items-center justify-center">
                <span>{svgDashboard}</span>

                <span className="text-xl font-semibold ml-1">Dashboard</span>
            </div>

            <div className="flex items-center justify-center my-2">
                <ul className="sidebar-admin-menu">
                    {menu.map((item, index) => {
                        return <NavLink className={({ isActive }) =>
                            isActive ? "active sidebar-admin-menu-item" : "sidebar-admin-menu-item"
                        } to={item.to} key={index}>
                            <p className="pl-10">{item.name}</p>
                        </NavLink>
                    })}
                </ul>
            </div>
        </nav>
    )
}

export default SidebarAdmin


const svgDashboard = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="6" height="6" rx="1" stroke="black" stroke-width="2" stroke-linejoin="round" />
    <rect x="4" y="14" width="6" height="6" rx="1" stroke="black" stroke-width="2" stroke-linejoin="round" />
    <rect x="14" y="14" width="6" height="6" rx="1" stroke="black" stroke-width="2" stroke-linejoin="round" />
    <rect x="14" y="4" width="6" height="6" rx="1" stroke="black" stroke-width="2" stroke-linejoin="round" />
</svg>