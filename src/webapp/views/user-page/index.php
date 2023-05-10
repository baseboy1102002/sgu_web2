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
    <link rel="stylesheet" href="../components//toastNofication/toast.css">
    
    <style>
        .modal-header {
            background-color: var(--theme-color);
            color: var(--white-color);
        }
        .modal-footer {
            justify-content: center;
        }
        .btn {
            font-size: 1.8rem;
        }
        .btn-close {
            font-size: 1.8rem;
            background-color: var(--white-color);
        }
        .pagination {
            margin-top: 50px;
            margin-bottom: 30px;
        }
    </style>
</head>

<body>
    <!-- all web content -->
    <!-- toast message -->
    <div id="toast"></div>
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
                                    <input type="hidden" id="logged-in" style="display:none" value='.$_SESSION["account_id"].'>
                                    <li class="header_items user_account-pc">
                                        <i class="fas fa-user-alt"></i>
                                        <span>'.$_SESSION["account_username"].'</span>
                                        <i class="fa-solid fa-chevron-down"></i>
                                        <div class="account_pc-selection">
                                            <ul class="account_pc-list">
                                                <li class="account_pc-option" id="myOrder-btn" role="button" href="modal" data-bs-toggle="modal" data-bs-target="#orderNote_modal">
                                                    <i class = "fas fa-file-alt"></i>
                                                    <span> Đơn hàng của tôi</span>
                                                </li>';
                                                if(strcmp($_SESSION['account_ten-nhom-quyen'], "user")!=0) {
                                                    echo '
                                                        <li class="account_pc-option administrator_page">
                                                            <i class="fa-solid fa-gear"></i>
                                                            <a href="../admin/admin_page.php" style="color: #333;">Trang quản trị</a>
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
                        <i class="fa-solid fa-cart-shopping header_cart-icon"></i> <span id="total_cart_item"></span>
                        <!-- render cart box -->
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
                <div class="grid_row shop-section app_content">
                    <!-- slide -->
                    <div class="Slides-content grid_column pc_col12 pc-wide_col12 tablet_col12 mobile_col12">
                        <img class="mySlides" src="../../assets/slide_image/image1.jpg" style="width:100%">
                        <img class="mySlides" src="../../assets/slide_image/image2.jpg" style="width:100%">
                        <img class="mySlides" src="../../assets/slide_image/image3.jpg" style="width:100%">
                        <img class="mySlides" src="../../assets/slide_image/image4.jpg" style="width:100%">
                        
                        <button class="button-left" onclick="plusDivs(-1)"><i class="fa-solid fa-chevron-left"></i></button>
                        <button class="button-right" onclick="plusDivs(1)"><i class="fa-solid fa-chevron-right"></i></button>
                        <div class="dots">
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                        </div>
                    </div>
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

                        <ul class="pagination pagination-lg justify-content-center">
                            <!-- <li class="page-item">a class="page-link" href="#">Previous</a></li>
                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item"><a class="page-link" href="#">Next</a></li> -->
                        </ul>

                        <!-- <div class="pages">
                            <ul class="page_list">
                                render page list
                            </ul>
                        </div> -->
                    </div>
                </div>
                <div class="grid_row cart-section hide cart-container">
                    <!-- cart content here -->
                </div>
            </div>
        </div>

        <!-- footer -->
        <footer class="app_footer">
            <?php 
                include '../components/footer/footer.php'
            ?>
        </footer>

       

        <!-- product detail modal -->

        <div class="modal fade" id="detail_product" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" id="exampleModalLabel">CHI TIẾT SẢN PHẨM</h3>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    <!-- <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button> -->
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
                            <div class="col-md-6 ml-auto" style="padding-top: 12px;">
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


        <!-- form thanh toán giỏ hàng -->
        <div class="modal fade" id="payment-infor-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-centered modal-fullscreen-sm-down">
                <div class="modal-content" style="font-size: 1.6rem;">
                    <div class="modal-header text-center">
                        <h2 class="modal-title">THANH TOÁN ĐƠN HÀNG</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-8 table-fixed">
                                <table class="table table-hover" id="payment-check">
                                    <thead class="table-light fixed-thead">
                                        <tr class="row">
                                        <th scope="col" class="col-sm-1">stt</th>
                                        <th scope="col" class="col-sm-2 text-center">ảnh</th>
                                        <th scope="col" class="col-sm-4">tên</th>
                                        <th scope="col" class="col-sm-2">đơn giá</th>
                                        <th scope="col" class="col-sm-1">SL</th>
                                        <th scope="col" class="col-sm-2">total</th>
                                        </tr>                       
                                    </thead>
                                    <tbody>
                                        <!-- Generate chi tiết đơn hàng tại đây -->
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-sm-4">
                            <form class="payment-infor">
                            
                                <div class="mb-3">
                                    <label for="payment-name" class="form-label">Họ và tên <span class="form-message" style="color: red;"></span></label>
                                    <input type="text" name="payment-name" class="form-control form-control-lg" id="payment-name" aria-describedby="emailHelp">
                                    <div id="emailHelp" class="form-text">We'll never share your in tư with anyone else.</div>
                                </div>
                                <div class="mb-3">
                                    <label for="payment-phone" class="form-label">Số điện thoại <span class="form-message" style="color: red;"></span></label>
                                    <input type="text" name="payment-phone"class="form-control form-control-lg" id=payment-phone>
                                </div>
                                <div class="mb-3">
                                    <label for="payment-address" class="form-label">Địa chỉ nhận hàng <span class="form-message" style="color: red;"></span></label>
                                    <input type="text" name="payment-address"class="form-control form-control-lg" id="payment-address">
                                </div>
                                <div class="text-center">
                                    <button type="submit" class="btn btn-outline-primary">Đặt hàng</button> 
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer" id="payment_modal_total_price">
                        
                    </div>  
                </div>
            </div>
        </div>



        
        <!-- review order notes modal -->
        <div class="modal fade"id="orderNote_modal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-xl">
                    <div class="modal-content orderNote_container">
                    <div class="modal-header orderNote_header">
                        <h4 class="modal-title text-white">Đơn hàng của tôi</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="orderNote_body modal-body">
                    </div>
                </div>
            </div>
        </div>
        <!-- scroll top btn -->
        <div id="scroll_top_btn"><i class="fa-solid fa-arrow-up"></i></div>

    </div>
    <script defer src="../components/toastNofication/toast.js"></script>
    <script src="./test.js"></script>
    <script src="./slide.js"></script>
</body>
</html>