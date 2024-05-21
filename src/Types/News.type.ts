export interface News {
    hinh_anh: string
    tieu_de: string
    mo_ta: string
    noi_dung: string
    bai_viet_lien_quan: Array<any>
}

export interface CreateNews extends News { }

export type NewsS = Array<News>