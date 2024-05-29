import { useEffect } from "react";





export default function index() {

  // useEffect(() => {
  //   window.scrollTo(0, 0); // Cuộn về đầu trang khi component được render
  // }, []);

  // const renderTripHistory = () => {
  //   if (Array.isArray(arrTripHistory) && arrTripHistory.length > 0) {
  //     return (
  //       <>
  //         <div className="ps-3 sm:ps-0">
  //           <h1 className="text-2xl font-bold text-gray-600 mb-4">Phòng đã thuê</h1>
  //           {/* {renderListingTripsHistory()} */}
  //         </div>
  //       </>)
  //   } else {
  //     return (
  //       <>
  // : <div className="sm:mt-8 md:mt-12 lg:mt-[77px] border-b-[#989494] border-b-[1.5px] md:border-none">
  //   <BlankPage text="Giỏ hàng trống" subText="Vui lòng thêm sản phẩm để có thể đặt hàng ngay" />
  // </div>
  //         <h3 className="text-2xl font-semibold">
  //           Chưa có đơn nào được đặt... vẫn chưa!
  //         </h3>
  //         <p className="mt-2 font-normal">
  //           Đã đến lúc phủi bụi hành lý và bắt đầu chuẩn bị cho chuyến phiêu lưu
  //           tiếp theo của bạn rồi
  //         </p>
  //         <button className="mt-4 hover:bg-[#F7F7F7] border border-black rounded-xl px-[23px] py-[13px] text-black font-bold">
  //           Bắt đầu tìm kiếm
  //         </button>
  //       </>
  //     );
  //   }
  // };

  return (
    <div className="container mx-auto">
      <h1 className="pt-9 pb-6 text-4xl font-bold  text-[#484848]">Lịch sử mua hàng</h1>
      <hr />

      <div className="pt-8 pb-12">function</div>

      <hr />
      <p className="pb-9 pt-6 font-normal text-gray-500">
        Bạn không tìm thấy lịch sử mua hàng của mình ở đây?
        <a href='/contact' className="font-bold underline cursor-pointer text-black">
          Truy cập trang liên hệ
        </a>
      </p>
    </div>
  )
}
