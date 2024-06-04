import { useQuery } from "react-query";
import { getNews } from "@/Apis/News/News.api";
import { Link } from "react-router-dom";
import { HPagination } from "../Pagination";
import { useState } from "react";

const SkeletonNew = () => {
  return <></>
}

export default function New(props: any) {
  const [page, setPage] = useState(1);

  const { isLoading, data }: any = useQuery({
    queryKey: ['news', page],
    queryFn: () => {
      const controller = new AbortController();

      setTimeout(() => {
        controller.abort()
      }, 5000);

      return getNews(page, 9, "", controller.signal);
    },
    keepPreviousData: true,
    retry: 0
  });

  const news = data?.data?.content;
  const totalNews = data?.data?.total

  const mainNews = (content: any) => {
    return <Link to={`/media/${content.tin_tuc_id}`} className="flex flex-col items-start md:items-center">
      <img
        className="w-full h-[200px] object-cover md:h-[300px]"
        src={content.hinh_anh[0]}
        alt=""
      />

      <h1 className="text-sm md:text-lg font-medium text-left md:text-center mt-4">
        {content.tieu_de}
      </h1>

      <span className="block text-left md:text-center text-xs md:text-[16px] text-gray-500 mt-2 mb-2">
        {content.mo_ta}
      </span>

      <button className="text-xs md:text-base border-b-2 border-black transition-transform transform hover:scale-105">
        Xem thêm
      </button>
    </Link>
  }

  const otherNews = (content: any) => {
    return <Link
      to={`/media/${content.tin_tuc_id}`}
      className="flex flex-col md:flex-row md:space-x-4"
    >
      <img
        className="min-w-[180px] object-cover h-[200px] md:min-w-[220px] md:h-[150px]"
        src={content.hinh_anh[0]}
        alt={content.hinh_anh[0]}
      />

      <div className="flex flex-col items-start justify-between">
        <div>
          <h1 className="text-sm font-medium mt-4 md:mt-0">
            {content.tieu_de}
          </h1>

          <span className="block text-gray-500 text-xs mt-2 mb-2 md:mb-0">
            {content.mo_ta}
          </span>
        </div>

        <button className="text-xs md:text-base border-b-2 border-black transition-transform transform hover:scale-105 mb-4 md:mb-0">
          Xem thêm
        </button>
      </div>
    </Link>
  }

  return (
    <div className="grid grid-cols-1 mx-[25px] md:mx-[130px] mt-8">
      {
        isLoading ? <SkeletonNew /> : <>
          <div className={`
          grid
          grid-cols-1
          xl:grid-cols-2
          grid-rows-${Math.round(news.length / 2)}
          gap-5
          mx-5
          md:mx-0
        `}
          >
            {news.map((content: any, idx: any) => {
              return <>
                {idx === 0 ? <div className="row-span-2" key={idx}>
                  {mainNews(content)}
                </div> : <div key={idx}>
                  {otherNews(content)}</div>}
              </>
            })}
          </div>

          <div className="mt-8">
            <HPagination
              total={totalNews || 0}
              pageSize={9}
              current={page}
              onChangePage={(page: number) => {
                setPage(page)
              }}
            />
          </div>

        </>
      }
    </div>
  );
}
