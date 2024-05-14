import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useWindowDimensions from "@/Hooks/useWindowDimension";
import { useSelector } from "react-redux";

import { selectCart } from "@/Redux/selectors/cart.selector";

import { CircleUserRound, ShoppingCart, Search, Menu, X } from "lucide-react";
import logo from "assets/image/logo.png";

import "./styles.scss";

const MENU_REDIRECT = [
  {
    path: "/",
    name: "trang chủ",
  },
  {
    path: "/products",
    name: "cửa hàng",
  },
  {
    path: "/brand",
    name: "thương hiệu",
  },
  {
    path: "/media",
    name: "truyền thông",
  },
  {
    path: "/contact",
    name: "liên hệ",
  },
];

export default function Header() {
  const location = useLocation();
  const { width } = useWindowDimensions();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const cartState = useSelector(selectCart);

  const isUseTransition = location.pathname === "/";

  const memorizeMenu = useMemo(() => {
    return MENU_REDIRECT;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (width > 1200) {
      setIsOpenMenu(false);
    }
  }, [width]);

  return (
    <header
      className={`header ${isUseTransition ? "header__transparent" : "header__whitebox"
        } ${isScrolled
          ? "header__transparent__scrolling"
          : "header__whitebox__scrolling"
        } z-50
        hover:bg-white
        hover:text-black
        `}
    >
      <div className="header-menu">
        <ul className="header-menu-container">
          {memorizeMenu.map((menu, idx) => {
            return (
              <Link
                className="header-menu-link transition-transform transform hover:scale-105 hover:font-bold"
                to={menu.path}
                key={idx}
              >
                {menu.name}
              </Link>
            );
          })}
        </ul>

        {!isOpenMenu && (
          <Menu
            className="cursor-pointer header-menu-icons"
            onClick={() => {
              setIsOpenMenu(true);
            }}
          />
        )}

        {isOpenMenu && (
          <X
            className="cursor-pointer header-menu-icons"
            onClick={() => {
              setIsOpenMenu(false);
            }}
          />
        )}
      </div>

      <div className="header-logo">
        <Link className="header-menu-link" to={"/"}>
          {" "}
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      <div className="header-actions">
        <div className="flex flex-row">
          <Search className="mr-10 cursor-pointer header-actions-search" />

          <Link to="/login" >
            <CircleUserRound className="mr-10 cursor-pointer header-actions-userInfo" />
          </Link>

          <Link to="/cart" >
            <div className="relative">
              <ShoppingCart className="cursor-pointer" />

              <div
                className="flex items-center justify-center absolute border rounded-full border-red-600"
                style={{
                  top: -10,
                  right: -10,
                  width: 15,
                  height: 15
                }}
              >
                <p className="text-xs mb-0 text-red-600">
                  {cartState.length}
                </p>
              </div>

            </div>
          </Link>
        </div>
      </div>

      <nav
        className="header-navMenu"
        style={{
          width: isOpenMenu ? "100%" : "0px",
        }}
      >
        {isOpenMenu && (
          <>
            <ul className="header-navMenu-container">
              {memorizeMenu.map((menu, idx) => {
                return (
                  <Link
                    className="header-navMenu-link"
                    to={menu.path}
                    key={idx}
                  >
                    {menu.name}
                  </Link>
                );
              })}
            </ul>
          </>
        )}
      </nav>
    </header>
  );
}
