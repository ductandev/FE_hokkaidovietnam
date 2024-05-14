import { PiUserCircleFill } from "react-icons/pi";
import { FaAngleLeft } from "react-icons/fa6";
import { FaRegIdCard } from "react-icons/fa";
import { BsCreditCard } from "react-icons/bs";

import { useFormik } from "formik";
import * as yup from "yup";

import { Controller, useForm } from "react-hook-form";

// import Input from "@/Components/Input/Input";
import { Input } from "@/Components/ui/input";
import Selection from "@/Components/Selection";

import { useSelector } from "react-redux";
import { selectCart } from "@/Redux/selectors/cart.selector";
import { Product } from "@/Types/Product.type";
import { formatCurrency, summaryPriceInCart } from "@/Helper/helper";
import { useAddress } from "@/Hooks/useAddress/useAddress";
import { useReducer } from "react";
import { Button } from "@/Components/ui/button";
import { Link } from "react-router-dom";

export interface UserPaymentFrm {
  email: string;
  name: string;
  phone: string;
  address: string;
  province: string;
  notePayment: string;
}

type AddressState = {
  provinceId: number | string;
  districtId: number | string;
  wardId: number | string;
}

export default function CheckoutPage() {
  // * State to handle Address
  const [state, setState] = useReducer(
    (data: AddressState, partialData: Partial<AddressState>): AddressState => {
      return { ...data, ...partialData };
    },
    {
      provinceId: "",
      districtId: "",
      wardId: ""
    },
  );
  const { getProvince, getDistrict, getWard }: any = useAddress();

  const cartState = useSelector(selectCart);

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<any>({
    mode: "onChange",
    defaultValues: {

    },
  });

  const paymentFrm = useFormik<UserPaymentFrm>({
    initialValues: {
      email: "",
      name: "",
      phone: "",
      address: "",
      province: "",
      notePayment: "",
    },
    validationSchema: yup.object().shape({
      name: yup
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
      phone: yup
        .string()
        .required("Số điện thoại không được bỏ trống!")
        .matches(/\d$/, "Vui lòng chỉ điền số!")
        .min(10, "Số điện tối thiểu là 10 số!")
        .max(10, "Số điện tối đa là 10 số!"),
      address: yup.string().required("Địa chỉ không được bỏ trống!"),
      province: yup.string().required("Tỉnh thành không được bỏ trống!"),
      notePayment: yup.string(),
    }),
    onSubmit: async (values: UserPaymentFrm) => {
      console.log(values);
      // const actionApi = contactAsyncAction(values);
      // dispatch(actionApi);
    },
  });

  const totalPrice: any = cartState.reduce((accumulator: number, product: Product | any) => {
    return accumulator + (product.quantity * product.gia_ban);
  }, 0);

  const handleChangeAddress = (name: string, value: string) => {
    let updatedState: any = {};

    // Set the value for the input field
    updatedState[name] = value;

    // Additional logic for specific fields
    if (name === "provinceId") {
      // If provinceId is changed, reset districtId and wardId
      updatedState["districtId"] = "";
      updatedState["wardId"] = "";
    } else if (name === "districtId") {
      // If districtId is changed, reset wardId
      updatedState["wardId"] = "";
    }

    setState({
      ...updatedState
    });
  };

  const renderData = (): JSX.Element[] => {
    return cartState.map((item: Product | any, index) => {
      let { quantity, ten_san_pham, gia_ban, hinh_anh } = item;

      return (
        <div
          className={`
            flex 
            flex-row 
            justify-between 
            items-center
            text-[10px] 
            lg:text-xl
            font-light
            gap-7
            lg:gap-10 
            mb-[22px] 
            lg:leading-6 
            `}
          key={index}
        >
          <img
            className="w-[50px] h-[50px] lg:w-[80px] lg:h-[80px]"
            src={hinh_anh[0]}
            alt={hinh_anh[0]}
          />

          <div className="w-full">
            <p className="text-base md:text-lg mb-1">{ten_san_pham}</p>
            <p className="text-sm md:text-base text-[#777171]">Số lượng: {quantity}</p>
          </div>

          <span className="text-base md:text-lg text-[#777171]">
            {formatCurrency(gia_ban)}
          </span>
        </div>
      );
    });
  };

  const handleOnSubmitForm = (values: any) => {

  }

  return (
    <div className={`container mx-aut`}>
      <div className="hidden lg:flex justify-center pt-[17px] sm:pt-[27px]">
        <h1
          className={`
            p-[17px]
            text-xl
            sm:text-2xl
            font-bold
            sm:font-medium
            text-center
            sm:border-b-[1.5px]
            sm:border-b-black
        `}
        >
          Thanh toán
        </h1>
      </div>

      <form onSubmit={handleSubmit((values) => handleOnSubmitForm(values))}>
        <div className="flex flex-col-reverse lg:flex-row lg:mt-16">
          <div className="lg:w-[45%] lg:pe-[50px]">
            <div className="flex flex-row justify-between mb-[14px] lg:mb-5">
              <h1 className="text-[13px] lg:text-2xl leading-6 font-bold">
                <span className="lg:hidden">
                  <FaRegIdCard className="inline-block me-1" />
                </span>

                Thông tin mua hàng
              </h1>

              <div className="text-[13px] lg:text-base flex items-center">
                <PiUserCircleFill className="inline w-[18px] h-[18px]" />
                <span className="ms-1 lg:ms-[10px]">Đăng nhập</span>
              </div>
            </div>


            <Controller
              name="email"
              control={control}
              render={({ field }: any) => {
                return (
                  <>
                    <Input
                      id="email"
                      placeholder="Email"
                      className="mb-4"
                      {...field}
                    />
                  </>
                );
              }}
            />

            <Controller
              name="user_name"
              control={control}
              render={({ field }: any) => {
                return (
                  <>
                    <Input
                      placeholder="Họ và tên"
                      className="mb-4"
                      {...field}
                    />
                  </>
                );
              }}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field }: any) => {
                return (
                  <>
                    <Input
                      startIcon={"+84"}
                      placeholder="Số điện thoại"
                      className="mb-4"
                      {...field}
                    />
                  </>
                );
              }}
            />

            <Controller
              name="address"
              control={control}
              render={({ field }: any) => {
                return (
                  <>
                    <Input
                      placeholder="Địa chỉ"
                      className="mb-4"
                      {...field}
                    />
                  </>
                );
              }}
            />

            <Controller
              name="provinceId"
              control={control}
              render={({ field }: any) => {
                return (
                  <>
                    <Selection
                      title="Tỉnh thành"
                      placeholder="Chọn tỉnh thành"
                      options={getProvince()}
                      displayKey={"name"}
                      onChanged={handleChangeAddress}
                      defaultValue={state.provinceId}
                      customClassTrigger="mb-4"
                      {...field}
                      value={"id"}
                    />
                  </>
                );
              }}
            />

            <Controller
              name="districtId"
              control={control}
              render={({ field }: any) => {
                return (
                  <>
                    <Selection
                      title="Quận huyện"
                      placeholder="Chọn quận/huyện"
                      options={getDistrict(state.provinceId)}
                      displayKey={"name"}
                      onChanged={handleChangeAddress}
                      disabled={!state.provinceId}
                      defaultValue={state.districtId}
                      customClassTrigger="mb-4"
                      {...field}
                      value={"id"}
                    />
                  </>
                );
              }}
            />


            <Controller
              name="wardId"
              control={control}
              render={({ field }: any) => {
                return (
                  <>
                    <Selection
                      title="Phường xã"
                      placeholder="Chọn phường/xã"
                      options={getWard(state.districtId)}
                      displayKey={"name"}
                      onChanged={handleChangeAddress}
                      disabled={!state.provinceId || !state.districtId}
                      defaultValue={state.wardId}
                      customClassTrigger="mb-4"
                      {...field}
                      value={"id"}
                    />
                  </>
                );
              }}
            />
            <Controller
              name="notePayment"
              control={control}
              render={({ field }: any) => {
                return (
                  <>
                    <textarea
                      id="notePayment"
                      className={`indent-3 sm:indent-5 h-[69px] sm:h-[104px] w-full mb-5 pt-1 text-[10px] sm:text-base`}
                      placeholder="Ghi chú (tùy chọn)"
                      style={{ border: "0.5px solid #777171" }}
                      onInput={paymentFrm.handleChange}
                      onBlur={paymentFrm.handleChange}
                    />
                  </>
                );
              }}
            />

            {/* <div className="flex items-center mb-1 lg:mb-2">
              <input
                className="w-[10px] h-[10px] lg:w-[25px] lg:h-[25px] me-1 lg:me-3"
                type="checkbox"
                name="diffientAddress"
                id="diffientAddress"
                value=""
              />

              <label
                className="text-[#777171] font-light leading-6 text-[10px] lg:text-base"
                htmlFor="diffientAddress"
              >
                Giao hàng đến địa chỉ khác
              </label>
            </div> */}



            <h1 className="text-[13px] lg:text-2xl leading-6 font-bold">
              <span className="lg:hidden">
                <BsCreditCard className="inline-block me-2 w-[25px] h-[25px]" />
              </span>
              Thanh toán
            </h1>

            <div className="py-2 lg:py-9 border-b-[1px] border-[#777171] ">
              <div className="flex items-center lg:mb-2">
                <input
                  className="w-[15px] h-[15px] lg:w-[25px] lg:h-[25px] me-3 lg:me-4"
                  type="radio"
                  name="payMethod"
                  id="COD"
                  value=""
                />
                <label
                  className="text-[#777171] font-light leading-6 text-[10px] lg:text-base"
                  htmlFor="COD"
                >
                  Thanh toán khi nhận hàng(COD)
                </label>
              </div>
              <div className="flex items-center mb-2 lg:mt-5">
                <input
                  className="w-[15px] h-[15px] lg:w-[25px] lg:h-[25px] me-3 lg:me-4"
                  type="radio"
                  name="payMethod"
                  id="CARD"
                  value=""
                />
                <label
                  className="text-[#777171] font-light leading-6 text-[10px] lg:text-base"
                  htmlFor="CARD"
                >
                  Chuyển khoản qua ngân hàng
                </label>
              </div>

              <div className="lg:hidden text-xl border-t-[1px] border-[#777171]">
                <button
                  className={`
                  w-full
                  py-[8px] 
                  sm:py-[10px] 
                  bg-[#1E1E1E] 
                  text-white
                  mt-5
                  mb-4
                  lg:mb-0 
                  text-base`}
                  disabled={!paymentFrm.isValid}
                  type="submit"
                >
                  ĐẶT HÀNG
                </button>

                <div className="flex justify-center mb-9">
                  <a href="/cart" className="flex items-center text-xs text-[#777171]">
                    <FaAngleLeft className="inline me-1" />
                    <p>Quay về giỏ hàng</p>
                  </a>
                </div>
              </div>


            </div>

            <div className="flex justify-end leading-6 text-[10px] lg:text-[13px] text-[#2B5C82] lg:text-black gap-4">
              <p>Chính sách đổi trả</p>
              <p>Chính sách bảo mật</p>
              <p>Điểu khoản sử dụng</p>
            </div>
          </div>

          <div
            className={`
            lg:w-[55%] 
            lg:bg-[#E0E0E0]
            lg:px-8
            lg:py-8
            `}
          >
            <h1
              className={`
              text-[15px]
              sm:text-2xl
              font-medium
              mb-3
              lg:mb-[24px]
          `}
            >
              Đơn hàng ({cartState.length} sản phẩm)
            </h1>

            {renderData()}

            <div className={`
            flex 
            md:flex-row 
            flex-col
            justify-between 
            gap-5 
            py-5 
            lg:py-8 
            border-y-[0.5px] 
            border-[#777171]`}>
              <Input name="discount_code" placeholder="Nhập mã giảm giá" />

              <Button className="h-[40px] md:text-lg text-base px-6">Áp dụng</Button>

            </div>

            <div
              className={`
              border-b-[1px] 
              border-[#777171] 
              text-[#777171]
              py-[13px]
              lg:py-5
              text-[13px]
              lg:text-xl
              font-light 
              leading-6`}>

              <div className="flex justify-between mb-1 lg:mb-2">
                <p className="text-base md:text-lg text-[#777171]">Tạm tính</p>
                <p className="text-base md:text-lg text-primary font-medium">{summaryPriceInCart(cartState)}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-base md:text-lg text-[#777171]">Phí vận chuyển</p>
                <p className="text-base md:text-lg text-primary font-medium">{formatCurrency(30000)}</p>
              </div>
            </div>

            <div>
              <div className={`
                  flex 
                  justify-between
                  text-[13px]
                  lg:text-2xl 
                  text-xl 
                  mt-2 
                  lg:mt-3
                  mb-5
                  lg:mb-9
                  font-medium
                  `}>
                <p>Tổng cộng</p>
                <p className="font-medium">{formatCurrency(totalPrice + 30000)}</p>
              </div>

              <div className="hidden lg:flex justify-between ">
                <Link className="text-base flex items-center text-[#777171]" to="/cart">
                  <FaAngleLeft className="inline me-1" />

                  <p>Quay về giỏ hàng</p>
                </Link>

                <Button className="h-[48px] px-8 text-lg">Đặt hàng</Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
