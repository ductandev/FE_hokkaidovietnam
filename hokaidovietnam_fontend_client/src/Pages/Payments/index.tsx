import { PiUserCircleFill } from "react-icons/pi";
import { FaRegTrashAlt } from "react-icons/fa";

import { useFormik } from "formik";
import * as yup from 'yup'

import Input from "@/Components/Input/Input";

export interface UserPaymentFrm {
    email: string;
    name: string;
    phone: string;
    address: string;
    province: string;
    notePayment: string;
}


export interface Product {
    id: number;
    image: string;
    title: string;
    price: number;
    quantity: number;
}


const arrData = [
    {
        id: 1,
        image: "sp4.png",
        title: "Sữa tươi nguyên chất 200ml",
        price: 500,
        quantity: 2,
    },
    {
        id: 2,
        image: "sp5.png",
        title: "Sữa tươi vị dâu 200ml",
        price: 500,
        quantity: 1,
    },
    {
        id: 3,
        image: "sp6.png",
        title: "Sữa tươi vị socola 200ml",
        price: 500,
        quantity: 1,
    },
];

export default function Payments() {
    // const dispatch: DispatchType = useDispatch();

    const paymentFrm = useFormik<UserPaymentFrm>({
        initialValues: {
            email: '',
            name: '',
            phone: '',
            address: '',
            province: '',
            notePayment: '',
        },
        validationSchema: yup.object().shape({
            name: yup
                .string()
                .required("Họ và tên không được bỏ trống!")
                .matches(/^[a-z A-Z\s áàảạãăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệiíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ ÁÀẢẠÃĂẮẰẲẴẶÂẤẦẨẪẬÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴĐ]+$/, "Tên chỉ được chứa chữ cái."),
            email: yup
                .string()
                .required("Email không được bỏ trống!")
                .email("Email không hợp lệ!"),
            phone: yup
                .string()
                .required("Số điện thoại không được bỏ trống!")
                .matches(/\d$/, "Vui lòng chỉ điền số!")
                .min(10, "Số điện tối thiểu là 10 số!")
                .max(10, "Số điện tối đa là 10 số!"),
            address: yup
                .string()
                .required("Địa chỉ không được bỏ trống!"),
            province: yup
                .string()
                .required("Tỉnh thành không được bỏ trống!"),
            notePayment: yup
                .string()
        }),
        onSubmit: async (values: UserPaymentFrm) => {
            console.log(values);
            // const actionApi = contactAsyncAction(values);
            // dispatch(actionApi);
        }
    })


    const renderData = (): JSX.Element[] => {
        return arrData.map((item: Product, index) => {
            let { id, image, title, price, quantity } = item;

            return (
                <div
                    className={`
                    grid 
                    grid-cols-10
                    h-[100px]
                    lg:h-[150px] 
                    lg:px-11
                    border-b-[#989494] 
                    md:border-b-[1.5px]`}
                    key={id}>

                    <div className="col-span-6 sm:col-span-4 flex flex-row items-center ">
                        <img className="w-[75px] lg:w-[115px] lg:me-11" src={require(`assets/image/${image}`)} alt={image} />
                        <div className="pt-[6px]">
                            <p className="text-xs lg:text-base text-[#777171] mb-[15px] md:mb-5">{title}</p>
                            <p className="text-xs lg:text-base font-semibold">{price}.000đ</p>
                        </div>
                    </div>


                    <div className="col-span-2 flex flex-row justify-center items-center  text-[#929292]">
                        <div className="flex flex-row justify-center items-center md:border border-gray-300">
                            <button
                                className={`
                                border
                                md:border-none
                                rounded-full
                                md:rounded-none
                                w-[15px]
                                h-[15px]
                                leading-[15px]
                                md:w-[30px] 
                                md:h-[30px]
                                lg:w-[42px] 
                                lg:h-[42px]
                                text-xs
                                md:text-xl`}
                            >–</button>
                            <input
                                className={`
                                mx-[5px]
                                md:mx-0
                                border
                                md:border-none
                                rounded-full
                                md:rounded-none
                                w-[15px]
                                h-[15px]
                                md:w-[30px] 
                                md:h-[30px]
                                lg:w-[42px] 
                                lg:h-[42px]
                                text-center
                                text-[10px]
                                text-black
                                md:text-[#929292]
                                md:text-base
                                lg:text-xl`}
                                type="text"
                                value={quantity} />
                            <button
                                className={`
                                border
                                md:border-none
                                rounded-full
                                md:rounded-none
                                w-[15px]
                                h-[15px]
                                leading-[15px]
                                md:w-[30px] 
                                md:h-[30px]
                                lg:w-[42px] 
                                lg:h-[42px]
                                text-xs
                                md:text-xl`}
                            >+</button>
                        </div>
                    </div>

                    <div className={`col-span-2 sm:col-span-4 flex flex-row justify-end items-center gap-4 text-[#777171]`}>
                        <p className="hidden sm:block text-xs lg:text-base">Tổng tiền:
                            <span className="ps-5 text-xs lg:text-base font-semibold text-black">{price}.000đ</span>
                        </p>
                        <p className="lg:ms-[100px] text-xl flex flex-row items-center">
                            <FaRegTrashAlt className="inline me-2" />
                            <span className="hidden md:block text-sm lg:text-xl">Xóa</span>
                        </p>
                    </div>
                </div>
            )
        })
    }


    return (
        <div className={`container mx-aut`}>
            <div className="flex justify-center pt-[17px] sm:pt-[27px]">
                <h1 className={`
            p-[17px]
            text-xl
            sm:text-2xl
            font-bold
            sm:font-medium
            text-center
            sm:border-b-[1.5px]
            sm:border-b-black
        `}>Thanh toán</h1>
            </div>

            <form onSubmit={paymentFrm.handleSubmit}>
                <div className='flex flex-row mt-16'>
                    <div className='w-[45%] pe-[50px]'>
                        <div className="flex flex-row justify-between mb-5">
                            <h1 className='text-2xl leading-6 font-bold'>Thông tin mua hàng</h1>
                            <div>
                                <PiUserCircleFill className="inline w-[18px] h-[18px]" />
                                <span className="ms-[10px]">Đăng nhập</span>
                            </div>
                        </div>


                        <div className="relative">
                            <Input
                                id="email"
                                name='email'
                                placeholder="Email"
                                onInput={paymentFrm.handleChange}
                                onBlur={paymentFrm.handleChange}
                            />
                            {paymentFrm.errors.email && (
                                <p className="text-rose-500 text-[9px] sm:text-sm indent-3 sm:indent-5 absolute bottom-0">{paymentFrm.errors.email}</p>
                            )}
                        </div>
                        <div className="relative">
                            <Input
                                id="name"
                                name='name'
                                placeholder="Họ và tên"
                                onInput={paymentFrm.handleChange}
                                onBlur={paymentFrm.handleChange}
                            />
                            {paymentFrm.errors.name && (
                                <p className="text-rose-500 text-[9px] sm:text-sm indent-3 sm:indent-5 absolute bottom-0">{paymentFrm.errors.name}</p>
                            )}
                        </div>
                        <div className="relative">
                            <div className="flex">
                                <Input
                                    id="phone"
                                    name='phone'
                                    placeholder="Số điện thoại"
                                    onInput={paymentFrm.handleChange}
                                    onBlur={paymentFrm.handleChange}
                                />
                                <p
                                    className={`
                                    flex
                                    items-center
                                    justify-center
                                    font-light
                                    text-[#777171] 
                                    w-12
                                    mb-4 
                                    sm:mb-6 
                                    border 
                                    border-s-0 
                                    border-[#777171] 
                                    h-6 
                                    sm:h-9
                                    
                                    `}>+84</p>
                            </div>
                            {paymentFrm.errors.phone && (
                                <p className="text-rose-500 text-[9px] sm:text-sm indent-3 sm:indent-5 absolute bottom-0">{paymentFrm.errors.phone}</p>
                            )}
                        </div>
                        <div className="relative">
                            <Input
                                id="address"
                                name='address'
                                placeholder="Địa chỉ"
                                onInput={paymentFrm.handleChange}
                                onBlur={paymentFrm.handleChange}
                            />
                            {paymentFrm.errors.address && (
                                <p className="text-rose-500 text-[9px] sm:text-sm indent-3 sm:indent-5 absolute bottom-0">{paymentFrm.errors.address}</p>
                            )}
                        </div>
                        <div className="relative">
                            <Input
                                id="province"
                                name='province'
                                placeholder="Tỉnh thành"
                                onInput={paymentFrm.handleChange}
                                onBlur={paymentFrm.handleChange}
                            />
                            {paymentFrm.errors.province && (
                                <p className="text-rose-500 text-[9px] sm:text-sm indent-3 sm:indent-5 absolute bottom-0">{paymentFrm.errors.province}</p>
                            )}
                        </div>
                        <div className="flex items-center mb-2">
                            <input className="w-[25px] h-[25px] me-3" type="checkbox" name="diffientAddress" id="diffientAddress" value="" />
                            <label className="text-[#777171] font-light leading-6" htmlFor="diffientAddress"> Giao hàng đến địa chỉ khác</label>
                        </div>
                        <textarea
                            id="notePayment"
                            name='notePayment'
                            className={`indent-3 sm:indent-5 h-[69px] sm:h-[104px] w-full mb-5 pt-1 text-[10px] sm:text-base`}
                            placeholder="Ghi chú (tùy chọn)"
                            style={{ border: "0.5px solid #777171" }}
                            onInput={paymentFrm.handleChange}
                            onBlur={paymentFrm.handleChange}
                        ></textarea>

                        <h1 className="text-2xl leading-6 font-bold">Thanh toán</h1>


                        <div className="py-9 border-b-[1px] border-[#777171] ">
                            <div className="flex items-center mb-2">
                                <input className="w-[25px] h-[25px] me-4" type="radio" name="payMethod" id="COD" value="" />
                                <label className="text-[#777171] font-light leading-6" htmlFor="COD">Thanh toán khi nhận hàng(COD)</label>
                            </div>
                            <div className="flex items-center mb-2 mt-5">
                                <input className="w-[25px] h-[25px] me-4" type="radio" name="payMethod" id="CARD" value="" />
                                <label className="text-[#777171] font-light leading-6" htmlFor="CARD">Chuyển khoản qua ngân hàng</label>
                            </div>
                        </div>

                        <div className="flex justify-end leading-6 text-[13px] gap-4 ">
                            <p>Chính sách đổi trả</p>
                            <p>Chính sách bảo mật</p>
                            <p>Điểu khoản sử dụng</p>
                        </div>



                    </div>


                    <div className={`
                        w-[55%] 
                        bg-[#E0E0E0]
                        ps-[46px]
                        pe-[78px]
                        pt-[24px]
                        pb-[52px]
                    `}>

                        <div className="flex justify-start mb-[78px]">
                            <h1 className={`
                            text-xl
                            sm:text-2xl
                            font-bold
                            sm:font-medium
                        `}>Đơn hàng <span className="hidden sm:inline">(4 sản phẩm)</span></h1>
                        </div>

                        {renderData()}







                        <br />
                        <br />
                        <br />
                        <button
                            className={`px-[22px] py-[7px] sm:py-[10px] bg-[#1E1E1E] text-white mb-8 lg:mb-0 text-xs sm:text-base`}
                            disabled={!paymentFrm.isValid}
                            type='submit'
                        >
                            Đặt hàng
                        </button>
                    </div>
                </div>
            </form>
        </div >
    )
}