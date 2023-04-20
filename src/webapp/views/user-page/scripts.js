


// database sản phẩm có sẵn hiện thị web => tự tạo sẵn ?
// dùng object constructor để thêm, sửa, xóa sản phẩm (admin page) ?

function product(id, name, price, quantity ,background_image, categoryID, description) {
    this.id = id,
    this.name = name;
    this.price = price + " đ";
    this.quantity = quantity;
    this.background_image = background_image;
    this.categoryID = categoryID;
    this.description = description;
}

let productsDB = 
[
    new product ("1",
    "Dell Inspiron 7506 2 in 1 (i7506-5903SLV)",
    "18.790.000",
    100,
    "./assets/products_img/DellInspiron75062in1i7506-5903SLV.png",
    "6",
    `- CPU: Intel® Core ™ i5-1135G7 
    - Màn hình: 15.5-inch Full HD (1920x1080)
    - RAM: 8GB Soldered LPDDR4x-4267MHz
    - Đồ họa: Integrated Intel Iris Xe Graphics
    - Lưu trữ: 512GB SSD M.2 224230 PCIe 3.0x4 NVMe
    - Hệ điều hành:Windows 11 Home 64
    - pin:4 Cell, 53WHr
    - Khối lượng:1.9Kg`),
    new product ("2",
    "Acer Gaming Nitro 5 AN515-57-71VV (NH.QENSV.005)",
    "24.999.000",
    100,
    "./assets/products_img/AcerGamingNitro5AN515-57-71VVNH.QENSV.005.jpg",
    "1",
    `- CPU:  Intel core i7 11800H
    - Màn hình: 15.6 inch FHD 144Hz
    - RAM: 8GB
    - Đồ họa: NVIDIA RTX3050 4G 
    - Lưu trữ:  512GB SSD
    - Hệ điều hành: Win 11
    - pin: 57.5 Wh, 4-cell
    - Khối lượng:2.2 kg`),
    new product ("3",
    "MSI Modern 14 B11SBU 668VN",
    "19.490.000",
    100,
    "./assets/products_img/LaptopMSIModern14B11SBU668VN.jpg",
    "2",
    `- CPU: Intel Core i5-1155G7 ( 2.5 GHz - 4.5 GHz / 8MB / 4 nhân, 8 luồng )
    - Màn hình: 14" ( 1920 x 1080 ) Full HD IPS không cảm ứng , Màn hình chống lóa , HD webcam
    - RAM: 1 x 8GB DDR4 3200MHz ( 1 Khe cắm / Hỗ trợ tối đa 32GB )
    - Đồ họa: GeForce MX450 2GB GDDR5 / Intel Iris Xe Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 10 Home 64-bit
    - Pin: 3 cell Pin liền
    - Khôí lượng: 1.3kg`),
    new product ("4",
    "Acer Gaming Predator Helios 300 PH315-55-76KG (NH.QGPSV.001)",
    "41.499.000",
    100,
    "./assets/products_img/AcerGamingPredatorHelios300PH315-55-76KGNH.QGPSV.001.png",
    "1",
    `- CPU: Intel Core i7 12700H
    - Màn hình:  15.6 inch QHD 165hz
    - RAM:16GB
    - Đồ họa:Nvidia RTX3060 6G 
    - Lưu trữ: 512GB SSD
    - Hệ điều hành:Win 11
    - pin:	4 Cell 90 WHrs
    - Khối lượng: 2.4 kg`),
    new product ("5",
    "Asus TUF A15 FA507RC-HN051W",
    "22.890.000",
    100,
    "./assets/products_img/LaptopAsusTUFA15FA507RC-HN051W.jpg",
    "3",
    `- CPU: AMD Ryzen 7 6800H
    - Màn hình: 15.6" IPS (1920 x 1080),144Hz, IPS Panel
    - RAM: 1 x 8GB DDR4 3200MHz
    - Đồ họa: RTX 3050 4GB GDDR6 / Intel UHD Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11
    - Pin: 3-cell, 48WHrs Pin liền
    - Khối lượng: 2.2kg`),
    new product ("6",
    "HP Pavilion Aero 13-BE0229AU 64U91PA",
    "17.990.000",
    100,
    "./assets/products_img/LaptopHPPavilionAero13-BE0229AU64U91PA.jpg",
    "5",
    `- CPU: AMD Ryzen 7 5800U
    - Màn hình: 13.3"1920 x 1080 pixels (FullHD),Tấm nền IPS
    - RAM: 8 GB DDR4-3200 MHz RAM (onboard)
    - Đồ họa: AMD Radeon Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe 
    - Hệ điều hành: Windows 11
    - Pin: 3-cell, 43 Wh Li-ion polymer
    - Khối lượng: 0.9 kg`),
    new product ("7",
    "Acer Swift 3 SF314-512-56QN (NX.K0FSV.002)",
    "22.299.000",
    100,
    "./assets/products_img/AcerSwift3SF314-512-56QNNX.K0FSV.002.png",
    "1",
    `- CPU:  Intel Core i5-1240P
    - Màn hình: 
    - RAM:16GB onboard LPDDR4X 4267MHz
    - Đồ họa:Intel Iris Xe Graphics
    - Lưu trữ:  512GB PCIe NVMe SSD
    - Hệ điều hành:Windows 11 Home
    - pin:4 Cell 56Whr
    - Khối lượng: 1.2 kg`),
    new product ("8",
    "HP EliteBook 640 G9 6M158PA",
    "26.890.000",
    100,
    "./assets/products_img/LaptopHPEliteBook640G96M158PA.jpg",
    "5",
    `- CPU: Intel Core i7-1255U
    - Màn hình: 14" IPS (1920 x 1080)
    - RAM: 1 x 16GB DDR4 3200MHz
    - Đồ họa: Onboard Intel Iris Xe Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11 Home
    - Pin: 3 cell 51 Wh Pin liền
    - Khối lượng: 1.7kg`),
    new product ("9",
    "Dell Gaming G5 5510",
    "20.490.000",
    100,
    "./assets/products_img/DellGamingG55510.jpg",
    "6",
    `- CPU: Core™ i5-10200H
    - Màn hình: 15.6 inch
    - RAM:8GB DDR4 2933MHz
    - Đồ họa: NVIDIA® GeForce RTX™ 3050 4GB GDDR6
    - Lưu trữ: 512GB M.2 PCIe NVMe Solid State Drive
    - Hệ điều hành:Windows 10
    - pin:3 Cell, 56WHr
    - Khối lượng:2.65 kg`),
    new product ("10",
    "Asus VivoBook Pro 14X M3401QA-KM006W",
    "18.490.000",
    100,
    "./assets/products_img/LaptopAsusVivoBookPro14XM3401QA-KM006W.jpg",
    "3",
    `- CPU: AMD Ryzen 5 5600H
    - Màn hình: 14" 2.8K OLED
    - RAM: DDR4 8GB (1 x 8GB) 3200MHz
    - Đồ họa: AMD Radeon Graphics
    - Lưu trữ: 512GB SSD NVMe PCIe Gen 3
    - Hệ điều hành: Windows 11
    - Pin: 3 cell 63 Wh
    - Khối lượng: 1.45kg`),
    new product ("11",
    "Acer Aspire 5 A514-55-5954 (NX.K5BSV.001)",
    "16.799.000",
    100,
    "./assets/products_img/AcerAspire5A514-55-5954NX.K5BSV.001.png",
    "1",
    `- CPU: Intel Core i5-1235U
    - Màn hình: 14.0 inch FHD(1920 x 1080), 60Hz Acer ComfyView™ IPS LED LCD
    - RAM: 8GB (4GB onboard + 4GB So-dim) DDR4
    - Đồ họa: Intel Iris Xe Graphics
    - Lưu trữ: 512GB PCIe NVMe SSD
    - Hệ điều hành: Windows 11 Home
    - pin:3 Cell 50WHrs
    - Khối lượng:	1.4 kg`),
    new product ("12",
    "Dell Inspirion N5515 N5R75700U104W1",
    "22.990.000",
    100,
    "./assets/products_img/DellInspirionN5515N5R75700U104W1.jpg",
    "6",
    `- CPU: AMD Ryzen 7-5700U
    - Màn hình: 15.6 inch
    - RAM:8GB DDR4 3200Mhz
    - Đồ họa: AMD Redeon Graphics
    - Lưu trữ: 512GB SSD M2 PCIe NVMe
    - Hệ điều hành: Windows 11 Home SL
    - pin:4 cell - 54Whr
    - Khối lượng:1.64 kg`),
    new product ("13",
    "ASUS ROG Zephyrus G15 GA503RM-LN006W",
    "39.490.000",
    100,
    "./assets/products_img/LaptopASUSROGZephyrusG15GA503RM-LN006W.jpg",
    "3",
    `- CPU: AMD Ryzen 7 6800HS
    - Màn hình: 15.6" 2K (2560 x1440) IPS 240Hz, 100% sRGB
    - RAM: DDR5 16GB (8GB Onboard, 1 x 8GB 4800MHz)
    - Đồ họa: Geforce RTX 3060 6GB
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11
    - Pin: Laptop ASUS ROG Zephyrus G15 GA503RM-LN006W
    - Khối lượng: 1.9 KG`),
    new product ("14",
    "Dell Inspiron 3520 (N3520-i5U085W11BLU)",
    "18.399.000",
    100,
    "./assets/products_img/DellInspiron3520N3520-i5U085W11BLU.png",
    "6",
    `- CPU: Intel Core i5-1235U
    - Màn hình: 15.6 inch FHD (1920 x 1080) LED-Backlit, 250 nit
    - RAM: 8GB (1x8GB) DDR4 2666MHz
    - Đồ họa: Intel Iris Xe Graphics
    - Lưu trữ: 512GB SSD NVMe
    - Hệ điều hành:Windows 11 Home
    - pin:3 Cell 41WHr
    - Khối lượng:1.9 kg`),
    new product ("15",
    "HP Pavilion 14-dv2032TU 6K768PA",
    "21.389.000",
    100,
    "./assets/products_img/LaptopHPPavilion14-dv2032TU6K768PA.jpg",
    "5",
    `- CPU: Intel Core i7-1255U
    - Màn hình: 14" IPS (1920 x 1080)
    - RAM: 2 x 4GB DDR4 3200MHz
    - Đồ họa: Onboard Intel Iris Xe Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11 Home
    - Pin: 3 cell 43 Wh Pin liền
    - Khối lượng: 1.4kg`),
    new product ("16",
    "Acer Gaming Predator Triton 300 PT315-53-7440 (NH.QDRSV.003)",
    "32.999.000",
    100,
    "./assets/products_img/AcerGamingPredatorTriton300PT315-53-7440NH.QDRSV.003.jpeg",
    "1",
    `- CPU:  Intel core i7 11800H
    - Màn hình:  15.6 inch QHD 165Hz
    - RAM:8GB
    - Đồ họa: Nvidia RTX 3050Ti 4G 
    - Lưu trữ: 512GB SSD
    - Hệ điều hành:Win 11
    - pin: 4 Cell 59Wh
    - Khối lượng:2 kg`),
    new product ("17",
    "Dell Vostro 3400 (YX51W5)",
    "16.299.000",
    100,
    "./assets/products_img/DellVostro3400YX51W5.jpeg",
    "6",
    `- CPU: Intel Core 5 1135G7
    - Màn hình: 14.0 inch FHD
    - RAM:8GB
    - Đồ họa: MX330 2G
    - Lưu trữ: 512GB SSD 
    - Hệ điều hành: Win11
    - pin:3 cell
    - Khối lượng:1.58 kg`),
    new product ("18",
    "MSI Crosshair 15 B12UEZ 460VN",
    "39.509.000",
    100,
    "./assets/products_img/LaptopMSICrosshair15B12UEZ460VN.jpg",
    "2",
    `- CPU: Intel Core i7-12700H ( 2.3 GHz - 4.7GHz / 24MB / 14 nhân, 20 luồng )
    - Màn hình: 15.6" ( 2560 x 1440 ) Quad HD (2K) IPS 165Hz , không cảm ứng , HD webcam
    - RAM: 2 x 8GB DDR4 3200MHz ( 2 Khe cắm / Hỗ trợ tối đa 64GB )
    - Đồ họa: RTX 3060 6GB GDDR6 / Intel Iris Xe Graphics
    - Lưu trữ: 1TB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11 Home
    - Pin: 3 cell 53 Wh , Pin liền
    - Khối lượng: 2.3kg`),
    new product ("19",
    "Dell Vostro 5620 (P117F001AGR)",
    "28.799.000",
    100,
    "./assets/products_img/DellVostro5620P117F001AGR.png",
    "6",
    `- CPU:  Intel® Core™ i7 1260P
    - Màn hình:  16.0 inch FHD+ WVA Anti-glare 16:10
    - RAM: 16GB DDR4 3200MHz
    - Đồ họa: Intel Iris XE
    - Lưu trữ: 512GB M.2 PCIe NVMe SSD
    - Hệ điều hành:Windows 11 Home
    - pin:4 Cell, 54 Wh
    - Khối lượng:1.91 kg`),
    new product ("20",
    "HP Victus 16 d0294TX (5Z9R5PA)",
    "19.990.000",
    100,
    "./assets/products_img/LaptopHPVictus16d0294TX5Z9R5PA.jpg",
    "5",
    `- CPU: Intel Core i5 11400H
    - Màn hình: 16.1" FullHD (1920 x 1080) 144Hz, IPS Panel
    - RAM: DDR4 8GB (2 x 4GB) 3200MHz; 2 slots, up to 32GB
    - Đồ họa:Geforce RTX 3050Ti 4GB
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11
    - Pin: 4 Cell 70WHr
    - Khối lượng: 2.46 kg`),
    new product ("21",
    "Dell XPS 13 9310 (6GH9X)",
    "56.499.000",
    100,
    "./assets/products_img/DellXPS1393106GH9X.png",
    "6",
    `- CPU:  Intel Core i7 1195G7
    - Màn hình: 13.4 inch UHD Touch
    - RAM:16GB
    - Đồ họa: Onboard
    - Lưu trữ: 512GB SSD
    - Hệ điều hành:Win 11
    - pin:4 Cell, 52 Wh
    - Khối lượng:1.27 kg`),
    new product ("22",
    "Acer Nitro 5 Eagle AN515-57-536Q",
    "15.990.000",
    100,
    "./assets/products_img/AcerNitro5EagleAN515-57-536Q.png",
    "1",
    `- CPU: Intel Core i5 - 11400H
    - Màn hình: 15.6 inch Full HD 144hz
    - RAM:8GB DDR4
    - Đồ họa: Nvidia Geforce GTX 1650 4GB
    - Lưu trữ: SSD NVMe 256GB
    - Hệ điều hành:Win 11
    - pin: 4 Cell 
    - Khối lượng:2.3 kg`),
    new product ("23",
    "MSI Gaming GF63 Thin 11UD 667VN",
    "18.490.000",
    100,
    "./assets/products_img/LaptopMSIGamingGF63Thin11UD667VN.jpg",
    "2",
    `- CPU: Intel Core i7-11800H ( 2.3 GHz - 4.6 GHz / 24MB / 8 nhân, 16 luồng )
    - Màn hình: 15.6" ( 1920 x 1080 ) Full HD IPS 144Hz , không cảm ứng , HD webcam
    - RAM: 1 x 8GB DDR4 3200MHz ( 2 Khe cắm / Hỗ trợ tối đa 64GB )
    - Đồ họa: RTX 3050 4GB GDDR6 / Intel UHD Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11 Home
    - Pin: 3 cell 51 Wh , Pin liền
    - Khối lượng: 1.8kg`),
    new product ("24",
    "Asus Expertbook B5302CEA-L50916W",
    "18.490.000",
    100,
    "./assets/products_img/LaptopAsusExpertbookB5302CEA-L50916W.jpg",
    "3",
    `- CPU: Intel Core™ i5-1135G7 2.4 GHz (8M Cache, up to 4.2 GHz, 4 cores)
    - Màn hình: 13.3" FullHD (1920 x 1080),IPS, Màn hình chống chói Độ phủ màu sRGB: 100% Tấm nền Led
    - Tỷ lệ màn hình 16:9 Độ sáng 470nits, Wide view
    - RAM: DDR4 8GB (1 x 8GB) 3200MHz
    - Đồ họa:Intel Iris Xe Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11
    - Pin: 66WHrs, 4S1P, 4-cell Li-ion
    - Khối lượng: 1.0 kg`),
    new product ("25",
    "Dell Gaming G15 5515 P105F004CGR",
    "18.490.000",
    100,
    "./assets/products_img/DellGamingG155515P105F004CGR.jpg",
    "6",
    `- CPU: AMD Ryzen™ R5-5600H Processo
    - Màn hình: 15.6 inch 1920 x 1080 pixels (FullHD)
    - RAM:8GB DDR4 3200MHz
    - Đồ họa: NVIDIA® GeForce RTX™ 3050 4GB GDDR6 + AMD Radeon Graphics
    - Lưu trữ: 256GB SSD M.2 PCIe NVMe
    - Hệ điều hành:Windows 11 Home SL
    - pin:3 Cell 56WHrs
    - Khối lượng:2.57 kg`),
    new product ("26",
    "Acer Aspire 3 A315-59-381E (NX.K6TSV.006)",
    "13.499.000",
    100,
    "./assets/products_img/AcerAspire3A315-59-381ENX.K6TSV.006.png",
    "1",
    `- CPU: Intel Core i3 Alder Lake1215U1.2GHz
    - Màn hình: 
    - RAM:  8 GBDDR4 (4 GB onboard + 1 khe 4 GB)
    - Đồ họa:Card tích hợp Intel UHD 
    - Lưu trữ: 512 GB SSD NVMe PCIe
    - Hệ điều hành:Windows 11 Home SL
    - pin:3 Cell 40 Whr
    - Khối lượng:1.7 kg`),
    new product ("27",
    "Asus ROG Strix Scar 17 SE G733CX-LL6789W",
    "101.000.000",
    100,
    "./assets/products_img/LaptopAsusROGStrixScar17SEG733CX-LL6789W.jpg",
    "3",
    `- CPU: Intel Core i9-12950HX
    - Màn hình: 17.3" IPS (2560 x 1440),240Hz
    - RAM: 2 x 16GB DDR5 4800MHz
    - Đồ họa: Onboard Intel UHD Graphics
    - Lưu trữ: 2TB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11 Home
    - Pin: 4 cell 90 Wh Pin liền
    - Khối lượng: 3kg`),
    new product ("28",
    "Dell Inspiron 5620 (N6I7004W1)",
    "28.999.000",
    100,
    "./assets/products_img/DellInspiron5620N6I7004W1.png",
    "6",
    `- CPU: Intel Core i7 12
    - Màn hình: 16 inch FHD (1920 x 1200) Anti-Glare 300 nits
    - RAM: 16GB (2*8) DDR4 3200Mhz
    - Đồ họa: NVIDIA GeForce MX570 2GB DDR6
    - Lưu trữ:512Gb M.2 PCIe NVMe SSD 
    - Hệ điều hành:Windows 11 Home
    - pin: 4 cell - 54Whr
    - Khối lượng:1.87 kg`),
    new product ("29",
    "ASUS ROG Zephyrus Duo 16 GX650RX-LO156W",
    "122.790.000",
    100,
    "./assets/products_img/LaptopASUSROGZephyrusDuo16GX650RX-LO156W.jpg",
    "3",
    `- CPU: AMD Ryzen™ 9 6900HX
    - Màn hình: ROG Nebula Display (1) 16" WQXGA (2560 x 1600) 16:10, DCI-P3 100%, 165hz. Pantone Validated (2) 14" 3840 x 1100(4K) IPS-level Panel Support Stylus
    - RAM: DDR5 32GB (2 x 16GB 4800MHz)
    - Đồ họa: Geforce RTX 3080Ti 16GB 165W
    - Lưu trữ: 2TB M.2 NVMe™ PCIe® 4.0 SSD
    - Hệ điều hành: Windows 11
    - Pin: 90WHrs, 4-cell Li-ion
    - Khối lượng: 2.55 Kg`),
    new product ("30",
    "Lenovo Legion 5 15ARH7 82RE0035VN",
    "29.589.000",
    100,
    "./assets/products_img/LaptopLenovoLegion515ARH782RE0035VN.jpg",
    "4",
    `- CPU: AMD Ryzen 7 6800H ( 3.2 GHz - 4.7 GHz / 16MB / 8 nhân, 16 luồng )
    - Màn hình: 15.6" ( 1920 x 1080 ) Full HD IPS 165Hz , Màn hình chống lóa , FHD webcam
    - RAM: 1 x 8GB DDR5 4800MHz ( 2 Khe cắm / Hỗ trợ tối đa 16GB )
    - Đồ họa: RTX 3050 4GB GDDR6 / AMD Radeon 680M
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11 Home
    - Pin: 80 Wh , Pin liền 
    - Khối lượng: 2.3kg`),
    new product ("31",
    "Acer Gaming Nitro 5 Tiger AN515-58-773Y (NH.QFKSV.001)",
    "29.599.000",
    100,
    "./assets/products_img/AcerGamingNitro5TigerAN515-58-773YNH.QFKSV.001.png",
    "1",
    `- CPU: Intel Core i7 12700H
    - Màn hình: 15.6 inch FHD 144Hz
    - RAM:8GB
    - Đồ họa: NVIDIA RTX3050Ti 4G
    - Lưu trữ:  512GB SSD
    - Hệ điều hành:Win 11
    - pin:4 Cell 48 WHr
    - Khối lượng:2.45 kg`),
    new product ("32",
    "ASUS TUF Gaming FX517ZC-HN079W",
    "23.969.000",
    100,
    "./assets/products_img/LaptopASUSTUFGamingFX517ZC-HN079W.jpg",
    "3",
    `- CPU: Intel Core i5-12450H
    - Màn hình: 15.6" IPS (1920 x 1080)
    - RAM: 1 x 8GB DDR5 4800MHz
    - Đồ họa: RTX 3050 4GB GDDR6 / Intel UHD Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11 Home
    - Pin: 4 cell 76 Wh Pin liền
    - Khối lượng: 2kg`),
    new product ("33",
    "Lenovo IdeaPad 3 15ITL6 82H801LMVN",
    "12.990.000",
    100,
    "./assets/products_img/LaptopLenovoIdeaPad315ITL682H801LMVN.jpg",
    "4",
    `- CPU: Intel Core i5-1135G7 ( 2.4 GHz - 4.2 GHz / 8MB / 4 nhân, 8 luồng )
    - Màn hình: 15.6" ( 1920 x 1080 ) TN không cảm ứng , HD webcam
    - RAM: 8GB Onboard DDR4 3200MHz ( 1 Khe cắm / Hỗ trợ tối đa 16GB )
    - Đồ họa: Onboard Intel Iris Xe Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11 Home
    - Pin: 2 cell Pin liền
    - Khối lượng: 1.7kg`),
    new product ("34",
    "Acer Gaming Aspire 7 A715-43G-R8GA (NH.QHDSV.002)",
    "18.799.000",
    100,
    "./assets/products_img/AcerGamingAspire7A715-43G-R8GANH.QHDSV.002.png",
    "1",
    `- CPU:  AMD R5 5625U
    - Màn hình: 15.6 inch FHD 144Hz
    - RAM: 8GB
    - Đồ họa: NVIDIA RTX3050 4G
    - Lưu trữ:  512GB SSD
    - Hệ điều hành:Win 11
    - pin:3 Cell 50Whr
    - Khối lượng: 2.1kg`),
    new product ("35",
    "ASUS Vivobook 15X A1503ZA-L1421W",
    "18.990.000",
    100,
    "./assets/products_img/LaptopASUSVivobook15XA1503ZA-L1421W.jpg",
    "3",
    `- CPU: Intel® Core™ i5-12500H
    - Màn hình: 15.6" FullHD (1920 x 1080),OLED 16:9 aspect ratio, US MIL-STD 810H military-grade standard, 600nits HDR peak brightness, 100% DCI-P3 color gamut, 70% less harmful blue light
    - RAM: DDR4 8GB (1 x 8GB) 3200MHz
    - Đồ họa: Intel® UHD Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11
    - Pin: 70WHrs, 3S1P, 3-cell Li-ion
    - Khối lượng: 1.70 kg`),
    new product ("36",
    "HP ProBook 430 G8 2H0P0PA",
    "24.450.000",
    100,
    "./assets/products_img/LaptopHPProBook430G82H0P0PA.jpg",
    "5",
    `- CPU: Intel Core i7-1165G7 Processor
    - Màn hình: 13.3"1920 x 1080 pixels (FullHD),Tấm nền IPS
    - RAM: 12 GB DDR4-3200 MHz RAM (1 x 4 GB, 1 x 8 GB)
    - Đồ họa: Intel Iris Xe graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 10 Home SL
    - Pin: 3Cell 45WHrs
    - Khối lượng: 1.255 kg`),
    new product ("37",
    "ASUS VivoBook Pro M3401QA-KM025W",
    "17.990.000",
    100,
    "./assets/products_img/LaptopASUSVivoBookProM3401QA-KM025W.jpg",
    "3",
    `- CPU: AMD Ryzen 7 5800H
    - Màn hình: 14" 2K (Quad HD)(2880 x 1800),OLED/AMOLED, Tần số quét 90Hz Thời gian phản hồi 0.2ms Độ sáng tối đa 600 nit Tỷ lệ tương phản 1,000,000:1 Hỗ trợ dải màu 100% DCI-P3 Hiển thị 1.07 tỷ màu Công nghệ chống ánh sáng xanh SGS Eye Care Display Công nghệ hình ảnh
    - RAM: DDR4 8GB (1 x 8GB) 3200MHz
    - Đồ họa:AMD Radeon Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11
    - Pin: 3 Cells 63WHrs
    - Khối lượng: 1.45kg`),
    new product ("38",
    "Lenovo IdeaPad Yoga 6 13ALC6 82ND00BDVN",
    "18.989.000",
    100,
    "./assets/products_img/LaptopLenovoIdeaPadYoga613ALC682ND00BDVN.jpg",
    "4",
    `- Cpu: AMD Ryzen 7 5700U ( 1.8 GHz - 4.3 GHz / 8MB / 8 nhân, 16 luồng )
    - Màn hình: 13.3" ( 1920 x 1080 ) Full HD IPS cảm ứng , HD webcam
    - RAM: 8GB Onboard DDR4 3200MHz Không nâng cấp được )
    - Đồ họa: Onboard AMD Radeon Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe / 
    - Hệ điều hành: Windows 11 Home
    - Pin: 60 Wh , Pin liền
    - Khối lượng: 1.3kg`),
    new product ("39",
    "MSI Katana GF76 11UC 096VN",
    "21.709.000",
    100,
    "./assets/products_img/LaptopMSIKatanaGF7611UC096VN.jpg",
    "2",
    `- CPU: Intel Core i7-11800H ( 2.3 GHz - 4.6 GHz / 24MB / 8 nhân, 16 luồng )
    - Màn hình: 17.3" ( 1920 x 1080 ) Full HD IPS 144Hz , không cảm ứng , HD webcam
    - RAM: 1 x 8GB DDR4 3200MHz ( 2 Khe cắm / Hỗ trợ tối đa 64GB )
    - Đồ họa: RTX 3050 4GB GDDR6 / Intel UHD Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 10 Home SL 64-bit
    - Pin: 3 cell 53 Wh, Pin liền
    - Khối lượng: 2.6kg`),
    new product ("40",
    "Acer TravelMate B3 TMB311-31-P49D (NX.VNFSV.005)",
    "4.999.000",
    100,
    "./assets/products_img/AcerTravelMateB3TMB311-31-P49DNX.VNFSV.005.jpg",
    "1",
    `- CPU: Intel Pentium N5030
    - Màn hình:11.6 inch HD 
    - RAM:4GB
    - Đồ họa: Onboard
    - Lưu trữ: 256GB SSD
    - Hệ điều hành: Win 11
    - pin:3 Cell,48 Wh
    - Khối lượng:1.4 kg`),
    new product ("41",
    "ASUS ZenBook Flip UX363EA",
    "20.990.000",
    100,
    "./assets/products_img/LaptopASUSZenBookFlipUX363EA.jpg",
    "3",
    `- CPU: Intel Core i5-1135G7 2.4GHz up to 4.2GHz 8MB
    - Màn hình: 13.3" FullHD (1920 x 1080), Tấm nền OLED/AMOLED,cảm ứng
    - RAM: DDR4 8GB (1 x 8GB) 3200MHz
    - Đồ họa:Intel Iris Xe Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11
    - Pin: 4 Cell 67WHr
    - Khối lượng: 1.3 kg`),
    new product ("42",
    "Lenovo Slim 7 Pro 14IHU5 O 82NH00BCVN",
    "19.969.000",
    100,
    "./assets/products_img/LaptopLenovoSlim7Pro14IHU5O82NH00BCVN.jpg",
    "4",
    `- CPU: Intel Core i5-11320H ( 3.2 GHz - 4.5 GHz / 8MB / 4 nhân, 8 luồng )
    - Màn hình: 14" ( 2880 x 1800 ) OLED HD webcam
    - RAM: 16GB Onboard DDR4x 4266MHz
    - Đồ họa: Onboard Intel Iris Xe Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11 Home
    - Pin: 4 cell 61 Wh , Pin liền
    - Trọng lượng: 1.4kg`),
    new product ("43",
    "Dell Inspiron 15 3511 P112F001FBL",
    "15.990.000",
    100,
    "./assets/products_img/DellInspiron153511P112F001FBL.jpg",
    "6",
    `- CPU: Intel Core i5-1135G7
    - Màn hình: 15.6 inch
    - RAM:8GB DDR4 2666MHz
    - Đồ họa:Intel Iris Xe Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe
    - Hệ điều hành:Windows 11 Home SL
    - pin:3 cell 41 Wh , Pin liền
    - Khối lượng:1.7 kg`),
    new product ("44",
    "MSI Gaming ALpha B5EEK-031VN",
    "25.539.000",
    100,
    "./assets/products_img/LaptopMSIGamingAlpha17B5EEK-031VN.jpg",
    "2",
    `- CPU: Ryzen 75800H (3.2GHz - 4.4GHZ / 16MB / 8 nhân, 16 luồng)
    - Màn hình: 17.3" ( 1920 x 1080 ) IPS 144Hz, không cảm ứng, HD webcam
    - RAM: 1 x 8GB DDR4 3200Hz (2 khe cắm / Hỗ trợ tối đa 64GB )
    - Đồ họa: Radeon RX 6600 8GB  GDDR6 / AMD Radeon Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Window 11 Home
    - Pin: 4 cell Pin liền
    - Khối lượng: 2.6kg`),
    new product ("45",
    "Acer Gaming Nitro 5 AN515-58-769J (NH.QFHSV.003)",
    "27.799.000",
    100,
    "./assets/products_img/AcerGamingNitro5AN515-58-769JNH.QFHSV.003.jpeg",
    "1",
    `- CPU: Intel® Core™ i7-12700H
    - Màn hình:  15.6 inch FHD(1920 x 1080) IPS 144Hz
    - RAM:8GB khe rời DDR4 3200MHz
    - Đồ họa: NVIDIA® GeForce RTX™ 3050 4GB GDDR6
    - Lưu trữ: 512GB PCIe NVMe
    - Hệ điều hành:Windows 11 Home
    - pin:	4 Cell 57.5WHr
    - Khối lượng:2.5 kg`),
    new product ("46",
    "ASUS Zenbook UX425EA-KI883W",
    "22.490.000",
    100,
    "./assets/products_img/LaptopASUSZenbookUX425EA-KI883W.jpg",
    "3",
    `- CPU: Intel Core i5-1135G7
    - Màn hình: 14" (1920 x 1080)
    - RAM: 8GB Onboard LPDDR4X
    - Đồ họa: Onboard Intel Iris Xe Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11 Home
    - Pin: 4 cell 67 Wh
    - Khối lượng: 1.2kg`),
    new product ("47",
    "Lenovo Legion 5 Pro 16ARH7H 82RG008SVN",
    "44.990.000",
    100,
    "./assets/products_img/LaptopLenovoLegion5Pro16ARH7H82RG008SVN.jpg",
    "4",
    `- CPU: AMD Ryzen 7 6800H ( 3.2 GHz - 4.7 GHz / 16MB / 8 nhân, 16 luồng )
    - Màn hình: 16" ( 2560 x 1600 ) WQXGA IPS 165Hz , Màn hình chống lóa , HD webcam
    - RAM: 2 x 8GB DDR5 4800MHz ( 2 Khe cắm / Hỗ trợ tối đa 32GB )
    - Đồ họa: RTX 3060 6GB GDDR6 / AMD Radeon 680M
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11 Home SL
    - Pin: 4 cell 80 Wh , Pin liền
    - Khối lượng: 2.5kg`),
    new product ("48",
    "Gaming Asus ROG Strix G15 G513RM-HQ055W",
    "35.490.000",
    100,
    "./assets/products_img/LaptopGamingAsusROGStrixG15G513RM-HQ055W.jpg",
    "3",
    `- CPU: AMD Ryzen 7 6800H
    - Màn hình: 15.6" 2K (2560 x 1440) 165Hz , IPS Panel, Adaptive-Sync, 100% DCI-P3, 300 nits
    - RAM: DDR5 16GB (2 x 8GB) 4800MHz; 2 slots, up to 32GB
    - Đồ họa: Geforce RTX 3060 6GB 140W MUX Switch + Optimus
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11
    - Pin: 4 Cell 90WHrs Pin liền
    - Khối lượng: 2.1kg`),
    new product ("49",
    "Acer Aspire A514-54-5127 (NX.A28SV.007)",
    "15.699.000",
    100,
    "./assets/products_img/AcerAspireA514-54-5127NX.A28SV.007.jpg",
    "1",
    `- CPU: Intel Core i5 1135G7
    - Màn hình:  14 inch FHD
    - RAM: 8GB
    - Đồ họa: Onboard
    - Lưu trữ:  512GB SSD
    - Hệ điều hành:win 11
    - pin:3 Cell 48WHrs
    - Khối lượng:	1.45 kg
    `),
    new product ("50",
    "HP 14S CF2527TU 4K4A1PA",
    "8.990.000",
    100,
    "./assets/products_img/LaptopHP14SCF2527TU4K4A1PA.jpg",
    "5",
    `- CPU: Intel® Core™ i3-10110U
    - Màn hình: 14"1366 x 768 pixels (HD+)
    - RAM: 4 GB (1 x 4GB) DDR4-2666MHz
    - Đồ họa: Intel UHD Graphics
    - Lưu trữ: 256 GB PCIe® NVMe™ M.2 SSD
    - Hệ điều hành: Windows 10 Home SL
    - Pin: 3-Cell 41.7WHrs
    - Khối lượng: 1.47 kg`),
    new product ("51",
    "Dell Inspiron 14 7415",
    "17.990.000",
    100,
    "./assets/products_img/DellInspiron147415.jpg",
    "6",
    `- CPU: AMD Ryzen 5-5500U
    - Màn hình: 14 inch 1920 x 1080 pixels (FullHD)
    - RAM:8GB DDR4, 3200 MHz
    - Đồ họa: AMD Radeon Graphics
    - Lưu trữ: 256GB M.2 PCIe NVMe SSD
    - Hệ điều hành:Windows 11
    - pin:4-Cell 54WHr
    - Khối lượng:1.59kg`),
    new product ("52",
    "HP 15 DY2089MS",
    "18.990.000",
    100,
    "./assets/products_img/LaptopHP15DY2089MS.jpg",
    "5",
    `- CPU: Intel® Core™ i7-1165G7
    - Màn hình: 15.6"1920 x 1080 pixels (FullHD),Tấm nền IPS
    - RAM: 12 GB DDR4-3200 MHz RAM (1 x 4 GB, 1 x 8 GB)
    - Đồ họa: Intel Iris Xe graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11
    - Pin: 3-cell, 41 Wh Li-ion
    - Khối lượng: 1.69 kg`),
    new product ("53",
    "Dell Inspiron 7306 (5934SLV)",
    "19.599.000",
    100,
    "./assets/products_img/DellInspiron73065934SLV.jpg",
    "6",
    `- CPU: Intel Core i5 1135G7
    - Màn hình: 13.3 inch FHD Touch
    - RAM:8GB
    - Đồ họa: Onboard
    - Lưu trữ:512GB SSD 
    - Hệ điều hành:Win 10
    - pin:4 cell
    - Khối lượng:1.3 kg`),
    new product ("54",
    "Lenovo Ideapad Gaming 3 15IAH7 82S9007UVN",
    "28.129.000",
    100,
    "./assets/products_img/LaptopLenovoIdeapadGaming315IAH782S9007UVN.jpg",
    "4",
    `- CPU: Intel Core i7-12700H ( 2.3 GHz - 4.7GHz / 24MB / 14 nhân, 20 luồng )
    - Màn hình: 15.6" ( 1920 x 1080 ) Full HD IPS 120Hz , Màn hình chống lóa , HD webcam
    - RAM: 2 x 8GB DDR4 3200MHz ( 2 Khe cắm / Hỗ trợ tối đa 16GB )
    - Đồ họa: RTX 3050Ti 4GB GDDR6 / Intel Iris Xe Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11 Home
    - Pin: 60 Wh
    - Khối lượng: 2.2kg`),
    new product ("55",
    "HP 15s-fq2660TU 6K793PA",
    "9.990.000",
    100,
    "./assets/products_img/LaptopHP15s-fq2660TU6K793PA.jpg",
    "5",
    `- CPU: Intel Core i3-1115G4
    - Màn hình: 15.6" (1366 x 768)
    - RAM: 1 x 4GB DDR4 3200MHz
    - Đồ họa: Onboard Intel UHD Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11 Home
    - Pin: 3 cell 41 Wh Pin liền
    - Khối lượng: 1.7kg`),
    new product ("56",
    "Acer Gaming Predator Triton 500 SE PT516-52s-91XH (NH.QFRSV.001)",
    "108.999.000",
    100,
    "./assets/products_img/AcerGamingPredatorTriton500SEPT516-52s-91XHNH.QFRSV.001.png",
    "1",
    `- CPU: Intel core i9 12900H
    - Màn hình:  16 inch WQXGA 240Hz
    - RAM:32GB
    - Đồ họa: Nvidia RTX 3080Ti 16G
    - Lưu trữ: 2TB SSD 
    - Hệ điều hành:Win11
    - pin: 4 Cell 99,98Whr
    - Khối lượng:	2.4 kg`),
    new product ("57",
    "MSI Modern 15 A5M 239VN",
    "15.259.000",
    100,
    "./assets/products_img/LaptopMSIModern15A5M239VN.jpg",
    "2",
    `- CPU: AMD Ryzen 7 5700U ( 1.8 GHz - 4.3 GHz / 8MB / 8 nhân, 16 luồng )
    - Màn hình: 15.6" ( 1920 x 1080 ) IPS không cảm ứng , HD webcam
    - RAM: 1 x 8GB DDR4 3200MHz ( 2 Khe cắm / Hỗ trợ tối đa 64GB )
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11 Home
    - Pin: 3 cell Pin liền
    - Khối lượng: 1.6kg`),
    new product ("58",
    "HP EliteBook X360 1040 G5 5XD44PA",
    "44.990.000",
    100,
    "./assets/products_img/LaptopHPEliteBookX3601040G55XD44PA.jpg",
    "5",
    `- CPU: Intel Core i7-8550U
    - Màn hình: 14"1920 x 1080 pixels (FullHD)
    - RAM: 8 GB DDR4-3200 MHz
    - Đồ họa: Intel UHD Graphics 620
    - Lưu trữ: 256GB SSD M.2 NVMe
    - Hệ điều hành: Windows 10
    - Pin: 4 cell 56 Wh
    - Khối lượng: 1.3 kg`),
    new product ("59",
    "MSI GF66 12UCK",
    "25.539.000",
    100,
    "./assets/products_img/LaptopMSIGF6612UCK.jpg",
    "2",
    `- CPU: Intel Core i7-12650H ( 2.3 GHz - 4.7 GHz / 24MB / 10 nhân, 16 luồng )
    - Màn hình: 15.6" ( 1920 x 1080 ) Full HD IPS 144Hz , HD webcam
    - RAM: 1 x 8GB DDR4 3200MHz ( 2 Khe cắm / Hỗ trợ tối đa 64GB )
    - Đồ họa: RTX 3050 4GB GDDR6 / Intel UHD Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11 Home
    - Pin: 3 cell 53 Wh , Pin liền
    - Khối lượng: 2.2kg`),
    new product ("60",
    "Lenovo ThinkBook 13s G3 ACN 20YA0039VN",
    "23.990.000",
    100,
    "./assets/products_img/LaptopLenovoThinkBook13sG3ACN20YA0039VN.jpg",
    "4",
    `- CPU: AMD Ryzen 7 5800U ( 1.9 GHz - 4.4 GHz / 16MB / 8 nhân, 16 luồng )
    - Màn hình: 13.3" ( 1920 x 1200 ) WUXGA IPS không cảm ứng , Màn hình chống lóa , HD webcam
    - RAM: 8GB Onboard LPDDR4X 4266MHz
    - Đồ họa: Onboard Intel UHD Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11 Home
    - Pin: 4 cell 56 Wh , Pin liền
    - Khối lượng: 1.2kg`),
    new product ("61",
    "Asus ROG Strix Scar 15 G533ZS-LN036W",
    "84.990.000",
    100,
    "./assets/products_img/LaptopAsusROGStrixScar15G533ZS-LN036W.jpg",
    "3",
    `- CPU: Intel Core i9-12900H
    - Màn hình: 15.6" IPS (2560 x 1440),240Hz
    - RAM: 2 x 16GB DDR5 4800MHz
    - Đồ họa: RTX 3080 8GB GDDR6 /Intel Iris Xe Graphics
    - Lưu trữ: 2TB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11 Home
    - Pin: 4 cell 90 Wh Pin liền
    - Khối lượng: 2.3kg`),
    new product ("62",
    "Dell Vostro 3510 (7T2YC3)",
    "22.499.000",
    100,
    "./assets/products_img/DellVostro35107T2YC3.png",
    "6",
    `- CPU: Intel Core i7 1165G7
    - Màn hình: 15.6 inch FHD
    - RAM: 8GB (2 khe ram)
    - Đồ họa: NVIDIA MX350 2G
    - Lưu trữ:  512GB SSD
    - Hệ điều hành:Win 11
    - pin:3-cell, 41 Wh
    - Khối lượng:1.69 kg`),
    new product ("63",
    "HP OMEN 16-b0123TX 4Y0W6PA",
    "57.990.000",
    100,
    "./assets/products_img/LaptopHPOMEN16-b0123TX4Y0W6PA.jpg",
    "5",
    `- CPU: Intel Core i7-11800H
    - Màn hình: 16.1" IPS (2560 x 1440),165Hz
    - RAM: 2 x 16GB DDR4 3200MHz
    - Đồ họa: RTX 3070 8GB GDDR6 / Intel UHD Graphics
    - Lưu trữ: 2 x 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11 Home
    - Pin: 6 cell 83 Wh Pin liền
    - Khối lượng: 2.3kg`),
    new product ("64",
    "Gaming Asus ROG Strix G15 G513IE-HN246W",
    "21.490.000",
    100,
    "./assets/products_img/LaptopGamingAsusROGStrixG15G513IE-HN246W.jpg",
    "3",
    `- CPU: AMD Ryzen 7 4800H
    - Màn hình: 15.6" FullHD (1920 x 1080), 144Hz, IPS Panel
    - RAM: DDR4 8GB (1 x 8GB) 3200MHz
    - Đồ họa: Geforce RTX 3050Ti 4GB
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11
    - Pin: 56WHrs, 4S1P, 4-cell Li-ion
    - Khối lượng: 2.3 Kg`),
    new product ("65",
    "HP Pavilion 15-EG2056TU 6K786PA",
    "17.790.000",
    100,
    "./assets/products_img/LaptopHPPavilion15-EG2056TU6K786PA.jpg",
    "5",
    `- CPU: Intel® Core™ i5-1240P
    - Màn hình:15.6" FullHD (1920 x 1080) 144Hz, IPS Panel
    - RAM: DDR4 8GB (2 x 4GB) 3200MHz;
    - Đồ họa:Intel Iris Xe Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11
    - Pin: 3-cell, 41 Wh Li-ion
    - Khối lượng: 1.74 kg`),
    new product ("66",
    "Laptop Acer Gaming Aspire 7 A715-42G-R4XX (NH.QAYSV.008)",
    "14.990.000",
    100,
    "./assets/products_img/AcerGamingAspire7A715-42G-R4XXNH.QAYSV.008.jpg",
    "1",
    `- CPU: AMD R5 5500U
    - Màn hình:  15.6 inch FHD
    - RAM: 8GB
    - Đồ họa: NVIDIA GTX1650 4G
    - Lưu trữ: 256GB SSD
    - Hệ điều hành: WinDows 11
    - pin: 3 Cell, 48Wh
    - Khối lượng: 2,1 kg`),
    new product ("67",
    "Dell Inspiron 3511 (70270652)",
    "22.199.000",
    100,
    "./assets/products_img/DellInspiron351170270652.jpg",
    "6",
    `- CPU: Intel Core i7 1165G7
    - Màn hình: 15.6 inch FHD
    - RAM: 8GB
    - Đồ họa: MX350 2G
    - Lưu trữ: 512GB SSD
    - Hệ điều hành:Win 11
    - pin:3 cell
    - Khối lượng:1.9 kg`),
    new product ("68",
    "ASUS TUF Gaming F15 FX506HC-HN144W",
    "20.390.000",
    100,
    "./assets/products_img/laptop_asus_tuf_gaming_f15_FX506HC-HN144W.jpg",
    "3",
    `- CPU: Intel Core i5-11400H
    - Màn hình: 15.6" IPS (1920 x 1080),144Hz
    - RAM: 1 x 8GB DDR4 3200MHz
    - Đồ họa: RTX 3050 4GB GDDR6 / Intel UHD Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11
    - Pin: 3-cell, 48WHrs Pin liền
    - Khối lượng: 2.3kg`),
    new product ("69",
    "Laptop Lenovo ThinkPad E15 Gen 4 21E600CMVA",
    "24.890.000",
    100,
    "./assets/products_img/LaptopLenovoThinkPadE15Gen421E600CMVA.jpg",
    "4",
    `- CPU: Intel Core i7-1255U ( 1.7 GHz - 4.7GHz / 12MB / 10 nhân, 12 luồng )
    - Màn hình: 15.6" ( 1920 x 1080 ) Full HD IPS không cảm ứng , Màn hình chống lóa , FHD webcam
    - RAM: 1 x 8GB Onboard DDR4 3200MHz ( 1 Khe cắm / Hỗ trợ tối đa 40GB )
    - Đồ họa: Onboard Intel Iris Xe Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: No OS
    - Pin: 3 cell 45 Wh , Pin liền
    - Khối lượng: 1.7kg`),
    new product ("70",
    "HP ProBook 450 G8 2H0U4PA",
    "13.359.000",
    100,
    "./assets/products_img/LaptopHPProBook450G82H0U4PA.jpg",
    "5",
    `- CPU: Intel Core i3-1115G4
    - Màn hình: 15.6" (1366 x 768)
    - RAM: 1 x 4GB DDR4 3200MHz
    - Đồ họa: Onboard Intel UHD Graphics
    - Lưu trữ: 256GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 10 Home SL 64-bit
    - Pin: 3 cell 45 Wh Pin liền
    - Khối lượng: 1.7kg`),
    new product ("71",
    "HP Zbook Firefly 14 G8 1A2F1AV",
    "30.490.000",
    100,
    "./assets/products_img/LaptopHPZbookFirefly14G81A2F1AV.jpg",
    "5",
    `- CPU: Intel® Core™ i5-1135G7
    - Màn hình: 14"1920 x 1080 pixels (FullHD),Tấm nền VA
    - RAM: 8 GB DDR4-3200 MHz RAM
    - Đồ họa: Intel Iris Xe graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành:Windows 10 Home SL
    - Pin: 3Cell 45WHrs
    - Khối lượng: 1.41 kg`),
    new product ("72",
    "MSI Thin GF65 10UE 286VN",
    "23.899.000",
    100,
    "./assets/products_img/LaptopMSIThinGF6510UE286VN.jpg",
    "2",
    `- CPU: Intel Core i5-10500H ( 2.5 GHz - 4.5 GHz / 12MB / 6 nhân, 12 luồng )
    - Màn hình: 15.6" ( 1920 x 1080 ) Full HD IPS 144Hz , không cảm ứng , HD webcam
    - RAM: 2 x 8GB DDR4 3200MHz ( 2 Khe cắm / Hỗ trợ tối đa 64GB )
    - Đồ họa: RTX 3060 6GB GDDR6 / Intel UHD Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hẹ điều hành: Windows 10 Home SL 64-bit
    - Pin: 3 cell 51 Wh, Pin liền
    - Khối lượng: 1.8kg`),
    new product ("73",
    "Lenovo IdeaPad 5 Pro 14ITL6 82L300KSVN",
    "17.579.000",
    100,
    "./assets/products_img/LaptopLenovoIdeaPad5Pro14ITL682L300KSVN.jpg",
    "4",
    `- CPU: Intel Core i5-1155G7 ( 2.5 GHz - 4.5 GHz / 8MB / 4 nhân, 8 luồng )
    - Màn hình: 14" ( 2240 x 1400 ) IPS không cảm ứng , HD webcam
    - RAM: 8GB Onboard DDR4 3200MHz
    - Đồ họa: Onboard Intel Iris Xe Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe / 
    - Hệ điều hành: Windows 11 Home
    - Pin: Pin liền
    - Khối lượng: 1.4kg`),
    new product ("74",
    "Dell Gaming G3 3500 G3500B",
    "30.230.000",
    100,
    "./assets/products_img/DellGamingG33500G3500B.png",
    "6",
    `- CPU: Intel Core i7-10750H
    - Màn hình: 15.6 inch
    - RAM:16GB DDR4 3200MHz
    - Đồ họa: NVIDIA GeForce GTX 1660Ti 6GB GDDR6 + Intel UHD Graphics
    - Lưu trữ: 512GB SSD
    - Hệ điều hành:Windows 10 Home
    - pin:3 Cell 68WHr
    - Khối lượng:2.34 kg`),
    new product ("75",
    "Lenovo IdeaPad 5 15ITL05 82FG01H8VN",
    "13.590.000",
    100,
    "./assets/products_img/LaptopLenovoIdeaPad515ITL0582FG01H8VN.jpg",
    "4",
    `- CPU: Intel Core i5-1135G7 ( 2.4 GHz - 4.2 GHz / 8MB / 4 nhân, 8 luồng )
    - Màn hình: 15.6" ( 1920 x 1080 ) IPS không cảm ứng , HD webcam
    - RAM: 8GB Onboard DDR4 3200MHz
    - Đồ họa: Onboard Intel Iris Xe Graphics
    - Lưu trữ: 256GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11 Home
    - Pin: 3 cell Pin liền
    - Khối lượng: 1.7kg`),
    new product ("76",
    "MSI Modern 14 B5M 202VN",
    "13.689.000",
    100,
    "./assets/products_img/LaptopMSIModern14B5M202VN.jpg",
    "2",
    `- CPU: AMD Ryzen 5 5500U ( 2.1 GHz - 4.0 GHz / 8MB / 6 nhân, 12 luồng )
    - Màn hình: 14" ( 1920 x 1080 ) IPS không cảm ứng , HD webcam
    - RAM: 1 x 8GB DDR4 3200MHz ( 2 Khe cắm / Hỗ trợ tối đa 64GB )
    - Đồ họa: Onboard AMD Radeon Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11 Home
    - Pin: 3 cell Pin liền
    - Khối lượng: 1.3kg`),
    
    new product ("77",
    "Lenovo Thinkbook 14 G2 ITL 20VD00Y3VN",
    "20.990.000",
    100,
    "./assets/products_img/LaptopLenovoThinkbook14G2ITL20VD00Y3VN.jpg",
    "4",
    `- CPU: Intel Core i7-1165G7 ( 2.8 GHz - 4.7 GHz / 12MB / 4 nhân, 8 luồng )
    - Màn hình: 14" ( 1920 x 1080 ) IPS không cảm ứng , HD webcam
    - RAM: 8GB Onboard DDR4 3200MHz ( 1 Khe cắm / 40GB )
    - Đồ họa: Onboard Intel Iris Xe Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11 Home
    - Pin: 3 cell Pin liền
    - Khối lương: 1.4kg`),
    new product ("78",
    "HP Envy x360 Convert 13 ay1056AU",
    "30.290.000",
    100,
    "./assets/products_img/LaptopHPEnvyx360Convert13ay1056AU.jpg",
    "5",
    `- CPU: AMD Ryzen 7 - 5800U
    - Màn hình: 13.3"Full HD (1920 x 1080)60 Hz,màn cảm ứng
    - RAM: 8 GBDDR4 (Onboard)3200 MHz
    - Đồ họa: AMD Radeon Graphics
    - Lưu trữ: 256 GB PCIe® NVMe™ M.2 SSD
    - Hệ điều hành: Windows 11 Home SL
    - Pin: 3-cell Li-ion, 51 Wh
    - Khối lượng: 1.3 kg`),
    new product ("79",
    "Lenovo ThinkBook 15 G4 IAP 21DJ00CMVN",
    "19.590.000",
    100,
    "./assets/products_img/LaptopLenovoThinkBook15G4IAP21DJ00CMVN.jpg",
    "4",
    `- CPU: Intel Core i5-1235U ( 1.3 GHz - 4.4GHz / 12MB / 10 nhân, 12 luồng )
    - Màn hình: 15.6" ( 1920 x 1080 ) Full HD IPS không cảm ứng , Màn hình chống lóa , FHD webcam
    - RAM: 1 x 8GB Onboard DDR4 3200MHz ( 1 Khe cắm / Hỗ trợ tối đa 40GB )
    - Đồ họa: Onboard Intel Iris Xe Graphics
    - Lưu trữ: 256GB SSD M.2 NVMe /
    - Hệ điều hành: No OS
    - Pin: 3 cell 45 Wh , Pin liền
    - Khối lượng: 1.7kg`),
    new product ("80",
    "Dell Inspiron 14 5420 (N5420-i5U085W11SLU)",
    "20.990.000",
    100,
    "./assets/products_img/DellInspiron145420N5420-i5U085W11SLU.png",
    "6",
    `- CPU: Intel Core i5-1235U
    - Màn hình: 14 inch FHD
    - RAM:8GB (8x1) DDR4 3200MHz
    - Đồ họa: Intel Iris Xe Graphics
    - Lưu trữ: 512GB M.2 PCIe NVMe
    - Hệ điều hành:Windows 11 Home
    - pin:4 Cell 54WHr
    - Khối lượng:1.55 kg`),
    new product ("81",
    "MSI Prestige 14 A11SC 203VN",
    "28.990.000",
    100,
    "./assets/products_img/LaptopMSIPrestige14A11SC203VN.jpg",
    "2",
    `- CPU: Intel Core i7-1195G7 ( 2.9 GHz - 5.0 GHz / 12MB / 4 nhân, 8 luồng )
    - Màn hình: 14" ( 1920 x 1080 ) IPS không cảm ứng , HD webcam
    - RAM: 16GB Onboard LPDDR4
    - Đồ họa: GTX 1650 4GB GDDR6 / Intel Iris Xe Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 10 Home 64-bit
    - Pin: 3 cell 52 Wh, Pin liền
    - Khối lượng: 1.3kg`),
    new product ("82",
    "Laptop Lenovo V14 G2 ITL 82KA00S1VN",
    "12.490.000",
    100,
    "./assets/products_img/LaptopLenovoV14G2ITL82KA00S1VN.jpg",
    "4",
    `- CPU: Intel Core i3-1115G4 ( 3.0 GHz - 4.10 GHz / 6MB / 2 nhân, 4 luồng )
    - Màn hình: 14" ( 1920 x 1080 ) Full HD TN không cảm ứng , Màn hình chống lóa , HD webcam
    - RAM: 1 x 4GB DDR4 3200MHz ( 1 Khe cắm / Hỗ trợ tối đa 12GB )
    - Đồ họa: Onboard Intel UHD Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11 Home
    - Pin: 2 cell 38 Wh , Pin liền
    - Khối lượng: 1.6kg`),
    new product ("83",
    "Laptop Lenovo Yoga 7 14ACN6 82N7008WVN",
    "21.189.000",
    100,
    "./assets/products_img/LaptopLenovoYoga714ACN682N7008WVN.jpg",
    "4",
    `- CPU: AMD Ryzen 5 5600U ( 2.3 GHz - 4.2 GHz / 16MB / 6 nhân, 12 luồng )
    - Màn hình: 14" ( 1920 x 1080 ) IPS cảm ứng , HD webcam
    - RAM: 16GB Onboard LPDDR4X 4266MHz Không nâng cấp được )
    - Đồ họa: Onboard AMD Radeon Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11 Home SL
    - Pin: 71 Wh , Pin liền
    - Khối lượng: 1.5kg`),
    new product ("84",
    "MSI Creator M16 A12UC 291VN",
    "33.059.000",
    100,
    "./assets/products_img/LaptopMSICreatorM16A12UC291VN.jpg",
    "2",
    `- CPU: Intel Core i7-12700H ( 2.3 GHz - 4.7GHz / 24MB / 14 nhân, 20 luồng )
    - Màn hình: 16" ( 2560 x 1600 ) Quad HD+ (2K) IPS HD webcam
    - RAM: 2 x 8GB DDR4 3200MHz ( 2 Khe cắm / Hỗ trợ tối đa 64GB )
    - Đồ họa: RTX 3050 4GB GDDR6 / Intel Iris Xe Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11 Home
    - Pin: 3 cell 53 Wh , Pin liền
    - Khối lượng: 2.3kg`),
    new product ("85",
    "HP Envy 16-h0033TX (6K7F9PA)",
    "57.990.000",
    100,
    "./assets/products_img/LaptopHPEnvy16-h0033TX6K7F9PA.jpg",
    "5",
    `- CPU: Intel Core i9 12900H
    - Màn hình: 16.0" WQXGA (2560 x 1600), Touchscreen, 120 Hz, IPS, edge-to-edge glass, micro-edge, Low Blue Light, 400 nits, 100% sRGB
    - RAM: DDR5 16GB (2 x 8GB) 4800MHz
    - Đồ họa: Geforce RTX 3060 6GB
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11
    - Pin: 6-cell, 83 Wh
    - Khối lượng: 2.32 kg`),
    new product ("86",
    "MSI Gaming Alpha 15 B5EEK-203VN",
    "19.990.000",
    100,
    "./assets/products_img/LaptopMSIGamingAlpha15B5EEK-203VN.jpg",
    "2",
    `- CPU: AMD Ryzen 5 5600H ( 3.3 GHz - 4.2 GHz / 16MB / 6 nhân, 12 luồng )
    - Màn hình: 15.6" ( 1920 x 1080 ) IPS 144Hz , không cảm ứng , HD webcam
    - RAM: 1 x 8GB DDR4 3200MHz ( 2 Khe cắm / Hỗ trợ tối đa 64GB )
    - Đồ họa: Radeon RX 6600M 8GB GDDR6 / AMD Radeon Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11 Home
    - Pin: 4 cell Pin liền
    - Khối lượng: 2.4 kg`),
    new product ("87",
    "MSI Gaming GL75 Leopard 10SCSK 056VN",
    "21.090.000",
    100,
    "./assets/products_img/LaptopMSIGamingGl75Leopard10SCSK056VN.jpg",
    "2",
    `- CPU: Intel Core I5-10200H 2.4Ghz
    - Màn hình: 17.3" ( 1080x1920 )Full HD IPS 144Hz, không cảm ứng, HD webcam 
    - RAM: 2 x 8GB DDR4 3200Mhz ( 2 khe cắm / hỗ trợ tối đa 32GB )
    - Đồ họa: Nvidia GTX1650Ti 4GB
    - Lưu trữ: 512GB SSD
    - Hệ điều hành: Windows 10
    - Pin: 41 Whrs
    - Trọng lượng: 2.6kg`),
    new product ("88",
    "HP ProBook 635 Aero G8 46J50PA",
    "21.990.000",
    100,
    "./assets/products_img/LaptopHPProBook635AeroG846J50PA.jpg",
    "5",
    `- CPU: AMD Ryzen 5 5600U
    - Màn hình: 13.3" IPS (1920 x 1080)
    - RAM: 1 x 8GB DDR4 3200MHz
    - Đồ họa: Onboard AMD Radeon Graphics
    - Lưu trữ: 256GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 10 Home 64-bit
    - Pin: 3 cell 53 Wh Pin liền
    - Khối lượng: 1kg`),
    new product ("89",
    "MSI GF63 Thin 11UC 443VN",
    "19.159.000",
    100,
    "./assets/products_img/LaptopMSIGF63Thin11UC443VN.jpg",
    "2",
    `- CPU: Intel Core i5-11400H ( 2.7 GHz - 4.5 GHz / 12MB / 6 nhân, 12 luồng )
    - Màn hình: 15.6" ( 1920 x 1080 ) IPS không cảm ứng , HD webcam
    - RAM: 1 x 8GB DDR4 3200MHz ( 2 Khe cắm / Hỗ trợ tối đa 64GB )
    - Đồ họa: RTX 3050 4GB GDDR6 / Intel UHD Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành:
    - Pin: Windows 10 Home 64-bit
    - Khối lượng: 1.9kg`),
    new product ("90",
    "ASUS Zenbook Pro 16X OLED UX7602ZM-ME107W",
    "79.990.000",
    100,
    "./assets/products_img/LaptopASUSZenbookPro16XOLEDUX7602ZM-ME107W.jpg",
    "3",
    `- CPU: Intel Core i9-12900H
    - Màn hình: 16" OLED (3840 x 2400)
    - RAM: 32GB Onboard LPDDR5
    - Đồ họa: RTX 3060 6GB GDDR6 / Intel Iris Xe Graphics
    - Lưu trữ: 1TB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11 Home
    - Pin: 6 cell 96 Wh Pin liền
    - Khối lượng: 2.4kg`),
    new product ("91",
    "MSI Modern 15 A11M 1024VN",
    "14.609.000",
    100,
    "./assets/products_img/LaptopMSIModern15A11M1024VN.jpg",
    "2",
    `- CPU: Intel Core i5-1155G7 ( 2.5 GHz - 4.5 GHz / 8MB / 4 nhân, 8 luồng )
    - Màn hình: 15.6" ( 1920 x 1080 ) Full HD IPS không cảm ứng , HD webcam
    - RAM: 1 x 8GB DDR4 3200MHz ( 2 Khe cắm / Hỗ trợ tối đa 64GB )
    - Đồ họa: Onboard Intel Iris Xe Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11
    - Pin: 3 cell 52 Wh , Pin liền
    - Khối lượng: 1.6kg`),
    new product ("92",
    "Lenovo ThinkBook 15 G2 ITL 20VE00UNVN",
    "19.990.000",
    100,
    "./assets/products_img/LaptopLenovoThinkBook15G2ITL20VE00UNVN.jpg",
    "4",
    `- CPU: Intel Core i5-1135G7 ( 2.4 GHz - 4.2 GHz / 8MB / 4 nhân, 8 luồng )
    - Màn hình: 15.6" ( 1920 x 1080 ) IPS không cảm ứng , HD webcam
    - RAM: 8GB Onboard DDR4 3200MHz ( 1 Khe cắm / 40GB )
    - Đồ họa: Onboard Intel Iris Xe Graphics
    - Lưu trữ: 512GB SSD M.2 NVMe /
    - Hệ điều hành: Windows 11 Home
    - Pin: 3 cell Pin liền
    - Khối lượng: 1.7kg`),
    new product ("93",
    "Acer Gaming Predator Helios 300 PH315-54-99S6 (NH.QC2SV.006)",
    "38.999.000",
    100,
    "./assets/products_img/AcerGamingPredatorHelios300PH315-54-99S6NH.QC2SV.006.png",
    "1",
    `- CPU: Intel Core i9 11900H
    - Màn hình:  15.6 inch QHD 165Hz
    - RAM: 16GB
    - Đồ họa:  Nvidia RTX3060 6G
    - Lưu trữ: 512GB SSD
    - Hệ điều hành:Win 11
    - pin:	4 Cell 59 WHrs
    - Khối lượng:2.3 kg`),
    new product ("94",
    "Dell Inspiron 3511 5174BLK",
    "13.590.000",
    100,
    "./assets/products_img/DellInspiron35115174BLK.jpg",
    "6",
    `- CPU: Intel Core i5 1035G1
    - Màn hình: 15.6 inch 
    - RAM:8GB
    - Đồ họa: Intel UHD Graphics
    - Lưu trữ: 256 GB SSD
    - Hệ điều hành:Windows 11 Home SL
    - pin:3 cell
    - Khối lượng:1.9 kg`),
]

function category(categoryID, categoryName) {
    this.categoryID = categoryID;
    this.categoryName = categoryName;
}

let categoriesDB = [
    new category("1", "Acer"),
    new category("2", "MSI"),
    new category("3", "Asus"),
    new category("4", "Lenovo"),
    new category("5", "HP"),
    new category("6", "Dell"),
]

function account(username, pass, type, email){
    this.username = username;
    this.password = pass;
    this.type = type;
    this.email = email
}

let accountDB = [
    new account("admin", "123456", 1, "tnvt@gmail.com"),
    new account("vietthai", "123456", 0, "testemail@gmail.com"),
    new account("vietthai2", "123456", 0, "testemail2@gmail.com"),
    new account("vietthai3", "123456", 0, "testemail3@gmail.com")
]



// ============================================ //
// -------------- LOCALSTORAGE ---------------- //
// ============================================ //

let accountStateInit = -1;   // xác định user id nào đang log in
let userAccounts = localStorage.getItem("userAccounts") ? JSON.parse(localStorage.getItem("userAccounts")) : accountDB;
let cart_products;
let orderNoteList = localStorage.getItem("orderNoteList") ? JSON.parse(localStorage.getItem("orderNoteList")) : [];
let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : productsDB;
//let categories = localStorage.getItem("categories") ? JSON.parse(localStorage.getItem("categories")) : categoriesDB;
let categories;
let accountState = localStorage.getItem("accountState") ? JSON.parse(localStorage.getItem("accountState")) : accountStateInit;



// ============================================ //
// ---------------- FIRSTLOAD ----------------- //
// ============================================ //

window.addEventListener('DOMContentLoaded', () => {
    $.ajax({
        type: "GET",
        url: "../../../main/controller/Web/api/categoryAPI.php",
        data: ``,
        success: function(resp){
            // categories = JSON.parse(JSON.stringify(resp));
            categories = Object.values(resp);
            renderCategory("category_list", ".category_items-link")
            renderCategory("mobile_category-list", ".mobile_category-items")
        }
    })
    renderProduct(products, start, end);
    renderPagesList(totalPages);
    changePage(products);
    animateCategoryPC();
    animateCategoryMobile();
    changeCategory(categories, ".category_items-link")
    changeCategory(categories, ".mobile_category-link")
    addToCart()
    search(products);
    filterByPrice(products, ".price_items");
    filterByPrice(products, ".filter_item-priceOption");
    productDetailNaviagte();
    if(accountState !== -1) {
        let account = userAccounts.find((item) => item.username === accountState);
        renderAccountOnMobile(account)
        renderAccountOnPC(account)
    }
    scrolltoTop()
});


window.addEventListener("scroll", function(e){
    let top = this.scrollY
    if(top<400) document.querySelector("#scroll_top_btn").style.display = "none"
    else document.querySelector("#scroll_top_btn").style.display = "unset"
})

// =================================================== //
// ------------------- PAGINATION -------------------- //
// =================================================== //

let currentPage = 1;
let itemPerPage = 10;
let start = 0;
let end = itemPerPage;
let totalPages = Math.ceil(products.length/itemPerPage);

function renderProduct(productList, s, e) {
    const product_row = document.querySelector("#row2");
    product_row.innerHTML='';
    productList.forEach(function (item, index) {
        if(index>=s && index <e) {
            const product = document.createElement("div");
            product.classList.add("grid_column", "pc_col2-4", "tablet_col4", "mobile_col6", "pc-wide_col2-4"); // modifiy here
            product.innerHTML = `
            <a class="product_item-link" href="#"><div class="product_items" data-id="${item.id}">
                <div class="product_items-img" style="background-image: url(${item.background_image})"></div>
                <div class="product_items-name">${item.name}</div>
                <div class="product_items-price">${item.price}</div>
                <div class="product_items-modal">
                    <div class="product_items-addBtn"><i class="fa-solid fa-cart-shopping"></i></div>
                    <div class="product_item-detailBtn"><i class="fa-solid fa-magnifying-glass"></i></div>
                </div>
            </div></a>
            `;
            product_row.appendChild(product);
            const productItemLinks = document.querySelectorAll(".product_item-link");
            productItemLinks.forEach(function(item) {
                item.onclick = function(e) {e.preventDefault()}
            })
            addToCart();
            productDetailNaviagte()
        }
    })
}
// renderProduct(products, start, end);

function renderPagesList(total) {
    let str = '';
    for(let i=1; i<=total; i++) {
        str+= `
            <a href="">
                <li class="page_list-items">${i}</li>
            </a>
        `;
    }
    document.querySelector(".page_list").innerHTML=str;
    changePageActive()
}

function clearPagesList(){
    document.querySelector(".page_list").innerHTML=""
}

function changePage(productList) {
    const pagesList = document.querySelectorAll(".page_list a");
    pagesList.forEach(function (item, index) {
        item.addEventListener("click", (evt) => {
            evt.preventDefault()
            let value = index+1;
            currentPage = value
            s = (currentPage-1)*itemPerPage;
            e = currentPage*itemPerPage;
            renderProduct(productList, s, e);
        })
    })
}

// changePage(products);

// ======================================================== //
// ----------------------- CATEGORY ----------------------- //
// ======================================================== //

// const categoriesPC = document.querySelectorAll(".category_items-link");
// const categoriesMobile_Tablet = document.querySelectorAll(".mobile_category-link");

function changeCategory(categoryArr, categorieItems) {
    const items = document.querySelectorAll(categorieItems);
    items.forEach(function(item) {
        item.addEventListener("click", function(e) {
            e.preventDefault();
            searchValue = ""
            priceStart = undefined
            priceEnd = undefined
            resetShowReusltSearchAndFilter()
            const categoryID = item.parentElement.getAttribute("data-cateID");
            if(categoryID === "all") {
                start=0;
                end=itemPerPage;
                // currentPage=1;
                totalPages = Math.ceil(products.length/itemPerPage);
                renderPagesList(totalPages);
                renderProduct(products, start, end);
                changePage(products);
                search(products)
                filterByPrice(products, ".price_items");
                filterByPrice(products, ".filter_item-priceOption");
                productDetailNaviagte()
            }
            else {
                const categorieProducts = products.filter(function(i) {return i.categoryID === categoryID})
                start=0;
                end=itemPerPage;
                // currentPage=1;
                totalPages = Math.ceil(categorieProducts.length/itemPerPage);
                renderPagesList(totalPages);
                renderProduct(categorieProducts, start, end);
                changePage(categorieProducts);
                search(categorieProducts)
                filterByPrice(categorieProducts, ".price_items");
                filterByPrice(categorieProducts, ".filter_item-priceOption");
                productDetailNaviagte()
            }
        })
    })
}
// changeCategory(categoriesPC);
// changeCategory(categoriesMobile_Tablet);

function renderCategory(categoryList, categoryItems) {
    console.log(categories)
    const list = document.querySelector(`.${categoryList}`);
    let str = categoryList === "mobile_category-list" ? `<li class="mobile_category-items" data-cateid="all"><a href="" class="mobile_category-link">Tất cả</a></li>` 
    : `<li class="category_items" data-cateid="all"><a href="" class="category_items-link">Tất cả</a></li>`;
    categories.forEach(function(item, index) {
        if(categoryList === "mobile_category-list") {
            str += `
                <li class="mobile_category-items" data-cateid=${item.id}><a href="" class="mobile_category-link">${item.ten_danh_muc}</a></li>
            `;
        }
        else {
            str += `
                <li class="category_items" data-cateid=${item.id}><a href="" class="category_items-link">${item.ten_danh_muc}</a></li>
            `;
        }
    })
    list.innerHTML = str;
    const itemList = list.querySelectorAll(categoryItems);
    if(categoryItems === ".category_items-link") itemList[0].classList.add("category_items-active");
    else itemList[0].classList.add("mobile_category-active");
}

// ====================================================================== //
// ----------------------- JS Interact Anmaitions ----------------------- //
// ===================================================================== //

// ---------------------- Scroll to top ------------------------- //
function scrolltoTop(){
    const scrolltoTopBtn = document.querySelector("#scroll_top_btn")
    scrolltoTopBtn.onclick=()=>{
        window.scrollTo({top: 0, behavior: 'smooth'})
    }
}

// --------------------- Change Pages ------------------------- //

function changePageActive() {
    const pagesList = document.querySelectorAll(".page_list a");
    if(pagesList.length != 0) {
        pagesList[0].children[0].classList.add("page_list_item-active")
        Array.from(pagesList).forEach((item) => {
            item.addEventListener("click", () => {
                pagesList.forEach((i)=>i.children[0].classList.remove("page_list_item-active"))
                item.children[0].classList.add("page_list_item-active")
                window.scrollTo({top: 650, behavior: 'smooth'})
            })
        })
    }
}


// --------------- SEARCHBAR ON MOBILE AND TABLET -------------------

const mobileTabletSearchBTN = document.querySelector(".mobile_header-searchBtn");
const mobileTabletSearchBar = document.querySelector(".header_searchbar");

mobileTabletSearchBTN.onclick = function(e) {
    mobileTabletSearchBar.classList.remove("header_searchbar-hide");
}
window.onclick = function (e) {
    if(!mobileTabletSearchBTN.contains(e.target) && !mobileTabletSearchBar.contains(e.target)) {
        mobileTabletSearchBar.classList.add("header_searchbar-hide");
    }
}

// -------------- HAMBUGERLIST ON  MOBILE AND TABLET -----------------

const hambugerList = document.querySelector(".mobile_hambuger-list");
const hambugerModal = document.querySelector(".hambugerlist_modal");
const hambugerModal_content = document.querySelector(".hambugerlist_modal-content");
const hambugerModal_exitBTN = document.querySelector(".hambugerlist_modal-closeBTN");

hambugerList.onclick = function () {
    hambugerModal.classList.remove("hambugerlist_modal-hide");
    hambugerModal_content.style.animation = "slideIn 0.2s ease-in";
}

hambugerModal_exitBTN.onclick = function () {
    hambugerModal.classList.add("hambugerlist_modal-hide");
}

// ------------------- CART BOX ---------------------

const cartBtn = document.querySelector(".header_cart-icon");
const cartBox = document.querySelector(".cart_box");
cartBtn.onclick = function() {
    cartBox.classList.toggle("cart_box-hide");
}

// ------------------- CATEGORIES -----------------------

function animateCategoryPC() {
    const categoriesLinks = document.querySelectorAll(".category_items-link");
    const mobileCates = document.querySelectorAll(".mobile_category-items");
    categoriesLinks.forEach(function(item) {
        item.addEventListener("click", function(e) {
            e.preventDefault();
            categoriesLinks.forEach(function(e) {e.classList.remove("category_items-active")})
            item.classList.add("category_items-active");
            const categoryID = item.parentElement.getAttribute("data-cateid");
            mobileCates.forEach((i)=>{
                i.classList.remove("mobile_category-active")
                if(i.getAttribute("data-cateid") === categoryID) i.classList.add("mobile_category-active");
            })
        }) 
    })
}

function animateCategoryMobile() {
    const categoriesLinks = document.querySelectorAll(".category_items-link");
    const mobileCates = document.querySelectorAll(".mobile_category-items");
    mobileCates.forEach(function(item) {
        item.addEventListener("click", function(e) {
            e.preventDefault();
            mobileCates.forEach(function(e) {e.classList.remove("mobile_category-active")})
            item.classList.add("mobile_category-active");
            const categoryID = item.getAttribute("data-cateid");
            categoriesLinks.forEach((i)=>{
                i.classList.remove("category_items-active")
                if(i.parentElement.getAttribute("data-cateid") === categoryID) i.classList.add("category_items-active");
            })
        }) 
    })
}



// ----------------- LOGIN , SIGNUP -------------------



// =================================================================== //
// ------------------------------ CART ------------------------------ //
// ================================================================= //


function addToCart() {
    // id, name, price, quantity ,background_image, categoryID, description
    cart_products = localStorage.getItem("cart_products") ? JSON.parse(localStorage.getItem("cart_products")) : [];
    const addToCartBtns = document.querySelectorAll(".product_items-addBtn");
    addToCartBtns.forEach(function(item) {
        item.onclick = function () {
            const productBox = getParentElement(item, ".product_items");
            const productID = productBox.getAttribute("data-id");
            const productItem = products.find(function(i) {return i.id === productID});
            if(productItem.quantity <= 0) {
                alert("Out of order!")
            }
            else {
                function product (id, img, name, price, quantity) {
                    this.id = id,
                    this.img = img;
                    this.name = name;
                    this.price = price;
                    this.quantity = quantity;
                    this.totalPrice = this.quantity*this.price;
                }
                const index = cart_products.findIndex(function(i) {return i.id === productID})    // return index, if not find return -1.
                if (index !== -1) {
                    if(productItem.quantity<cart_products[index].quantity+1) {
                        alert("Out of order!")
                    }
                    else {
                        cart_products[index].quantity +=1;
                        cart_products[index].totalPrice = cart_products[index].quantity*cart_products[index].price;
                        localStorage.setItem("cart_products", JSON.stringify(cart_products));
                    }
                }
                else {
                    let cart_item = new product(productID, productItem.background_image, productItem.name, parseInt(productItem.price.replace(/[ .đ]/gm,'')), 1);
                    cart_products.push(cart_item);
                    localStorage.setItem("cart_products", JSON.stringify(cart_products));
                }
                renderCart();
            }
        }
    })
}

// addToCart()

function deleteProductCart(cartContainer) {
    const deleteBtns = cartContainer.querySelectorAll(".cart_items-deleteBtn");
    deleteBtns.forEach(function (item) {
        item.onclick = function() {
            const cart_item = getParentElement(item, ".cart_items");
            const productID = cart_item.getAttribute("data-id");
            const index = cart_products.findIndex(function(i) {return i.id === productID})
            cart_products.splice(index,1);  // at index i, delete 1 element => delete element while change the original array
            localStorage.setItem("cart_products", JSON.stringify(cart_products));
            cartContainer.removeChild(cart_item);
            if(cart_products.length == 0) {
                document.querySelector(".cart_nofi").innerText = "Không tìm thấy sản phẩm";
            }
        }
    })
}

function getParentElement(element, parent) {
    while(element.parentElement) {
        if(element.parentElement.matches(parent)) {
            return element.parentElement;
        }
        element = element.parentElement;
    }
}

function renderCart() {
    cart_products = localStorage.getItem("cart_products") ? JSON.parse(localStorage.getItem("cart_products")) : [];
    const cart_list = document.querySelector(".cart_list");
    cart_list.innerHTML='';
    if(cart_products.length !==0) {
        cart_products.forEach(function(item) {
            const cart_item = document.createElement("div");
            cart_item.classList.add("cart_items");
            cart_item.setAttribute("data-id",`${item.id}`);
            cart_item.innerHTML = `
            <div class="cart_items-img" style="background-image: url(${item.img})"></div>
            <div class="cart_items-body">
                <div class="cart_item-info">
                    <div class="cart_items-name">${item.name}</div>
                    <div class="cart_items-price">${item.price} đ</div>
                </div>
                <div class="cart_items-quantity">
                    <i class="fa-sharp fa-solid fa-chevron-up increase"></i>
                    <span>${item.quantity}</span>
                    <i class="fa-solid fa-chevron-down decrease"></i>
                </div>
                <div class="cart_items-total">${item.totalPrice} đ</div>
                <i class="fa-solid fa-trash cart_items-trash cart_items-deleteBtn"></i>
            </div>
            `;
            cart_list.appendChild(cart_item);
        })
        document.querySelector(".cart_nofi").innerHTML = `<div class="cart_confirm-btn">Xác nhận đặt hàng</div>`;
        deleteProductCart(cart_list);
        decreaseQuantity();
        increaseQuantity();
        createBuyForm();     // hàm chỉ dc gọi sau khi đã render ra cartbox hoàn chỉnh (có btn để querySelector)
    }
}

function decreaseQuantity() {
    const increaseBtns = document.querySelectorAll(".decrease");
    increaseBtns.forEach(function(item) {
        item.onclick = function() {
            const cartItem  = getParentElement(item, ".cart_items")
            const productID = cartItem.getAttribute("data-id");
            const index = cart_products.findIndex(function(i) {return i.id === productID});
            if(cart_products[index].quantity > 1) {
                cart_products[index].quantity -=1;
                cart_products[index].totalPrice = cart_products[index].quantity*cart_products[index].price;
            }
            else {
                cart_products[index].quantity = 1;
                cart_products[index].totalPrice = cart_products[index].price;
            }
            item.parentElement.children[1].innerText = cart_products[index].quantity;
            cartItem.children[1].children[2].innerText = cart_products[index].totalPrice + " đ";
            localStorage.setItem("cart_products", JSON.stringify(cart_products));
        }
    })
}

function increaseQuantity() {
    const decreaseBtns = document.querySelectorAll(".increase");
    decreaseBtns.forEach(function(item) {
        item.onclick = function() {
            const cartItem  = getParentElement(item, ".cart_items")
            const productID = cartItem.getAttribute("data-id");
            const index = cart_products.findIndex(function(i) {return i.id === productID});
            const productQuantity = products.find(function(i) {return i.id === productID}).quantity;
            if((cart_products[index].quantity + 1) > productQuantity) {
                alert("Out of order!")
            }
            else {
                cart_products[index].quantity +=1;
                cart_products[index].totalPrice = cart_products[index].quantity*cart_products[index].price;
                item.parentElement.children[1].innerText = cart_products[index].quantity;
                cartItem.children[1].children[2].innerText = cart_products[index].totalPrice + " đ";
                localStorage.setItem("cart_products", JSON.stringify(cart_products));
            }
        }
    })
}
// ============================================================ //
// ------------------------ SEARCHING ------------------------- //
// ============================================================ //

// biến global
let searchValue = ""

function search(arrProducts) {
    const searchInput = document.querySelector(".header_searchbar-input");
    const searchBtn = document.querySelector(".search_btn");

    searchBtn.onclick = function() {
        searchValue = searchInput.value
        let searchResultProducts = arrProducts.filter(function(item) {
            const value = parseInt(item.price.replace(/[ .đ]/gm,''))
            let s = (priceStart==undefined) ? 0 : priceStart
            let e = (priceEnd==undefined) ? value : priceEnd
            return item.name.toLowerCase().includes(searchValue.toLowerCase()) && value>=s && value<=e
        })
        start = 0;
        end = itemPerPage;
        totalPages = Math.ceil(searchResultProducts.length / itemPerPage);
        if(totalPages > 1){
            renderPagesList(totalPages);
            changePage(searchResultProducts);
        } else clearPagesList()
        renderProduct(searchResultProducts, start, end);
        showResultSearchAndFilter()
        productDetailNaviagte()
        window.scrollTo({top: 700, behavior: 'smooth'})
    }

    searchInput.addEventListener("keydown", function(event) {
        if (event.key ==="Enter") {
            event.preventDefault();
            searchValue = searchInput.value
            let searchResultProducts = arrProducts.filter(function(item) {
                const value = parseInt(item.price.replace(/[ .đ]/gm,''))
                let s = (priceStart==undefined) ? 0 : priceStart
                let e = (priceEnd==undefined) ? value : priceEnd
                return item.name.toLowerCase().includes(searchValue.toLowerCase()) && value>=s && value<=e
            })
            start = 0;
            end = itemPerPage;
            totalPages = Math.ceil(searchResultProducts.length / itemPerPage);
            if(totalPages > 1){
                renderPagesList(totalPages);
                changePage(searchResultProducts);
            } else clearPagesList()
            renderProduct(searchResultProducts, start, end);
            showResultSearchAndFilter()
            productDetailNaviagte()
            window.scrollTo({top: 700, behavior: 'smooth'})
        }
    });
}

function showResultSearchAndFilter(){
    const reusltDiv = document.querySelector("#searchAndFilterResult")
    reusltDiv.innerText = `Kết quả tìm kiếm ${searchValue=="" ? "" : "cho: "+searchValue+","} Khoảng giá: ${priceStart==undefined? "": "từ "+priceStart+ "đ"} ${priceEnd==undefined? "tất cả" : "đến "+priceEnd+" đ"}`
}

function resetShowReusltSearchAndFilter(){
    const reusltDiv = document.querySelector("#searchAndFilterResult")
    reusltDiv.innerText = ""
}

// ============================================================ //
// ------------------------- FILTERS -------------------------- //
// ============================================================ //

// global scope
let priceStart
let priceEnd

function filter(arrProducts, priceRangeStart, priceRangeEnd){
    priceStart = priceRangeStart
    priceEnd = priceRangeEnd
    let filterPriceProducts = arrProducts.filter(function(item) {
        const value = parseInt(item.price.replace(/[ .đ]/gm,''))
        let s = (priceRangeStart==undefined) ? 0 : priceRangeStart
        let e = (priceRangeEnd==undefined) ? value : priceRangeEnd
        let name = (searchValue=="") ? item.name.toLowerCase() : searchValue.toLowerCase()
        return value >= s && value <= e && item.name.toLowerCase().includes(name)
    })
    start = 0;
    end = itemPerPage;
    totalPages = Math.ceil(filterPriceProducts.length / itemPerPage);
    showResultSearchAndFilter()
    if(totalPages > 1){
        renderPagesList(totalPages);
        changePage(filterPriceProducts);
    } else clearPagesList()
    renderProduct(filterPriceProducts, start, end);
    productDetailNaviagte();
}

function filterByPrice(arrProducts, options) {
    const priceOptions = document.querySelectorAll(options);
    priceOptions[0].onclick = function() {filter(arrProducts)}
    priceOptions[1].onclick = function() {filter(arrProducts, 0, 10000000)}
    priceOptions[2].onclick = function() {filter(arrProducts, 10000000, 20000000)}
    priceOptions[3].onclick = function() {filter(arrProducts, 20000000, 30000000)}
    priceOptions[4].onclick = function() {filter(arrProducts, 30000000)}
}


// ================================================================================== //
// ----------------------- Sign up: Stored User account ---------------------------- //
// --------------------- Login: render account's view ----------------------------- //
// -------------------------- Logout: render stranger's view --------------------------------- //
// =============================================================================== //


// function stringToHex(str) {
//     var arr = [];
//     for (var i = 0; i < str.length; i++) {
//            arr[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
//     }
//     return "\\u" + arr.join("\\u");
// }

// function hexToString(str) {
//     return unescape(str.replace(/\\/g, "%"));
// }

signUpForm.onsubmit = function(e) {
    e.preventDefault();
    const check1 = usernameValid();
    const check2 = emailValid();
    const check3 = passwordValid();
    const check4 = confirmPassWordValid();
    if (check1 && check2 && check3 && check4) {
        let flag = userAccounts.some(function(item) {
            return item.username === username.value
        })
        // push vào mảng users để lưu tài khoản
        if (!flag) {
            let user = {
                username: username.value,
                password: password.value,
                type: 0,   // O: customer, 1:admin
                email: email.value
            }
            desc.innerHTML = "Tạo tài khoản thành công!";
            desc.style.color = "#1dbfaf";
            userAccounts.push(user);
            localStorage.setItem("userAccounts", JSON.stringify(userAccounts));
        }
        else {
            desc.innerHTML = "Đã có username tồn tại!";
            desc.style.color = "red";
        }
    
    }
    
}

logInFrom.onsubmit = function(e) {
    e.preventDefault()
    const pass = username_pass.value
    let acc = userAccounts.find(function(item) {
        return (item.username === username_login.value && item.password === pass);
    });
    if(!acc){
        desc.innerHTML = "Tài khoản hoặc mật khẩu sai, Đăng ký mới?"
        desc.style.color = "red"
        return
    }
    if(acc.type == 1) {   // admin 
        accountState = acc.username;
        localStorage.setItem("accountState", JSON.stringify(accountState));
        desc.innerHTML = "Đăng nhập thành công!";
        desc.style.color = "#1dbfaf";
        setTimeout(() => {
            signUpModal.classList.add("signUp_modal-hide");
        }, 1000);
        renderAccountOnPC(acc);
        renderAccountOnMobile(acc);
    }
    else if(acc.type == 0) {   //  user
        accountState = acc.username;
        localStorage.setItem("accountState", JSON.stringify(accountState));
        desc.innerHTML = "Đăng nhập thành công!";
        desc.style.color = "#1dbfaf";
        setTimeout(() => {
            signUpModal.classList.add("signUp_modal-hide");
        }, 1000);
        renderAccountOnPC(acc);
        renderAccountOnMobile(acc);
    }
}

function renderAccountOnPC(acc) {
    const headerList2 = getParentElement(loginBtns[0], ".header_list");
    const userDiv = headerList2.querySelector(".user_account-pc");
    loginBtns.forEach(function(item) {item.classList.add("loginSuccess")});
    userDiv.classList.remove("loginSuccess");
    userDiv.children[1].innerText = `${acc.username}`
    if(acc.type == 1){
        const adminPage = document.querySelectorAll(".administrator_page")
        adminPage.forEach((item)=>{item.classList.remove("loginSuccess")})
    }
}

function renderAccountOnMobile(acc) {
    const moblieModalList = document.querySelector(".hambugerlist_modal-list");
    const userDivs = moblieModalList.querySelectorAll(".user_account-mobile");
    loginBtns.forEach(function(item) {item.classList.add("loginSuccess")});
    userDivs.forEach(function(item) {item.classList.remove("loginSuccess")});
    userDivs[0].children[1].innerText = `${acc.username}`
    if(acc.type == 1){
        const adminPage = document.querySelectorAll(".administrator_page")
        adminPage.forEach((item)=>{item.classList.remove("loginSuccess")})
    }
}

const logOutBtns = document.querySelectorAll(".logout_btn");
logOutBtns.forEach(function(item) {
    item.onclick = function() {
        if(accountState !== -1){
            accountState = -1;
            localStorage.setItem("accountState", JSON.stringify(accountState));
            const userDivPC = document.querySelector(".user_account-pc");
            const userDivsMoblie = document.querySelectorAll(".user_account-mobile");
            const adminPage = document.querySelectorAll(".administrator_page")
            userDivPC.classList.add("loginSuccess");
            userDivsMoblie.forEach(function(item) {item.classList.add("loginSuccess")});
            loginBtns.forEach(function(item) {item.classList.remove("loginSuccess")});
            adminPage.forEach((item)=>{item.classList.add("loginSuccess")})
        }

    }
})

const adminPage = document.querySelectorAll(".administrator_page")
adminPage.forEach((item)=>{
    item.onclick=()=>{
        // chuyen den trang cho admin
        localStorage.setItem("products", JSON.stringify(products)) // chay lan dau, chua mua hang
        localStorage.setItem("categories", JSON.stringify(categories)) // chay lan dau, chua vao trang admin
        localStorage.setItem("userAccounts", JSON.stringify(userAccounts)) // chay lan dau, chua dang ky tk moi
        window.location.href = "./admin/admin_page.html"
    }
})


// =========================================================== //
// -------------------- Tạo đơn đặt hàng -------------------- //
// ========================================================= //

// orderNoteList = localStorage.getItem("orderNoteList") ? JSON.parse(localStorage.getItem("orderNoteList")) : [];

const confirmBuyFormModal = document.querySelector(".confirmBuy_form-modal");
const confirmBuyFormCloseBtn = document.querySelector(".confirmBuy_form-closebtn");
const confirmBuyForm = document.querySelector(".confirmBuy_form-info");
const customername = document.querySelector("#hovaten");
const phoneNum = document.querySelector("#sdt");
const address = document.querySelector("#address");

confirmBuyFormCloseBtn.onclick = function() {
    confirmBuyFormModal.classList.add("confirmBuy_modal-hide");
}

function createBuyForm() {
    const confirmBuyBtn = document.querySelector(".cart_confirm-btn");
    confirmBuyBtn.onclick = function() {
        const currentAcc = userAccounts.find((item)=>{
            return item.username == accountState
        })
        if(accountState == -1) {
            // chua dang nhap
            renderSignUpForm();
        }
        else if(currentAcc.type == 1) {
            alert("Vui lòng không sử dụng tài khoản của người quản trị để mua hàng!")
        }
        else {
            customername.value = ""
            phoneNum.value = ""
            address.value = ""
            confirmBuyFormModal.classList.remove("confirmBuy_modal-hide");
            const confirmProductsList = confirmBuyFormModal.querySelector(".buy_product-list");
            const totalPrice = confirmBuyFormModal.querySelector(".buy_product-totalAll");
            confirmProductsList.innerHTML = "";
            let total = 0;
            cart_products.forEach(function(item) {
                total += item.totalPrice;
                let buyItem = document.createElement("div");
                buyItem.classList.add("buy_product-items");
                buyItem.setAttribute("data-id", `${item.id}`)
                buyItem.innerHTML = `
                    <div class="buy_product-img" style="background-image: url(${item.img})"></div>
                    <div class="buy_product-body">
                        <div class="buy_product-info">
                            <div class="buy_product-name">${item.name}</div>
                            <div class="buy_product-price">${item.price} đ</div>
                        </div>
                        <span class="buy_product-quantity">SL: ${item.quantity}</span>
                        <span class="buy_product-total">${item.totalPrice} đ</span>
                    </div>
                `;
                confirmProductsList.appendChild(buyItem);
            })
            totalPrice.innerHTML = `Tổng tiền: <span style="color:red;">${total} đ</span>`
        }
    }
}

phoneNum.onblur = function() {checkPhoneInput()};
address.onblur = function() {checkAddressInput()};

confirmBuyForm.onsubmit = function(e) {
    e.preventDefault();
    let check1 = checkPhoneInput();
    let check2 = checkAddressInput();
    if(check1 && check2) {
        const d = new Date()
        let orderNote = {
            orderNoteID: d.getFullYear()+""+(d.getMonth()+1)+""+d.getDate()+""+d.getHours()+""+d.getMinutes()+""+d.getSeconds(),
            status: 0,
            userID: accountState,
            customerName: customername.value,
            phoneNumber: phoneNum.value,
            address: address.value,
            date: d,
            buyItems: cart_products,
            totalPrice: cart_products.reduce((preVal, item) => {
                return item.totalPrice + preVal
            }, 0)
        }
        orderNoteList.push(orderNote);
        localStorage.setItem("orderNoteList", JSON.stringify(orderNoteList));
        const buyProducts = document.querySelectorAll(".buy_product-items");
        buyProducts.forEach(function(item) {
            const productID  = item.getAttribute("data-id");
            const index = products.findIndex(function(i) {return i.id === productID});
            const index2 = cart_products.findIndex((i) => {return i.id === productID})
            products[index].quantity -= cart_products[index2].quantity;
            // products[index].quantity -= parseInt(item.children[1].children[2].innerText);
        })
        document.querySelector(".cart_list").innerHTML = "";
        document.querySelector(".cart_nofi").innerText = "Không tìm thấy sản phẩm";
        confirmBuyFormModal.classList.add("confirmBuy_modal-hide");
        alert("Cảm ơn bạn đã mua hàng tại shop chúng tôi <3");
        localStorage.setItem("products", JSON.stringify(products));
        cart_products = [];
        localStorage.setItem("cart_products", JSON.stringify(cart_products));
    }
}

function checkPhoneInput() {
    const form_group = getParentElement(phoneNum, ".form-group");
    const errorSpan = form_group.querySelector(".form-messege");
    let data = phoneNum.value;
    let check1 = data ? true:false;
    let regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    let check2 = regex.test(data) ? true:false;
    if(!check1) {
        errorSpan.innerText = "Đây là thông tin bắt buộc";
        phoneNum.classList.add("invalid");
        return false;
    }
    else if(!check2) {
        errorSpan.innerText = "Vui lòng cung cấp sđt thật";
        phoneNum.classList.add("invalid");
        return false;
    }
    else {
        errorSpan.innerText = "";
        phoneNum.classList.remove("invalid");
        return true;
    }
    
}

function checkAddressInput() {
    const form_group = getParentElement(address, ".form-group");
    const errorSpan = form_group.querySelector(".form-messege");
    let data = address.value;
    let check1 = data ? true:false;
    if(!check1) {
        errorSpan.innerText = "Đây là thông tin bắt buộc";
        address.classList.add("invalid");
        return false;
    }
    else {
        errorSpan.innerText = "";
        address.classList.remove("invalid");
        return true;
    }
}


// ==================================================== //
// ------------ NAVIGATE PRODUCT DETAILS -------------- //
// ==================================================== //

function productDetailNaviagte() {
    const productDetailBtns = document.querySelectorAll(".product_item-detailBtn");
    productDetailBtns.forEach(function(item) {
        item.onclick = function() {
            localStorage.setItem("products", JSON.stringify(products));
            const productID = getParentElement(item, ".product_items").getAttribute("data-id");
            window.location.href = `./product_details/product_details.html?product_id=${productID}`;
        }
    })
}

// ========================================================== //
// --------------- XEM LẠI CÁC ĐƠN ĐẶT HÀNG ----------------- //
// ========================================================== //

const reviewOrderListBtns = document.querySelectorAll(".myOrder_ist")
const orderNoteModal = document.querySelector(".orderNote_modal")
const orderNoteContainer = document.querySelector('.orderNote_container')
const orderNoteCloseBtn = document.querySelector('.orderNote_closeBtn')
const bodyContent = orderNoteContainer.querySelector(".orderNote_body")
reviewOrderListBtns.forEach((item) => {
    item.onclick = function() {
        renderOrderNoteList()
        orderNoteModal.classList.remove("orderNote_modal-hide")
    }
})

orderNoteCloseBtn.onclick = () => {
    orderNoteModal.classList.add("orderNote_modal-hide")
}

function renderOrderNoteList() {
    const orderNote = orderNoteList.filter((item) => {
        return item.userID === accountState 
    })
    if(orderNote.length == 0) {
        bodyContent.innerHTML = `<span style="margin-top: 50px; display:block">Bạn chưa có đơn hàng nào, hãy mua ngay tại shop chúng tôi!</span>`
    }
    else {
        bodyContent.innerHTML = ""
        orderNote.forEach((item) => {
            const orderDivOverview = document.createElement("div")
            const orderDivDetail = document.createElement("div")
            orderDivOverview.classList.add("orderNote_overView")
            orderDivDetail.classList.add("orderNote_details", "orderNote_details-hide")
            orderDivOverview.innerHTML = `
                <i class="fa-sharp fa-solid fa-clipboard"></i>
                <div class="orderNote_info">
                    <div class="orderNote_id">Mã đơn hàng: ${item.orderNoteID}</div>
                    <div class="orderNote_totalPrice">Thành tiền: <span style="color: red;">${item.totalPrice} đ</span></div>
                </div>
                <div class="orderNote_date">Ngày tạo: ${item.date.toLocaleString()}</div>
                <div class="orderNote_statsus">
                    Tình trạng
                    <div class="orderNote_state">${item.status==0?"Chưa xử lý":"Đã xử lý"}</div>
                </div>
                <div class="orderNote_viewDetails">
                    <span>Xem chi tiết</span>
                    <i class="fa-solid fa-circle-plus"></i>
                </div>
            `
            let str = ""
            item.buyItems.forEach((i)=>{
                str += `
                    <div class="orderNote_items">
                        <div class="orderNote_productImg" style="background-image:url(${i.img})"></div>
                        <div class="orderNote_productName">${i.name}</div>
                        <div class="orderNote_productPrice">Đơn giá: <span style="color: red;">${i.price} đ</span></div>
                        <div class="orderNote_productQuantity">SL: ${i.quantity}</div>
                    </div>
                `
            })
            orderDivDetail.innerHTML = str
            bodyContent.append(orderDivOverview, orderDivDetail)
        })
        bodyContent.querySelectorAll(".orderNote_viewDetails").forEach((item) => {
            const orderNoteDetail = getParentElement(item, ".orderNote_overView").nextElementSibling;
            item.onclick = () => {
                if(orderNoteDetail.classList.contains("orderNote_details-hide")) {
                    item.innerHTML = `
                        <span>Ẩn bớt</span>
                        <i class="fa-solid fa-minus"></i>
                    `
                }
                else {
                    item.innerHTML = `
                        <span>Xem chi tiết</span>
                        <i class="fa-solid fa-circle-plus"></i>
                    `
                }
                orderNoteDetail.classList.toggle("orderNote_details-hide")
            }
        })
    }

}
