import { useQuery } from "react-query";

// * Custom Apis
import { getContacts } from "@/Apis/Contact/Contact.api";

const DEFAULT_PAGE_SIZE = 10;

export const useContactList = ({
    page,
    pageSize = DEFAULT_PAGE_SIZE,
    search = ""
}: any) => {
    const { isLoading, data }: any = useQuery({
        queryKey: ['contact', `${page}_${search}_${pageSize}`],
        queryFn: () => {
            const controller = new AbortController();

            setTimeout(() => {
                controller.abort()
            }, 5000);

            return getContacts(page, pageSize, search, controller.signal)
        },
        keepPreviousData: true,
        retry: 0
    });

    return { isLoading, data: data?.data }
}

export const useContact = () => {
    const edit = () => { } // * Sửa 
    const remove = () => { } // * Xoá 
    const add = () => { } // * Thêm 

    return { edit, remove, add }
}