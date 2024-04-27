import React from "react";
import img1 from "../../assets/img_new/g.png";
import img2 from "../../assets/img_new/h.png";
import img3 from "../../assets/img_new/i.png";
import img4 from "../../assets/img_new/j.png";
import img5 from "../../assets/img_new/k.png";
import img6 from "../../assets/img_new/l.png";

interface FeedbackData {
  id: number;
  imgSrc: string;
}

const feedbackImages: FeedbackData[] = [
  { id: 1, imgSrc: img1 },
  { id: 2, imgSrc: img2 },
  { id: 3, imgSrc: img3 },
  { id: 4, imgSrc: img4 },
  { id: 5, imgSrc: img5 },
  { id: 6, imgSrc: img6 },
];

const Feedback: React.FC = () => {
  return (
    <div className="mb-14">
      <h1 className="text-black text-[32px] text-center font-medium mt-[40px] mb-[10px] md:mt-[80px] md:mb-[50px]">
        Hình ảnh từ khách hàng
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 mx-[25px] md:mx-[130px] gap-8">
        {feedbackImages.map((image) => (
          <div key={image.id} className="relative aspect-w-3 aspect-h-4">
            <img
              className="object-cover w-full h-full"
              src={image.imgSrc}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
