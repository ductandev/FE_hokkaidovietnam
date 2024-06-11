import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";

import img1 from "../../assets/img_home/1.jpg";
import img2 from "../../assets/img_home/2.jpg";
import img3 from "../../assets/img_home/3.jpg";
import img4 from "../../assets/img_home/4.png";
import img5 from "../../assets/img_home/5.png";
import img6 from "../../assets/img_home/6.png";
import img7 from "../../assets/img_home/7.png";
import img8 from "../../assets/img_home/8.png";
import img9 from "../../assets/img_home/9.png";
import img10 from "../../assets/img_home/10.png";
import bg1 from "../../assets/img_home/bg1.png";
import bg2 from "../../assets/img_home/bg2.png";
import logofb from "../../assets/img_home/logo-fb.png";
import logotiktok from "../../assets/img_home/logo-tiktok.png";
import logoinsta from "../../assets/img_home/logo-insta.png";
import logoyt from "../../assets/img_home/logo-yt.png";
import logozalo from "../../assets/img_home/logo-zalo.png";
import logophone from "../../assets/img_home/logo-phone.png";
import tree from "../../assets/img_home/tree.png";

import { Carousel } from "../../Components/Carousel/Carousel";
import GrungeSVG from "@/Components/GrungeSVG/GrungeSVG";
import OurFarm from "@/Components/OurFarm/OurFarm";
import FarmCrew from "@/Components/FarmCrew/FarmCrew";
import OrganicMilk from "@/Components/OrganicMilk/OrganicMilk";
import FieldLife from "@/Components/FieldLife/FieldLife";
import { ProductCard } from "@/Components/ProductCard";
import { useQuery } from "react-query";
import { getProducts } from "@/Apis/Product/Product.api";
import { getNews } from "@/Apis/News/News.api";

export default function Home() {
  const { isLoading: isLoadingProductList, data: productList }: any = useQuery({
    queryKey: ["products"],
    queryFn: () => {
      const controller = new AbortController();

      setTimeout(() => {
        controller.abort();
      }, 5000);
      return getProducts(1, 4, 0, "", controller.signal);
    },
    keepPreviousData: true,
    retry: 0,
  });

  const { isLoading: isLoadingNews, data: NewsList }: any = useQuery({
    queryKey: ["news"],
    queryFn: () => {
      const controller = new AbortController();

      setTimeout(() => {
        controller.abort();
      }, 5000);

      return getNews(1, 3, "", controller.signal);
    },
    keepPreviousData: true,
    retry: 0,
  });

  const slides: string[] = [
    "https://images.pexels.com/photos/10829198/pexels-photo-10829198.jpeg",
    "https://images.unsplash.com/photo-1594731884638-8197c3102d1d",
    "https://images.pexels.com/photos/12639450/pexels-photo-12639450.jpeg",
    "https://images.unsplash.com/photo-1580570598977-4b2412d01bbc",
  ];

  useEffect(() => {
    const handlePlayButtonClick = () => {
      const videoUrl = "https://www.youtube.com/watch?v=fYUYUhdsxiY";

      // Kiểm tra nếu URL của video là đường dẫn mong muốn
      if (videoUrl === "https://www.youtube.com/watch?v=fYUYUhdsxiY") {
        window.open(videoUrl); // Mở video trong một cửa sổ mới
        // Hoặc sử dụng logic phát video ưa thích của bạn ở đây
      } else {
        alert("Không thể phát video từ đường dẫn này.");
      }
    };

    const playButton = document.getElementById("playButton");
    if (playButton) {
      playButton.addEventListener("click", handlePlayButtonClick);
    }

    // Xóa event listener khi component bị unmount để tránh memory leak
    return () => {
      if (playButton) {
        playButton.removeEventListener("click", handlePlayButtonClick);
      }
    };
  }, []);

  const [showOurFarmModal, setShowOurFarmModal] = useState(false);
  const [showFieldLifeModal, setShowFieldLifeModal] = useState(false);
  const [showOrganicMilkModal, setShowOrganicMilkModal] = useState(false);
  const [showFarmCrewModal, setShowFarmCrewModal] = useState(false);

  const openOurFarmModal = () => {
    setShowOurFarmModal(true);
  };

  const closeOurFarmModal = () => {
    setShowOurFarmModal(false);
  };

  const openFieldLifeModal = () => {
    setShowFieldLifeModal(true);
  };

  const closeFieldLifeModal = () => {
    setShowFieldLifeModal(false);
  };

  const openOrganicMilkModal = () => {
    setShowOrganicMilkModal(true);
  };

  const closeOrganicMilkModal = () => {
    setShowOrganicMilkModal(false);
  };

  const openFarmCrewModal = () => {
    setShowFarmCrewModal(true);
  };

  const closeFarmCrewModal = () => {
    setShowFarmCrewModal(false);
  };
  const handleClick = () => {
    window.location.href = "https://zalo.me/0904229229";
  };

  const RenderProductCards = (): JSX.Element[] => {
    return productList?.data?.content?.map((product: any, idx: any) => {
      return (
        <Fragment key={`${product.id}_${idx}`}>
          <ProductCard {...product} />
        </Fragment>
      );
    });
  };

  const RenderNewsCards = (): JSX.Element[] => {
    return NewsList?.data?.content?.map((news: any, idx: any) => {
      return (
        <Link to={`/media/${news.tin_tuc_id}`}>
          <div className="flex flex-col items-center" key={idx}>
            <div className="w-full md:w-[350px] h-[250px]">
              <img
                className="w-full h-full object-cover"
                src={news.hinh_anh}
                alt="..."
              />
            </div>
            <div className="flex flex-col items-center w-[350px]">
              <h1 className="text-lg font-medium text-center mt-4">
                {news.tieu_de}
              </h1>
              <span className="block text-center text-gray-500 mt-2 mb-2">
                {news.mo_ta.length > 130
                  ? news.mo_ta.substr(0, 133) + "..."
                  : news.mo_ta}
              </span>
              <button className="border-b-2 border-black transition-transform transform hover:scale-105">
                Xem thêm
              </button>
            </div>
          </div>
        </Link>
      );
    });
  };

  return (
    <div className="relative">
      {/* carosel */}
      <Carousel>
        {slides.map((s, index) => (
          <img
            key={index}
            className="w-full object-cover object-center min-h-[500px] md:min-h-full"
            src={s}
            alt=""
          />
        ))}
      </Carousel>
      <h1>test</h1>
      {/* quảng cáo */}
      <div className="grid grid-cols-1 md:grid-cols-3 mt-5 md:mt-0 mb-10 gap-5 md:gap-0 mx-8 my-auto md:mx-0">
        {/* Cột 1 */}
        <div className="h-[60vw] md:h-[500px] relative overflow-hidden group">
          <img
            src={img1}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Link to="/products">
              <button className="text-white text-2xl md:text-3xl md:font-bold">
                Xem ngay
              </button>
            </Link>
          </div>
        </div>

        {/* Cột 2 */}
        <div className="h-[60vw] md:h-[500px] relative overflow-hidden group">
          <img
            src={img2}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Link to="/products">
              <button className="text-white text-2xl md:text-3xl md:font-bold">
                Xem ngay
              </button>
            </Link>
          </div>
        </div>

        {/* Cột 3 */}
        <div className="h-[60vw] md:h-[500px] relative overflow-hidden group">
          <img
            src={img3}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Link to="/products">
              <button className="text-white text-2xl md:text-3xl md:font-bold">
                Xem ngay
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Trang thiết bị */}
      <div className="grid grid-cols-1 md:grid-cols-3 mx-auto max-w-7xl mb-[70px] ">
        <div className="w-[250px] mx-auto">
          <div className="h-[200px] content-center">
            <img src={img4} alt="" className="mx-auto" />
          </div>
          <h3 className="text-center font-medium text-xl mb-1">
            Trang Thiết Bị Hiện Đại
          </h3>
          <span className="block text-center text-gray-500 text-sm">
            Một nhà máy được bao quanh bởi không khí trong lành và cây xanh.
          </span>
        </div>
        <div className="w-[320px] mx-auto">
          <div className="h-[200px] content-center">
            <img src={img5} alt="" className="mx-auto" />
          </div>
          <h3 className="text-center font-medium text-xl mb-1">
            Trang thiết bị và công nghệ hiện đại tạo ra các sản phẩm sữa chất
            lượng cao.
          </h3>
          <span className="block text-center text-gray-500 text-sm">
            Trang thiết bị tiên tiến từ Châu Âu như Pháp, Đức, Đan Mạch… và công
            nghệ tiếp thu trong nước.
          </span>
        </div>
        <div className="w-[250px] mx-auto">
          <div className="h-[200px] content-center">
            <img src={img6} alt="" className="mx-auto" />
          </div>
          <h3 className="text-center font-medium text-xl mb-1">100% sữa bò</h3>
          <span className="block text-center text-gray-500 text-sm">
            Sữa tươi nguyên chất 100% được chế biến tại chỗ trong nhà máy sạch
            và sự quản lý vệ sinh kỹ lưỡng.
          </span>
        </div>
      </div>

      {/* quy trình sản xuất */}
      <div className="relative">
        <GrungeSVG position="top" />
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative">
            <img
              className="w-full h-[380px] md:h-[500px]"
              src="https://hokkaidovietnam.com/wp-content/uploads/2018/04/h2-img-4a.jpg"
              alt=""
            />

            <div className="absolute inset-0 object-cover flex items-center justify-center">
              <button className="text-white hover:scale-110" id="playButton">
                <FaPlayCircle size={80} />
              </button>
            </div>
          </div>

          <div className="relative flex justify-center">
            <img
              className="absolute inset-0 w-full h-full object-cover"
              src={bg1}
              alt=""
            />
            <div className="text-black p-6 text-center">
              <h1 className="text-4xl font-medium mt-3 mb-1">
                Tham quan quy trình sản xuất và nông trại chăn nuôi
              </h1>
              <img src={tree} alt="" className="w-1/5 mx-auto mb-1" />
              <p className="text-xl text-gray-600 mb-5">
                Dòng sữa tươi thuần khiết 100% được sản xuất tại Hokkaido - vùng
                đất khí hậu mát mẻ, không khí sạch cùng những thảo nguyên xanh
                tạo ra không gian chăn nuôi tự nhiên vô cùng lý tưởng cho bò
                sữa. Được trang bị thiết bị hiện đại và công nghệ cao đến từ
                Châu Âu như Pháp, Đức, Đan Mạch. Chúng tôi luôn mang đến những
                sản phẩm sữa Hokkaido thơm ngon, an toàn và đảm bảo.
              </p>
              <Link to="/brand">
                <button className="bg-opacity-80 md:mt-4 bg-green-900 text-white w-[147px] h-[40px] transform hover:scale-105">
                  Xem thêm
                </button>
              </Link>
            </div>
          </div>
        </div>
        <GrungeSVG position="bottom" />
      </div>

      {/* Thành tựu */}
      <div className="mt-12 h-80 overflow-hidden">
        <div className="relative h-full">
          <img
            src={bg2}
            alt=""
            className="absolute top-0 w-full h-full object-cover"
            style={{ objectPosition: "top" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-2 md:grid-cols-4 md:mt-8 gap-4 text-center text-black text-6xl">
              <div>
                <h1 className=" text-6xl md:text-7xl text-white mt-16 md:mt-10 font-semibold">
                  82
                </h1>
                <span className="block text-white text-base md:text-2xl mt-5">
                  Chuyên Gia Trang Trại
                </span>
              </div>
              <div>
                <h1 className=" text-6xl md:text-7xl text-white mt-16 md:mt-10 font-semibold">
                  139
                </h1>
                <span className="block text-white text-base md:text-2xl mt-5">
                  Sản Phẩm Sữa
                </span>
              </div>
              <div>
                <h1 className=" text-6xl md:text-7xl text-white mt-1 md:mt-10 font-semibold">
                  34
                </h1>
                <span className="block text-white text-base md:text-2xl mt-5">
                  Giấy phép
                </span>
              </div>
              <div>
                <h1 className=" text-6xl md:text-7xl text-white mt-1 md:mt-10 font-semibold">
                  59
                </h1>
                <span className="block text-white text-base md:text-2xl mt-5">
                  Giải Thưởng
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4">
        {/* Our Farm */}
        <div className="aspect-w-1 aspect-h-1 relative overflow-hidden group">
          <img
            src={img7}
            alt=""
            className="oabsolute inset-0 w-full h-full object-cover object-center"
          />
          <OurFarm show={showOurFarmModal} closeModal={closeOurFarmModal} />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button
              className="text-white text-xl md:text-3xl md:font-bold"
              onClick={openOurFarmModal}
            >
              Our Farm
            </button>
          </div>
        </div>

        {/* Field Life */}
        <div className="aspect-w-1 aspect-h-1 relative overflow-hidden group">
          <img
            src={img8}
            alt=""
            className="oabsolute inset-0 w-full h-full object-cover object-center"
          />
          <FieldLife
            show={showFieldLifeModal}
            closeModal={closeFieldLifeModal}
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button
              className="text-white text-xl md:text-3xl md:font-bold"
              onClick={openFieldLifeModal}
            >
              Field Life
            </button>
          </div>
        </div>

        {/* Organic Milk */}
        <div className="aspect-w-1 aspect-h-1 relative overflow-hidden group">
          <img
            src={img9}
            alt=""
            className="oabsolute inset-0 w-full h-full object-cover object-center"
          />
          <OrganicMilk
            show={showOrganicMilkModal}
            closeModal={closeOrganicMilkModal}
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button
              className="text-white text-xl md:text-3xl md:font-bold"
              onClick={openOrganicMilkModal}
            >
              Organic Milk
            </button>
          </div>
        </div>

        {/* Farm Crew */}
        <div className="aspect-w-1 aspect-h-1 relative overflow-hidden group">
          <img
            src={img10}
            alt=""
            className="oabsolute inset-0 w-full h-full object-cover object-center"
          />
          <FarmCrew show={showFarmCrewModal} closeModal={closeFarmCrewModal} />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button
              className="text-white text-xl md:text-3xl md:font-bold"
              onClick={openFarmCrewModal}
            >
              Farm Crew
            </button>
          </div>
        </div>
      </div>

      {/* sản phẩm nổi bật */}
      <div className="flex flex-col items-center mt-8">
        <h1 className="text-xl md:text-3xl font-medium mb-4">
          SẢN PHẨM NỔI BẬT
        </h1>
        <div className="container grid grid-cols-2 lg:grid-cols-4 gap-5">
          {!isLoadingProductList && RenderProductCards()}
        </div>
        <a
          href="/products"
          className="border-b-2 border-black text-sm md:text-xl text-black font-semibold transform hover:scale-105 transition-transform"
        >
          Xem thêm
        </a>
      </div>

      {/* lắng nghe */}
      <div className="mt-8 relative">
        <GrungeSVG position="top" />
        <img
          src={bg1}
          alt=""
          className="w-full h-[360px] md:h-[320px] object-cover object-center"
        />
        <GrungeSVG position="bottom" />
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex justify-center items-center">
            <div className="text-center md:text-left max-w-[320px]">
              <h1 className="text-black text-[16px] md:text-[23px] font-semibold mt-4 mb-2 md:mb-4">
                HOKKAIDO LẮNG NGHE BẠN
              </h1>
              <p className="text-[#777171] text-[14px] md:text-[16px] mb-2 md:mb-4">
                Mọi phản hồi của khách hàng rất quan trọng với chúng tôi. Vui
                lòng để lại phản hồi về chất lượng dịch vụ. Hokkaido Việt Nam
                xin cám ơn!
              </p>
              <Link to="/contact">
                <button className="bg-[#FFA734] text-[12px] md:text-[16 px] text-white font-semibold py-2 px-4 transition-transform transform hover:scale-105">
                  ĐÓNG GÓP Ý KIẾN
                </button>
              </Link>
            </div>
          </div>

          <div className=" flex justify-center flex-col items-center text-center md:text-left">
            <div>
              <h1 className="text-[#777171]  text-[14px] md:text-[16px] md:font-medium">
                hotline
              </h1>
              <h1 className="text-black font-medium text-[14px] md:text-[18px] md:font-bold text-xl">
                0904 229 229
              </h1>
              <h1 className="text-[#777171] text-[14px] md:text-[16px] md:font-medium mt-1 md:mt-7">
                Email
              </h1>
              <h1 className="text-black font-medium text-[14px] md:text-[18px] md:font-bold text-xl md:mb-16">
                milkhokkaido.vn@gmail.com
              </h1>
            </div>
          </div>
          {/* 1111 */}
          <div className="flex justify-center items-center">
            {/* Logo Facebook */}
            <a
              href="https://www.facebook.com/hokkaido.vietnamm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={logofb}
                alt="Facebook"
                className="w-[50px] h-[55px] md:w-[85px] md:h-[90px] object-contain transition-transform transform hover:scale-105"
              />
            </a>
            {/* Logo TikTok */}
            <a
              href="https://www.tiktok.com/@hokkaidovietnam"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={logotiktok}
                alt="TikTok"
                className="w-[40px] h-[45px] md:w-[70px] md:h-[75px] object-contain transition-transform transform hover:scale-105"
              />
            </a>

            {/* Logo Instagram */}
            <a
              href="https://www.instagram.com/hokkaidovietnam1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={logoinsta}
                alt="Instagram"
                className="w-[50px] h-[55px] md:w-[85px] md:h-[90px] object-contain transition-transform transform hover:scale-105"
              />
            </a>
            {/* Logo YouTube */}
            <a
              href="https://www.youtube.com/@hokkaidovietnam"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={logoyt}
                alt="YouTube"
                className="w-[30px] h-[35px] md:w-[50px] md:h-[55px] object-contain transition-transform transform hover:scale-105"
              />
            </a>
          </div>
        </div>
      </div>

      {/* tin tức */}
      <div className="flex flex-col items-center mt-16">
        <h1 className="text-xl md:text-3xl font-medium mb-8">TIN TỨC</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mx-4">
          {!isLoadingNews && RenderNewsCards()}
        </div>
      </div>

      <div className="fixed bottom-4 right-4 z-50">
        <div className="flex flex-col gap-4">
          {/* Nút 1 */}
          <div className="flex justify-end">
            <button onClick={handleClick} className="animate-bounce">
              <img
                src={logozalo}
                alt=""
                className="w-[63px] h-[50px] lg:w-[83px] lg:h-[70px]"
              />
            </button>
          </div>
          {/* Nút 2 */}
          <div className="flex justify-end">
            <a href="tel:0904229229" className="animate-bounce mr-[5px]">
              <img
                src={logophone}
                alt=""
                className="w-[50px] h-[50px] lg:w-[63px] lg:h-[63px]"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
