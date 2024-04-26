import Background from "@/assets/image/banner.png";
import logo from "@/assets/image/logo.png";
import { Link } from "react-router-dom";
import { Divider } from "@/Components/Divider";
import GrungeSVG from "../GrungeSVG/GrungeSVG";

function Footer() {
  const linkMapping: any = {
    introduce: [
      {
        label: "Câu chuyện thương hiệu",
        link: "/",
      },
      {
        label: "Danh mục",
        link: "/products",
      },
      {
        label: "Sản phẩm",
        link: "/",
      },
      {
        label: "Cẩm nang",
        link: "/",
      },
      {
        label: "Liên hệ",
        link: "/",
      },
    ],
    support: [
      {
        label: "Điều khoản sử dụng",
        link: "/",
      },
      {
        label: "Hướng dẫn mua hàng",
        link: "/",
      },
      {
        label: "hình thức thanh toán",
        link: "/",
      },
      {
        label: "chính sách vận chuyển",
        link: "/",
      },
      {
        label: "chính sách đổi trả",
        link: "/",
      },
      {
        label: "chính sách bảo mật",
        link: "/",
      },
    ],
  };

  const headText = (text: string, customClass: string) => {
    return (
      <h2
        className={`uppercase lg:text-2xl text-base font-medium ${customClass}`}
      >
        {text}
      </h2>
    );
  };

  const linkText = (type: string, customClass?: string) => {
    return (
      <div className="flex flex-col">
        {linkMapping[type].map((item: any, id: any) => {
          return (
            <Link
              className={`mb-3 text-secondary lg:text-base text-sm hover:text-black ${customClass}`}
              to={item.link}
              key={id}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className="container mb-10">
        <Divider />
      </div>

      <div
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover",
        }}
        className="w-screen relative"
      >
        <GrungeSVG position="top" />
        <div className="grid grid-cols-4 container py-14">
          <div className="lg:col-span-2 col-span-4 mb-10 lg:mb-0">
            <img src={logo} alt="logo_hokaido" className="header-logo" />

            {headText("Địa chỉ liên hệ", " lg:mb-7 mb-3 normal-case")}

            <p className="lg:mb-7 mb-3 lg:text-base text-sm">
              <span>Chi nhánh Hà Nội:</span>{" "}
              <span className="text-secondary">
                Tầng 26, Toà Tây, 54 Liễu Giai, Ba Đình, Hà Nội
              </span>
            </p>

            <p className="lg:text-base text-sm">
              <span>Chi nhánh TP HCM:</span>{" "}
              <span className="text-secondary">
                20 đường số 2, Tân Phú, Quận 7
              </span>
            </p>
          </div>

          <div className="lg:col-span-1 col-span-2">
            {headText("Giới thiệu", " lg:mb-10 mb-3 ")}

            {linkText("introduce")}
          </div>

          <div className="lg:col-span-1 col-span-2">
            {headText("Hỗ trợ khách hàng", " lg:mb-10 mb-3")}

            {linkText("support", "capitalize")}
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
