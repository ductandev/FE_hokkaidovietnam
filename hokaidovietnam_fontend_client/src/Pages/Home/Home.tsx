import React from 'react'
import img from '../../assets/image/slider01.png'


type Props = {}

export default function Home({ }: Props) {
    return (
        <div className="container mx-auto m-0">
            <img className='w-full' src={img} alt="..." />
        </div>
    )
}