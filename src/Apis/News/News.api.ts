import { NewsS } from "@/Types/News.type";
import { httpGuard } from "@/lib/utils"

const Models = {
    list: 'news/pagination',
    summary: 'news/summary',
};

export const getNews = (
    page: number | string,
    limit: number | string,
    search: string,
    signal?: AbortSignal) =>
    httpGuard.get<NewsS>(`${Models.list}`, {
        params: {
            page,
            limit,
            ...(search && { search: search })
        },
        signal
    });

export const getNewsSummary = (
    signal?: AbortSignal) =>
    httpGuard.get(`${Models.summary}`, {
        signal
    });

