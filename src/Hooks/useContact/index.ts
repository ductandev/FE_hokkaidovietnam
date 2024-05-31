import { useMutation, useQuery, useQueryClient } from "react-query";

// * Custom Apis
import {
    editStatusContact,
    getContacts,
    removeContact
} from "@/Apis/Contact/Contact.api";

import { toast } from "react-toastify";

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

export const useContact = ({ page, search, pageSize }: any) => {
    const queryClient = useQueryClient();

    const removeContactMutation = useMutation({
        mutationFn: (id: number | string) => removeContact(id),
        onSuccess: (_, id) => {
            const key = ['contact', `${page}_${search}_${pageSize}`];

            toast.success(`Xóa thành công liên hệ với id là ${id}`);
            queryClient.invalidateQueries({ queryKey: key, exact: true })
        }
    });

    const editStatusMutate = useMutation({
        mutationFn: (body: any) => editStatusContact(body.id, {
            trang_thai_lien_he_id: body.status
        }),
        onSuccess: (data) => {
            const key = ['contact', `${page}_${search}_${pageSize}`];
            const id = data?.data?.content?.lien_he_id;
            const newData = data?.data?.content;

            let existingContacts: any = queryClient.getQueryData(key);

            const updatedContacts = existingContacts?.data?.content?.map((item: any) => {
                if (+item.lien_he_id === +id) {
                    return {
                        ...item,
                        TrangThaiLienHe: {
                            ...item.TrangThaiLienHe,
                            trang_thai_lien_he_id: newData.trang_thai_lien_he_id
                        }
                    };
                } else {
                    return item;
                }
            });

            existingContacts = {
                ...existingContacts,
                data: {
                    ...existingContacts.data,
                    content: updatedContacts
                }
            };

            queryClient.setQueryData(key, existingContacts);

            toast.success("Chỉnh sửa trạng thái thành công");
        }
    });

    // * Xoá liên hệ
    const remove = (id: string | number) => {
        removeContactMutation.mutate(id)
    };

    // * Sửa trạng thái liên hệ
    const editStatus = (payload: any) => {
        editStatusMutate.mutateAsync(payload)
    }


    return { remove, editStatus }
}