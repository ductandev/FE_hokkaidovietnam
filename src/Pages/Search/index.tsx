import { GrClose } from "react-icons/gr";
import { IoSearchSharp } from "react-icons/io5";
import sp from "../../assets/image/sp4.png";
import './styles.scss'
export default function Search() {
    return (
        <div>
            <div className="flex justify-between items-center p-5 sm:p-10">
                <h2 className="text-2xl sm:text-[32px] leading-none font-light">
                    Tìm kiếm
                </h2>
                <a href="/">
                    <GrClose className="w-6 h-6" />
                </a>
            </div>
            <div className="flex justify-center mt-10">
                <div className="border-b-2 w-[600px] flex items-center">
                    <div className="flex-grow text-xl font-semibold">
                        Chọn loại sản phẩm cần tìm
                    </div>
                    <IoSearchSharp size={35} className="ml-4 mb-2" />
                </div>
            </div>
            <div>
                <ul className="text-xl font-normal flex flex-row gap-5 mt-6 justify-center">
                    <li className="hover:font-semibold hover:text-blue-900">
                        <h1>Hokkaido</h1>
                    </li>
                    <li className="hover:font-semibold hover:text-blue-900">
                        <h1>Hokkaido1</h1>
                    </li>
                    <li className="hover:font-semibold hover:text-blue-900">
                        <h1>Hokkaido2</h1>
                    </li>
                    <li className="hover:font-semibold hover:text-blue-900">
                        <h1>Hokkaido3</h1>
                    </li>
                    <li className="hover:font-semibold hover:text-blue-900">
                        <h1>Hokkaido4</h1>
                    </li>
                </ul>
            </div>
            <div>
                <ul className="mx-[200px] grid grid-cols-4">
                    <div className="text-center mt-10">
                        <img src={sp} alt="" style={{ width: "30%" }} className="mx-auto" />
                        <h1 className="mt-auto">Sữa hokkaido 200ml</h1>
                    </div>
                    <div className="text-center mt-10">
                        <img src={sp} alt="" style={{ width: "30%" }} className="mx-auto" />
                        <h1 className="mt-auto">Sữa hokkaido 200ml</h1>
                    </div>
                    <div className="text-center mt-10">
                        <img src={sp} alt="" style={{ width: "30%" }} className="mx-auto" />
                        <h1 className="mt-auto">Sữa hokkaido 200ml</h1>
                    </div>
                    <div className="text-center mt-10">
                        <img src={sp} alt="" style={{ width: "30%" }} className="mx-auto" />
                        <h1 className="mt-auto">Sữa hokkaido 200ml</h1>
                    </div>
                    <div className="text-center mt-10">
                        <img src={sp} alt="" style={{ width: "30%" }} className="mx-auto" />
                        <h1 className="mt-auto">Sữa hokkaido 200ml</h1>
                    </div>
                    <div className="text-center mt-10">
                        <img src={sp} alt="" style={{ width: "30%" }} className="mx-auto" />
                        <h1 className="mt-auto">Sữa hokkaido 200ml</h1>
                    </div>
                    <div className="text-center mt-10">
                        <img src={sp} alt="" style={{ width: "30%" }} className="mx-auto" />
                        <h1 className="mt-auto">Sữa hokkaido 200ml</h1>
                    </div>
                </ul>
            </div>
        </div>
    );
}