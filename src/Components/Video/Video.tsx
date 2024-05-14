import React from "react";
import VideoItem from "./VideoItem"; // Import component con

const videoData = [
  {
    id: 1,
    src: "https://www.youtube.com/embed/axMKztgBMmc?si=2JewCGBrpyIKPxN2",
    title: "Sữa tươi 100% từ trang trại bò Hokkaido",
  },
  {
    id: 2,
    src: "https://www.youtube.com/embed/0R17nlBm4l4?si=tyLuN_uL2v4duDKY",
    title: "Cùng Hokkaido mỗi ngày một niềm vui",
  },
  {
    id: 3,
    src: "https://www.youtube.com/embed/R68pM5rT8fw?si=ggdk7DxU9Lv4GZXr",
    title: "Một ngày hoàn hảo từ nông trại Hokkaido",
  },
  {
    id: 4,
    src: "https://www.youtube.com/embed/NdXBlWap3JY?si=dvqdK7eXQaSDA8RN",
    title:
      "Bác sĩ Nguyễn Thị Thu Hậu – Trưởng khoa dinh dưỡng bệnh viện nhi đồng 2 TP.HCM nói gì về sữa tươi Hokkaido nội địa Nhật 100%",
  },
  {
    id: 5,
    src: "https://www.youtube.com/embed/fYUYUhdsxiY?si=KeO_ntFgaYKSVvOT",
    title: "Trang trại và quy trình sản xuất sữa Hokkaido",
  },
  {
    id: 6,
    src: "https://www.youtube.com/embed/kpj5jxYBayQ?si=NK8ISBTnbHtgv-vs",
    title: "Sữa tươi Hokkaido đồng hành cùng bé mỗi ngày",
  },
  // Thêm các đối tượng video khác nếu cần
];

export default function Video() {
  return (
    <div className="mx-5 md:mx-0">
      <h1 className="text-black text-[32px] text-center font-medium mt-[40px] mb-[10px] md:mt-[80px] md:mb-[50px]">
        Video truyền thông
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mx-4 md:mx-20">
        {videoData.map((video) => (
          <VideoItem key={video.id} src={video.src} title={video.title} />
        ))}
      </div>
    </div>
  );
}
