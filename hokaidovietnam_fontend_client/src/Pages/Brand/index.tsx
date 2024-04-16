import React, { useEffect, useState } from "react";
import Banner from "@/Components/Banner";

import banner1 from "assets/image/banner1.png";
import brand1 from "assets/image/brand1.png";
import banrand_underline from "assets/image/banrand_underline.png";
import Toppics from "@/Components/Toppic/Toppics";
import axios from "axios";

export default function Brand() {
    const [data, setData] = useState([
        {
            id: 1,
            image: 'domo1.jpg',
            title: 'Hình ảnh',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus cupiditate nihil odit velit quas corrupti alias dicta doloribus aut commodi.',

        },
        {
            id: 2,
            image: 'domo1.jpg',
            title: 'Phat trien',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus cupiditate nihil odit velit quas corrupti alias dicta doloribus aut commodi.',

        },
        {
            id: 3,
            image: 'domo1.jpg',
            title: 'Hình ảnh',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus cupiditate nihil odit velit quas corrupti alias dicta doloribus aut commodi.',
        },
        {
            id: 4,
            image: 'domo1.jpg',
            title: 'Hình ảnh',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus cupiditate nihil odit velit quas corrupti alias dicta doloribus aut commodi.',
        },
        {
            id: 5,
            image: 'domo1.jpg',
            title: 'Hình ffbgjgjkgf gblkglkjdh',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus cupiditate nihil odit velit quas corrupti alias dicta doloribus aut commodi.',
        }
    ])

    const getData = async () => {
        await axios({
            method: "GET",
            url: "https://api.bachhoahanhan.com/users/get-tat-ca-san-pham"
        }).then((res) => {
            setData(res.data.content)
            console.log(res.data.content)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        // <div>
        //     <Banner
        //         title={<span style={{ color: "white" }}>Lịch sử hình thành</span>}
        //         background={banner1}
        //     />
        //     <div className="container pt-7 sm:pt-[104px]">
        //         <div className="flex">

        //             <div className="w-1/2">
        //                 <img src={brand1} alt="brand1" />
        //             </div>

        //             <div className="w-1/2 flex flex-col align-middle justify-center">
        //                 <div className="">
        //                     <h1 className="content-base sm:content-2xl content-center font-medium leading-[28.13px]">
        //                         Hình thành
        //                     </h1>
        //                     <img
        //                         className="mx-auto"
        //                         src={banrand_underline}
        //                         alt="banrand_underline"
        //                     />
        //                     <p className="content-center content-[10px] sm:content-xl">
        //                         Chiến dịch bắt đầu từ năm 2006 với mục đích kích thích chăn nuôi
        //                         bò sữa ở Hokkaido, mở rộng tiêu thụ sữa và các sản phẩm từ sữa
        //                         của Hokkaido. Chăn nuôi bò sữa là một ngành công nghiệp cốt lõi
        //                         quan trọng tồn tại ở tất cả các vùng của Hokkaido và nó giúp
        //                         hình thành từng cộng đồng địa phương ở Hokkaido.
        //                     </p>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>


        //     <br />
        //     <br />
        //     <br />
        //     <br />
        //     <br />
        //     <br />
        //     <br />
        //     <br />
        //     <br />
        //     <br />
        //     <br />
        //     <br />
        //     <br />
        //     <br />
        //     <br />
        //     <br />
        //     <br />
        //     <br />
        //     <br />
        //     <br />
        //     <br />
        //     <br />
        //     <br />
        //     <br />
        //     <br />
        //     <br />
        //     <br />
        //     <br />
        // </div>
        data.map((item, index) => {
            if (index > 3) {
                return
            } else {
                return (
                    <Toppics key={index} isTrue={index % 2 ? true : false} item={item} />

                )
            }

        })


    );
}
