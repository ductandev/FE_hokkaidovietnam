'use client'
import React from 'react'
import Logo from './Logo'
import Menu from './Menu'
import NavIcon from './NavIcon'
import logo from '../../../assets/image/logo.png'


type Props = {}

export default function Navbar({ }: Props) {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='border-b-[1px]'>
        <div className="container mx-auto">
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0 h-[50px] sm:h-[100px]">
            <Menu />

            <div className='md:mr-[-110px] lg:mr-[200px] xl:mr-[270px] 2xl:mr-[420px]'>
              <Logo />
            </div>

            <NavIcon />
          </div>
          <div className='bg-slate-400'>
            <Logo />
          </div>
        </div>
      </div>
    </div>
  )
}