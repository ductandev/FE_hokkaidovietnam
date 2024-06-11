import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useWindowDimensions from "@/Hooks/useWindowDimension";
import { useSelector } from "react-redux";
import { IoSearchOutline } from "react-icons/io5";
import { selectCart } from "@/Redux/selectors/cart.selector";

import { CircleUserRound, ShoppingCart, Search, Menu, X } from "lucide-react";
import logo from "assets/image/logo.png";

import "./styles.scss";
import { useAuth } from "@/Auth/AuthProvider";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
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
        ${isOpenMenu ? "bg-white text-black" : "hover:bg-white"}
        hover:text-black
        overflow-hidden
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

          {isLogin ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <CircleUserRound className="mr-10 cursor-pointer header-actions-userInfo" />
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel>
                  Xin chào, {userState.ho_ten}
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {isAdmin && (
                  <DropdownMenuItem
                    onClick={() => {
                      navigate("/admin/customer");
                    }}
                  >
                    Vào admin
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={() => {
                    navigate("/history");
                  }}
                >
                  Lịch sử mua hàng
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  Thông tin tài khoản
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => {
                    signOut();
                    navigate("/");
                  }}
                >
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <CircleUserRound className="mr-10 cursor-pointer header-actions-userInfo" />
            </Link>
          )}

          <Link to="/cart">
            <div className="relative">
              <ShoppingCart className="cursor-pointer" />

              <div
                className="flex items-center justify-center absolute border rounded-full border-red-600"
                style={{
                  top: -10,
                  right: -10,
                  width: 15,
                  height: 15,
                }}
              >
                <p className="text-xs mb-0 text-red-600">{cartState.length}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <nav
        className="header-navMenu flex flex-col justify-between -translate-y-[1px]"
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

            <div>
              {!isLogin ? (
                <div className="h-[120px] border-y-2 flex flex-col items-start justify-center pl-[15px] translate-y-[1px] overflow-hidden">
                  <Link
                    to="/search"
                    className="pl-[15px] translate-y-[1px] flex items-center mb-4"
                    onClick={() => {
                      setIsOpenMenu(false);
                    }}
                  >
                    <IoSearchOutline size={30} />
                    <p className="ml-2 text-lg hover:font-bold">
                      Tìm kiếm sản phẩm
                    </p>
                  </Link>
                  <Link
                    to="/login"
                    className="flex items-center pl-[15px] translate-y-[1px]"
                  >
                    <CircleUserRound size={30} />
                    <h3 className="text-lg ml-2 hover:font-bold">Đăng Nhập</h3>
                  </Link>
                </div>
              ) : (
                <div className="h-[300px] border-y-2 flex flex-col items-start justify-center pl-[15px] translate-y-[1px] overflow-hidden">
                  <Link
                    to="/search"
                    className=" translate-y-[1px] flex items-center mb-7"
                    onClick={() => {
                      setIsOpenMenu(false);
                    }}
                  >
                    <IoSearchOutline size={30} />
                    <p className="ml-2 text-lg hover:font-bold">
                      Tìm kiếm sản phẩm
                    </p>
                  </Link>
                  <div className="flex flex-col items-start space-y-4">
                    <div className="font-semibold text-lg">
                      Xin chào {userState.ho_ten}
                    </div>
                    {isAdmin && (
                      <button
                        className=" hover:font-bold"
                        style={{ marginLeft: "30px" }}
                        onClick={() => {
                          navigate("/admin/customer");
                        }}
                      >
                        {" "}
                        Vào admin
                      </button>
                    )}
                    <button
                      className=" hover:font-bold"
                      style={{ marginLeft: "30px" }}
                      onClick={() => {
                        navigate("/history");
                        setIsOpenMenu(false);
                      }}
                    >
                      Lịch sử mua hàng
                    </button>
                    <button
                      className=" hover:font-bold"
                      style={{ marginLeft: "30px" }}
                      onClick={() => {
                        navigate("/profile");
                        setIsOpenMenu(false);
                      }}
                    >
                      Thông tin tài khoản
                    </button>
                    <button
                      className=" font-semibold text-lg"
                      onClick={() => {
                        signOut();
                        navigate("/");
                        setIsOpenMenu(false);
                      }}
                    >
                      Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
