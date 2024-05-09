import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Response } from 'express';

import { successCode, failCode, errorCode } from 'src/Config/response';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor() { }

  model = new PrismaClient();

  // ============================================
  //            GET ALL CART
  // ============================================ 
  async getAll(res: Response) {
    try {
      let data = await this.model.gioHang.findMany({
        where: {
          isDelete: false,
        },
        include: {
          NguoiDung: true,
          SanPham: true
        }
      });

      if (data.length === 0) {
        return successCode(res, data, 200, "Người dùng chưa thêm sản phẩm vào giỏ hàng !")
      }

      successCode(res, data, 200, "Thành công !")
    }
    catch (exception) {
      console.log("🚀 ~ file: cart.service.ts:32 ~ CartService ~ getAll ~ exception:", exception);
      errorCode(res, "Lỗi BE !")
    }
  };

  // ============================================
  //         GET CART BY USER ID
  // ============================================ 
  async getCartByUserId(userID: number, res: Response) {
    try {
      let data = await this.model.nguoiDung.findFirst({
        where: {
          nguoi_dung_id: +userID,
          isDelete: false,
        },
        include: {
          GioHang: {
            include: {
              SanPham: true
            }
          }

        }
      });

      if (data === null) {
        return failCode(res, '', 400, "Người dùng id không tồn tại")
      }

      if (data.GioHang.length === 0) {
        return successCode(res, data, 200, "Người dùng này chưa thêm sản phẩm nào !")
      }

      successCode(res, data, 200, "Thành công !")
    }
    catch (exception) {
      console.log("🚀 ~ file: cart.service.ts:67 ~ CartService ~ getCartByUserId ~ exception:", exception);
      errorCode(res, "Lỗi BE !")
    }
  };



  // ============================================
  //                 POST CART
  // ============================================
  async postCart(body: CreateCartDto, res: Response) {
    try {
      let { nguoi_dung_id, san_pham_id, so_luong } = body;

      // ****************************************************
      // CHECK USER ID CÓ TỒN TẠI HAY KHÔNG 
      let checkUserID = await this.model.nguoiDung.findFirst({
        where: {
          nguoi_dung_id,
          isDelete: false
        }
      });

      if (checkUserID === null) {
        return failCode(res, '', 400, "Người dùng ID không tồn tại !")
      }

      // CHECK SẢN PHẨM ID CÓ TỒN TẠI HAY KHÔNG 
      let checkProductID = await this.model.sanPham.findFirst({
        where: {
          san_pham_id,
          isDelete: false
        }
      });

      if (checkProductID === null) {
        return failCode(res, '', 400, "Sản phẩm ID không tồn tại !")
      }
      // ****************************************************


      let checkCart = await this.model.gioHang.findFirst({
        where: {
          nguoi_dung_id,
          san_pham_id,
          isDelete: false
        }
      })
      if (checkCart === null && so_luong === 0) {
        return failCode(res, '', 400, "Số lượng sản phẩm phải lớn hơn 0 !")
      }

      if (checkCart === null && so_luong > 0) {
        await this.model.gioHang.create({
          data: body
        })

        return successCode(res, body, 201, "Thêm giỏ hàng thành công !")
      }

      if (checkCart && so_luong === 0) {
        await this.model.gioHang.delete({
          where: {
            gio_hang_id: checkCart.gio_hang_id
          }
        })

        return successCode(res, body, 200, "Xóa sản phẩm thành công !")
      }

      let update = await this.model.gioHang.update({
        where: {
          gio_hang_id: checkCart.gio_hang_id,
          nguoi_dung_id,
          san_pham_id,
          isDelete: false
        },
        data: {
          so_luong
        }
      })

      successCode(res, update, 201, "Cập nhật giỏ hàng thành công !")
    }
    catch (exception) {
      console.log("🚀 ~ file: cart.service.ts:116 ~ CartService ~ postCart ~ exception:", exception);
      errorCode(res, "Lỗi BE")
    }
  }

  // ============================================
  //               DELETE CART 
  // ============================================
  async deleteCart(id: number, res: Response) {
    try {

      let checkCartID = await this.model.gioHang.findFirst({
        where: {
          gio_hang_id: +id,
          isDelete: false
        }
      });

      if (checkCartID === null) {
        return failCode(res, '', 400, "Giỏ hàng ID không tồn tại !")
      }

      await this.model.gioHang.delete({
        where: {
          gio_hang_id: +id,
        }
      });

      successCode(res, checkCartID, 200, "Xóa sản phẩm giỏ hàng ID thành công !")
    }
    catch (exception) {
      console.log("🚀 ~ file: cart.service.ts:191 ~ CartService ~ deleteCart ~ exception:", exception);
      errorCode(res, "Lỗi BE")
    }
  }



}
