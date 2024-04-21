import React from "react";
import Feedback from "@/Components/Feedback/Feedback";
import New from "@/Components/New/New";
import Newspapers from "@/Components/Newspapers/Newspapers";
import Video from "@/Components/Video/Video";
import bg1 from "../../assets/img_new/bg1.png";
import GrungeSVG from "@/Components/GrungeSVG/GrungeSVG";

export default function Media() {
  return (
    <div>
      {/* baner */}
      <div className="relative mb-20">
        <img
          className="h-[80px] md:h-[200px] w-full object-cover"
          src={bg1}
          alt=""
        />
        <GrungeSVG position="bottom" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-[16px] md:text-[32px] font-medium text-black">
            Truyền thông
          </h1>
        </div>
      </div>
      <New />
      <Newspapers />
      <Video />
      <Feedback />
    </div>
  );
}
