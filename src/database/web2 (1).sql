-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 06, 2023 lúc 04:02 AM
-- Phiên bản máy phục vụ: 10.4.25-MariaDB
-- Phiên bản PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `web2`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chi_tiet_don_hang`
--

CREATE TABLE `chi_tiet_don_hang` (
  `id_donhang` int(5) NOT NULL,
  `sku_id` int(5) NOT NULL,
  `so_luong` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chi_tiet_gio_hang`
--

CREATE TABLE `chi_tiet_gio_hang` (
  `id_gio_hang` int(5) NOT NULL,
  `id_sku` int(5) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chi_tiet_phieu_nhap`
--

CREATE TABLE `chi_tiet_phieu_nhap` (
  `id_phieunhap` int(5) NOT NULL,
  `id_sku` int(5) NOT NULL,
  `so_luong` int(11) NOT NULL,
  `don_gia` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chi_tiet_quyen`
--

CREATE TABLE `chi_tiet_quyen` (
  `id_nhom_quyen` int(11) NOT NULL,
  `id_chuc_nang` int(11) NOT NULL,
  `insert` int(1) NOT NULL,
  `update` int(1) NOT NULL,
  `delete` int(1) NOT NULL,
  `read` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chuc_nang`
--

CREATE TABLE `chuc_nang` (
  `id` int(5) NOT NULL,
  `ten_chuc_nang` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ct_tt_bien_the_sp`
--

CREATE TABLE `ct_tt_bien_the_sp` (
  `skus_id` int(5) NOT NULL,
  `id_thuoc_tinh` int(5) NOT NULL,
  `id_gia_tri_tt` int(5) NOT NULL,
  `id_sp` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `ct_tt_bien_the_sp`
--

INSERT INTO `ct_tt_bien_the_sp` (`skus_id`, `id_thuoc_tinh`, `id_gia_tri_tt`, `id_sp`) VALUES
(1, 1, 1, 1),
(1, 2, 3, 1),
(1, 3, 5, 1),
(1, 4, 8, 1),
(2, 1, 2, 1),
(2, 2, 3, 1),
(2, 3, 6, 1),
(2, 4, 7, 1),
(3, 1, 1, 2),
(3, 2, 4, 2),
(3, 3, 5, 2),
(4, 1, 1, 2),
(4, 2, 3, 2),
(4, 3, 6, 2),
(5, 1, 2, 3),
(5, 2, 3, 3),
(5, 3, 6, 3),
(5, 4, 7, 3),
(6, 1, 2, 3),
(6, 2, 3, 3),
(6, 3, 6, 3),
(6, 4, 8, 3),
(7, 1, 2, 4),
(7, 2, 3, 4),
(7, 3, 6, 4),
(7, 4, 7, 4),
(8, 1, 2, 4),
(8, 2, 11, 4),
(8, 3, 6, 4),
(8, 4, 8, 4),
(9, 1, 9, 5),
(9, 2, 11, 5),
(9, 3, 6, 5),
(9, 4, 10, 5),
(10, 1, 1, 6),
(10, 2, 3, 6),
(10, 3, 6, 6),
(10, 4, 10, 6),
(11, 1, 9, 9),
(11, 2, 11, 9),
(11, 3, 6, 9),
(11, 4, 8, 9);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `danh_muc`
--

CREATE TABLE `danh_muc` (
  `id` int(5) NOT NULL,
  `ten_danh_muc` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `danh_muc`
--

INSERT INTO `danh_muc` (`id`, `ten_danh_muc`) VALUES
(1, 'Acer'),
(2, 'Dell'),
(3, 'HP'),
(4, 'Levono'),
(5, 'Asus'),
(6, 'Msi');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `don_hang`
--

CREATE TABLE `don_hang` (
  `id` int(5) NOT NULL,
  `id_tk` int(5) NOT NULL,
  `created_date` datetime NOT NULL,
  `ten_nguoi_nhan` varchar(100) NOT NULL,
  `dia_chi` varchar(255) NOT NULL,
  `sdt` varchar(15) NOT NULL,
  `tong_tien` double NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `gia_tri_thuoc_tinh`
--

CREATE TABLE `gia_tri_thuoc_tinh` (
  `id` int(5) NOT NULL,
  `gia_tri` varchar(20) NOT NULL,
  `id_thuoc_tinh` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `gia_tri_thuoc_tinh`
--

INSERT INTO `gia_tri_thuoc_tinh` (`id`, `gia_tri`, `id_thuoc_tinh`) VALUES
(1, 'Intel core i5', 1),
(2, 'Amd ryzen 5', 1),
(3, '8G', 2),
(4, '4G', 2),
(5, '256GB', 3),
(6, '512GB', 3),
(7, 'GTX1650', 4),
(8, 'RTX3050', 4),
(9, 'Amd Ryzen 7', 1),
(10, 'RTX3060', 4),
(11, '16G', 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `gio_hang`
--

CREATE TABLE `gio_hang` (
  `id` int(5) NOT NULL,
  `id_tk` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhom_quyen`
--

CREATE TABLE `nhom_quyen` (
  `id` int(5) NOT NULL,
  `ten_nhom_quyen` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `nhom_quyen`
--

INSERT INTO `nhom_quyen` (`id`, `ten_nhom_quyen`) VALUES
(1, 'user'),
(2, 'admin');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phieu_nhap`
--

CREATE TABLE `phieu_nhap` (
  `id` int(5) NOT NULL,
  `created_date` datetime NOT NULL,
  `tong_tien` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `san_pham`
--

CREATE TABLE `san_pham` (
  `id` int(5) NOT NULL,
  `ten_sp` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `img_path` varchar(50) NOT NULL,
  `in_stock` int(1) NOT NULL,
  `id_danh_muc` int(5) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `san_pham`
--

INSERT INTO `san_pham` (`id`, `ten_sp`, `description`, `img_path`, `in_stock`, `id_danh_muc`, `created_date`, `modified_date`) VALUES
(1, 'Acer Nitro 5 Eagle', 'Mô tả sản phẩm test', '644d15752ce79.png', 1, 1, '2023-04-30 11:14:43', '2023-04-30 11:23:09'),
(2, 'Dell Inspiron 5515', 'Mô tả sản phẩm test', '644d15ad0255e.jpg', 1, 2, '2023-04-30 11:14:53', '2023-04-30 11:23:26'),
(3, 'MSI Bravo 15', 'Mô tả sản phẩm test', '644d17354790d.png', 1, 6, '2023-04-30 11:15:07', '2023-04-30 11:23:37'),
(4, 'HP Victus 16', 'Mô tả sản phẩm test', '644d14de5eeee.jpg', 1, 3, '2023-04-30 11:15:18', '2023-04-30 11:23:49'),
(5, 'HP Omen', 'Mô tả sản phẩm test', '644d15318b4dd.jpg', 1, 3, '2023-04-30 11:15:48', '2023-04-30 11:24:12'),
(6, 'Levono Legion 5', 'Mô tả sản phẩm test', '644d160976dad.jpg', 1, 4, '2023-04-30 11:16:04', '2023-04-30 11:24:23'),
(8, 'Acer Aspire 5', 'Mô tả sản phẩm test', '644d10c71f61d.png', 1, 1, '2023-04-30 11:14:32', '2023-04-30 11:24:34'),
(9, 'test12', 'Mô tả sản phẩm test', '644d4a51e6dc8.jpg', 1, 2, '2023-04-30 11:16:37', '2023-04-30 11:24:44'),
(11, 'new san pham test', 'siuuuuu', 'default.jpg', 1, 4, '2023-04-30 11:34:18', '2023-04-30 11:34:18');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `skus`
--

CREATE TABLE `skus` (
  `id` int(5) NOT NULL,
  `sku_name` varchar(50) NOT NULL,
  `don_gia` double NOT NULL,
  `so_luong` int(11) NOT NULL,
  `id_sp` int(5) NOT NULL,
  `in_stock` int(1) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `skus`
--

INSERT INTO `skus` (`id`, `sku_name`, `don_gia`, `so_luong`, `id_sp`, `in_stock`, `created_date`, `modified_date`) VALUES
(1, 'AN-515 57-53F9 (i5/8G/256GB/RTX3050)', 20990000, 50, 1, 0, '2023-05-05 08:33:44', '2023-05-05 08:35:31'),
(2, 'AN515 45 R6EV (r5/8G/512GB/GTX1650)', 18990000, 40, 1, 0, '2023-05-05 08:34:05', '2023-05-05 08:34:05'),
(3, '8529 BLK (i5/4G/256GB)', 11490000, 60, 2, 0, '2023-05-05 08:34:08', '2023-05-05 08:34:08'),
(4, '5174 BLK (i5/8G/512GB)', 19490000, 35, 2, 0, '2023-05-05 08:33:55', '2023-05-05 08:33:55'),
(5, 'BD5VN r5/8G/512GB/GTX1650', 15990000, 25, 3, 1, '2023-05-05 08:33:58', '2023-05-05 08:33:58'),
(6, 'BD5VN r5/8G/512GB/RTX3050', 17990000, 12, 3, 1, '2023-05-05 08:34:03', '2023-05-05 08:34:03'),
(7, 'VTE54 r5/8G/512G/GTX1650', 16990000, 30, 4, 1, '2023-05-05 08:34:24', '2023-05-05 08:34:24'),
(8, 'VTE54 r5/16G/512G/RTX3050', 20450000, 22, 4, 1, '2023-05-05 08:34:27', '2023-05-05 08:34:27'),
(9, 'OME012 r7/16G/512G/RTX3060', 27950000, 8, 5, 1, '2023-05-05 08:34:34', '2023-05-05 08:34:34'),
(10, 'LVLEG i5/8G/512G/RTX3060', 26450000, 14, 6, 1, '2023-05-05 08:34:37', '2023-05-05 08:34:37'),
(11, 'sku_test_name9', 15000000, 10, 9, 1, '2023-05-05 08:34:41', '2023-05-05 08:37:15');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tai_khoan`
--

CREATE TABLE `tai_khoan` (
  `id` int(5) NOT NULL,
  `ten_tk` varchar(40) NOT NULL,
  `password` varchar(16) NOT NULL,
  `email` varchar(50) NOT NULL,
  `id_nhom_quyen` int(5) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `tai_khoan`
--

INSERT INTO `tai_khoan` (`id`, `ten_tk`, `password`, `email`, `id_nhom_quyen`, `status`) VALUES
(1, 'user', 'user', 'user@gmail.com', 1, 1),
(2, 'admin', 'admin', 'admin@gmail.com', 2, 1),
(5, 'thai', '123456', 'thai@gmail.com', 1, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thuoc_tinh`
--

CREATE TABLE `thuoc_tinh` (
  `id` int(5) NOT NULL,
  `ten_thuoc_tinh` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `thuoc_tinh`
--

INSERT INTO `thuoc_tinh` (`id`, `ten_thuoc_tinh`) VALUES
(1, 'cpu'),
(2, 'ram'),
(3, 'ssd'),
(4, 'vga');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `chi_tiet_don_hang`
--
ALTER TABLE `chi_tiet_don_hang`
  ADD PRIMARY KEY (`id_donhang`,`sku_id`),
  ADD KEY `FK_ctdh_skus` (`sku_id`),
  ADD KEY `FK_ctdh_donhang` (`id_donhang`);

--
-- Chỉ mục cho bảng `chi_tiet_phieu_nhap`
--
ALTER TABLE `chi_tiet_phieu_nhap`
  ADD PRIMARY KEY (`id_phieunhap`,`id_sku`),
  ADD KEY `FK_ctpn_skus` (`id_sku`),
  ADD KEY `FK_ctpn_phieunhap` (`id_phieunhap`);

--
-- Chỉ mục cho bảng `chi_tiet_quyen`
--
ALTER TABLE `chi_tiet_quyen`
  ADD PRIMARY KEY (`id_nhom_quyen`,`id_chuc_nang`),
  ADD KEY `FK_ctq_chuc_nang` (`id_chuc_nang`),
  ADD KEY `FK_ctq_nhom_quyen` (`id_nhom_quyen`) USING BTREE;

--
-- Chỉ mục cho bảng `chuc_nang`
--
ALTER TABLE `chuc_nang`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `ct_tt_bien_the_sp`
--
ALTER TABLE `ct_tt_bien_the_sp`
  ADD PRIMARY KEY (`skus_id`,`id_thuoc_tinh`),
  ADD KEY `FK_btsp_thuoc_tinh` (`id_thuoc_tinh`),
  ADD KEY `FK_btsp_SKUs` (`skus_id`) USING BTREE,
  ADD KEY `FK_btsp_sanpham` (`id_sp`),
  ADD KEY `FK_btsp_giatrithuoctinh` (`id_gia_tri_tt`);

--
-- Chỉ mục cho bảng `danh_muc`
--
ALTER TABLE `danh_muc`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `don_hang`
--
ALTER TABLE `don_hang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_dh_taikhoan` (`id_tk`);

--
-- Chỉ mục cho bảng `gia_tri_thuoc_tinh`
--
ALTER TABLE `gia_tri_thuoc_tinh`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_gttt_thuoctinh` (`id_thuoc_tinh`);

--
-- Chỉ mục cho bảng `gio_hang`
--
ALTER TABLE `gio_hang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_gh_taikhoan` (`id_tk`);

--
-- Chỉ mục cho bảng `nhom_quyen`
--
ALTER TABLE `nhom_quyen`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `phieu_nhap`
--
ALTER TABLE `phieu_nhap`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `san_pham`
--
ALTER TABLE `san_pham`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_sp_danhmuc` (`id_danh_muc`);

--
-- Chỉ mục cho bảng `skus`
--
ALTER TABLE `skus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_skus_sanpham` (`id_sp`);

--
-- Chỉ mục cho bảng `tai_khoan`
--
ALTER TABLE `tai_khoan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_tk_nhomquyen` (`id_nhom_quyen`);

--
-- Chỉ mục cho bảng `thuoc_tinh`
--
ALTER TABLE `thuoc_tinh`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `chuc_nang`
--
ALTER TABLE `chuc_nang`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `danh_muc`
--
ALTER TABLE `danh_muc`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `don_hang`
--
ALTER TABLE `don_hang`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `gia_tri_thuoc_tinh`
--
ALTER TABLE `gia_tri_thuoc_tinh`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `gio_hang`
--
ALTER TABLE `gio_hang`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `nhom_quyen`
--
ALTER TABLE `nhom_quyen`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `phieu_nhap`
--
ALTER TABLE `phieu_nhap`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `san_pham`
--
ALTER TABLE `san_pham`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `skus`
--
ALTER TABLE `skus`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `tai_khoan`
--
ALTER TABLE `tai_khoan`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `thuoc_tinh`
--
ALTER TABLE `thuoc_tinh`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `chi_tiet_don_hang`
--
ALTER TABLE `chi_tiet_don_hang`
  ADD CONSTRAINT `FK_ctdh_donhang` FOREIGN KEY (`id_donhang`) REFERENCES `don_hang` (`id`),
  ADD CONSTRAINT `FK_ctdh_skus` FOREIGN KEY (`sku_id`) REFERENCES `skus` (`id`);

--
-- Các ràng buộc cho bảng `chi_tiet_phieu_nhap`
--
ALTER TABLE `chi_tiet_phieu_nhap`
  ADD CONSTRAINT `FK_ctpn_phieunhap` FOREIGN KEY (`id_phieunhap`) REFERENCES `phieu_nhap` (`id`),
  ADD CONSTRAINT `FK_ctpn_skus` FOREIGN KEY (`id_sku`) REFERENCES `skus` (`id`);

--
-- Các ràng buộc cho bảng `chi_tiet_quyen`
--
ALTER TABLE `chi_tiet_quyen`
  ADD CONSTRAINT `FK_ctq_chuc_nang` FOREIGN KEY (`id_chuc_nang`) REFERENCES `chuc_nang` (`id`),
  ADD CONSTRAINT `FK_ctq_nhom_quyen` FOREIGN KEY (`id_nhom_quyen`) REFERENCES `nhom_quyen` (`id`);

--
-- Các ràng buộc cho bảng `ct_tt_bien_the_sp`
--
ALTER TABLE `ct_tt_bien_the_sp`
  ADD CONSTRAINT `FK_btsp_SKUs` FOREIGN KEY (`skus_id`) REFERENCES `skus` (`id`),
  ADD CONSTRAINT `FK_btsp_giatrithuoctinh` FOREIGN KEY (`id_gia_tri_tt`) REFERENCES `gia_tri_thuoc_tinh` (`id`),
  ADD CONSTRAINT `FK_btsp_sanpham` FOREIGN KEY (`id_sp`) REFERENCES `san_pham` (`id`),
  ADD CONSTRAINT `FK_btsp_thuoc_tinh` FOREIGN KEY (`id_thuoc_tinh`) REFERENCES `thuoc_tinh` (`id`);

--
-- Các ràng buộc cho bảng `don_hang`
--
ALTER TABLE `don_hang`
  ADD CONSTRAINT `FK_dh_taikhoan` FOREIGN KEY (`id_tk`) REFERENCES `tai_khoan` (`id`);

--
-- Các ràng buộc cho bảng `gia_tri_thuoc_tinh`
--
ALTER TABLE `gia_tri_thuoc_tinh`
  ADD CONSTRAINT `FK_gttt_thuoctinh` FOREIGN KEY (`id_thuoc_tinh`) REFERENCES `thuoc_tinh` (`id`);

--
-- Các ràng buộc cho bảng `gio_hang`
--
ALTER TABLE `gio_hang`
  ADD CONSTRAINT `FK_gh_taikhoan` FOREIGN KEY (`id_tk`) REFERENCES `tai_khoan` (`id`);

--
-- Các ràng buộc cho bảng `san_pham`
--
ALTER TABLE `san_pham`
  ADD CONSTRAINT `FK_sp_danhmuc` FOREIGN KEY (`id_danh_muc`) REFERENCES `danh_muc` (`id`);

--
-- Các ràng buộc cho bảng `skus`
--
ALTER TABLE `skus`
  ADD CONSTRAINT `FK_skus_sanpham` FOREIGN KEY (`id_sp`) REFERENCES `san_pham` (`id`);

--
-- Các ràng buộc cho bảng `tai_khoan`
--
ALTER TABLE `tai_khoan`
  ADD CONSTRAINT `FK_tk_nhomquyen` FOREIGN KEY (`id_nhom_quyen`) REFERENCES `nhom_quyen` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
