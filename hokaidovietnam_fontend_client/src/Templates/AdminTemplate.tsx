import React from 'react'
import { Outlet } from 'react-router-dom'

import HeaderAdmin from '@/Components/HeaderAdmin';
import SidebarAdmin from '@/Components/SideBarAdmin';


const SIDEBAR_WITDH = `230px`;
const HEADER_HEIGHT = `120px`;

const AdminTemplate: React.FC = (): JSX.Element => {
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