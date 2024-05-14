import Banner from "@/Components/Banner";

import { CiLocationOn } from "react-icons/ci";
import { LiaPhoneSolid } from "react-icons/lia";
import { GoMail } from "react-icons/go";

import { useFormik } from "formik";
import * as yup from "yup";

import { DispatchType } from "../../Redux/configStore";
import { useDispatch } from "react-redux";
import { contactAsyncAction } from "@/Redux/reducers/contactReducer";
import Input from "@/Components/Input/Input";

export interface UserContactFrm {
  ho_ten: string;
  email: string;
  noi_dung: string;
}

export default function Contact() {
  const dispatch: DispatchType = useDispatch();

  const contactFrm = useFormik<UserContactFrm>({
    initialValues: {
      ho_ten: "",
      email: "",
      noi_dung: "",
    },
    validationSchema: yup.object().shape({
      ho_ten: yup
        .string()
        .required("Họ và tên không được bỏ trống!")
        .matches(
          /^[a-z A-Z\s áàảạãăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệiíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ ÁÀẢẠÃĂẮẰẲẴẶÂẤẦẨẪẬÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴĐ]+$/,
          "Tên chỉ được chứa chữ cái."
        ),
      email: yup
        .string()
        .required("Email không được bỏ trống!")
        .email("Email không hợp lệ!"),
      noi_dung: yup.string(),
    }),
    onSubmit: async (values: UserContactFrm) => {
      console.log(values);
      const actionApi = contactAsyncAction(values);
      dispatch(actionApi);
    },
  });

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
            xl:pt-[67px]
            `}
      >
        <div
          className={`
                md:mt-[30px]
                grid
                grid-cols-1
                lg:grid-cols-2`}
        >
          <div>
            <div className={` text-base font-normal leading-6`}>
              <div className={`flex items-center mb-5`}>
                <CiLocationOn
                  className={`w-5 h-5 sm:w-9 sm:h-9 mr-4 sm:mr-[30px]`}
                />
                <p className={`text-xs sm:text-base leading-6`}>
                  Tầng 26, Toà Tây, 54 Liễu Giai, Ba Đình, Hà Nội
                </p>
              </div>
              <div className={`flex items-center mb-5`}>
                <LiaPhoneSolid
                  className={`w-5 h-5 sm:w-9 sm:h-9 mr-4 sm:mr-[30px]`}
                />
                <p className={`text-xs sm:text-base leading-6`}>0904 229 229</p>
              </div>
              <div className={`flex items-center mb-6 sm:mb-9`}>
                <GoMail className={`w-5 h-5 sm:w-9 sm:h-9 mr-4 sm:mr-[30px]`} />
                <p className={`text-xs sm:text-base leading-6`}>
                  milkhokkaido.vn@gmail.com
                </p>
              </div>
            </div>
            <hr className={`border-none h-[1px] bg-[#929292]`} />
            <div>
              <h1
                className={`text-xl sm:text-[32px] font-semibold mt-6 sm:mt-[43px] mb-5 sm:mb-[58px]`}
              >
                Liên hệ với chúng tôi
              </h1>

              <form onSubmit={contactFrm.handleSubmit}>
                <div className="relative">
                  <Input
                    id="ho_ten"
                    name="ho_ten"
                    placeholder="Họ và tên"
                    onInput={contactFrm.handleChange}
                    onBlur={contactFrm.handleChange}
                  />
                  {contactFrm.errors.ho_ten && (
                    <p className="text-rose-500 text-[9px] sm:text-sm indent-3 sm:indent-5 absolute bottom-0">
                      {contactFrm.errors.ho_ten}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    placeholder="Email"
                    onInput={contactFrm.handleChange}
                    onBlur={contactFrm.handleChange}
                  />
                  {contactFrm.errors.email && (
                    <p className="text-rose-500 text-[9px] sm:text-sm indent-3 sm:indent-5 absolute bottom-0">
                      {contactFrm.errors.email}
                    </p>
                  )}
                </div>
                <textarea
                  id="noi_dung"
                  name="noi_dung"
                  className={`indent-3 sm:indent-5 h-[69px] sm:h-[104px] w-full mb-5 pt-1 text-[10px] sm:text-base`}
                  placeholder="Nội dung"
                  style={{ border: "0.5px solid #777171" }}
                  onInput={contactFrm.handleChange}
                  onBlur={contactFrm.handleChange}
                ></textarea>
                <button
                  className={`px-[22px] py-[7px] sm:py-[10px] bg-[#1E1E1E] text-white mb-8 lg:mb-0 text-xs sm:text-base transition-transform transform hover:scale-105`}
                  disabled={!contactFrm.isValid}
                  type="submit"
                >
                  Gửi liên hệ
                </button>
              </form>
            </div>
          </div>

          <div className="ps-0 lg:ps-10 xl:ps-24 mb-10 md:mb-0 items-center">
            <iframe
              className="w-full h-[389px] lg:w-[486px] sm:h-[491px]"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.8284481385326!2d105.81036787501266!3d21.03188278767181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abef403b34df%3A0xb06a133e6f623614!2zTG90dGUgQ2VudGVyIEjDoCBO4buZaQ!5e1!3m2!1svi!2s!4v1713451581025!5m2!1svi!2s"
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
