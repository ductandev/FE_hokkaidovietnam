import React from 'react'
import Header from '../Components/Header/Header'
import { Outlet } from 'react-router-dom'

type Props = {}

const HomeTemplate: React.FC = ({ }: Props): JSX.Element => {
    return (
        <>
            {/* <ResponsiveItem component={Header} largeTableComponent={HeaderMobile} /> */}
            <Header />
            <div className="content-layout pt-20 bg-white" style={{ minHeight: "80vh" }}>
                <Outlet></Outlet>
            </div>
            {/* <Footer/> */}
            <footer className='bg-black text-white text-center p-3'>
                Footer
            </footer>
        </>
    )
}

export default HomeTemplate;