import React from "react";

interface VideoItemProps {
  src: string;
  title: string;
}

const VideoItem: React.FC<VideoItemProps> = ({ src, title }) => {
  return (
    <div className="flex flex-col items-center ">
      <iframe
        className="w-full lg:w-[500px] h-[calc(500px * 0.75)] md:h-[300px] max-w-full"
        src={src}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <h1 className="text-gray-500 text-[12px] mt-4 mb-4 md:text-base text-center">
        {title}
      </h1>
    </div>
  );
};

export default VideoItem;
