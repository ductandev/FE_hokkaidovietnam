import React from 'react'
import Navbar from './Navbar/Navbar'
import ToasterProvider from '../../Providers/ToasterProvider'
// import LoginModal from '../Modals/LoginModal'
// import RegisterModal from '../Modals/RegisterModal'

type Props = {}

export default function Header({ }: Props) {
    return (
        <div>
            <ToasterProvider />
            {/* <LoginModal />
            <RegisterModal /> */}
            <Navbar />
        </div>
    )
}