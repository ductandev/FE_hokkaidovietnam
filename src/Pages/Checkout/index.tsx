// ! Hooks and Library
import { useAddress } from "@/Hooks/useAddress/useAddress";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { useAuth } from "@/Auth/AuthProvider";
import { actions } from "@/Redux/actions/cart.action";

// ! Components
import { Input } from "@/Components/ui/input";
import Selection from "@/Components/Selection";
import { Label } from "@/Components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group"
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import { toast } from "react-toastify";

// ! Redux and Helpers
import { selectCart } from "@/Redux/selectors/cart.selector";
import { selectUser } from "@/Redux/selectors/user.selector";
import { formatCurrency, isEmpty, summaryPriceInCart } from "@/Helper/helper";

import { Product } from "@/Types/Product.type";
import { OrderCreate } from "@/Types/Order.type";

// ! Assets
import { PiUserCircleFill } from "react-icons/pi";
import { FaAngleLeft } from "react-icons/fa6";
import { FaRegIdCard } from "react-icons/fa";
import { BsCreditCard } from "react-icons/bs";

// ! Schema validation
import { checkoutValidationSchema } from "./checkout.validation";

import { postOrder } from "@/Apis/Order/Order.api";
import { useEffect } from "react";
import { useLocalStorage } from "@/Hooks/useLocalStorage";
import { PREFIX } from "@/Hooks/useCartStorage";

export interface UserPaymentFrm {
  email: string;
  name: string;
  phone: string;
  address: string;
  province: string;
  notePayment: string;
}

export default function CheckoutPage() {
  const { getProvince, getDistrict, getWard }: any = useAddress();

  const cartState = useSelector(selectCart);
  const userState = useSelector(selectUser);

  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const { removeItem } = useLocalStorage()
  const { isLogin } = useAuth();

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(checkoutValidationSchema),
    defaultValues: {
      ...userState,
      ghi_chu: "",
      hinh_thuc_thanh_toan_id: "2"
    },
  });

  const watchDistrict = getDistrict(watch("tinh_thanh_id"));
  const watchWard = getWard(watch("quan_id"));

  useEffect(() => {
    if (userState.ho_ten.length) {
      let payload = {
        email: "",
        ho_ten: "",
        so_dien_thoai: "",
        dia_chi: "",
        tinh_thanh_id: "",
        quan_id: "",
        phuong_id: "",
        ghi_chu: "",
        hinh_thuc_thanh_toan_id: "2",
        nguoi_dung_id: ''
      };

      payload.email = userState.email
      payload.ho_ten = userState.ho_ten
      payload.so_dien_thoai = userState.so_dien_thoai
      payload.dia_chi = userState.dia_chi
      payload.tinh_thanh_id = userState.tinh_thanh_id
      payload.nguoi_dung_id = userState.nguoi_dung_id
      payload.quan_id = userState.quan_id
      payload.phuong_id = userState.phuong_id

      reset(payload)
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState])

  const { mutateAsync }: any = useMutation({
    mutationFn: (body: OrderCreate) => {
      return postOrder(body)
    },
    onSuccess: () => {
      toast.success(`Bạn đã đặt hàng thành công`, {
        position: "top-center",
      });

      setTimeout(() => {
        navigate('/products')
      }, 1000)

      // * Clear Current Cart
      // ! if user login call api clear cart
      // ! if user not login clear cart in local
      dispatch(actions.setCart([]));
      removeItem(PREFIX);
    },
    onError: () => {
      toast.error(`Đã xảy ra lỗi, Không thể đặt hàng !`, {
        position: "top-center",
      });
    },
  });

  const totalPrice: any = cartState.reduce((accumulator: number, product: Product | any) => {
    return accumulator + (product.so_luong * product.gia_ban);
  }, 0);

  const renderData = (): JSX.Element[] => {
    return cartState.map((item: Product | any, index) => {
      let { so_luong, ten_san_pham, gia_ban, hinh_anh } = item;

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
            <p className="text-sm md:text-base text-[#777171]">Số lượng: {so_luong}</p>
          </div>

          <span className="text-base md:text-lg text-[#777171]">
            {formatCurrency(gia_ban)}
          </span>
        </div>
      );
    });
  };

  const handleOnSubmitForm = (values: any) => {
    const payload = {
      ...values,
      tong_tien: totalPrice,
      ma_giam_gia: "",
      san_pham: cartState.map((product: any) => {
        return {
          san_pham_id: product.san_pham_id,
          so_luong: product.so_luong,
          don_gia: product.gia_ban
        }
      }),
    };

    delete payload['anh_dai_dien'];
    delete payload['gioi_tinh'];
    delete payload['isDelete'];
    delete payload['mat_khau'];
    delete payload['vai_tro_id'];

    mutateAsync(payload);
  }

  const SErrors: any = errors

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
        `}>
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

              {!isLogin && <div className="text-[13px] lg:text-base flex items-center" onClick={() => {
                navigate('/login')
              }}>
                <PiUserCircleFill className="inline w-[18px] h-[18px]" />
                <span className="ms-1 lg:ms-[10px]">Đăng nhập</span>
              </div>}
            </div>


            <Controller
              name="email"
              control={control}
              render={({ field }: any) => {
                return (
                  <div className="mb-4">
                    <Input
                      placeholder="Email"
                      error={SErrors?.email?.message || ""}
                      {...field}
                    />
                  </div>
                );
              }}
            />

            <Controller
              name="ho_ten"
              control={control}
              render={({ field }: any) => {
                return (
                  <div className="mb-4">
                    <Input
                      placeholder="Họ và tên"
                      error={SErrors?.ho_ten?.message || ""}
                      {...field}
                    />
                  </div>
                );
              }}
            />

            <Controller
              name="so_dien_thoai"
              control={control}
              render={({ field }: any) => {
                return (
                  <div className="mb-4">
                    <Input
                      placeholder="Số điện thoại"
                      error={SErrors?.so_dien_thoai?.message || ""}
                      {...field}
                    />
                  </div>
                );
              }}
            />

            <Controller
              name="dia_chi"
              control={control}
              render={({ field }: any) => {
                return (
                  <div className="mb-4">
                    <Input
                      placeholder="Địa chỉ"
                      error={SErrors?.dia_chi?.message || ""}
                      {...field}
                    />
                  </div>
                );
              }}
            />

            <Controller
              name="tinh_thanh_id"
              control={control}
              render={({ field }: any) => {
                return (
                  <div className="mb-4">
                    <Selection
                      title="Tỉnh thành"
                      placeholder="Chọn tỉnh thành"
                      options={getProvince()}
                      displayKey={"name"}
                      onChanged={(_: any, value: any) => {
                        field.onChange(value);
                        setValue("quan_id", "")
                        setValue("phuong_id", "")
                      }}
                      defaultValue={field.value}
                      valueKey={"id"}
                      error={SErrors?.tinh_thanh_id?.message || ""}
                      {...field}
                    />
                  </div>
                );
              }}
            />

            <Controller
              name="quan_id"
              control={control}
              render={({ field }: any) => {

                return (
                  <div className="mb-4">
                    <Selection
                      title="Quận huyện"
                      placeholder="Chọn quận huyện"
                      options={watchDistrict}
                      displayKey={"name"}
                      disabled={!watch("tinh_thanh_id")}
                      onChanged={(_: any, value: any) => {
                        field.onChange(value);
                        setValue("phuong_id", "")
                      }}
                      defaultValue={field.value}
                      valueKey={"id"}
                      error={SErrors?.quan_id?.message || ""}
                      {...field}
                    />
                  </div>
                );
              }}
            />

            <Controller
              name="phuong_id"
              control={control}
              render={({ field }: any) => {
                return (
                  <div className="mb-4">
                    <Selection
                      title="Phường xã"
                      placeholder="Chọn phường/xã"
                      options={watchWard}
                      displayKey={"name"}
                      onChanged={(_: any, value: any) => {
                        field.onChange(value);
                      }}
                      disabled={!watch("quan_id")}
                      defaultValue={field.value}
                      valueKey={"id"}
                      error={SErrors?.phuong_id?.message || ""}
                      {...field}
                    />
                  </div>
                );
              }}
            />

            <Controller
              name="ghi_chu"
              control={control}
              render={({ field }: any) => {
                return (
                  <>
                    <Textarea
                      className={`h-[69px] sm:h-[104px] w-full mb-5 pt-1 text-sm`}
                      placeholder="Ghi chú (tùy chọn)"
                      {...field}
                    />
                  </>
                );
              }}
            />

            <h1 className="text-[13px] lg:text-2xl leading-6 font-bold">
              <span className="lg:hidden">
                <BsCreditCard className="inline-block me-2 w-[25px] h-[25px]" />
              </span>
              Thanh toán
            </h1>

            <div className="py-4 border-b-[1px] border-[#777171]">
              <Controller
                name="hinh_thuc_thanh_toan_id"
                control={control}
                render={({ field }: any) => {
                  return (
                    <RadioGroup defaultValue={field.value} onChange={(event: any) => {
                      field.onChange(event.target.value)
                    }} >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="2" id="2" />

                        <Label htmlFor="2" className="text-base">Chuyển khoản qua ngân hàng</Label>
                      </div>

                      <div className="flex items-center space-x-2 mt-2">
                        <RadioGroupItem value="1" id="1" />
                        <Label htmlFor="1" className="text-base">Thanh toán khi nhận hàng (COD)</Label>
                      </div>
                    </RadioGroup>
                  );
                }}
              />

              <div className="lg:hidden text-xl border-t-[1px] border-[#777171]">
                <Button
                  disabled={!isEmpty(errors)}
                  type="submit"
                >
                  ĐẶT HÀNG
                </Button>

                <div className="flex justify-center mb-9">
                  <a href="/cart" className="flex items-center text-xs text-[#777171]">
                    <FaAngleLeft className="inline me-1" />
                    <p>Quay về giỏ hàng</p>
                  </a>
                </div>
              </div>
            </div>

            <div className="flex mt-2 justify-end leading-6 text-[10px] lg:text-[13px] text-[#2B5C82] lg:text-black gap-4">
              <p className="cursor-pointer">Chính sách đổi trả</p>
              <p className="cursor-pointer">Chính sách bảo mật</p>
              <p className="cursor-pointer">Điểu khoản sử dụng</p>
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

              <Button
                className="h-[40px] md:text-lg text-base px-6"
                type="button"
              >
                Áp dụng
              </Button>
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

                <Button
                  className="h-[48px] px-8 text-lg"
                  disabled={!isEmpty(errors)}
                  type="submit"
                >Đặt hàng
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
