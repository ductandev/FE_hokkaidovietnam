import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import Header from '@/Components/Header'
import Footer from '@/Components/Footer'
import { useCartStorage } from '@/Hooks/useCartStorage'
import { useDispatch } from 'react-redux'
import { actions } from '@/Redux/actions/cart.action'

const HomeTemplate: React.FC = (): JSX.Element => {
    const { getCartStorage } = useCartStorage();
    const dispatch: any = useDispatch();

    // * Should be set All default state in here such as: cart, token and something like trigger function in App 
    useEffect(() => {
        const currentCart = getCartStorage();

        dispatch(actions.setCart(currentCart || []))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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