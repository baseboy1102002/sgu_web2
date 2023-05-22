-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 22, 2023 lúc 10:30 AM
-- Phiên bản máy phục vụ: 10.4.27-MariaDB
-- Phiên bản PHP: 8.0.25

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
  `so_luong` int(11) NOT NULL,
  `don_gia` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chi_tiet_don_hang`
--

INSERT INTO `chi_tiet_don_hang` (`id_donhang`, `sku_id`, `so_luong`, `don_gia`) VALUES
(1, 10, 1, 0),
(4, 10, 1, 0),
(5, 9, 1, 0),
(6, 8, 1, 0),
(6, 9, 1, 0),
(7, 8, 1, 0),
(7, 9, 1, 0),
(8, 8, 1, 0),
(8, 9, 1, 0),
(9, 8, 1, 0),
(9, 9, 1, 0),
(10, 8, 1, 0),
(10, 9, 1, 0),
(11, 54, 2, 15000000),
(11, 55, 2, 35000000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chi_tiet_gio_hang`
--

CREATE TABLE `chi_tiet_gio_hang` (
  `id_gio_hang` int(5) NOT NULL,
  `id_sku` int(5) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chi_tiet_gio_hang`
--

INSERT INTO `chi_tiet_gio_hang` (`id_gio_hang`, `id_sku`, `quantity`) VALUES
(4, 2, 1),
(4, 3, 1),
(4, 8, 1),
(4, 10, 1),
(4, 55, 1),
(7, 52, 1),
(7, 53, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chi_tiet_phieu_nhap`
--

CREATE TABLE `chi_tiet_phieu_nhap` (
  `id_phieunhap` int(5) NOT NULL,
  `id_sku` int(5) NOT NULL,
  `so_luong` int(11) NOT NULL,
  `don_gia` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chi_tiet_quyen`
--

CREATE TABLE `chi_tiet_quyen` (
  `id_nhom_quyen` int(11) NOT NULL,
  `id_chuc_nang` int(11) NOT NULL,
  `is_insert` int(1) NOT NULL,
  `is_update` int(1) NOT NULL,
  `is_delete` int(1) NOT NULL,
  `is_read` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chi_tiet_quyen`
--

INSERT INTO `chi_tiet_quyen` (`id_nhom_quyen`, `id_chuc_nang`, `is_insert`, `is_update`, `is_delete`, `is_read`) VALUES
(2, 1, 1, 1, 1, 1),
(2, 2, 1, 1, 1, 1),
(2, 3, 1, 1, 1, 1),
(2, 4, 1, 1, 1, 1),
(2, 5, 1, 1, 1, 1),
(2, 6, 1, 1, 1, 1),
(2, 7, 1, 1, 1, 1),
(3, 1, 0, 0, 0, 0),
(3, 2, 1, 1, 1, 1),
(3, 3, 0, 0, 0, 1),
(3, 4, 0, 0, 0, 0),
(3, 5, 0, 0, 0, 1),
(3, 6, 0, 0, 0, 0),
(3, 7, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chuc_nang`
--

CREATE TABLE `chuc_nang` (
  `id` int(5) NOT NULL,
  `ten_chuc_nang` varchar(30) NOT NULL,
  `code` varchar(30) NOT NULL,
  `icon` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chuc_nang`
--

INSERT INTO `chuc_nang` (`id`, `ten_chuc_nang`, `code`, `icon`) VALUES
(1, 'Tài khoản', 'account', 'fa-solid fa-users'),
(2, 'Sản phẩm', 'product', 'fa-solid fa-box-open'),
(3, 'Danh mục', 'category', 'fa-solid fa-list'),
(4, 'Thuộc tính', 'attribute', 'fas fa-tag'),
(5, 'Biến thể', 'variant', 'fas fa-transgender-alt'),
(6, 'Đơn hàng', 'ordernote', 'fa-solid fa-clipboard'),
(7, 'Phân quyền', 'permission', 'fas fa-user-lock');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ct_tt_bien_the_sp`
--

CREATE TABLE `ct_tt_bien_the_sp` (
  `skus_id` int(5) NOT NULL,
  `id_thuoc_tinh` int(5) NOT NULL,
  `id_gia_tri_tt` int(5) NOT NULL,
  `id_sp` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(11, 4, 8, 9),
(12, 1, 1, 38),
(12, 2, 11, 38),
(12, 3, 6, 38),
(13, 1, 9, 38),
(13, 2, 3, 38),
(13, 3, 6, 38),
(14, 1, 1, 37),
(14, 2, 3, 37),
(14, 3, 5, 37),
(15, 1, 9, 37),
(15, 2, 11, 37),
(15, 3, 6, 37),
(15, 4, 7, 37),
(16, 1, 1, 36),
(16, 2, 4, 36),
(16, 3, 5, 36),
(17, 1, 2, 35),
(17, 2, 3, 35),
(17, 3, 6, 35),
(18, 1, 1, 35),
(18, 2, 11, 35),
(18, 3, 6, 35),
(19, 1, 1, 34),
(19, 2, 3, 34),
(19, 3, 6, 34),
(19, 4, 7, 34),
(20, 1, 9, 34),
(20, 2, 3, 34),
(20, 3, 6, 34),
(21, 1, 1, 33),
(21, 2, 4, 33),
(21, 3, 5, 33),
(22, 1, 1, 33),
(22, 2, 3, 33),
(22, 3, 6, 33),
(22, 4, 7, 33),
(23, 1, 9, 32),
(23, 2, 3, 32),
(23, 3, 6, 32),
(24, 1, 9, 32),
(24, 2, 3, 32),
(24, 3, 6, 32),
(24, 4, 7, 32),
(25, 1, 1, 31),
(25, 2, 3, 31),
(25, 3, 6, 31),
(26, 1, 2, 30),
(26, 2, 3, 30),
(26, 3, 6, 30),
(27, 1, 2, 31),
(27, 2, 3, 31),
(27, 3, 5, 31),
(28, 1, 1, 29),
(28, 2, 3, 29),
(28, 3, 5, 29),
(29, 1, 1, 29),
(29, 2, 11, 29),
(29, 3, 6, 29),
(30, 1, 2, 28),
(30, 2, 3, 28),
(30, 3, 6, 28),
(31, 1, 2, 28),
(31, 2, 3, 28),
(31, 3, 6, 28),
(31, 4, 7, 28),
(32, 1, 9, 27),
(32, 2, 11, 27),
(32, 3, 6, 27),
(33, 1, 9, 26),
(33, 2, 11, 26),
(33, 3, 6, 26),
(34, 1, 9, 26),
(34, 2, 11, 26),
(34, 3, 6, 26),
(35, 1, 9, 25),
(35, 2, 11, 25),
(35, 3, 6, 25),
(35, 4, 7, 25),
(36, 1, 9, 25),
(36, 2, 11, 25),
(36, 3, 6, 25),
(37, 1, 1, 24),
(37, 2, 3, 24),
(37, 3, 6, 24),
(38, 1, 9, 23),
(38, 2, 3, 23),
(38, 3, 6, 23),
(39, 1, 1, 9),
(39, 2, 3, 9),
(39, 3, 6, 9),
(40, 1, 1, 9),
(40, 2, 3, 9),
(40, 3, 6, 9),
(40, 4, 7, 9),
(41, 1, 2, 11),
(41, 2, 3, 11),
(41, 3, 6, 11),
(42, 1, 1, 22),
(42, 2, 3, 22),
(42, 3, 5, 22),
(43, 1, 9, 21),
(43, 2, 11, 21),
(43, 3, 6, 21),
(43, 4, 7, 21),
(44, 1, 1, 20),
(44, 2, 3, 20),
(44, 3, 6, 20),
(45, 1, 1, 20),
(45, 2, 3, 20),
(45, 3, 6, 20),
(45, 4, 7, 20),
(46, 1, 1, 19),
(46, 2, 3, 19),
(46, 3, 6, 19),
(47, 1, 2, 18),
(47, 2, 3, 18),
(47, 3, 6, 18),
(48, 1, 2, 18),
(48, 2, 3, 18),
(48, 3, 6, 18),
(48, 4, 7, 18),
(49, 1, 2, 17),
(49, 2, 3, 17),
(49, 3, 6, 17),
(49, 4, 7, 17),
(50, 1, 1, 16),
(50, 2, 3, 16),
(50, 3, 6, 16),
(51, 1, 1, 16),
(51, 2, 3, 16),
(51, 3, 6, 16),
(51, 4, 7, 16),
(52, 1, 1, 15),
(52, 2, 3, 15),
(52, 3, 6, 15),
(53, 1, 2, 14),
(53, 2, 3, 14),
(53, 3, 5, 14),
(54, 1, 1, 13),
(54, 2, 4, 13),
(54, 3, 5, 13),
(55, 1, 9, 12),
(55, 2, 11, 12),
(55, 3, 6, 12),
(55, 4, 10, 12),
(56, 1, 2, 39),
(56, 2, 3, 39);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `danh_muc`
--

CREATE TABLE `danh_muc` (
  `id` int(5) NOT NULL,
  `ten_danh_muc` varchar(50) NOT NULL,
  `in_stock` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `danh_muc`
--

INSERT INTO `danh_muc` (`id`, `ten_danh_muc`, `in_stock`) VALUES
(1, 'Acer', 1),
(2, 'Dell', 1),
(3, 'HP', 1),
(4, 'Levono', 1),
(5, 'Asus', 1),
(6, 'Msi', 1),
(7, 'â', 0),
(8, 'ii', 0),
(9, 'ia', 0),
(10, 'aaa', 0);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `don_hang`
--

INSERT INTO `don_hang` (`id`, `id_tk`, `created_date`, `ten_nguoi_nhan`, `dia_chi`, `sdt`, `tong_tien`, `status`) VALUES
(1, 2, '2023-05-07 05:33:51', 'em iu', 'Tp.HCM', '0862863753', 54400000, 1),
(4, 2, '2023-05-07 06:47:06', 'em iu', 'Tp.HCM', '0862863753', 26450000, 1),
(5, 2, '2023-05-07 06:49:36', 'em iu', 'Tp.HCM', '0862863753', 27950000, 1),
(6, 2, '2023-05-07 06:52:03', 'em iu', 'Tp.HCM', '0862863753', 48400000, 0),
(7, 2, '2023-05-07 06:57:56', 'em iu', 'Tp.HCM', '0862863753', 48400000, 0),
(8, 2, '2023-05-07 06:59:05', 'em iu', 'Tp.HCM', '0862863753', 48400000, 0),
(9, 2, '2023-05-07 07:01:06', 'em iu', 'Tp.HCM', '0862863753', 48400000, 0),
(10, 2, '2023-05-07 07:03:16', 'em iu', 'Tp.HCM', '0862863753', 48400000, 1),
(11, 6, '2023-05-10 10:53:47', 'thai', 'hcm', '0362863753', 100000000, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `gia_tri_thuoc_tinh`
--

CREATE TABLE `gia_tri_thuoc_tinh` (
  `id` int(5) NOT NULL,
  `gia_tri` varchar(20) NOT NULL,
  `id_thuoc_tinh` int(5) NOT NULL,
  `is_delete` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `gia_tri_thuoc_tinh`
--

INSERT INTO `gia_tri_thuoc_tinh` (`id`, `gia_tri`, `id_thuoc_tinh`, `is_delete`) VALUES
(1, 'Intel core i5', 1, 0),
(2, 'Amd ryzen 5', 1, 0),
(3, '8G', 2, 0),
(4, '4G', 2, 0),
(5, '256GB', 3, 0),
(6, '512GB', 3, 0),
(7, 'GTX1650', 4, 0),
(8, 'RTX3050', 4, 0),
(9, 'Amd Ryzen 7', 1, 0),
(10, 'RTX3060', 4, 0),
(11, '16G', 2, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `gio_hang`
--

CREATE TABLE `gio_hang` (
  `id` int(5) NOT NULL,
  `id_tk` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `gio_hang`
--

INSERT INTO `gio_hang` (`id`, `id_tk`) VALUES
(4, 2),
(5, 5),
(7, 6);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhom_quyen`
--

CREATE TABLE `nhom_quyen` (
  `id` int(5) NOT NULL,
  `ten_nhom_quyen` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `nhom_quyen`
--

INSERT INTO `nhom_quyen` (`id`, `ten_nhom_quyen`) VALUES
(1, 'user'),
(2, 'admin'),
(3, 'admin quản lý sản phẩm');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phieu_nhap`
--

CREATE TABLE `phieu_nhap` (
  `id` int(5) NOT NULL,
  `created_date` datetime NOT NULL,
  `tong_tien` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(9, 'LaptopASUSTUFGamingFX', 'LaptopASUSTUFGamingFX', '645b50ac93fc5.jpg', 1, 5, '2023-04-30 11:16:37', '2023-05-10 15:07:08'),
(11, 'LaptopLenovoIdeapadGaming', 'LaptopLenovoIdeapadGaming', '645b50a1630e5.jpg', 1, 4, '2023-04-30 11:34:18', '2023-05-10 15:06:57'),
(12, 'AcerAspire3', 'AcerAspire3', '645b5097bbc17.png', 1, 1, '2023-05-10 13:10:21', '2023-05-10 15:06:47'),
(13, 'AcerAspire5', 'AcerAspire5', '645b508b897bc.png', 1, 1, '2023-05-10 13:11:55', '2023-05-10 15:06:35'),
(14, 'AcerAspireA5', 'AcerAspireA5', '645b507a4ff5f.jpg', 1, 1, '2023-05-10 13:12:29', '2023-05-10 15:06:18'),
(15, 'AcerGamingAspire7', 'AcerGamingAspire7', '645b506fb91a9.jpg', 1, 1, '2023-05-10 13:13:01', '2023-05-10 15:06:07'),
(16, 'AcerGamingNitro5', 'AcerGamingNitro5', '645b50660aed1.jpg', 1, 1, '2023-05-10 13:14:14', '2023-05-10 15:05:58'),
(17, 'AcerGamingPredatorHelios', 'AcerGamingPredatorHelios', '645b5059bb54f.png', 1, 1, '2023-05-10 13:16:27', '2023-05-10 15:05:45'),
(18, 'DellGamingG555', 'DellGamingG555', '645b504f9da47.jpg', 1, 2, '2023-05-10 13:17:11', '2023-05-10 15:05:35'),
(19, 'DellGamingG1555', 'DellGamingG1555', '645b503f8d477.jpg', 1, 2, '2023-05-10 13:17:59', '2023-05-10 15:05:19'),
(20, 'DellInspirionN5515', 'DellInspirionN5515', '645b5034eb65f.jpg', 1, 2, '2023-05-10 13:18:36', '2023-05-10 15:05:08'),
(21, 'DellInspiron3520', 'DellInspiron3520', '645b502992327.png', 1, 2, '2023-05-10 13:19:09', '2023-05-10 15:04:57'),
(22, 'DellInspiron7306', 'DellInspiron7306', '645b501ecee88.jpg', 1, 2, '2023-05-10 13:19:41', '2023-05-10 15:04:46'),
(23, 'laptop_asus_tuf_gaming_f15', 'laptop_asus_tuf_gaming_f15', '645b50144ad10.jpg', 1, 5, '2023-05-10 13:20:25', '2023-05-10 15:04:36'),
(24, 'LaptopAsusROGStrixScar', 'LaptopAsusROGStrixScar', '645b5008951a8.jpg', 1, 5, '2023-05-10 13:21:00', '2023-05-10 15:04:24'),
(25, 'LaptopAsusTUFA', 'LaptopAsusTUFA', '645b4ffda66c6.jpg', 1, 5, '2023-05-10 13:21:38', '2023-05-10 15:04:13'),
(26, 'LaptopASUSZenBookFlip', 'LaptopASUSZenBookFlip', '645b4ff14ab93.jpg', 1, 5, '2023-05-10 13:22:17', '2023-05-10 15:04:01'),
(27, 'LaptopGamingAsusROGStrixG', 'LaptopGamingAsusROGStrixG', '645b4fe6bd40f.jpg', 1, 5, '2023-05-10 13:23:16', '2023-05-10 15:03:50'),
(28, 'LaptopHP14SCF25', 'LaptopHP14SCF25', '645b4fcb92b17.jpg', 1, 3, '2023-05-10 13:24:12', '2023-05-10 15:03:23'),
(29, 'LaptopHPEliteBook', 'LaptopHPEliteBook', '645b4faf4cdff.jpg', 1, 3, '2023-05-10 13:24:47', '2023-05-10 15:02:55'),
(30, 'LaptopHPPavilion14', 'LaptopHPPavilion14', '645b4f9d2f8a7.jpg', 1, 3, '2023-05-10 13:25:28', '2023-05-10 15:02:37'),
(31, 'LaptopHPVictus', 'LaptopHPVictus', '645b4f908ac4a.jpg', 1, 3, '2023-05-10 13:25:57', '2023-05-10 15:02:24'),
(32, 'LaptopLenovoLegion', 'LaptopLenovoLegion', '645b4f7bc8985.jpg', 1, 4, '2023-05-10 13:26:47', '2023-05-10 15:02:03'),
(33, 'LaptopLenovoSlim7Pro', 'LaptopLenovoSlim7Pro', '645b4f6a0ab81.jpg', 1, 4, '2023-05-10 13:27:28', '2023-05-10 15:01:46'),
(34, 'LaptopLenovoThinkPadE15', 'LaptopLenovoThinkPadE15', '645b4f5a86887.jpg', 1, 4, '2023-05-10 13:28:01', '2023-05-10 15:01:30'),
(35, 'LaptopMSIGamingAlpha17', 'LaptopMSIGamingAlpha17', '645b4f4c8fd18.jpg', 1, 6, '2023-05-10 13:28:36', '2023-05-10 15:01:16'),
(36, 'LaptopMSIGamingGl75Leopard', 'LaptopMSIGamingGl75Leopard', '645b4f378cab3.jpg', 1, 6, '2023-05-10 13:29:06', '2023-05-10 15:00:55'),
(37, 'LaptopMSIGamingGF63', 'LaptopMSIGamingGF63', '645b4ee94cc35.jpg', 1, 6, '2023-05-10 13:29:32', '2023-05-10 14:59:37'),
(38, 'LaptopMSIModern14B11', 'LaptopMSIModern14B11', '645b4efc6044b.jpg', 1, 6, '2023-05-10 13:30:01', '2023-05-10 14:59:56'),
(39, 'abc', 'test', 'default.jpg', 1, 1, '2023-05-10 16:01:33', '2023-05-10 16:01:33');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `skus`
--

INSERT INTO `skus` (`id`, `sku_name`, `don_gia`, `so_luong`, `id_sp`, `in_stock`, `created_date`, `modified_date`) VALUES
(1, 'AN-515 57-53F9 (i5/8G/256GB/RTX3050)', 20990000, 50, 1, 1, '2023-05-05 08:33:44', '2023-05-05 08:35:31'),
(2, 'AN515 45 R6EV (r5/8G/512GB/GTX1650)', 18990000, 40, 1, 1, '2023-05-05 08:34:05', '2023-05-05 08:34:05'),
(3, '8529 BLK (i5/4G/256GB)', 11490000, 60, 2, 1, '2023-05-05 08:34:08', '2023-05-05 08:34:08'),
(4, '5174 BLK (i5/8G/512GB)', 19490000, 35, 2, 1, '2023-05-05 08:33:55', '2023-05-05 08:33:55'),
(5, 'BD5VN r5/8G/512GB/GTX1650', 15990000, 25, 3, 1, '2023-05-05 08:33:58', '2023-05-05 08:33:58'),
(6, 'BD5VN r5/8G/512GB/RTX3050', 17990000, 12, 3, 1, '2023-05-05 08:34:03', '2023-05-05 08:34:03'),
(7, 'VTE54 r5/8G/512G/GTX1650', 16990000, 28, 4, 1, '2023-05-05 08:34:24', '2023-05-05 08:34:24'),
(8, 'VTE54 r5/16G/512G/RTX3050', 20450000, 15, 4, 1, '2023-05-05 08:34:27', '2023-05-05 08:34:27'),
(9, 'OME012 r7/16G/512G/RTX3060', 27950000, 0, 5, 1, '2023-05-05 08:34:34', '2023-05-05 08:34:34'),
(10, 'LVLEG i5/8G/512G/RTX3060', 26450000, 11, 6, 1, '2023-05-05 08:34:37', '2023-05-05 08:34:37'),
(11, 'sku_test_name9', 15000000, 6, 9, 1, '2023-05-05 08:34:41', '2023-05-05 08:37:15'),
(12, 'OMKU i5/16G/512G', 20000000, 20, 38, 1, '2023-05-10 08:32:30', '2023-05-10 08:32:30'),
(13, 'OMKU ryzen7/8G/512G/RTX3060', 18500000, 30, 38, 1, '2023-05-10 08:34:06', '2023-05-10 08:34:06'),
(14, 'NKOT i5/8G/256GB', 19000000, 25, 37, 1, '2023-05-10 08:36:07', '2023-05-10 08:36:07'),
(15, 'NKOT ryzen7/16G/512GB/GTX1650', 25000000, 18, 37, 1, '2023-05-10 08:37:12', '2023-05-10 08:37:12'),
(16, 'MMO5 i5/4G/256GB', 15000000, 30, 36, 1, '2023-05-10 08:37:58', '2023-05-10 08:37:58'),
(17, 'NP08 ryzen5/8G/512GB', 2000000, 15, 35, 1, '2023-05-10 08:39:30', '2023-05-10 08:39:30'),
(18, 'NP08 i5/16G/512GB', 19500000, 20, 35, 1, '2023-05-10 08:40:06', '2023-05-10 08:40:06'),
(19, 'LM16/i5/8G/512GB/GTX1650', 21000000, 31, 34, 1, '2023-05-10 08:41:20', '2023-05-10 08:41:20'),
(20, 'LM16/ryzen7/8G/512GB', 200000, 27, 34, 1, '2023-05-10 08:42:15', '2023-05-10 08:42:15'),
(21, 'AS01/i5/4G/256GB', 1300000, 30, 33, 1, '2023-05-10 08:43:12', '2023-05-10 08:43:12'),
(22, 'AS01/i5/8G/512GB/GTX1650', 2000000, 20, 33, 1, '2023-05-10 08:43:59', '2023-05-10 08:43:59'),
(23, 'Q2MO ryzen7/8G/512GB', 2000000, 25, 32, 1, '2023-05-10 08:44:51', '2023-05-10 08:44:51'),
(24, 'Q2MO ryzen7/8G/512GB/GTX1650', 25000000, 23, 32, 1, '2023-05-10 08:45:41', '2023-05-10 08:45:41'),
(25, 'LO9T i5/8G/512GB', 18500000, 33, 31, 1, '2023-05-10 08:46:27', '2023-05-10 08:46:27'),
(26, 'W5ET ryzen5/8G/512GB', 18000000, 30, 30, 1, '2023-05-10 08:47:30', '2023-05-10 08:47:30'),
(27, 'W5ET ryzen5/8G/256GB', 17000000, 20, 31, 1, '2023-05-10 08:48:05', '2023-05-10 08:48:05'),
(28, 'GGHT i5/8G/256GB', 19000000, 20, 29, 1, '2023-05-10 08:49:01', '2023-05-10 08:49:01'),
(29, 'GGHT i5/16G/512GB', 23000000, 15, 29, 1, '2023-05-10 08:49:36', '2023-05-10 08:49:36'),
(30, 'JK10 ryzen5/8G/512GB', 2000000, 13, 28, 1, '2023-05-10 08:50:49', '2023-05-10 08:50:49'),
(31, 'JK10 ryzen5/8G/512GB/GTX1650', 21000000, 10, 28, 1, '2023-05-10 08:51:27', '2023-05-10 08:51:27'),
(32, 'P0TU/ryzen7/16G/512GB', 2400000, 26, 27, 1, '2023-05-10 08:53:09', '2023-05-10 08:53:09'),
(33, 'L0TU/ryzen7/16G/512GB', 23000000, 20, 26, 1, '2023-05-10 08:53:49', '2023-05-10 08:53:49'),
(34, 'L0TU/ryzen7/16G/512GB/RTX3060', 2900000, 19, 26, 1, '2023-05-10 08:54:37', '2023-05-10 08:54:37'),
(35, 'GPL1/ryzen7/16G/512GB/GTX1650', 30000000, 35, 25, 1, '2023-05-10 08:56:03', '2023-05-10 08:56:03'),
(36, 'GPL1/ryzen7/16G/512GB', 2400000, 25, 25, 1, '2023-05-10 08:56:40', '2023-05-10 08:56:40'),
(37, 'HTP4/i5/8G/512GB', 22000000, 34, 24, 1, '2023-05-10 08:58:02', '2023-05-10 08:58:02'),
(38, 'LLT1/ryzen7/8G/512GB', 20000000, 29, 23, 1, '2023-05-10 08:58:51', '2023-05-10 08:58:51'),
(39, 'JJH/i5/8G/512GB', 18000000, 23, 9, 1, '2023-05-10 09:01:35', '2023-05-10 09:01:35'),
(40, 'JJH/i5/8G/512GB/GTX1650', 25000000, 30, 9, 1, '2023-05-10 09:02:06', '2023-05-10 09:02:06'),
(41, 'KGLR/ryzen5/8G/512GB', 200000000, 16, 11, 1, '2023-05-10 09:02:55', '2023-05-10 09:02:55'),
(42, 'HHP/i5/8G/256GB', 17000000, 20, 22, 1, '2023-05-10 09:03:28', '2023-05-10 09:03:28'),
(43, 'KBG4/ryzen7/16G/512GB/GTX1650', 29000000, 20, 21, 1, '2023-05-10 09:04:19', '2023-05-10 09:04:19'),
(44, 'CLM/i5/8G/512GB', 1800000, 23, 20, 1, '2023-05-10 09:05:11', '2023-05-10 09:05:11'),
(45, 'CLM/i5/8G/512GB/GTX1650', 3000000, 29, 20, 1, '2023-05-10 09:05:43', '2023-05-10 09:05:43'),
(46, 'AHK9/i5/8G/512GB', 19000000, 29, 19, 1, '2023-05-10 09:06:15', '2023-05-10 09:06:15'),
(47, 'LLL/ryzen5/8G/512GB', 2000000, 20, 18, 1, '2023-05-10 09:06:54', '2023-05-10 09:06:54'),
(48, 'LLL/ryzen5/8G/512GB/GTX1650', 27000000, 30, 18, 1, '2023-05-10 09:07:34', '2023-05-10 09:07:34'),
(49, 'AAA/ryzen5/8G/512GB/GTX1650', 27000000, 28, 17, 1, '2023-05-10 09:08:13', '2023-05-10 09:08:13'),
(50, 'MNG/i5/8G/512GB', 20000000, 18, 16, 1, '2023-05-10 09:08:53', '2023-05-10 09:08:53'),
(51, 'MNG/i5/8G/512GB/GTX1650', 265000000, 30, 16, 1, '2023-05-10 09:09:27', '2023-05-10 09:09:27'),
(52, 'JBN/i5/8G/512GB', 18000000, 29, 15, 1, '2023-05-10 09:09:59', '2023-05-10 09:09:59'),
(53, 'JBM/ryzen5/8G/256GB', 18000000, 30, 14, 1, '2023-05-10 09:10:40', '2023-05-10 09:10:40'),
(54, 'BBN/i5/4G/256GB', 15000000, 28, 13, 1, '2023-05-10 09:11:15', '2023-05-10 09:11:15'),
(55, 'KHL/ryzen7/16G/512GB/RTX3060', 35000000, 28, 12, 1, '2023-05-10 09:12:10', '2023-05-10 09:12:10'),
(56, 'xyz', 20, 20, 39, 1, '2023-05-10 11:03:37', '2023-05-10 11:03:37');

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
  `status` int(1) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tai_khoan`
--

INSERT INTO `tai_khoan` (`id`, `ten_tk`, `password`, `email`, `id_nhom_quyen`, `status`, `is_deleted`) VALUES
(1, 'user', 'user', 'user@gmail.com', 1, 1, 0),
(2, 'admin', 'admin', 'admin@gmail.com', 2, 1, 0),
(5, 'thai', '123456', 'thai@gmail.com', 1, 1, 0),
(6, 'abc', '123456', 'adas@gmail.com', 1, 1, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thuoc_tinh`
--

CREATE TABLE `thuoc_tinh` (
  `id` int(5) NOT NULL,
  `ten_thuoc_tinh` varchar(20) NOT NULL,
  `is_delete` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `thuoc_tinh`
--

INSERT INTO `thuoc_tinh` (`id`, `ten_thuoc_tinh`, `is_delete`) VALUES
(1, 'cpu', 0),
(2, 'ram', 0),
(3, 'ssd', 0),
(4, 'vga', 0);

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
-- Chỉ mục cho bảng `chi_tiet_gio_hang`
--
ALTER TABLE `chi_tiet_gio_hang`
  ADD PRIMARY KEY (`id_gio_hang`,`id_sku`),
  ADD KEY `FK_ctgh_skus` (`id_sku`);

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
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `danh_muc`
--
ALTER TABLE `danh_muc`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `don_hang`
--
ALTER TABLE `don_hang`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `gia_tri_thuoc_tinh`
--
ALTER TABLE `gia_tri_thuoc_tinh`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `gio_hang`
--
ALTER TABLE `gio_hang`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `nhom_quyen`
--
ALTER TABLE `nhom_quyen`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `phieu_nhap`
--
ALTER TABLE `phieu_nhap`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `san_pham`
--
ALTER TABLE `san_pham`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT cho bảng `skus`
--
ALTER TABLE `skus`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT cho bảng `tai_khoan`
--
ALTER TABLE `tai_khoan`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
  ADD CONSTRAINT `FK_ctdh_donhang` FOREIGN KEY (`id_donhang`) REFERENCES `don_hang` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_ctdh_skus` FOREIGN KEY (`sku_id`) REFERENCES `skus` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `chi_tiet_gio_hang`
--
ALTER TABLE `chi_tiet_gio_hang`
  ADD CONSTRAINT `FK_ctgh_giohang` FOREIGN KEY (`id_gio_hang`) REFERENCES `gio_hang` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_ctgh_skus` FOREIGN KEY (`id_sku`) REFERENCES `skus` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
