import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useCartStorage } from '@/Hooks/useCartStorage'
import { useDispatch } from 'react-redux'
import { useQuery } from 'react-query'

import Header from '@/Components/Header'
import Footer from '@/Components/Footer'

import { actions } from '@/Redux/actions/cart.action'
import { actions as userActions } from '@/Redux/actions/user.action'
import { useAuth } from '@/Auth/AuthProvider'
import { getCartByUser } from '@/Apis/Cart/Cart.api'
import { getInfo } from '@/Apis/Auth/Auth.api'

const HomeTemplate: React.FC = (): JSX.Element => {
    const { getCartStorage } = useCartStorage();
    const { isLogin } = useAuth();
    const dispatch: any = useDispatch();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })

    const { isLoading, data }: any = useQuery({
        queryKey: ['cart'],
        queryFn: () => {
            const controller = new AbortController();

            setTimeout(() => {
                controller.abort()
            }, 5000);

            return getCartByUser(controller.signal)
        },
        keepPreviousData: false,
        retry: 0,
        enabled: Boolean(isLogin)
    });

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


    // * Should be set All default state in here such as: cart, token and something like trigger function in App 
    useEffect(() => {
        let currentCart = [];

        if (!isLogin) {
            // ! logic for local cart
            currentCart = getCartStorage() || [];
        } else {
            if (!isLoading) {
                // ! logic for api cart
                currentCart = data?.data?.content;
            };
        }

        dispatch(actions.setCart(currentCart))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

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
        <>
            {!isLoading && <>
                <Header />

                <div className='bg-white'>
                    <Outlet />
                </div>

                <Footer />
            </>}

        </>
    )
}

export default HomeTemplate;