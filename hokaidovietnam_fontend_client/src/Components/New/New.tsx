import React from "react";
import img1 from "../../assets/img_new/1.png";
import img2 from "../../assets/img_new/2.png";
import img3 from "../../assets/img_new/3.png";
import img4 from "../../assets/img_new/4.png";
import NewPaginate from "./NewPaginate";

export default function New() {
  return (
    <div className="grid grid-cols-1 mx-[25px] md:mx-[130px] mt-8">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mx-5 md:mx-0">
        <div className="flex flex-col items-start md:items-center">
          <img
            className="w-full h-[200px] object-cover md:h-[350px]"
            src={img1}
            alt=""
          />
          <h1 className="text-sm md:text-lg font-medium text-left md:text-center mt-4">
            8 bí quyết ăn uống khiến người Nhật Bản gầy nhất thế giới
          </h1>
          <span className="block text-left md:text-center text-xs md:text-[16px] text-gray-500 mt-2 mb-2">
            Không chỉ giữ kỷ lục về tuổi thọ, Nhật Bản còn được coi là quốc gia
            gầy nhất trên thế giới vì chỉ có 3% cư dân bị béo phì. Các hướng dẫn
            chế độ ăn uống do Chính phủ Nhật Bản đưa ra vào năm 2000 ... 
          </span>
          <button className="text-xs md:text-base border-b-2 border-black transition-transform transform hover:scale-105">
            Xem thêm
          </button>
        </div>
        <div className="gap-2 grid md:grid-cols-1">
          <div className="gap-2 grid md:grid-cols-1">
            <div className="flex flex-col md:flex-row md:space-x-4 md:h-[140px] mb-3">
              <img
                className="min-w-[180px] h-[200px]object-cover md:min-w-[220px] md:h-[150px]"
                src={img2}
                alt=""
              />
              <div className="flex flex-col items-start justify-between">
                <div>
                  <h1 className="text-sm font-medium mt-4 md:mt-0">
                    Thương hiệu sữa được yêu thích tại đất nước Nhật Bản đã về
                    tới Việt Nam
                  </h1>
                  <span className="block text-gray-500 text-xs mt-2 mb-2 md:mb-0">
                    Dòng sữa tươi tiệt trùng tốt cho dạ dày, giàu canxi và dòng
                    sữa chua lên men thơm ngon chắc chắn sẽ chinh phục cả người
                    lớn và trẻ em tại Việt Nam. Ngày 22/1, Lễ ký kết hợp tác
                    phân phối sữa Dairy do công ty CP Hokkaido ...
                  </span>
                </div>
                <button className="text-xs md:text-base border-b-2 border-black transition-transform transform hover:scale-105 mb-4 md:mb-0">
                  Xem thêm
                </button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4 md:h-[140px] mb-3">
              <img
                className="min-w-[180px] h-[200px] object-cover md:min-w-[220px] md:h-[150px]"
                src={img3}
                alt=""
              />
              <div className="flex flex-col items-start justify-between">
                <div>
                  <h1 className="text-sm font-medium mt-4 md:mt-0">
                    Thương hiệu sữa được yêu thích tại đất nước Nhật Bản đã về
                    tới Việt Nam
                  </h1>
                  <span className="block text-gray-500 text-xs mt-2 mb-2 md:mb-0">
                    Dòng sữa tươi tiệt trùng tốt cho dạ dày, giàu canxi và dòng
                    sữa chua lên men thơm ngon chắc chắn sẽ chinh phục cả người
                    lớn và trẻ em tại Việt Nam. Ngày 22/1, Lễ ký kết hợp tác
                    phân phối sữa Dairy do công ty CP Hokkaido ...
                  </span>
                </div>
                <button className="text-xs md:text-base border-b-2 border-black transition-transform transform hover:scale-105 mb-4 md:mb-0">
                  Xem thêm
                </button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4 md:h-[140px]">
              <img
                className="min-w-[180px] h-[200px] object-cover md:min-w-[220px] md:h-[150px]"
                src={img4}
                alt=""
              />
              <div className="flex flex-col items-start justify-between">
                <div>
                  <h1 className="text-sm font-medium mt-4 md:mt-0">
                    Thương hiệu sữa được yêu thích tại đất nước Nhật Bản đã về
                    tới Việt Nam
                  </h1>
                  <span className="block text-gray-500 text-xs mt-2 mb-2 md:mb-0">
                    Dòng sữa tươi tiệt trùng tốt cho dạ dày, giàu canxi và dòng
                    sữa chua lên men thơm ngon chắc chắn sẽ chinh phục cả người
                    lớn và trẻ em tại Việt Nam. Ngày 22/1, Lễ ký kết hợp tác
                    phân phối sữa Dairy do công ty CP Hokkaido ...
                  </span>
                </div>
                <button className="text-xs md:text-base border-b-2 border-black transition-transform transform hover:scale-105 mb-4 md:mb-0">
                  Xem thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* tin tuc 2 */}
      <NewPaginate />
    </div>
  );
}
