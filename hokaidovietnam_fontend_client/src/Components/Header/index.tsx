import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom"

import logo from "src/assets/image/logo.png";

import "./styles.scss"

const MENU_REDIRECT = [
    {
        path: "/",
        name: "trang chủ"
    },
    {
        path: "/",
        name: "cửa hàng"
    },
    {
        path: "/",
        name: "thương hiệu"
    },
    {
        path: "/",
        name: "truyền thông"
    },
    {
        path: "/",
        name: "liên hệ"
    }
];

export default function Header() {
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const isUseTransition = location.pathname === '/';

    const memorizeMenu = useMemo(() => { return MENU_REDIRECT }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return <header className={`header ${isUseTransition ? "header__transparent" : "header__whitebox"} ${isScrolled ? "header__transparent__scrolling" : ''}`}>
        <div className="header-menu">
            <ul className="header-menu-container">
                {memorizeMenu.map((menu, idx) => {
                    return <Link className="header-menu-link" to={menu.path} key={idx}>{menu.name}</Link>
                })}
            </ul>
        </div>

        <div className="header-logo">
            <img src={logo} alt="Logo" />
        </div>

        <div className="header-actions">
            <button>Login</button>
        </div>
    </header>
}