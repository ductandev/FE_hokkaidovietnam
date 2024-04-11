import React from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../Components/Header/Header'

const HomeTemplate: React.FC = (): JSX.Element => {
    return (
        <>
            <Header />

            <Outlet />

            <footer className='bg-black text-white text-center p-3'>
                Footer
            </footer>
        </>
    )
}

export default HomeTemplate;