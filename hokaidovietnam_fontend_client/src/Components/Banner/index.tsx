import { ReactNode } from "react";
import Background from "assets/image/banner.png";
import GrungeSVG from "../GrungeSVG/GrungeSVG";

interface IProps {
  title: string | ReactNode;
  background?: string;
}
function Banner(props: IProps) {
  const { title, background = Background } = props;

  return (
    <>
      <div
        className={`bannerBrandRespon relative`}
        style={{
          height: "208px",
          width: "100vw",
          backgroundImage: `url(${background})`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundSize: "cover",
        }}
      >
        <h1
          className={`
          text-base 
          sm:text-4xl 
          tagH1BrannerRespon`}
        > {title} </h1>

        <GrungeSVG />
      </div>
    </>
  );
}

export default Banner;
