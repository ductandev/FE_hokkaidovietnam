'use client'
import React from 'react'
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";





export default function NavIcon() {
    return (
        <div className="">
            <div className='flex flex-row items-center justify-between text-[25px] sm:text-[30px] gap-3'>
                <div><IoSearch className='hover:text-red-500 mr-4 icon-large' /></div>
                <div><FaRegUser className='hover:text-red-500 mr-4 icon-large' /></div>
                <div><MdOutlineShoppingCart className='hover:text-red-500 icon-large' /></div>
            </div>
        </div>
    )
}