import { NewsS } from "@/Types/News.type";
import { http, httpGuard } from "@/lib/utils"

const Models = {
    list: 'news/pagination',
    summary: 'news/summary',
    create: "news",
    update: "news",
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

export const addNews = (body: any) => {
    return httpGuard.post<any>(`${Models.create}`, body)
}

export const getDetailNews = (id: number | string) => http.get<any>(`${Models.create}/${id}`)

export const removeNews = (id: string | number) => {
    return httpGuard.delete<any>(`${Models.create}/${id}`)
}

export const updateNews = (id: string | number, body: any) => {
    return httpGuard.patch<any>(`${Models.update}/${id}`, body)
}
