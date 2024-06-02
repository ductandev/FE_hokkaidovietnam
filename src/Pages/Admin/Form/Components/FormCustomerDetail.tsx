import { useAddress } from '@/Hooks/useAddress/useAddress';
import { useQuery } from 'react-query';

import { Label } from '@/Components/ui/label';
import { Badge } from '@/Components/ui/badge';
import { Skeleton } from '@/Components/ui/skeleton';
import { STATUS_ORDER } from '@/Components/DataGrid/columns';
import { ScrollArea } from '@/Components/ui/scroll-area';

import { badgeTagStatusTransform, formatCurrency, formatTime } from '@/Helper/helper';

import { getCustomerDetail } from '@/Apis/Customer/Customer.api';
import { Link } from 'react-router-dom';

export function FormCustomerDetail(props: any) {
    const { id } = props;
    const { buildAddressFromId } = useAddress();

    const { isLoading, data }: any = useQuery({
        queryKey: ['customer_detail', id],
        queryFn: () => {
            const controller = new AbortController();

            setTimeout(() => {
                controller.abort();
            }, 5000);
            return getCustomerDetail(id);
        },
        keepPreviousData: true,
        retry: 0
    });

    const SkeletonTemplate = () => {
        return <div>
            <Skeleton className="h-4 w-full" />
        </div>;
    };

    const customer: any = data?.data?.content || {};

    const orders = customer?.DonHang?.map(((product: any) => {
        return {
            ...product,
            so_luong: product.so_luong,
            gia_ban: product.don_gia
        };
    })) || [];

    return (
        <div className='mx-3 my-2'>
            <h4>Thông tin chi tiết khách hàng</h4>

            {isLoading ? SkeletonTemplate() :
                <div className='my-4'>
                    <div className='grid grid-cols-2 mb-2'>
                        <div>
                            <Label>Quyền</Label>

                            <div>
                                <p>{customer.vai_tro_id}</p>


                            </div>
                        </div>

                        <div>
                            <Label>Email</Label>
                            <p>{customer.email}</p>

                            {/* <p>{formatTime(order.thoi_gian_dat_hang, "dd/mm/yyyy hh:mm")}</p> */}
                        </div>

                    </div>

                    <div className='grid grid-cols-2 mb-2'>
                        <div>
                            <Label>Họ tên</Label>
                            <p>{customer.ho_ten}</p>

                        </div>

                        <div>
                            <Label>Số điện thoại</Label>
                            <p>{customer.so_dien_thoai}</p>
                        </div>
                    </div>

                    <div className='grid grid-cols-2'>
                        <div>
                            <Label>Giới tính</Label>
                            <p>{customer.gioi_tinh}</p>
                        </div>

                    </div>

                    <div>
                        <Label>Địa chỉ đầy đủ</Label>

                        <p>{buildAddressFromId({
                            dia_chi: customer.dia_chi,
                            phuong_id: customer.phuong_id,
                            quan_id: customer.quan_id,
                            tinh_thanh_id: customer.tinh_thanh_id,
                        })}</p>
                    </div>

                    <h4 className='my-4 font-semibold'>Đơn đã mua ({orders.length} đơn)</h4>

                    <div className='my-4'>
                        {orders?.map((product: any, idx: any) => {
                            return <div key={idx} className='grid my-3 flex items-center grid-cols-2'>
                                <div className="flex flex-col justify-center ">
                                    <Link target="_blank" rel="noopener noreferrer" to={`/admin/order/${product.don_hang_id}`} className='mr-4 text-blue-600'>
                                        Mã đơn hàng #{product.don_hang_id}
                                    </Link>

                                    <div className='flex'>
                                        <p className='mr-4'>{formatCurrency(product.tong_tien)}</p>

                                        <p>
                                            {<Badge
                                                variant={badgeTagStatusTransform(product.trang_thai_don_hang_id, 'trang_thai_don_hang_id')}>
                                                {STATUS_ORDER?.find((y: any) => y.value === product?.trang_thai_don_hang_id)?.label || ""}</Badge>}
                                        </p>
                                    </div>
                                </div>

                                <div className="col-span-1 flex justify-end">
                                    <span >{formatTime(product.thoi_gian_dat_hang, "dd/mm/yyyy hh:mm")}</span>

                                </div>
                            </div>;
                        })}
                    </div>
                </div>}
        </div>
    );
}
