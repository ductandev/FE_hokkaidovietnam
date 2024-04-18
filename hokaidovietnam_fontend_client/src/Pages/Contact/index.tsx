import Banner from "@/Components/Banner";
import { CiLocationOn } from "react-icons/ci";
import { LiaPhoneSolid } from "react-icons/lia";
import { GoMail } from "react-icons/go";

export default function Contact() {
    return (
        <>
            <Banner title={"Liên hệ với Hokkaido Việt Nam"} />

            <div
                className={`
            container 
            pt-7
            sm:pt-10
            md:pt-12
            lg:pt-14
            xl:pt-[67px]`}
            >
                <div
                    className={`
                mt-[30px]
                grid
                grid-cols-1
                md:grid-cols-2`}
                >
                    <div>
                        <div
                            className={`
                            text-base
                            font-normal
                            leading-6
                            `}
                        >
                            <div className="flex items-center mb-5">
                                <CiLocationOn className="w-9 h-9 mr-[30px]" />
                                <p>Tầng 26, Toà Tây, 54 Liễu Giai, Ba Đình, Hà Nội</p>
                            </div>
                            <div className="flex items-center mb-5">
                                <LiaPhoneSolid className="w-9 h-9 mr-[30px]" />
                                <p>0904 229 229</p>
                            </div>
                            <div className="flex items-center mb-9">
                                <GoMail className="w-9 h-9 mr-[30px]" />
                                <p>milkhokkaido.vn@gmail.com</p>
                            </div>
                        </div>
                        <hr className="border-none h-[1px] bg-[#929292]" />
                        <div>
                            <h1 className="text-[32px] font-semibold mt-[43px] mb-[58px]">Liên hệ với chúng tôi</h1>
                            <form action="">
                                <input className="indent-5 h-9 w-full mb-5" type="text" placeholder="Họ và tên" style={{ border: "0.5px solid #777171" }} />
                                <input className="indent-5 h-9 w-full mb-5" type="text" placeholder="Email" style={{ border: "0.5px solid #777171" }} />
                                <textarea className="indent-5 pb-[104px] w-full mb-5 pt-1" placeholder="Nội dung" style={{ border: "0.5px solid #777171" }}></textarea>
                                <button className="px-[22px] py-[10px] bg-[#1E1E1E] text-white">Gửi liên hệ</button>
                            </form>
                        </div>
                    </div>
                    <div className="ps-24">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.8284481385326!2d105.81036787501266!3d21.03188278767181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abef403b34df%3A0xb06a133e6f623614!2zTG90dGUgQ2VudGVyIEjDoCBO4buZaQ!5e1!3m2!1svi!2s!4v1713451581025!5m2!1svi!2s"
                            width={486}
                            height={491}
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="location"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
