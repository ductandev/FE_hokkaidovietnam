import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'

import HeaderAdmin from '@/Components/HeaderAdmin';
import { actions as userActions } from '@/Redux/actions/user.action'
import SidebarAdmin from '@/Components/SideBarAdmin';
import { useAuth } from '@/Auth/AuthProvider';
import { getInfo } from '@/Apis/Auth/Auth.api'

const SIDEBAR_WITDH = `230px`;

const AdminTemplate: React.FC = (): JSX.Element => {
    const { isLogin, isAdmin } = useAuth();
    console.log(typeof (isLogin));
    const dispatch: any = useDispatch();

    // TODO: If user haven't login and not admin (do later) before, redirect to homepage "/"
    if (!isLogin || !isAdmin) {
        return <Navigate to="/" />;
    }

    const isDesktop = {
        width: `calc(100vw - ${SIDEBAR_WITDH})`,
        marginLeft: `${SIDEBAR_WITDH}`,
        padding: 24
    };


    const { isLoading: isLoadingUser, data: dataUser }: any = useQuery({
        queryKey: ['user'],
        queryFn: () => {
            const controller = new AbortController();

            setTimeout(() => {
                controller.abort()
            }, 5000);

            return getInfo(controller.signal)
        },
        keepPreviousData: false,
        retry: 0,
        enabled: Boolean(isLogin)
    });

    // * Viết login lấy thông tin user qua token tại đây
    useEffect(() => {
        if (isLogin) {
            if (!isLoadingUser) {
                // ! logic for api user
                let currentUser = dataUser?.data?.content;

                dispatch(userActions.setUser(currentUser))
            };
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoadingUser, isLogin]);


    return (
        <div className='relative'>
            <HeaderAdmin />

            <SidebarAdmin />

            <div style={{
                ...isDesktop
            }}>
                <Outlet />
            </div>

        </div>
    )
}

export default AdminTemplate;