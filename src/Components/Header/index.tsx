import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useWindowDimensions from "@/Hooks/useWindowDimension";
import { useSelector } from "react-redux";

import { selectCart } from "@/Redux/selectors/cart.selector";

import { CircleUserRound, ShoppingCart, Search, Menu, X } from "lucide-react";
import logo from "assets/image/logo.png";

import "./styles.scss";
import { useAuth } from "@/Auth/AuthProvider";
import { Button } from "../ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { selectUser } from "@/Redux/selectors/user.selector";

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
  const userState = useSelector(selectUser);
  const navigate = useNavigate();
  const { isLogin, signOut, isAdmin } = useAuth();

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

  useEffect(() => {
    // Cuộn lên đầu trang khi thay đổi đường dẫn
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
        <>
          <ul className="header-menu-container">
            {memorizeMenu.map((menu, idx) => {
              return (
                <Link
                  className="header-menu-link font-semibold text-sm transition-transform transform hover:scale-105 hover:font-extrabold"
                  to={menu.path}
                  key={idx}
                >
                  {menu.name}
                </Link>
              );
            })}
          </ul>
        </>

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
          <Link to="/search">
            <Search className="mr-10 cursor-pointer header-actions-search" />
          </Link>

          {isLogin ? <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <CircleUserRound className="mr-10 cursor-pointer header-actions-userInfo" />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuLabel>Xin chào, {userState.ho_ten}</DropdownMenuLabel>

              <DropdownMenuSeparator />

              {isAdmin && <DropdownMenuItem onClick={() => {
                navigate('/admin/customer')
              }}>Vào admin</DropdownMenuItem>}
              <DropdownMenuItem onClick={() => {
                navigate('/history')
              }}>Xem đơn hàng</DropdownMenuItem>
              <DropdownMenuItem>Đổi mật khẩu</DropdownMenuItem>

              <DropdownMenuItem onClick={() => {
                signOut()
              }}>Đăng xuất</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

            : <Link to="/login" >
              <CircleUserRound className="mr-10 cursor-pointer header-actions-userInfo" />
            </Link>
          }

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
        className="header-navMenu flex flex-col justify-between"
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
                    className="header-navMenu-link font-bold hover:font-extrabold"
                    to={menu.path}
                    key={idx}
                    onClick={() => {
                      setIsOpenMenu(false);
                    }}
                  >
                    {menu.name}
                  </Link>
                );
              })}
            </ul>

            <div className="h-[100px] border-t-2  flex items-center justify-start pl-[15px]">
              {!isLogin ? <Link to="/login" className="flex items-center space-x-2">
                <CircleUserRound size={35} />
                <h3 className="font-semibold text-lg">LOGIN</h3>
              </Link> : <Button onClick={() => {
                signOut();
              }}>
                Đăng xuất
              </Button>
              }

            </div>
          </>
        )}
      </nav>
    </header>
  );
}