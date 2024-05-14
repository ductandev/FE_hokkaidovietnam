import React from "react";

export const Shopping = () => {
  return (
    <div className="p-4 md:p-8 mx-5">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Hướng Dẫn Mua Hàng
      </h1>
      <p className="mb-3">
        Bạn có thể đặt hàng trực tuyến ở website HokkaidoVietNam.com thông qua 5
        bước đặt hàng cơ bản.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          1.Truy cập website và lựa chọn sản phẩm cần mua để mua hàng
        </h2>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          2. Thêm sản phẩm vào giỏ hàng
        </h2>
        <p>
          Khi đã tìm được sản phẩm mong muốn, bạn vui lòng bấm vào hình hoặc tên
          sản phẩm để vào được trang thông tin chi tiết của sản phẩm, sau đó:
        </p>
        <p className="mt-3">
          a. Kiểm tra thông tin sản phẩm: giá, thông tin khuyến mãi.
        </p>
        <p className="mt-3">b. Chọn số lượng mong muốn.</p>
        <p className="mt-3">
          c. Bấm vào nút"Thêm vào giỏ hàng" để thêm sản phẩm vào giỏ hàng
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          3. Kiểm tra giỏ hàng và đặt hàng
        </h2>
        <p>
          Để đặt nhiều sản phẩm khác nhau vào cùng 1 đơn hàng, vui lòng thực
          hiện theo các bước sau:
        </p>
        <p className="mt-3">a. Chọn "Tiếp tục mua hàng" trở về trang chủ</p>
        <p className="mt-3">b. Thêm sản phẩm vào giỏ hàng như ở Bước 2.</p>
        <p className="mt-3">
          Quá trình này có thể lặp lại cho đến khi bạn hoàn tất việc bỏ tất cả
          các sản phẩm cần đặt mua vào giỏ hàng.
        </p>
        <p className="mt-3">
          Sau khi đã có đủ sản phẩm cần đặt trong giỏ hàng tiếp tục thực hiện
          các bước sau để đặt hàng:
        </p>
        <p className="mt-3">c. Điều chỉnh số lượng và cập nhật giỏ hàng</p>
        <p className="mt-3">d. Bấm "Đặt hàng ngay"</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4. Thanh toán</h2>
        <p>Chọn 1 trong 3 phương thức sau:</p>
        <p className="mt-3">
          1. Nếu bạn đã có tài khoản vui lòng nhập thông tin tên đăng nhập là
          email và mật khẩu vào mục đã có tài khoản trên hệ thống
        </p>
        <p className="mt-3">
          2. Nếu bạn chưa có tài khoản và muốn đăng ký tài khoản vui lòng điền
          các thông tin cá nhân để tiếp tục đăng ký tài khoản. Khi có tài khoản
          bạn sẽ dễ dàng theo dõi được đơn hàng của mình.
        </p>
        <p className="mt-3">
          3. Nếu bạn muốn mua hàng mà không cần tài khoản vui lòng nhấp chuột
          vào mục đặt hàng không cần tài khoản
        </p>
        <p className="mt-6">
          a. Điền đầy đủ thông tin chính xác vào các trường yêu cầu trong mục
          “Thông tin mua hàng"
        </p>
        <p className="mt-3">
          b. Chọn phương thức thanh toán và bấm “Xác nhận đơn hàng”
        </p>
        <p className="mt-3">c. Thêm mã giảm giá (Nếu có)</p>
        <p className="mt-3">
          d. Sau khi hoàn tất quá trình, vui lòng kiểm tra lại các thông tin
          sau: địa chỉ nhận hàng, giá khuyến mãi, tổng tiền. Sau đó bạn chọn
          "Đặt hàng"
        </p>
        <p className="mt-3">
          Nếu các thông tin trên đã chính xác, hệ thống sẽ bắt đầu tiến hành tạo
          đơn hàng dựa trên các thông tin quý khách đã đăng ký.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          5. Kiểm tra và xác nhận đơn hàng
        </h2>
        <p className="mt-3 mb-8">
          Sau khi hoàn tất cả bước đặt mua, bộ phận CSKH của chúng tôi sẽ gọi
          điện cho bạn để xác nhận đơn hàng và tiến hành giao nhận.
        </p>
        <p>
          Mọi thắc mắc cần được hỗ trợ vui lòng liên hệ hotline 0904 299 299.
        </p>
      </section>
    </div>
  );
};
