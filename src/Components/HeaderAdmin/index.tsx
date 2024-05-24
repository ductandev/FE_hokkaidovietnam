import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { CircleUserRound } from "lucide-react";
import logo from "assets/image/logo.png";

import "./styles.scss";
import { useAuth } from "@/Auth/AuthProvider";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { selectUser } from "@/Redux/selectors/user.selector";

function HeaderAdmin() {

    const userState = useSelector(selectUser);
    const { isLogin, signOut } = useAuth();


    return (
        <header className="header-admin flex items-center">
            <div className="container xl:px-[2rem] flex justify-between">

                <div className="header-logo">
                    <Link className="header-menu-link" to={"/"}>
                        <img src={logo} alt="Logo" />
                    </Link>
                </div>


                {isLogin ? <DropdownMenu>
                    <DropdownMenuTrigger className=" flex justify-between items-center">
                        <CircleUserRound className="mr-3 cursor-pointer w-9 h-9" />
                        <div className="hidden sm:block text-left mr-10">
                            <p className="text-[#1E537C] font-bold leading-none">{userState.ho_ten}</p>
                            <p>{userState.email}</p>
                        </div>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="-translate-y-8 -translate-x-3">
                        <DropdownMenuItem className="font-bold" onClick={() => {
                            signOut()
                        }}>Đăng xuất</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                    : <Link to="/login" >
                        <CircleUserRound className="mr-10 cursor-pointer header-actions-userInfo" />
                    </Link>
                }
            </div>
        </header >
    )
}

export default HeaderAdmin