import React from 'react'
import { Outlet } from 'react-router-dom'

import Header from '@/Components/Header'
import Footer from '@/Components/Footer'

const HomeTemplate: React.FC = (): JSX.Element => {
    return (
        <>
            <Header />

            <div className='bg-white'>
                <Outlet />
            </div>

            <Footer />
        </>
    )
}

export default HomeTemplate;