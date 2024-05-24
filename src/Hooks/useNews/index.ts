import { useQuery } from "react-query";

// * Custom Apis
import { getNews, getNewsSummary } from "@/Apis/News/News.api";

type TypeListNews = {
    page: string | number;
    pageSize: string | number;
    search: string;
}
const DEFAULT_PAGE_SIZE = 10;

export const useNewsList = ({ page, pageSize = DEFAULT_PAGE_SIZE, search = "" }: TypeListNews) => {

    const { isLoading, data }: any = useQuery({
        queryKey: ['news', `${page}_${search}_${pageSize}`],
        queryFn: () => {
            const controller = new AbortController();

            setTimeout(() => {
                controller.abort()
            }, 5000);

            return getNews(page, pageSize, search, controller.signal)
        },
        keepPreviousData: true,
        retry: 0
    });

    return { isLoading, data: data?.data }
}

export const useNewsSummary = () => {
    const { isLoading, data }: any = useQuery({
        queryKey: ['news_summary'],
        queryFn: () => {
            const controller = new AbortController();

            setTimeout(() => {
                controller.abort()
            }, 5000);

            return getNewsSummary(controller.signal)
        },
        keepPreviousData: true,
        retry: 0
    });

    return { isLoading, data: data?.data }
}


export const useNews = () => {
    const editNews = () => { } // * Sửa đơn hàng
    const deleteNews = () => { } // * Xoá đơn hàng
    const addNews = () => { } // * Thêm đơn hàng

    return { editNews, deleteNews, addNews }
}