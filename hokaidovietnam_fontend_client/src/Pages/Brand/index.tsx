import Banner from "@/Components/Banner";
import banner1 from "assets/image/banner1.png";
import brand_underline from "assets/image/brand_underline.png";

export interface BrandIntroduce {
  id: number;
  image: string;
  title: string;
  content: string;
}

export default function Brand() {
  const data = [
    {
      id: 1,
      image: "brand1.png",
      title: "Hình ảnh",
      content:
        "Chiến dịch bắt đầu từ năm 2006 với mục đích kích thích chăn nuôi bò sữa ở Hokkaido, mở rộng tiêu thụ sữa và các sản phẩm từ sữa của Hokkaido. Chăn nuôi bò sữa là một ngành công nghiệp cốt lõi quan trọng tồn tại ở tất cả các vùng của Hokkaido và nó giúp hình thành từng cộng đồng địa phương ở Hokkaido.",
    },
    {
      id: 2,
      image: "brand2.png",
      title: "Phát triển",
      content:
        "Chăn nuôi bò sữa Hokkaido chiếm hơn 50% sản lượng sữa nguyên liệu ở Nhật Bản, tại đây luôn cung cấp ổn định sữa và các sản phẩm từ sữa của Nhật Bản, khiến đây trở thành ngành công nghiệp quan trọng của Nhật Bản. Bởi sữa Hokkaido luôn duy trì chất lượng đẳng cấp thế giới, đảm bảo an toàn thực phẩm. Hokkaido sẽ tiếp tục hoàn thiện và phát triển để cho ra những hộp sữa chất lượng.",
    },
    {
      id: 3,
      image: "brand3.png",
      title: "Chăn nuôi bò tại Hokkaido",
      content:
        "Đàn bò tại Hokkaido được chăm nuôi cẩn thận, được tắm rửa và tiêm phòng cẩn thận. Chăn thả tại đồng cỏ tự nhiên, không sử dụng kháng sinh hay hoocmon tăng trưởng nên đảm bảo nguồn sữa tươi 100%, an toàn. Hokkaido vẫn đang và luôn nỗ lực hàng ngày để mang đến dòng sản phẩm chất lượng cho mẹ, bé và cả gia đình.",
    },
    {
      id: 4,
      image: "brand4.png",
      title: "Công nghệ sát khuẩn trong vòng 2s",
      content:
        "Đặc biệt với công nghệ sát khuẩn sữa cực nhanh trong vòng 2s nên sữa Hokkaido vẫn giữ nguyên được các vi khuẩn có lợi cho hệ miễn dịch cho bé. Sữa tươi nội địa Nhật 100% bổ sung canxi, protein, chất béo cho bé giúp bé phát triển toàn diện và năng động ngày dài",
    }
  ];

  const dataItem = [
    {
      id: 1,
      image: "brand5.png",
      title: "Kiểm tra thành phần",
      content: "Đạt chứng nhận FSSC22000"
    },
    {
      id: 2,
      image: "brand6.png",
      title: "Xét nghiệm vi sinh",
      content: "Đạt chứng nhận FSSC22000"
    },
    {
      id: 3,
      image: "brand7.png",
      title: "Kiểm tra tổng số vi khuẩn sữa tươi",
      content: "Đạt chứng nhận FSSC22000"
    },
    {
      id: 4,
      image: "brand8.png",
      title: "Hệ thống thông minh",
      content: "Đạt chứng nhận FSSC22000"
    },
    {
      id: 5,
      image: "brand9.png",
      title: "Quét sữa",
      content: "Đạt chứng nhận FSSC22000"
    },
    {
      id: 6,
      image: "brand10.png",
      title: "Kiểm tra tài sản vật chất",
      content: "Đạt chứng nhận FSSC22000"
    }
  ]


  const renderBrandContent = () => {
    return data.map((item, index) => {
      return (
        <div
          className={`
          flex 
          mb-[6px]
          sm:mb-4
          md:mb-8
          lg:mb-10
          xl:mb-[50px]`}
          style={{ flexDirection: index % 2 ? "row-reverse" : "row" }}
          key={item.id}
        >
          <div
            className="w-1/2 itemLeftRespon flex"
            style={{ justifyContent: index % 2 ? "end" : "" }}
          >
            <img
              className={`tagImgBrandRespon`}
              src={require(`assets/image/${item.image}`)}
              alt="brand1"
            />
          </div>

          <div className="w-1/2 flex items-center itemRightRespon">
            <div className="">
              <h1
                className={`
                text-base 
                sm:text-2xl 
                text-center 
                font-medium
                leading-[28.13px]`}
              >
                {item.title}
              </h1>

              <img
                className={`
                mx-auto
                w-9
                h-3
                sm:w-auto
                sm:h-auto
                `}
                src={brand_underline}
                alt="brand_underline"
              />
              <p
                className={`
                test
                text-center 
                text-[10px]
                font-light
                leading-[11.72px]
                sm:leading-[23.44px]
                sm:text-sm
                md:text-base
                lg:text-xl`}
                style={{
                  paddingLeft: index % 2 ? "" : "10px",
                  paddingRight: index % 2 ? "10px" : "",
                }}
              >
                {item.content}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };


  const renderBrandItems = () => {
    return dataItem.map((item, index) => {
      return (
        <div className="text-center" key={item.id}>
          <img className="w-full" src={require(`assets/image/${item.image}`)} alt={item.image} />
          <h1 className={`
              font-medium

              mt-2.5
              md:mt-9

              text-xs
              sm:text-xl

              leading-[14.06px]
              sm:leading-[23.44px]
          `}>{item.title}</h1>
          <p className={`
            font-light

            mt-2.5
            md:mt-7

            mb-2.b
            md:mb-10
            
            text-xs   
            sm:text-base
          `}>{item.content}</p>
        </div>
      )
    })
  }



  return (
    <>
      <Banner
        title={<span style={{ color: "white" }}>Lịch sử hình thành</span>}
        background={banner1}
      />

      <div
        className={`
            container 
            pt-7
            sm:pt-12
            md:pt-16
            lg:pt-20
            xl:pt-[104px]`}
      >
        {renderBrandContent()}

        <div className={`
              w-11/12
              sm:w-3/5
              xl:w-1/2
              flex
              items-center
              justify-center
              mt-[56px]
              sm:mt-16
              md:mt-20
              lg:mt-[134px]

              mb-8
              sm:mb-9
              md:mb-10
              lg:mb-11
              xl:mb-[52px]

              mx-auto
              `}>
          <div className="">
            <h1
              className={`
                text-2xl 
                md:text-[32px]
                text-center 
                font-medium
                leading-[28.13px]
                sm:leading-[37.5px]`}
            >
              Chúng tôi cam kết sữa tươi <br /> 100%
            </h1>
            <img
              className={`
                mx-auto
                w-9
                h-3
                sm:w-auto
                sm:h-auto
                `}
              src={brand_underline}
              alt="brand_underline"
            />
            <p
              className={`
                px-1
                md:px-4
                text-center 
                font-light

                leading-[18.75px]
                sm:leading-[23.44px]

                text-base
                md:text-lg
                lg:text-xl`}
            >
              Tại Hokkaido Hidaka Dairy Products, các nhân viên tận tâm kiểm tra
              các thành phần của sữa nguyên liệu được giao từ nông dân chăn nuôi
              bò sữa, tiến hành phân tích chất lượng trong quá trình thương mại
              hóa và thực hiện kiểm soát chất lượng tổng thể đối với thành phẩm.
            </p>
          </div>
        </div>

        <div className={`
              grid 
              grid-cols-2 
              lg:grid-cols-3 
              gap-x-5
              gap-y-3.5
              md:gap-y-14
        `}>
          {renderBrandItems()}

        </div>
        <hr className="hidden w-full mt-28 md:block" style={{ color: "#777171", border: "1px solid" }} />
      </div>
    </>
  );
}
