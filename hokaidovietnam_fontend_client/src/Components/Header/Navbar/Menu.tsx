'use client'
import React, { useEffect } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'


type Props = {}

export default function Menu({ }: Props) {

    return (
        <div>
            <nav className=' hidden lg:block'>
                <ul className='flex flex-row items-center gap-4'>
                    <li>
                        <a href="/">TRANG CHỦ</a>
                    </li>
                    <li>
                        <a href="/products">CỬA HÀNG</a>
                    </li>
                    <li>
                        <a href="/brand">THƯƠNG HIỆU</a>
                    </li>
                    <li>
                        <a href="/media">TRUYỀN THÔNG</a>
                    </li>
                    <li>
                        <a href="/contact">LIÊN HỆ</a>
                    </li>
                </ul>
            </nav>

            <div className='lg:hidden'>
                <AiOutlineMenu style={{ fontSize: '20px' }} />
            </div>
        </div>
    )
}