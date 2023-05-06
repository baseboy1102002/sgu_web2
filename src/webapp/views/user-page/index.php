<?php

    session_start();

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shopee clone</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.3/css/bootstrap.min.css" integrity="sha512-SbiR/eusphKoMVVXysTKG/7VseWii+Y3FdHrt0EpKgpToZeemhqHeZeLWLhJutz/2ut2Vw1uQEj2MbRF+TVBUA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.3/js/bootstrap.min.js" integrity="sha512-1/RvZTcCDEUjY/CypiMz+iqqtaoQfAITmNSJY17Myp4Ms5mdxPS5UV7iOfdZoxcGhzFbOm6sntTKJppjvuhg4g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <link rel="stylesheet" href="../style/grid_lib.css">
    <link rel="stylesheet" href="./style.css">
    <link rel="stylesheet" href="../style/responsive.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="../components/footer/footer.css">
    
    
</head>

<body>
    <!-- all web content -->
    <div class="app">
        <!-- web header -->
        <header class="app_header">
            <div class="grid">
                <!-- header navbar section-->
                <div class="header_nav hide_on_table-mobile">
                    <ul class="header_list">
                        <li class="header_items"><a class="seperate" href="../landing-page/landing_page.php">Giới thiệu về shop</a></li>
                        <li class="header_items"><a class="seperate" href="">Chính sách bảo hành</a></li>
                        <li class="header_items qr_relative"><a class="seperate" href="">Tải ứng dụng</a>
                            <div class="header_qr">
                                <img src="../../assets/logo/qr_code.png" alt="QR Code" class="header_qr-scan">
                                <div class="header_qr-apps">
                                    <img src="../../assets/logo/app_store.png" alt="app store" class="header_qr-link">
                                    <img src="../../assets/logo/google_play_store.png" alt="google playstore" class="header_qr-link">
                                    <img src="../../assets/logo/app_gallery.png" alt="app gallery" class="header_qr-link">
                                </div>
                            </div>
                        </li>
                        <li class="header_items">
                            Kết nối
                            <a href=""><i class="header_icons fa-brands fa-instagram"></i></a>
                            <a href=""><i class="header_icons fa-brands fa-facebook"></i></a>
                        </li>
                    </ul>
                    
                    <ul class="header_list">
                        <li class="header_items"><a href=""><i class="header_icons fa-solid fa-bell"></i>Thông báo</a></li>
                        <li class="header_items"><a href=""><i class="header_icons fa-solid fa-circle-question"></i>Hỗ Trợ</a></li>
                        <li class="header_items language_relative"><a href=""><i class="header_icons fa-solid fa-globe"></i>Tiếng Việt <i class="fa-solid fa-chevron-down"></i></a>
                            <div class="language_selection">
                                <ul class="language_list">
                                    <li class="language_option">Vietnamese</li>
                                    <li class="language_option">English</li>
                                </ul>
                            </div>
                        </li>
                        <?php
                            if(isset($_SESSION["account_id"])) {
                                echo '
                                    <li class="header_items user_account-pc">
                                        <i class="fas fa-user-alt"></i>
                                        <span>'.$_SESSION["account_username"].'</span>
                                        <i class="fa-solid fa-chevron-down"></i>
                                        <div class="account_pc-selection">
                                            <ul class="account_pc-list">
                                                <li class="account_pc-option myOrder_ist">
                                                    <i class = "fas fa-file-alt"></i>
                                                    <span> Đơn hàng của tôi</span>
                                                </li>';
                                                if(strcmp($_SESSION['account_ten-nhom-quyen'], "user")!=0) {
                                                    echo '
                                                        <li class="account_pc-option administrator_page">
                                                            <i class="fa-solid fa-gear"></i>
                                                            <span> Trang quản trị</span>
                                                        </li>
                                                    ';
                                                }
                                                echo
                                                '
                                                    <li id="logout_btn" class="account_pc-option">
                                                        <i class="fas fa-sign-out"></i>
                                                        <span> Đăng xuất</span>
                                                    </li>
                                            </ul>
                                        </div>
                                    </li>
                                ';
                            } else {
                                echo '
                                    <li class="header_items signUp_logIn"><a class="seperate" href="../login/login.php">Đăng Ký</a></li>
                                    <li class="header_items signUp_logIn"><a href="../login/login.php">Đăng Nhập</a></li>
                                ';
                            }
                        ?>
                        <!-- <li class="header_items user_account-pc loginSuccess">
                            <i class="fas fa-user-alt"></i>
                            <span></span>
                            <i class="fa-solid fa-chevron-down"></i>
                            <div class="account_pc-selection">
                                <ul class="account_pc-list">
                                    <li class="account_pc-option myOrder_ist">
                                        <i class = "fas fa-file-alt"></i>
                                        <span> Đơn hàng của tôi</span>
                                    </li>
                                    <li class="account_pc-option administrator_page loginSuccess">
                                        <i class="fa-solid fa-gear"></i>
                                        <span> Trang quản trị</span>
                                    </li>
                                    <li class="account_pc-option logout_btn">
                                        <i class="fas fa-sign-out"></i>
                                        <span> Đăng xuất</span>
                                    </li>
                                </ul>
                            </div>
                        </li> -->
                    </ul>
                </div>
                <!-- header search section -->
                <div class="header_search">
                    <div class="header_logo">
                        <img src="../../assets/logo/squad14 (1)_transparent.png" height="65px" width="192px"> <!--logo o day-->
                    </div>
                    <div class="header_searchbar header_searchbar-hide">
                        <input class="header_searchbar-input mobile_searchbar-input" type="text" placeholder="Nhập sản phẩm cần tìm kiếm">
                        <div class="search_btn mobile_search-button">
                            <i class="header_searchbar-icon fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>
                    <!-- in pc: just icon cart, in mobile: this section has 2 more icons: search and list -->
                    <div class="header_cart">
                        <i class="fa-solid fa-magnifying-glass mobile_header-searchBtn"></i>
                        <i class="fa-solid fa-cart-shopping header_cart-icon"></i>
                        <!-- render cart box -->
                        <div class="cart_box cart_box-hide">
                            <div class="cart_list">
                                <!-- <div class="cart_items">
                                    <div class="cart_items-img" style="background-image: url(https://cf.shopee.vn/file/3355a767c028c484757bb7000e71e339)"></div>
                                    <div class="cart_items-body">
                                        <div class="cart_item-info">
                                            <div class="cart_items-name">Tên sản phẩm 99</div>
                                            <div class="cart_items-price">1.000.000đ</div>
                                        </div>
                                        <div class="cart_items-quantity">
                                            <i class="fa-sharp fa-solid fa-chevron-up increase"></i>
                                            4
                                            <i class="fa-solid fa-chevron-down decrease"></i>
                                        </div>
                                        <div class="cart_items-total">2.000.000đ</div>
                                        <i class="fa-solid fa-trash cart_items-trash cart_items-deleteBtn"></i>
                                    </div>
                                </div> -->
                            </div>
                            <div class="cart_nofi">Không tìm thấy sản phẩm</div>
                        </div>
                        <i class="fa-solid fa-bars mobile_hambuger-list"></i>
                    </div>
                </div>
            </div>
        </header>
        <!-- mobile product filter (only display in mobile and tablet => and become sub header) -->
        <div class="product_mobile-filter hide_on_pc">
            <ul class="product_filter-list">
                <li class="product_filter-items mobile_filter-seperate">Phổ Biến</li>
                <li class="product_filter-items mobile_filter-seperate">Mới Nhất</li>
                <li class="product_filter-items mobile_filter-seperate">Bán Chạy</li>
                <li class="product_filter-items price_relative">Giá
                    <div class="filter_item-priceSelection">
                        <div class="filter_item-priceOption">Tất cả khoảng giá</div>
                        <div class="filter_item-priceOption">Dưới 10.000.000đ </div>
                        <div class="filter_item-priceOption">Từ 10 triệu - 20 triệu</div>
                        <div class="filter_item-priceOption">20 triệu đến 30 triệu</div>
                        <div class="filter_item-priceOption">Trên 30.000.000đ</div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- header's hambuger list modal -->
        <div class="hambugerlist_modal hambugerlist_modal-hide">
            <div class="hambugerlist_modal-content">
                <i class="fa-solid fa-xmark hambugerlist_modal-closeBTN"></i>
                <ul class="hambugerlist_modal-list">
                    <li class="hambugerlist_modal-items user_account-mobile loginSuccess">
                        <i class="fas fa-user-alt"></i>
                        <span></span>
                    </li>
                    <li class="hambugerlist_modal-items user_account-mobile loginSuccess myOrder_ist">
                        <i class = "fas fa-file-alt"></i>
                        <span> Đơn hàng của tôi</span>
                    </li>
                    <li class="hambugerlist_modal-items loginSuccess administrator_page">
                        <i class = "fas fa-file-alt"></i>
                        <span> Trang quản trị</span>
                    </li>
                    <li class="hambugerlist_modal-items user_account-mobile loginSuccess logout_btn">
                        <i class="fas fa-sign-out"></i>
                        <span> Đăng xuất</span>
                    </li>
                    <li class="hambugerlist_modal-items signUp_logIn">Đăng Ký</li>
                    <li class="hambugerlist_modal-items signUp_logIn">Đăng Nhập</li>
                    <li class="hambugerlist_modal-items">Trợ Giúp</li>
                    <li class="hambugerlist_modal-items">Cài đặt</li>
                </ul>
            </div>
        </div>
        <!-- web container -->
        <div class="app_container">
            <div class="grid">
                <div class="grid_row app_content">
                    <!-- slide -->
                    <!-- <div class="Slides-content grid_column pc_col12 pc-wide_col12 tablet_col12 mobile_col12">
                        <img class="mySlides" src="./assets/slide_image/image1.jpg" style="width:100%">
                        <img class="mySlides" src="./assets/slide_image/image2.jpg" style="width:100%">
                        <img class="mySlides" src="./assets/slide_image/image3.jpg" style="width:100%">
                        <img class="mySlides" src="./assets/slide_image/image4.jpg" style="width:100%">
                        
                        <button class="button-left" onclick="plusDivs(-1)"><i class="fa-solid fa-chevron-left"></i></button>
                        <button class="button-right" onclick="plusDivs(1)"><i class="fa-solid fa-chevron-right"></i></button>
                        <div class="dots">
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                        </div>
                    </div> -->
                    <!-- web container parting: 2 column for category navbar section-->
                    <div class="grid_column pc_col2 pc-wide_col2 tablet_col0 mobile_col0">
                        <!-- pc category navbar (only display on pc) -->
                        <nav class="category">
                            <h3 class="category_heading">
                                <i class="fa-solid fa-list category_heading-icon"></i>
                                Danh Mục
                            </h3>
                            <ul class="category_list">
                                <!-- <li class="category_items"><a href="" class="category_items-link category_items-active">Tất cả sản phẩm</a></li>
                                <li class="category_items"><a href="" class="category_items-link">Danh mục 1</a></li>
                                <li class="category_items"><a href="" class="category_items-link">Danh mục 2</a></li>
                                <li class="category_items"><a href="" class="category_items-link">Danh mục 3</a></li>
                                <li class="category_items"><a href="" class="category_items-link">Danh mục 4</a></li>
                                <li class="category_items"><a href="" class="category_items-link">Danh mục 5</a></li> -->
                            </ul>
                        </nav>
                    </div>
                    <!-- web container parting: 10 column for product's section -->
                    <div class="grid_column pc_col10 pc-wide_col10 tablet_col12 mobile_col12">
                        <!-- product filter section (only display on pc) -->
                        <div class="product_filter hide_on_table-mobile">
                            <div class="product_filter-nav">
                                <span class="product_filter-label">Sắp xếp theo</span>
                                <div class="product_filter-selection">
                                    Giá
                                    <i class="fa-solid fa-chevron-down"></i>
                                    <div class="product_filter-option">
                                        <ul class="price_list">
                                            <li data-price-range="0/0" class="price_items">Tất cả khoảng giá</li>
                                            <li data-price-range="0/10000000" class="price_items">Dưới 10.000.000đ</li>
                                            <li data-price-range="10000000/20000000" class="price_items">Từ 10 triệu - 20 triệu</li>
                                            <li data-price-range="20000000/30000000" class="price_items">Từ 20 triệu - 30 triệu</li>
                                            <li data-price-range="30000000/0" class="price_items">Trên 30.000.000đ</li>
                                        </ul>
                                    </div>
                                </div>
                                <div id="searchAndFilterResult"></div>
                                <div id="testY"></div>
                            </div>
                        </div>
                        <!-- mobile and tablet category navbar (only display in mobile and tablet) -->
                        <nav class="mobile_category hide_on_pc">
                            <ul class="mobile_category-list">
                                <!-- <li class="mobile_category-items"><a href="" class="mobile_category-link">Tất cả sản phẩm</a></li>
                                <li class="mobile_category-items"><a href="" class="mobile_category-link">Danh mục 1</a></li>
                                <li class="mobile_category-items"><a href="" class="mobile_category-link">Danh mục 2</a></li>
                                <li class="mobile_category-items"><a href="" class="mobile_category-link">Danh mục 3</a></li>
                                <li class="mobile_category-items"><a href="" class="mobile_category-link">Danh mục 4</a></li>
                                <li class="mobile_category-items"><a href="" class="mobile_category-link">Danh mục 5</a></li> -->
                            </ul>
                        </nav>
                        <!-- products items seciton -->
                        <!-- product items section parting: (12col/5col = 2.4col => 20% width eachs)-->
                        <div class="product_seciton">
                            <div class="grid_row" id="row2">
                                <!-- render products -->
                            </div>
                        </div>

                        <div class="pages">
                            <ul class="page_list">
                                <!-- render page list -->
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- footer -->
        <footer class="app_footer">
            <?php 
                include '../components/footer/footer.php'
            ?>
        </footer>

        <!-- buy form modal -->
        <div class="confirmBuy_form-modal confirmBuy_modal-hide">
            <div class="confirmBuy_form-contain">
                <div class="confirmBuy_form-closebtn">
                    <i class="fa-solid fa-xmark"></i>
                </div>
                <form action="" method="post" class="confirmBuy_form-info">
                    <div class="confirmBuy_form-header">
                        <h3>Thông tin khách hàng mua</h3>
                    </div>
                    <div class="form-group">
                        <label for="hovaten" class="form-label">Họ và Tên</label>
                        <input type="text" name="hovaten" id="hovaten" class="form-input">
                        <span class="form-messege"></span>
                    </div>
                    <div class="form-group">
                        <label for="sdt" class="form-label">Số điện thoại <span style="color: red;">*</span></label>
                        <input type="text" name="sdt" id="sdt" class="form-input">
                        <span class="form-messege"></span>
                    </div>
                    <div class="form-group">
                        <label for="address" class="form-label">Địa chỉ nhận hàng <span style="color: red;">*</span></label>
                        <input type="text" name="address" id="address" class="form-input">
                        <span class="form-messege"></span>
                    </div>
                    <button id="buy_btn" class="form-btn">Đặt mua</button>
                </form>
                <div class="buy_products-section">
                    <!-- render here -->
                    <h3>Kiểm tra sản phẩm bạn mua</h3>
                    <div class="buy_product-list">
                        <!-- <div class="buy_product-items">
                            <div class="buy_product-img"></div>
                            <div class="buy_product-body">
                                <div class="buy_product-info">
                                    <div class="buy_product-name">Tên sản phẩm 99</div>
                                    <div class="buy_product-price">1.000.000đ</div>
                                </div>
                                <span class="buy_product-quantity">SL: 4</span>
                                <span class="buy_product-total">2.000.000đ</span>
                            </div>
                        </div> -->
                    </div>
                    <div class="buy_product-totalAll"></div>
                </div>
            </div>
        </div>

        <!-- product detail modal -->

        <div class="modal fade" id="detail_product" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" id="exampleModalLabel">CHI TIẾT SẢN PHẨM</h3>
                    <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                    <!-- <span aria-hidden="true">&times;</span> -->
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row">
                            <!-- col1: sku image -->
                            <div class="col-md-6 ml-auto">
                                <div class="product-img" style="background-image: url(../assets/products_img/default.jpg)"></div>
                                <!-- variants list -->
                                    <div class="variants_list">
                                        <!-- <div class="variant_item_box">Variant1</div>
                                        <div class="variant_item_box">Variant2</div>
                                        <div class="variant_item_box">Variant3</div> -->
                                    </div>
                            </div>
                            <!-- col2: sku infomation -->
                            <div class="col-md-6 ml-auto">
                                <div id="pd_detail_item">
                                    <h3 class="product-name">SKU Name</h3>
                                    <div class="product-price">SKU price</div>
                                    <div class="product-desc">PRODUCT Description</div>
                                    <div class="product-quantity">SKU quantity</div>
                                    <div class="btn-wrapper">
                                        <button class="product-addToCartBtn">Thêm vào giỏ hàng</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        
        <!-- <div class="modal-body" id="detail_product">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-4">.col-md-4</div>
                    <div class="col-md-4 ml-auto">.col-md-4 .ml-auto</div>
                </div>
                <div class="row">
                    <div class="col-md-3 ml-auto">.col-md-3 .ml-auto</div>
                    <div class="col-md-2 ml-auto">.col-md-2 .ml-auto</div>
                </div>
                <div class="row">
                    <div class="col-md-6 ml-auto">.col-md-6 .ml-auto</div>
                </div>
                <div class="row">
                    <div class="col-sm-9">
                        Level 1: .col-sm-9
                        <div class="row">
                        <div class="col-8 col-sm-6">
                            Level 2: .col-8 .col-sm-6
                        </div>
                        <div class="col-4 col-sm-6">
                            Level 2: .col-4 .col-sm-6
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
        
        <!-- review order notes modal -->
        <div class="orderNote_modal orderNote_modal-hide">
            <div class="orderNote_container">
                <div class="orderNote_closeBtn">
                    <i class="fa-solid fa-xmark"></i>
                </div>
                <div class="orderNote_header">
                    <h3>Đơn hàng của tôi</h3>
                </div>
                <div class="orderNote_body">
                    <!-- render orderNoteList -->
                </div>
            </div>
        </div>

        <!-- scroll top btn -->
        <div id="scroll_top_btn"><i class="fa-solid fa-arrow-up"></i></div>

    </div>
    <script src="./test.js"></script>
    <!-- <script src="./slide.js"></script> -->
</body>
</html>