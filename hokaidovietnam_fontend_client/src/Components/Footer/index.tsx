import Background from '@/assets/image/banner.png';
import logo from "@/assets/image/logo.png";
import { Link } from 'react-router-dom';

function Footer() {
    const linkMapping: any = {
        introduce: [
            {
                label: "Câu chuyện thương hiệu",
                link: "/"
            },
            {
                label: "Danh mục",
                link: "/"
            },
            {
                label: "Sản phẩm",
                link: "/"
            },
            {
                label: "Cẩm nang",
                link: "/"
            },
            {
                label: "Liên hệ",
                link: "/"
            }
        ],
        support: [
            {
                label: "Điều khoản sử dụng",
                link: "/"
            },
            {
                label: "Hướng dẫn mua hàng",
                link: "/"
            },
            {
                label: "hình thức thanh toán",
                link: "/"
            },
            {
                label: "chính sách vận chuyển",
                link: "/"
            },
            {
                label: "chính sách đổi trả",
                link: "/"
            },
            {
                label: "chính sách bảo mật",
                link: "/"
            }
        ]
    }

    const headText = (text: string, customClass: string) => {
        return <h2 className={`uppercase text-2xl font-medium ${customClass}`}>{text}</h2>
    }

    const linkText = (type: string, customClass?: string) => {
        return <div className="flex flex-col">
            {linkMapping[type].map((item: any, id: any) => {
                return <Link className={`mb-3 text-secondary text-base ${customClass}`} to={item.link} key={id}>{item.label}</Link>
            })}
        </div>
    };

    return (
        <div
            style={{
                backgroundImage: `url(${Background})`,
                backgroundSize: 'cover'
            }}
            className='w-screen'
        >
            <div className='grid grid-cols-4 container py-14'>
                <div className='col-span-2'>
                    <img src={logo} alt="logo_hokaido" className="header-logo" />

                    {headText("Địa chỉ liên hệ", "mb-7 normal-case")}

                    <p className='mb-7'><span>Chi nhánh Hà Nội:</span> <span className='text-secondary'>Tầng 26, Toà Tây, 54 Liễu Giai, Ba Đình, Hà Nội</span></p>

                    <p><span>Chi nhánh TP HCM:</span> <span className='text-secondary'>20 đường số 2, Tân Phú, Quận 7</span></p>
                </div>

                <div>
                    {headText("Giới thiệu", 'mb-10')}

                    {linkText("introduce")}
                </div>

                <div>
                    {headText("Hỗ trợ khách hàng", 'mb-10')}

                    {linkText("support", "capitalize")}
                </div>
            </div>
        </div>
    )
}

export default Footer