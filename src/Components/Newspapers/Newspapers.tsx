import React from "react";
import img11 from "../../assets/img_new/a.png";
import img12 from "../../assets/img_new/b.png";
import img13 from "../../assets/img_new/c.png";
import img14 from "../../assets/img_new/d.png";
import img15 from "../../assets/img_new/e.png";
import img16 from "../../assets/img_new/f.png";

interface Newspaper {
  id: number;
  img: string;
  content: string;
}

const newspapersData: Newspaper[] = [
  {
    id: 11,
    img: img11,
    content:
      "Sữa tươi Hokkaido Nội địa Nhật có rất nhiều hương vị khác nhau như: Vị thường, vị quý, nho, táo, socola, dâu,…Sữa dùng được cho cả gia đình và rất tiện lợi khi mang đi du lịch về ngoại hay bé đi học.",
  },
  {
    id: 12,
    img: img12,
    content:
      "Hokkaido là tỉnh lớn thứ hai nằm ở phía Bắc Nhật Bản. Nơi đây được thiên nhiên ưu ái cho những thảo nguyên xanh mướt và trù phú. Không chỉ thu hút khách du lịch trong suốt 4 mùa, Hokkaido còn sở hữu hương vị sữa bò tươi “bậc nhất” Nhật Bản.",
  },
  {
    id: 13,
    img: img13,
    content:
      "Hương vị và độ tươi ngon là những đặc điểm không thể nào hòa lẫn được của sữa tươi vùng Hokkaido. Sữa tươi nguyên chất  được nghiên cứu kỹ lưỡng và được lấy từ những đàn bò sữa chăn thả tự nhiên cũng như những thuận lợi về khí hậu đã giúp cho sữa có được những hương vị đặc trưng.",
  },
  {
    id: 14,
    img: img14,
    content:
      "Mỗi hộp sữa thành phẩm Hokkaido Hidaka được bọc bằng bao bì hộp gói tiệt trùng với đặc tính che chắn ánh sáng mạnh mà không qua không khí, đổ đầy và đóng gói mỗi giờ. Các sản phẩm đã đi qua dây chuyền trong điều kiện vô trùng thậm chí không chạm vào không khí.",
  },
  {
    id: 15,
    img: img15,
    content:
      "Mỗi hộp sữa thành phẩm Hokkaido Hidaka được bọc bằng bao bì hộp gói tiệt trùng với đặc tính che chắn ánh sáng mạnh mà không qua không khí, đổ đầy và đóng gói mỗi giờ. Các sản phẩm đã đi qua dây chuyền trong điều kiện vô trùng thậm chí không chạm vào không khí.",
  },
  {
    id: 16,
    img: img16,
    content:
      "Cách chăn nuôi bò sữa tại vùng Hokkaido cũng rất đặc biệt, bò sữa tại Hokkaido sẽ được chăn thả tự nhiên ngoài những cánh đồng xanh ngút ngàn mà không bị trói buộc trong những trang trại lớn, hiện đại đầy máy móc.",
  },
];

interface NewspaperProps {
  newspaper: Newspaper;
}

const NewspaperItem: React.FC<NewspaperProps> = ({ newspaper }) => {
  return (
    <div className="flex justify-center items-center flex-col">
      <img
        className="w-full md:max-w-[500px] md:max-h-[550px]"
        src={newspaper.img}
        alt=""
      />
      <h1 className="text-gray-500 text-[14px] md:text-sm text-center max-w-[350px] md:max-w-[500px] mt-4">
        {newspaper.content}
      </h1>
    </div>
  );
};

const Newspapers: React.FC = () => {
  return (
    <div>
      <div className="mx-5 md:mx-0">
        <h1 className="text-black text-[32px] text-center font-medium mt-[40px] mb-[10px] md:mt-[80px] md:mb-[50px]">
          Báo chí
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 mx-[25px] md:mx-[130px] gap-5">
          {newspapersData.map((newspaper) => (
            <NewspaperItem key={newspaper.id} newspaper={newspaper} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Newspapers;
