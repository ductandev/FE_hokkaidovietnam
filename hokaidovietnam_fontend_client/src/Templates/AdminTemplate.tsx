import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import HeaderAdmin from '@/Components/HeaderAdmin';
import SidebarAdmin from '@/Components/SideBarAdmin';
import { useAuth } from '@/Auth/AuthProvider';


const SIDEBAR_WITDH = `230px`;
const HEADER_HEIGHT = `120px`;

const AdminTemplate: React.FC = (): JSX.Element => {
    const { isLogin } = useAuth();

    // TODO: If user haven't login and not admin (do later) before, redirect to homepage "/"
    if (!isLogin) {
        return <Navigate to="/" />;
    }

    const isDesktop = {
        width: `calc(100vw - ${SIDEBAR_WITDH})`,
        maxHeight: `calc(100vh - ${HEADER_HEIGHT})`,
        marginLeft: `${SIDEBAR_WITDH}`,
        padding: 24
    };

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