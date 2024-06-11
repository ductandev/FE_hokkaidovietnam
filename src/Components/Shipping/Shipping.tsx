import React from "react";

export const Shipping = () => {
  return (
    <div className="p-4 md:p-8 mx-5">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Chính Sách Vận Chuyển
      </h1>
      <p>
        Nhằm mục đích tạo điều kiện thuận lợi trong quá trình đặt hàng vào giao
        nhận sản phẩm cho Quý khách, Hokkaido Việt Nam xin đưa ra quy định về
        việc giao hàng và nhận hàng như sau:
      </p>
      <section className="mb-8 mt-8">
        <h2 className="text-xl font-semibold mb-2">
          Hokkaido Việt Nam miễn phí vận chuyển cho tất cả đơn hàng trên toàn
          quốc
        </h2>
        <p>
          Hiện tại Fine Japan Việt Nam hợp tác với Sapo Express để thực hiện
          chuyển phát các sản phẩm tới Quý khách hàng.
        </p>
        <p className="mt-3">
          Sau khi xác nhận thành công, đơn hàng sẽ được giao đến Quý khách trong
          khoảng thời gian sau đây:
        </p>
        <div className="overflow-x-auto mt-3">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Địa chỉ giao hàng
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Thời gian giao hàng
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  Thành phố Hồ Chí Minh
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  6 - 24 giờ làm việc
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  Các khu vực tỉnh, thành còn lại
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  2 - 5 ngày làm việc
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3">
          *Lưu ý: thời gian giao hàng dự kiến ở trên chỉ áp dụng cho các đơn
          hàng trong nước.
        </p>
        <p className="mt-3">
          Quý khách hàng lưu ý luôn luôn kiểm tra kĩ tình trạng sản phẩm ngay
          tại thời điểm nhận hàng và có sự chứng kiến của nhân viên giao hàng.
          Các vấn đề như bể vỡ, vỏ hộp sản phẩm bị rách nát hoặc seal đã bị mở,
          … Tất cả những sự cố này sẽ chỉ được đổi trả nếu do lỗi từ phía nhân
          viên của Fine Japan Vietnam và đơn vị vận chuyển.
        </p>
        <p className="mt-3">
          Trong quá trình giao hàng có thể phát sinh những vấn đề ngoài ý muốn
          về phía Khách hàng khiến việc giao hàng bị chậm trễ. Chúng tôi sẽ linh
          động giải quyết cho Khách hàng trong từng trường hợp như sau:
        </p>
        <p className="mt-3">
          - Khách hàng không cung cấp chính xác và đầy đủ địa chỉ giao hàng và
          số điện thoại liên lạc.
        </p>
        <p className="mt-3">
          - Khách hàng không sẵn sàng để nhận hàng vào thời điểm giao hàng.
        </p>
        <p className="mt-3">
          - Chúng tôi đã giao hàng đúng hẹn theo thông tin giao hàng nhưng không
          liên lạc được với Khách hàng và chờ tại địa điểm giao hàng quá 10
          phút, mọi nỗ lực của nhân viên giao hàng nhằm liên hệ với Khách hàng
          đều không thành công.
        </p>
        <p className="mt-3">
          - Những trường hợp bất khả kháng như thiên tai, tai nạn giao thông,
          gián đoạn mạng lưới giao thông, đứt cáp, hệ thống bị tấn công.
        </p>
        <p className="mt-3">
          - Các trường hợp khác: Trong trường hợp xảy ra sự cố phức tạp hơn,
          chúng tôi bảo đảm quyền lợi lớn nhất thuộc về Khách hàng.
        </p>
        <p className="mt-5">
          Nếu có bất kỳ thắc mắc nào về thông tin giao nhận sản phẩm, Quý khách
          vui lòng liên hệ với chúng tôi theo số Hotline: 0904 229 229 để được
          hỗ trợ.
        </p>
      </section>
    </div>
  );
};
