import { useEffect, useState } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";

export interface PaginationProps {
    /** is show Next Button */
    hasNext?: boolean;
    /** is show Previous Button */
    hasPrevious?: boolean;
    /** is show First Button */
    hasFirst?: boolean;
    /** is show Last Button */
    hasLast?: boolean;
    /** total items */
    total: number;
    /** limit of items in page */
    pageSize: number;
    /** current page is display */
    current: number;
    /** click changed page */
    onChangePage?: Function
}

export function HPagination(
    {
        hasNext = true,
        hasPrevious = true,
        hasFirst = false,
        hasLast = false,
        total = 1,
        pageSize = 5,
        current = 1,
        onChangePage
    }: PaginationProps) {
    const [currentPage, setCurrentPage] = useState<number>(current);
    // const [size, setSize] = useState<number>(pageSize);
    const [pages, setPages] = useState<any>([]);

    const totalPage = Math.ceil(total / pageSize);

    useEffect(() => {
        getPager(currentPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalPage]);

    useEffect(() => {
        setCurrentPage(current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [current]);

    const getPager = (page: number) => {
        let startPage: number;
        let endPage: number;

        if (totalPage <= 5) {
            startPage = 1;
            endPage = totalPage;
        } else {
            if (page <= 1) {
                startPage = 1;
                endPage = 3;
            } else if (page + 3 >= totalPage) {
                startPage = totalPage - 4;
                endPage = totalPage;
            } else {
                if (page === 2) {
                    startPage = page - 1;
                } else {
                    startPage = page - 2;
                }
                endPage = page + 2;
            }
        }

        const renderPage: any = Array(endPage + 1 - startPage);

        const pages = [...renderPage.keys()].map(i => startPage + i);

        setPages(pages);
    };

    const handleChangePage = (e: any, page: number) => {
        e && e.preventDefault();

        if (page < 1 || page > totalPage || page === currentPage) return;

        setCurrentPage(page);
        onChangePage && onChangePage(page, pageSize);

        getPager(page);
    };

    return <>
        <Pagination>
            <PaginationContent className="border-b border-[#D9D9D9] pb-2">
                {currentPage !== 1 && (
                    <>
                        {hasFirst && <PaginationItem>
                            <PaginationLink onClick={e => handleChangePage(e, 1)}>Đầu</PaginationLink>
                        </PaginationItem>}


                        {hasPrevious && <PaginationItem>
                            <PaginationPrevious onClick={e => handleChangePage(e, currentPage - 1)} />
                        </PaginationItem>}
                    </>
                )}

                {pages?.length ? (
                    pages.map((page: number, index: any) => (
                        <PaginationItem key={index}>
                            <PaginationLink
                                onClick={e => handleChangePage(e, page)}
                                className={`${currentPage === page ? 'text-black' : 'text-secondary'}`}
                                isActive={currentPage === page}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))
                ) : (
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                )}

                {currentPage < totalPage && (
                    <>
                        {hasNext && <PaginationItem>
                            <PaginationNext onClick={e => handleChangePage(e, currentPage + 1)} />
                        </PaginationItem>}

                        {hasLast && <PaginationItem>
                            <PaginationLink onClick={e => handleChangePage(e, totalPage)}>Cuối</PaginationLink>
                        </PaginationItem>}
                    </>
                )}
            </PaginationContent>
        </Pagination>
    </>
}