import { useDeferredValue } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import ArticleSkeleton from './skeleton';

import { getDetailNews } from '@/Apis/News/News.api';

import "./styles.scss"

function DetailMedia() {
    const { id }: any = useParams();

    const { isLoading, data }: any = useQuery({
        queryKey: ['media', `${id}`],
        queryFn: () => {
            return getDetailNews(id)
        },
        keepPreviousData: true,
        retry: 0,
        enabled: Boolean(id)
    });

    const content = useDeferredValue(data?.data?.content.noi_dung);
    const header = useDeferredValue(data?.data?.content.tieu_de);
    const summary = useDeferredValue(data?.data?.content.mo_ta);
    const inv = useDeferredValue(data?.data?.content.hinh_anh[0]);

    return (
        <>
            {
                isLoading ? <ArticleSkeleton /> :
                    <>
                        <img src={inv} alt={inv} className='the-article-inv' />

                        <div className='md-container'>

                            <h1 className='the-article-title'>
                                {header}
                            </h1>

                            <p className='the-article-summary'>
                                {summary}
                            </p>

                            <div
                                dangerouslySetInnerHTML={{ __html: content }}
                                className='md-template-editor'
                            />
                        </div>
                    </>
            }
        </>
    )
}

export default DetailMedia