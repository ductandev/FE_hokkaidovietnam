import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'

import HeaderAdmin from '@/Components/HeaderAdmin';
import { actions as userActions } from '@/Redux/actions/user.action'
import SidebarAdmin from '@/Components/SideBarAdmin';
import { useAuth } from '@/Auth/AuthProvider';
import { getInfo } from '@/Apis/Auth/Auth.api'

const SIDEBAR_WIDTH = `230px`;

const AdminTemplate: React.FC = (): JSX.Element => {
    const { isLogin, isAdmin } = useAuth();
    const dispatch: any = useDispatch();

    const { isLoading: isLoadingUser, data: dataUser }: any = useQuery({
        queryKey: ['user'],
        queryFn: () => {
            const controller = new AbortController();
            setTimeout(() => {
                controller.abort();
            }, 5000);
            return getInfo(controller.signal);
        },
        keepPreviousData: false,
        retry: 0,
        enabled: Boolean(isLogin)
    });

    useEffect(() => {
        if (isLogin && !isLoadingUser && dataUser) {
            const currentUser = dataUser.data.content;
            dispatch(userActions.setUser(currentUser));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoadingUser, isLogin, dataUser]);

    const isDesktop = {
        width: `calc(100vw - ${SIDEBAR_WIDTH})`,
        marginLeft: `${SIDEBAR_WIDTH}`,
        padding: 24
    };

    // Chuyển hướng đến trang chủ nếu người dùng chưa đăng nhập hoặc không phải là admin
    if (!isLogin || !isAdmin) {
        return <Navigate to="/" />;
    }

    return (
        <div className='relative'>
            <HeaderAdmin />

            <SidebarAdmin />

            <div style={isDesktop}>
                <Outlet />
            </div>
        </div>
    );
}

export default AdminTemplate;
