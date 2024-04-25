import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

import img1 from "../../assets/img_new/5.png";
import img2 from "../../assets/img_new/6.png";
import img3 from "../../assets/img_new/7.png";
import img4 from "../../assets/img_new/8.png";
import img5 from "../../assets/img_new/9.png";
import img6 from "../../assets/img_new/10.png";
import img7 from "../../assets/img_new/11.png";

interface NewsItem {
  id: number;
  img: string;
  title: string;
  content: string;
}

export default function NewPaginate() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    // Simulated API call to fetch products
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // Simulated function to fetch data
  const fetchData = () => {
    // Simulated product data
    const allNews: NewsItem[] = [
      {
        id: 7,
        img: img7,
        title: "Thưởng Thức Hương Vị Mùa Hè với Sữa Chua Quýt Tươi Myazaki",
        content:
          "Mỗi năm, khi ánh nắng mùa hè bắt đầu len lỏi qua từng kẽ lá, tỉnh Myazaki của Nhật Bản, nơi danh tiếng không chỉ với cảnh quan hùng vĩ mà còn với những sản vật đặc trưng, lại rộn ràng đón mùa quýt Hyuganatsu. Là số 1 ...",
      },
      {
        id: 1,
        img: img1,
        title:
          "Sự khác nhau giữa sữa chua uống và sữa chua ăn ? Loại nào tốt hơn ?",
        content:
          "Tìm hiểu chung về sữa chua uống và sữa chua ăn Sữa chua ăn và sữa chua uống đều là các sản phẩm lên men được làm từ sữa, chứa nhiều vi khuẩn có lợi giúp hệ tiêu hóa hoạt động tốt hơn. Tuy nhiên, mỗi sản phẩm sẽ có đặc ...",
      },
      {
        id: 2,
        img: img2,
        title: "Trẻ phát triển chiều cao khi nào ?",
        content:
          "Từ khi mới sinh đến khoảng 1 hoặc 2 tuổi, trẻ em phát triển với tốc độ nhanh chóng. Sau đó, tốc độ tăng trưởng sẽ chậm lại cho đến khi trẻ bắt đầu tăng trưởng vượt bậc ở tuổi vị thành niên. Do đó, muốn trẻ phát ... ",
      },
      {
        id: 3,
        img: img3,
        title: "Tình trạng uống sữa bị đau bụng vì những nguyên nhân nào ?",
        content:
          "Tìm hiểu chung về sữa chua uống và sữa chua ăn Sữa chua ăn và sữa chua uống đều là các sản phẩm lên men được làm từ sữa, chứa nhiều vi khuẩn có lợi giúp hệ tiêu hóa hoạt động tốt hơn. Tuy nhiên, mỗi sản phẩm sẽ có đặc ...",
      },
      {
        id: 4,
        img: img4,
        title: "Vì sao người Việt Nam lùn thứ 4 thế giới ?",
        content:
          "GD&TĐ - Theo các chuyên gia, người Việt Nam lùn thứ 4 thế giới là bởi những yếu tố bên ngoài như môi trường sống, thực phẩm, thói quen vận động… chứ không phải do gen. Người Việt tiền sử không lùn Tổ chức độc lập World Population Review (WPR) vừa ... ",
      },
      {
        id: 5,
        img: img5,
        title:
          "Cải thiện tầm vóc, trí tuệ thế hệ trẻ nhờ thói quen sử dụng sữa",
        content:
          "Ngày 22/1/2023, tại Hà Nội, Công ty Cổ phần Hokkaido Việt Nam tổ chức Lễ ký kết hợp tác phân phối độc quyền sữa Dairy với Công ty TNHH Minami Nihon Rakuno Kyodo Nhật Bản.   Sự kiện đánh dấu sự ra mắt chính thức của dòng sữa tươi tiệt ...",
      },
      {
        id: 6,
        img: img6,
        title:
          "Thương hiệu sữa được yêu thích tại đất nước Nhật Bản đã về tới Việt Nam",
        content:
          "Dòng sữa tươi tiệt trùng tốt cho dạ dày, giàu canxi và dòng sữa chua lên men thơm ngon chắc chắn sẽ chinh phục cả người lớn và trẻ em tại Việt Nam. Ngày 22/1, Lễ ký kết hợp tác phân phối sữa Dairy do công ty CP Hokkaido ...",
      },
    ];

    // Calculate pagination
    const startIndex = currentPage * 4;
    const slicedNews = allNews.slice(startIndex, startIndex + 4);
    setNews(slicedNews);
    setPageCount(Math.ceil(allNews.length / 5)); // Assuming 5 products per page
  };

  // Handle page change
  const handlePageClick = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div>
      {/* Display products */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:mt-8 gap-4 mx-5 md:mx-0 md:gap-8">
        {news.map((newsItem) => (
          <div key={newsItem.id}>
            <div className="gap-2 grid md:grid-cols-1 md:h-[140px] ">
              <div className="flex flex-col md:flex-row md:space-x-4 ">
                <img
                  className="min-w-[180px] h-[200px] md:min-w-[220px] md:h-[150px]"
                  src={newsItem.img}
                  alt=""
                />
                <div className="flex flex-col items-start justify-between">
                  <div>
                    <h1 className="text-sm font-medium mt-4 md:mt-0">
                      {newsItem.title}
                    </h1>
                    <span className="block text-gray-500 text-xs mt-2 mb-2 md:mb-0">
                      {newsItem.content}
                    </span>
                  </div>
                  <button className="text-xs md:text-base border-b-2 border-black transition-transform transform hover:scale-105 mb-4 md:mb-0">
                    Xem thêm
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <ReactPaginate
        previousLabel={<FaArrowLeftLong />}
        nextLabel={<FaArrowRightLong />}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"flex justify-center items-center gap-4 mt-8"}
        activeClassName={"active"}
      />
    </div>
  );
}
