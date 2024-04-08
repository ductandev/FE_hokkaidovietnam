/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `Banner` (
  `banner_id` int NOT NULL AUTO_INCREMENT,
  `ten_hinh_anh` varchar(255) DEFAULT NULL,
  `isDelete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`banner_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `BinhLuan` (
  `binh_luan_id` int NOT NULL AUTO_INCREMENT,
  `san_pham_id` int DEFAULT NULL,
  `nguoi_dung_id` int DEFAULT NULL,
  `ngay_binh_luan` datetime DEFAULT NULL,
  `noi_dung` varchar(255) DEFAULT NULL,
  `sao_binh_luan` int DEFAULT NULL,
  `isDelete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`binh_luan_id`),
  KEY `san_pham_id` (`san_pham_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `BinhLuan_ibfk_1` FOREIGN KEY (`san_pham_id`) REFERENCES `SanPham` (`san_pham_id`),
  CONSTRAINT `BinhLuan_ibfk_2` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `NguoiDung` (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ChiTietDonHang` (
  `id` int NOT NULL AUTO_INCREMENT,
  `don_hang_id` int DEFAULT NULL,
  `san_pham_id` int DEFAULT NULL,
  `so_luong` int DEFAULT NULL,
  `don_gia` int DEFAULT NULL,
  `thanh_tien` int DEFAULT NULL,
  `ma_giam` varchar(100) DEFAULT NULL,
  `isDelete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `don_hang_id` (`don_hang_id`),
  KEY `san_pham_id` (`san_pham_id`),
  CONSTRAINT `ChiTietDonHang_ibfk_1` FOREIGN KEY (`don_hang_id`) REFERENCES `DonHang` (`don_hang_id`),
  CONSTRAINT `ChiTietDonHang_ibfk_2` FOREIGN KEY (`san_pham_id`) REFERENCES `SanPham` (`san_pham_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `DonHang` (
  `don_hang_id` int NOT NULL AUTO_INCREMENT,
  `so_phieu` varchar(50) DEFAULT NULL,
  `nguoi_dung_id` int DEFAULT NULL,
  `thoi_gian_dat_hang` datetime DEFAULT NULL,
  `thoi_gian_giao_hang` datetime DEFAULT NULL,
  `trang_thai_dat_hang` tinyint(1) DEFAULT NULL,
  `isDelete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`don_hang_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `DonHang_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `NguoiDung` (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `LoaiSanPham` (
  `loai_san_pham_id` int NOT NULL AUTO_INCREMENT,
  `ten_loai_san_pham` varchar(50) DEFAULT NULL,
  `isDelete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`loai_san_pham_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `NguoiDung` (
  `nguoi_dung_id` int NOT NULL AUTO_INCREMENT,
  `vai_tro_id` int DEFAULT '2',
  `ho_ten` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mat_khau` varchar(255) NOT NULL,
  `so_dien_thoai` varchar(50) NOT NULL,
  `anh_dai_dien` varchar(255) DEFAULT NULL,
  `gioi_tinh` varchar(20) DEFAULT NULL,
  `isDelete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`nguoi_dung_id`),
  KEY `vai_tro_id` (`vai_tro_id`),
  CONSTRAINT `NguoiDung_ibfk_1` FOREIGN KEY (`vai_tro_id`) REFERENCES `VaiTro` (`vai_tro_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Nhom` (
  `vai_tro_id` int NOT NULL,
  `quyen_id` int NOT NULL,
  PRIMARY KEY (`vai_tro_id`,`quyen_id`),
  KEY `quyen_id` (`quyen_id`),
  CONSTRAINT `Nhom_ibfk_1` FOREIGN KEY (`vai_tro_id`) REFERENCES `VaiTro` (`vai_tro_id`),
  CONSTRAINT `Nhom_ibfk_2` FOREIGN KEY (`quyen_id`) REFERENCES `Quyen` (`quyen_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Quyen` (
  `quyen_id` int NOT NULL AUTO_INCREMENT,
  `quyen_tai_khoan` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`quyen_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `SanPham` (
  `san_pham_id` int NOT NULL AUTO_INCREMENT,
  `loai_san_pham_id` int DEFAULT NULL,
  `ten_san_pham` varchar(255) DEFAULT NULL,
  `hinh_anh` json DEFAULT NULL,
  `gia_ban` int DEFAULT NULL,
  `gia_giam` int DEFAULT NULL,
  `mo_ta_chi_tiet` varchar(255) DEFAULT NULL,
  `don_vi_tinh` varchar(20) DEFAULT NULL,
  `trang_thai_san_pham` tinyint(1) DEFAULT '1',
  `so_luong_trong_kho` int DEFAULT NULL,
  `isDelete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`san_pham_id`),
  KEY `loai_san_pham_id` (`loai_san_pham_id`),
  CONSTRAINT `SanPham_ibfk_1` FOREIGN KEY (`loai_san_pham_id`) REFERENCES `LoaiSanPham` (`loai_san_pham_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `VaiTro` (
  `vai_tro_id` int NOT NULL AUTO_INCREMENT,
  `vai_tro_tai_khoan` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`vai_tro_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Banner` (`banner_id`, `ten_hinh_anh`, `isDelete`) VALUES
(1, 'http://res.cloudinary.com/djkjdtqef/image/upload/v1711187767/fxgyknfaow3cfbhwaxqb.png', 0);
INSERT INTO `Banner` (`banner_id`, `ten_hinh_anh`, `isDelete`) VALUES
(2, 'http://res.cloudinary.com/djkjdtqef/image/upload/v1711187767/fxgyknfaow3cfbhwaxqb.png', 0);
INSERT INTO `Banner` (`banner_id`, `ten_hinh_anh`, `isDelete`) VALUES
(3, 'http://res.cloudinary.com/djkjdtqef/image/upload/v1711187767/fxgyknfaow3cfbhwaxqb.png', 0);
INSERT INTO `Banner` (`banner_id`, `ten_hinh_anh`, `isDelete`) VALUES
(4, 'http://res.cloudinary.com/djkjdtqef/image/upload/v1711187767/k4nebpk25qra9n94qpgb.jpg', 0),
(5, 'http://res.cloudinary.com/djkjdtqef/image/upload/v1711187767/k4nebpk25qra9n94qpgb.jpg', 0),
(6, 'http://res.cloudinary.com/djkjdtqef/image/upload/v1711267381/pebnlgz9bazw25vay4gw.jpg', 0),
(7, 'http://res.cloudinary.com/djkjdtqef/image/upload/v1711270499/qcvw1xk0as1aire7jslf.jpg', 1),
(8, 'http://res.cloudinary.com/djkjdtqef/image/upload/v1711272461/epbjiaozzeqvqrghznmr.jpg', 1),
(9, 'http://res.cloudinary.com/djkjdtqef/image/upload/v1711335941/rpd5v2vkp8hirdqyelgj.jpg', 0);

INSERT INTO `BinhLuan` (`binh_luan_id`, `san_pham_id`, `nguoi_dung_id`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`, `isDelete`) VALUES
(1, 1, 3, '2024-03-17 08:30:00', 'Sản phẩm rất ngon!', 5, 0);
INSERT INTO `BinhLuan` (`binh_luan_id`, `san_pham_id`, `nguoi_dung_id`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`, `isDelete`) VALUES
(2, 2, 4, '2024-03-18 09:45:00', 'Đóng gói sản phẩm cẩn thận, rất hài lòng.', 4, 0);
INSERT INTO `BinhLuan` (`binh_luan_id`, `san_pham_id`, `nguoi_dung_id`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`, `isDelete`) VALUES
(3, 3, 5, '2024-03-18 10:15:00', 'Sản phẩm chất lượng, giá cả hợp lý.', 5, 0);

INSERT INTO `ChiTietDonHang` (`id`, `don_hang_id`, `san_pham_id`, `so_luong`, `don_gia`, `thanh_tien`, `ma_giam`, `isDelete`) VALUES
(1, 1, 1, 5, 5000, 25000, 'ABCD', 0);
INSERT INTO `ChiTietDonHang` (`id`, `don_hang_id`, `san_pham_id`, `so_luong`, `don_gia`, `thanh_tien`, `ma_giam`, `isDelete`) VALUES
(2, 1, 2, 3, 8000, 24000, NULL, 0);
INSERT INTO `ChiTietDonHang` (`id`, `don_hang_id`, `san_pham_id`, `so_luong`, `don_gia`, `thanh_tien`, `ma_giam`, `isDelete`) VALUES
(3, 2, 3, 1, 10000, 10000, 'MAGIAM123', 0);
INSERT INTO `ChiTietDonHang` (`id`, `don_hang_id`, `san_pham_id`, `so_luong`, `don_gia`, `thanh_tien`, `ma_giam`, `isDelete`) VALUES
(4, 2, 4, 2, 50000, 100000, NULL, 0),
(5, 3, 1, 5, 5000, 25000, 'ABCD', 0),
(8, 9, 1, 5, 5000, 25000, 'ABCD', 0),
(9, 9, 1, 5, 5000, 25000, 'ABCD', 0),
(10, 9, 1, 5, 5000, 25000, 'ABCD', 0),
(11, 9, 1, 5, 5000, 25000, 'ABCD', 1);

INSERT INTO `DonHang` (`don_hang_id`, `so_phieu`, `nguoi_dung_id`, `thoi_gian_dat_hang`, `thoi_gian_giao_hang`, `trang_thai_dat_hang`, `isDelete`) VALUES
(1, 'DH20240003', 1, '2024-03-18 11:30:00', '2024-03-30 11:30:00', 1, 0);
INSERT INTO `DonHang` (`don_hang_id`, `so_phieu`, `nguoi_dung_id`, `thoi_gian_dat_hang`, `thoi_gian_giao_hang`, `trang_thai_dat_hang`, `isDelete`) VALUES
(2, 'DH20240004', 2, '2024-03-18 12:00:00', '2024-03-20 12:00:00', 1, 0);
INSERT INTO `DonHang` (`don_hang_id`, `so_phieu`, `nguoi_dung_id`, `thoi_gian_dat_hang`, `thoi_gian_giao_hang`, `trang_thai_dat_hang`, `isDelete`) VALUES
(3, 'DH20240005', 1, '2024-03-26 12:00:00', '2024-03-20 12:00:00', 1, 0);
INSERT INTO `DonHang` (`don_hang_id`, `so_phieu`, `nguoi_dung_id`, `thoi_gian_dat_hang`, `thoi_gian_giao_hang`, `trang_thai_dat_hang`, `isDelete`) VALUES
(9, 'DH20240006', 2, '2024-03-26 11:30:00', '2024-03-30 11:30:00', 1, 0),
(10, 'DH20240003', 3, '2024-03-26 11:30:00', '2024-03-30 11:30:00', 1, 0),
(11, 'DH20240007', 3, '2024-03-26 11:30:00', '2024-03-30 11:30:00', 1, 0);

INSERT INTO `LoaiSanPham` (`loai_san_pham_id`, `ten_loai_san_pham`, `isDelete`) VALUES
(1, 'Sữa tươi', 0);
INSERT INTO `LoaiSanPham` (`loai_san_pham_id`, `ten_loai_san_pham`, `isDelete`) VALUES
(2, 'Sữa chua', 0);
INSERT INTO `LoaiSanPham` (`loai_san_pham_id`, `ten_loai_san_pham`, `isDelete`) VALUES
(3, 'Sữa dinh dưỡng', 0);
INSERT INTO `LoaiSanPham` (`loai_san_pham_id`, `ten_loai_san_pham`, `isDelete`) VALUES
(4, 'Sữa hạnh nhân', 0),
(5, 'Sữa yến mạch', 0),
(6, 'Kem', 0),
(7, 'Snack', 0),
(8, 'Trà', 0),
(9, 'Trà sữa', 0),
(10, 'Phô mai', 0),
(11, 'Sữa Cô gái hà lan', 1),
(12, 'Cháo dinh dưỡngggg', 0);

INSERT INTO `NguoiDung` (`nguoi_dung_id`, `vai_tro_id`, `ho_ten`, `email`, `mat_khau`, `so_dien_thoai`, `anh_dai_dien`, `gioi_tinh`, `isDelete`) VALUES
(1, 1, 'Admin', 'admin@example.com', '$2b$10$NsjDrFAt/JFqumxiM4W6KeyjAxAeas77Z0OA4AtGYajyQCFpz9ONu', '123456789', 'admin.jpg', 'Nam', 0);
INSERT INTO `NguoiDung` (`nguoi_dung_id`, `vai_tro_id`, `ho_ten`, `email`, `mat_khau`, `so_dien_thoai`, `anh_dai_dien`, `gioi_tinh`, `isDelete`) VALUES
(2, 3, 'Anonymous', 'anonymous@example.com', '$2b$10$NsjDrFAt/JFqumxiM4W6KeyjAxAeas77Z0OA4AtGYajyQCFpz9ONu', '456789123', 'anonymous.jpg', 'Nam', 0);
INSERT INTO `NguoiDung` (`nguoi_dung_id`, `vai_tro_id`, `ho_ten`, `email`, `mat_khau`, `so_dien_thoai`, `anh_dai_dien`, `gioi_tinh`, `isDelete`) VALUES
(3, 2, 'User 1', 'user1@example.com', '$2b$10$NsjDrFAt/JFqumxiM4W6KeyjAxAeas77Z0OA4AtGYajyQCFpz9ONu', '987654321', 'user1.jpg', 'Nữ', 0);
INSERT INTO `NguoiDung` (`nguoi_dung_id`, `vai_tro_id`, `ho_ten`, `email`, `mat_khau`, `so_dien_thoai`, `anh_dai_dien`, `gioi_tinh`, `isDelete`) VALUES
(4, 2, 'User 2', 'user2@example.com', '$2b$10$NsjDrFAt/JFqumxiM4W6KeyjAxAeas77Z0OA4AtGYajyQCFpz9ONu', '654321987', 'user2.jpg', 'Nam', 0),
(5, 2, 'User 3', 'user3@example.com', '$2b$10$NsjDrFAt/JFqumxiM4W6KeyjAxAeas77Z0OA4AtGYajyQCFpz9ONu', '789456123', 'user3.jpg', 'Nam', 0),
(6, 2, 'User 4', 'user4@example.com', '$2b$10$NsjDrFAt/JFqumxiM4W6KeyjAxAeas77Z0OA4AtGYajyQCFpz9ONu', '321654987', 'user4.jpg', 'Nữ', 0),
(7, 2, 'User 5', 'user5@example.com', '$2b$10$NsjDrFAt/JFqumxiM4W6KeyjAxAeas77Z0OA4AtGYajyQCFpz9ONu', '789456123', 'user5.jpg', 'Nam', 0),
(8, 2, 'User 6', 'user6@example.com', '$2b$10$NsjDrFAt/JFqumxiM4W6KeyjAxAeas77Z0OA4AtGYajyQCFpz9ONu', '456789456', 'user6.jpg', 'Nam', 0),
(9, 2, 'User 7', 'user7@example.com', '$2b$10$NsjDrFAt/JFqumxiM4W6KeyjAxAeas77Z0OA4AtGYajyQCFpz9ONu', '987654321', 'user7.jpg', 'Nữ', 1),
(10, 2, 'User 8', 'user8@example.com', '$2b$10$NsjDrFAt/JFqumxiM4W6KeyjAxAeas77Z0OA4AtGYajyQCFpz9ONu', '876543219', 'user8.jpg', 'Nữ', 0),
(11, 2, 'Đức Tấn', 'ductan@gmail.com', '$2b$10$lAZZWp9SHJvUJ.2.cK4S0eS43iO6.N2OpnSeO6tPIxK.6/HKoNkpW', '0123456789', 'http://res.cloudinary.com/djkjdtqef/image/upload/v1711520327/noevrqegqgk5qbhyc0vh.png', 'nam', 0);

INSERT INTO `Nhom` (`vai_tro_id`, `quyen_id`) VALUES
(1, 1);
INSERT INTO `Nhom` (`vai_tro_id`, `quyen_id`) VALUES
(1, 2);
INSERT INTO `Nhom` (`vai_tro_id`, `quyen_id`) VALUES
(1, 3);
INSERT INTO `Nhom` (`vai_tro_id`, `quyen_id`) VALUES
(2, 3),
(1, 4),
(2, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(2, 9),
(2, 10),
(2, 11),
(2, 12),
(3, 12);

INSERT INTO `Quyen` (`quyen_id`, `quyen_tai_khoan`) VALUES
(1, 'Thêm user');
INSERT INTO `Quyen` (`quyen_id`, `quyen_tai_khoan`) VALUES
(2, 'Xóa user');
INSERT INTO `Quyen` (`quyen_id`, `quyen_tai_khoan`) VALUES
(3, 'Sửa thông tin user');
INSERT INTO `Quyen` (`quyen_id`, `quyen_tai_khoan`) VALUES
(4, 'Xem thông tin user'),
(5, 'Lấy danh sách thông tin tất cả user'),
(6, 'Thêm sản phẩm'),
(7, 'Sửa thông tin sản phẩm'),
(8, 'Xóa sản phẩm'),
(9, 'Đặt sản phẩm'),
(10, 'Hủy đặt sản phẩm'),
(11, 'Bình luận sản phẩm'),
(12, 'Xem danh sách sản phẩm');

INSERT INTO `SanPham` (`san_pham_id`, `loai_san_pham_id`, `ten_san_pham`, `hinh_anh`, `gia_ban`, `gia_giam`, `mo_ta_chi_tiet`, `don_vi_tinh`, `trang_thai_san_pham`, `so_luong_trong_kho`, `isDelete`) VALUES
(1, 1, 'Sữa tươi Vinamilk 180ml', '{\"url\": \"link_to_image\"}', 5000, 0, 'Sữa tươi Vinamilk 180ml', 'Lon', 1, 100, 0);
INSERT INTO `SanPham` (`san_pham_id`, `loai_san_pham_id`, `ten_san_pham`, `hinh_anh`, `gia_ban`, `gia_giam`, `mo_ta_chi_tiet`, `don_vi_tinh`, `trang_thai_san_pham`, `so_luong_trong_kho`, `isDelete`) VALUES
(2, 2, 'Sữa chua Đan Viên 150g', '{\"url\": \"link_to_image\"}', 8000, 0, 'Sữa chua Đan Viên 150g', 'Hộp', 1, 80, 0);
INSERT INTO `SanPham` (`san_pham_id`, `loai_san_pham_id`, `ten_san_pham`, `hinh_anh`, `gia_ban`, `gia_giam`, `mo_ta_chi_tiet`, `don_vi_tinh`, `trang_thai_san_pham`, `so_luong_trong_kho`, `isDelete`) VALUES
(3, 3, 'Sữa dinh dưỡng Nuti 180ml', '{\"url\": \"link_to_image\"}', 10000, 0, 'Sữa dinh dưỡng Nuti 180ml', 'Lon', 1, 120, 0);
INSERT INTO `SanPham` (`san_pham_id`, `loai_san_pham_id`, `ten_san_pham`, `hinh_anh`, `gia_ban`, `gia_giam`, `mo_ta_chi_tiet`, `don_vi_tinh`, `trang_thai_san_pham`, `so_luong_trong_kho`, `isDelete`) VALUES
(4, 4, 'Sữa hạnh nhân Almond Breeze 1L', '{\"url\": \"link_to_image\"}', 50000, 0, 'Sữa hạnh nhân Almond Breeze 1L', 'Chai', 1, 50, 0),
(5, 5, 'Sữa yến mạch Oatly 1L', '{\"url\": \"link_to_image\"}', 45000, 0, 'Sữa yến mạch Oatly 1L', 'Chai', 1, 60, 0),
(6, 6, 'Kem Cornetto Chocolate 110ml', '{\"url\": \"link_to_image\"}', 15000, 0, 'Kem Cornetto Chocolate 110ml', 'Hộp', 1, 70, 0),
(7, 7, 'Snack Oreo Chocolate 137g', '{\"url\": \"link_to_image\"}', 25000, 0, 'Snack Oreo Chocolate 137g', 'Hộp', 1, 90, 0),
(8, 8, 'Trà Lipton Yellow Label 500g', '{\"url\": \"link_to_image\"}', 30000, 0, 'Trà Lipton Yellow Label 500g', 'Gói', 1, 110, 0),
(9, 9, 'Trà sữa Tiger 500ml', '{\"url\": \"link_to_image\"}', 35000, 0, 'Trà sữa Tiger 500ml', 'Lon', 1, 80, 0),
(10, 10, 'Phô mai President 200g', '{\"url\": \"link_to_image\"}', 55000, 0, 'Phô mai President 200g', 'Hộp', 1, 100, 0);

INSERT INTO `VaiTro` (`vai_tro_id`, `vai_tro_tai_khoan`) VALUES
(1, 'admin');
INSERT INTO `VaiTro` (`vai_tro_id`, `vai_tro_tai_khoan`) VALUES
(2, 'user');
INSERT INTO `VaiTro` (`vai_tro_id`, `vai_tro_tai_khoan`) VALUES
(3, 'anonymous');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;