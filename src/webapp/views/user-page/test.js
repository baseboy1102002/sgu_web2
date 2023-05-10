let pageable = {
    page: 1,
    itemPerPage: 8,
    categoryId: null,
    priceStart: null,
    priceEnd: null,
    keyword: null
}
let money = Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
});
const imgFolder = '../../../uploads/';
let id_gio_hang;
$(document).ready(function () {
    let id_acc = $('#logged-in').val();
    if(id_acc != null){
        $.get("../../../main/controller/api/cartAPI.php", function (response) {
            id_gio_hang=response.id;
            $.get(`../../../main/controller/api/cartAPI.php?cartView=${id_gio_hang}`,function(response){
                if(response.length>0) {
                    $('#total_cart_item').text(`(${response.length})`);
                }
            })
        })
    }
    $.ajax({
        type: "GET",
        url: "../../../main/controller/api/productVariantsAPI.php",
        data: pageable,
        dataType: "json",
        success: function (response) {
            loadProduct(response.products)
            loadPage(response.count)
        }
    })
    $.ajax({
        type: "GET",
        url: "../../../main/controller/api/categoryAPI.php",
        data: ``,
        success: function(resp){
            // categories = JSON.parse(JSON.stringify(resp));
            let result = Object.values(resp);
            loadCategory(result, ".category_list", ".category_items-link")
            loadCategory(result, ".mobile_category-list", ".mobile_category-items")
        }
    })
    search()
    filterByPrice()
    scrolltoTop()
});

function scrolltoTop(){
    const scrolltoTopBtn = document.querySelector("#scroll_top_btn")
    scrolltoTopBtn.onclick=()=>{
        window.scrollTo({top: 0, behavior: 'smooth'})
    }
}

window.addEventListener("scroll", function(e){
    let top = this.scrollY
    if(top<400) document.querySelector("#scroll_top_btn").style.display = "none"
    else document.querySelector("#scroll_top_btn").style.display = "unset"
})

function getParentElement(element, parent) {
    while(element.parentElement) {
        if(element.parentElement.matches(parent)) {
            return element.parentElement;
        }
        element = element.parentElement;
    }
}

function loadProduct(products) {
    if($.isEmptyObject(products)) {
        $("#row2").html("<h2>Không tìm thấy sản phẩm!</h2>");    
        return
    }
    $("#row2").html("");
    products.forEach(function (item) {
        const product = document.createElement("div")

        product.classList.add("grid_column", "pc_col3", "tablet_col4", "mobile_col6", "pc-wide_col3"); // modifiy here
        product.innerHTML = `
        <div class="product_item-link" href="#">
            <div class="product_items" data-sku-id="${item.id}" data-pd-id="${item.id_sp}">
                <div class="product_items-img" style="background-image: url(${imgFolder}${item.img_path})"></div>
                <div class="product_items-name">${item.tensp}</div>
                <div class="product_items-price">${money.format(item.don_gia)}</div>
                <div class="product_items-modal">
                    <div class="product_items-addBtn"><i class="fa-solid fa-cart-shopping"></i></div>
                    <div class="product_item-detailBtn">
                        <div>
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        $("#row2").append(product);
    })
    ReadyCart();
    showProductDetailModalOnClick()
}

function loadPage(totalItem) {
    let str = '';
    let totalPage = Math.ceil(totalItem/pageable.itemPerPage)
    if(totalPage<=1){
        $(".pagination").html(str)
        return
    }
    str += '<li class="page-item" data-page="pre"><a class="page-link" href="">Previous</a></li>'
    for(let i=1; i<=totalPage; i++) {
        if(pageable.page==i) {
            str+= `
                <li class="page-item active" data-page="${i}"><a class="page-link" href="">${i}</a></li>
            `
        }
        else
            str+= `
                <li class="page-item" data-page="${i}"><a class="page-link" href="">${i}</a></li>
            `
    }
    str += '<li class="page-item" data-page="next"><a class="page-link" href="">Next</a></li>'
    $(".pagination").html(str)
    
    // when click and change page
    $(".page-item").each(function(index, element) {
        $(element).click(function (e){
            e.preventDefault();
            let page = $(element).data('page')
            if(page==="pre") page = pageable.page > 1? pageable.page-1 : pageable.page
            if(page==="next") page = pageable.page < totalPage ? pageable.page+1 : pageable.page
            if(pageable.page != page) {
                $(".page-item.active").removeClass("active")
                pageable.page = page;
                $.ajax({
                    type: "GET",
                    url: "../../../main/controller/api/productVariantsAPI.php",
                    data: pageable,
                    dataType: "json",
                    success: function (response) {
                        loadProduct(response.products)
                        loadPage(response.count)
                    }
                });
            }
        })
    });
}

// function loadPage(count) {
//     let str = '';
//     let totalPage = Math.ceil(count/product_pageable.itemPerPage)
//     if(totalPage<=1){
//         $("#product_pagination").html(str)
//         return
//     }
//     str += '<li class="page-item" data-page="pre"><a class="page-link" href="">Previous</a></li>'
//     for(let i=1; i<=totalPage; i++) {
//         if(product_pageable.page==i) {
//             str+= `
//                 <li class="page-item active" data-page="${i}"><a class="page-link" href="">${i}</a></li>
//             `
//         }
//         else
//             str+= `
//                 <li class="page-item" data-page="${i}"><a class="page-link" href="">${i}</a></li>
//             `
//     }
//     str += '<li class="page-item" data-page="next"><a class="page-link" href="">Next</a></li>'
//     $("#product_pagination").html(str)

//     $(".page-item").each(function(index, element) {
//         $(element).click(function (e) {
//             e.preventDefault();
//             let page = $(element).data('page');
//             if(page==="pre") page = product_pageable.page > 1? product_pageable.page-1 : product_pageable.page
//             if(page==="next") page = product_pageable.page < totalPage ? product_pageable.page+1 : product_pageable.page
//             if(product_pageable.page != page) {
//                 $(".page-item.active").removeClass("active")
//                 product_pageable.page = page;
//                 $.ajax({
//                     type: "GET",
//                     url: "../../../main/controller/api/productAPI.php",
//                     data: product_pageable,
//                     dataType: "json",
//                     success: function (response) {
//                         loadProducts(response.products)
//                         loadPage(response.count)
//                     }
//                 });
//             }
//         })
//     });
// }                                       


function loadCategory(categories, categoryList_querySelector, categoryItems_querySelector) {
    let str = categoryList_querySelector === ".mobile_category-list" ? 
    `<li class="mobile_category-items"><a data-id=0 href="" class="mobile_category-link">Tất cả</a></li>` 
    : `<li class="category_items"><a data-id=0 href="" class="category_items-link">Tất cả</a></li>`
    categories.forEach(function(item, index) {
        if(categoryList_querySelector === "mobile_category-list")
            str += `
                <li class="mobile_category-items"><a data-id=${item.id} href="" class="mobile_category-link">${item.ten_danh_muc}</a></li>
            `
        else
            str += `
                <li class="category_items"><a data-id=${item.id} href="" class="category_items-link">${item.ten_danh_muc}</a></li>
            `
    })
    $(`${categoryList_querySelector}`).html(str)
    $(`${categoryList_querySelector} ${categoryItems_querySelector}`).eq(0).addClass(categoryItems_querySelector === ".category_items-link"? "category_items-active":"mobile_category-active")
    
    //when click and change categorires
    $(".category_items-link").each(function (index, element) {
        $(element).click(function (e) { 
            e.preventDefault()
            $(".category_items-active").removeClass("category_items-active")
            $(this).addClass("category_items-active");
            if(pageable.categoryId != $(this).data("id")) {
                pageable.categoryId = $(this).data("id") == 0 ? null : $(this).data("id")
                pageable.page = 1
                pageable.keyword = null
                pageable.priceStart = null
                pageable.priceEnd = null
                $.ajax({
                    type: "GET",
                    url: "../../../main/controller/api/productVariantsAPI.php",
                    data: pageable,
                    dataType: "json",
                    success: function (response) {
                        loadProduct(response.products)
                        loadPage(response.count)
                    },
                    error: function(jqXHR, exception) {
                        loadProduct([])
                        loadPage(0)
                    }
                });       
            }
        });
    });
}

function search() {
    $(".search_btn").click(function (e) { 
        e.preventDefault()
        let searchValue = $(".header_searchbar-input").val()
        if(searchValue.trim()) {
            pageable.keyword = searchValue
            $(".header_searhbar-input").val("");
            $.ajax({
                type: "GET",
                url: "../../../main/controller/api/productVariantsAPI.php",
                data: pageable,
                dataType: "json",
                success: function (response) {
                    loadProduct(response.products)
                    loadPage(response.count)
                    window.scrollTo({top: 650, behavior: 'smooth'})
                },
                error: function(jqXHR, exception) {
                    loadProduct([])
                    loadPage(0)
                }
            });
        }
    });
}

function filterByPrice() {
    $(".price_items").each(function (index, element) {
        $(element).click(function (e) { 
            e.preventDefault();
            let price_range = $(this).data("price-range").split("/")
            if(!(pageable.priceStart==price_range[0]) || !(pageable.priceEnd==price_range[1])) {
                pageable.priceStart = price_range[0]
                pageable.priceEnd = price_range[1]==0 ? 999999999 : price_range[1]
                // if(price_range[0] == price_range[0]) {
                //     pageable.priceStart=null
                //     pageable.priceEnd=null
                // }
                $.ajax({
                    type: "GET",
                    url: "../../../main/controller/api/productVariantsAPI.php",
                    data: pageable,
                    dataType: "json",
                    success: function (response) {
                        loadProduct(response.products)
                        loadPage(response.count)
                    },
                    error: function(jqXHR, exception) {
                        loadProduct([])
                        loadPage(0)
                    }
                });
            }
        });
    });
}

// LOG OUT 
$("#logout_btn").click(function (e) { 
    e.preventDefault();
    $.post( "../../../main/controller/api/accountAPI.php", function(data) {
        window.location.replace('./index.php')
      });
});

// SHOW PRODUCT DETAIL MODAL
function showProductDetailModalOnClick() {
    $(".product_item-detailBtn").each(function (index, element) {
        $(element).click(function (e) { 
            e.preventDefault();
            const sku_id = $(getParentElement(element, ".product_items")).data('sku-id'); 
            const product_id = $(getParentElement(element, ".product_items")).data('pd-id');
            getProductDetail(product_id, sku_id)
            $('#detail_product').modal('show');
        });
    });
}

function getProductDetail(product_id, sku_id) {
    $.ajax({
        type: "GET",
        url: "../../../main/controller/api/productVariantsAPI.php",
        data: `product_id=${product_id}`,
        dataType: "json",
        success: function (response) {

            var variants = {};
            response.forEach(function(sku) {
            if (!variants[sku.id]) {
                variants[sku.id] = {};
            }
            variants[sku.id][sku.ten_thuoc_tinh] = sku.gia_tri;
            if(!variants[sku.id]['sku_name']) variants[sku.id]['sku_name'] = sku.sku_name;
            else return;
            if(!variants[sku.id]['img_path']) variants[sku.id]['img_path'] = sku.img_path;
            else return;
            if(!variants[sku.id]['description']) variants[sku.id]['description'] = sku.description;
            else return;
            if(!variants[sku.id]['don_gia']) variants[sku.id]['don_gia'] = sku.don_gia;
            else return;
            if (!variants[sku.id]['so_luong']) variants[sku.id]['so_luong'] = sku.so_luong;
            else return;
            });

            loadProductDetailModal(sku_id, variants)
        },
        error: function(jqXHR, exception) {
            console.log("product detail error")
        }
    });  
}

function loadProductDetailModal(sku_id, variants) {
    $(".variants_list").html("");
    const imgFolder = '../../../uploads/'
    $("#pd_detail_item").attr("data-sku-id", sku_id);
    $(".product-name").text(variants[sku_id].sku_name);
    $(".product-price").html(`<span style="color: #333;">Giá:</span> ${money.format(variants[sku_id].don_gia)}`);
    $(".product-img").css('background-image', `url(${imgFolder}${variants[sku_id].img_path})`);
    $(".product-desc").text(variants[sku_id].description);
    $(".product-quantity").text(`Còn lại: ${variants[sku_id].so_luong}`);
    let str = ""
    for (var id in variants) {
        let variantString = ""
        const nonDisplayAttr = ['don_gia', 'so_luong', 'sku_name', 'description', 'img_path']
        for (var attribute in variants[id]) {
            if(nonDisplayAttr.includes(attribute))
                continue
            variantString += variants[id][attribute] + "/ ";
        }
        variantString = variantString.slice(0, -2);
        str += `
            <div class="variant_item_box" data-sku-id="${id}">${variantString}</div>
        `
    }
    $(".variants_list").append(str)
    $(".variant_item_box").each(function (index, element) {
        if($(this).data('sku-id') == sku_id) {
            $(this).addClass("variant_item_box-active")
        }
        $(this).click(function (e) { 
            e.preventDefault();
            const sku_id_clicked = $(this).data('sku-id')
            $(".variant_item_box-active").removeClass("variant_item_box-active");
            $(this).addClass("variant_item_box-active")
            $(".product-name").text(variants[sku_id_clicked].sku_name);
            $(".product-price").html(`<span style="color: #333;">Giá:</span> ${money.format(variants[sku_id_clicked].don_gia)}`);
            $(".product-desc").text(variants[sku_id_clicked].description);
            $(".product-quantity").text(`Còn lại: ${variants[sku_id_clicked].so_luong}`);
            $("#pd_detail_item").attr("data-sku-id", sku_id_clicked);
        });
    });
}


function ReadyCart() {
    $loggedIn = $('#logged-in').val();
     // const productItem = products.find(function(i) {return i.id === productID});
    if($loggedIn != null){
        $.get("../../../main/controller/api/cartAPI.php", function (response) {
            id_gio_hang=response.id;
            addToCart();
            loadCartBtn();
        })
    } else {
        $('.product_items-addBtn,.product-addToCartBtn').each(function (index,item) {
            item.onclick = function() {
                toast({
                    title: "Nhắc nhở!",
                    message: "Bạn cần đăng nhập để lưu trữ giỏ hàng",
                    type: "warning",
                    duration: 4000
                });
            } 
        })
        document.querySelector(".header_cart-icon").onclick = function (e) {
            toast({
                title: "Nhắc nhở!",
                message: "Bạn cần đăng nhập để sử dụng chức năng giỏ hàng",
                type: "warning",
                duration: 4000
            });
        }

        }
    }

function addToCart(){
    // $('.product_items-addBtn,.product-addToCartBtn').each(function(index,item){

    $('.product_items-addBtn,.product-addToCartBtn').each(function(index,item){
        item.onclick = function () {
            let id_sku;
            if($(this).hasClass("product_items-addBtn")){
                id_sku = $(getParentElement(item, ".product_items")).data('sku-id');
            }
            else  id_sku =  $(getParentElement(item, "#pd_detail_item")).attr('data-sku-id');
            let data ={};
            data['id_gio_hang']=id_gio_hang;
            data['id_sku']=id_sku;
            $.ajax({
                type: "POST",
                url: "../../../main/controller/api/cartAPI.php",
                data: JSON.stringify(data),
                contentType:"application/json",
                dataType: "json",
                success: function (response) {
                    let total_cart_item = Number($('#total_cart_item').text().replace(/[()]/g,''))+1
                    $('#total_cart_item').text(`(${total_cart_item})`)
                    toast({
                        title: "Thành công!",
                        message: "Đã thêm vào giỏ hàng",
                        type: "info",
                        duration: 4000
                    });
                },
                error: function (jqXHR, exception) {
                    toast({
                        title: "Thông báo!",
                        message: jqXHR.responseText,
                        type: "info",
                        duration: 4000
                    });
                },
            });
        }
    })
}


function loadCartBtn(){
    document.querySelector('.header_cart-icon').onclick = function(e){
        renderCart();
    }
}

function renderCart(){
    $.get(`../../../main/controller/api/cartAPI.php?cartView=${id_gio_hang}`,function(response){
        $('.grid_row.shop-section').addClass("hide");
        $('.grid_row.cart-section').removeClass("hide");
        $('.grid_row.cart-section').html('')
        $('.grid_row.cart-section').addClass("cart-container");
        const title = document.createElement("div");
        title.innerHTML=`<h3>GIỎ HÀNG CỦA BẠN</h3>`;
        $('.grid_row.cart-section').append(title);
        const order_detail =document.createElement("div");
        order_detail.classList.add("order-details");
        if(response.length!=0) {
            $('#total_cart_item').text(`(${response.length})`)
            let totalPrice = 0
            response.forEach(function (item) {
                let price = item.don_gia*item.quantity;
                totalPrice += price
                const orderRow = document.createElement("div");
                orderRow.classList.add("order-row");
                orderRow.setAttribute('data-id',item.id_sku);
                let str=`
                <div class="order-row-left">
                    <div class="order-row-img"><img src="${imgFolder}${item.img_path}" alt=""></div>
                    <div class="order-row-name">${item.ten_sp}</div>
                </div>
                <div class="order-row-right">
                    <div class="order-right-price">${money.format(price)}</div>
                    <div class="order-right-quantity">
                        <div class="quantity-details">`
                if(item.in_stock !==0 && item.so_luong!==0)
                    str+=`
                            <span>${item.quantity}</span>
                            <div class="quantity-navigation">
                                <i class="fa-sharp fa-solid fa-chevron-up increase"></i>
                                <i class="fa-solid fa-chevron-down decrease"></i>
                            </div>`
                else{
                    str+=`
                        <span style="color:red">Đã hết hàng !!!</span>
                    `
                }
                str+=`
                        </div>
                    </div>
                    <div class="order-right-remove">
                        <i class="fa-solid fa-trash cart_items-trash cart_items-deleteBtn"></i>
                    </div>
                </div>
                `;
                orderRow.innerHTML=str;
                order_detail.append(orderRow);
            })
            $('#payment_modal_total_price').text(`Tổng hóa đơn: ${money.format(totalPrice)}`);
        }
        else{
            const Message = document.createElement("div");
            Message.style.fontSize="1.8rem";
            Message.style.marginBottom="16px";
            Message.innerText="Không có sản phẩm trong giỏ hàng";
            const back = '<button type="button" id="btn_back_to_shop" class="btn btn-outline-dark" style="margin-right:24px"><i class="fa-solid fa-arrow-left"></i> Tiếp tục mua hàng</button>'
            order_detail.append(Message);
            $(order_detail).append(back);
        }
        $('.grid_row.cart-section').append(order_detail);

        if(response.length!=0){
            const btnContainer = document.createElement("div");
            btnContainer.style.margin = "24px";
            btnContainer.style.display = "flex";
            btnContainer.innerHTML =`
            <button type="button" id="btn_back_to_shop" class="btn btn-outline-dark" style="margin-right:24px"><i class="fa-solid fa-arrow-left"></i> Tiếp tục mua hàng</button>
            <button type="button" id="refresh-cart-btn"class="btn btn-outline-primary" style="margin-right:24px">refresh</button>
            <button type="button" class="update-cart-btn btn btn-outline-primary" style="margin-right:24px">Cập nhật</button>
            <button type="button" class="pay-cart-btn btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#payment-infor-modal">Thanh toán</button>
            `;
            $('.grid_row.cart-section').append(btnContainer);
            increaseQuantity();
            decreaseQuantity();
            updateCart();
            removeFromCart();
            payCart();
        }
        $('#btn_back_to_shop').click(function (e) { 
            e.preventDefault();
            $('.grid_row.cart-section').addClass("hide");
            $('.grid_row.cart-section').html("");
            $('.grid_row.shop-section').removeClass("hide");
        });
        $('#refresh-cart-btn').click(function(e){
            e.preventDefault()
            renderCart()
        })
    });
        
}
function increaseQuantity() {
    const increaseBtns = document.querySelectorAll(".increase");
    increaseBtns.forEach(function(item) {
        item.onclick = function() {
            const itemQuantity = getParentElement(item, ".quantity-details");
            let oldQuantity=itemQuantity.childNodes[1].innerText*1;
            let newQuantity=oldQuantity+1;
            const itemPrice= getParentElement(item,".order-row-right");
            let oldPrice=itemPrice.childNodes[1].innerText.replace(/[₫.]+/g,"")
            itemPrice.childNodes[1].innerText=money.format((oldPrice/oldQuantity)*newQuantity);
            itemQuantity.childNodes[1].innerText=newQuantity;
        }
    })
}
function decreaseQuantity() {
    const decreaseBtns = document.querySelectorAll(".decrease");
    decreaseBtns.forEach(function(item) {
        item.onclick = function() {
            const itemQuantity = getParentElement(item, ".quantity-details");
            let oldQuantity=itemQuantity.childNodes[1].innerText*1;
            let newQuantity=oldQuantity-1;
            if(newQuantity > 0){
            itemQuantity.childNodes[1].innerText=newQuantity;
            const itemPrice= getParentElement(item,".order-row-right");
            let oldPrice=itemPrice.childNodes[1].innerText.replace(/[₫.]+/g,"")
            itemPrice.childNodes[1].innerText=money.format((oldPrice/oldQuantity)*newQuantity);
            itemQuantity.childNodes[1].innerText=newQuantity;
        }}
    })
}
function updateCart(){
    $(".update-cart-btn").click(function (e) { 
        e.preventDefault();
        let cart_item_list = [];
        $(".order-row").each(function (index, element) {
            let itemId = $(element).attr("data-id");
            let itemName=$(element).children(".order-row-left").children(".order-row-name").text();
            let itemQuantity = $(element).children(".order-row-right").children(".order-right-quantity").children(".quantity-details").children("span").text();
            let cart_item = {
                id_sku:itemId,
                name:itemName,
                quantity:itemQuantity
            };
            cart_item_list.push(cart_item);
        });
        let outOfOrder=cart_item_list.find((item)=>{return item.quantity=="Đã hết hàng !!!"})
        if(outOfOrder!=null)
            toast({
                title: "Thông báo!",
                message: "Vui lòng xóa hết những sản phẩm đã hết hàng trước khi cập nhật",
                type: "info",
                duration: 4000
            });
        else
        $.ajax({
            type: "PUT",
            url: `../../../main/controller/api/cartAPI.php?cartView=${id_gio_hang}`,
            data: JSON.stringify(cart_item_list),
            dataType: "json",
            success: function (response) {
                let str=`Cập nhật thành công
`;
                if(response.outOfOrder.length !== 0 || response.inStock.length !==0){ 
                    str+=`các sản phẩm sau không đủ số lượng: 
    `;    
                    response.outOfOrder.forEach(element => {
                        str+=`${element}
     `;
                    });
                    response.inStock.forEach(element => {
                        str+=`${element}
     `;
                    })
                };
                toast({
                    title: "Thông báo!",
                    message: str,
                    type: "info",
                    duration: 4000
                });
                renderCart();
            },
            error: function (jqXHR, exception) {
                console.log(jqXHR);
                console.log(exception);
                toast({
                    title: "Thông báo!",
                    message: "Đã có lỗi xảy ra ("+ exception +")",
                    type: "error",
                    duration: 4000
                });
            },
        });

    });
}

function removeFromCart(){
    $(".cart_items-deleteBtn").each(function (index, element) {
        $(element).click(function (e) { 
            console.log(element);
            let item = getParentElement(element,".order-row");
            let itemId = $(item).data('id');
            console.log(item);
            $.ajax({
                type: "DELETE",
                url: `../../../main/controller/api/cartAPI.php?cartId=${id_gio_hang}&itemId=${itemId}`,
                success: function (response) {
                    toast({
                        title: "Thành công!",
                        message: "Sản phẩm đã được xóa khỏi giỏ hàng",
                        type: "success",
                        duration: 4000
                    });
                    item.remove();
                    if($(".order-details").children(".order-row").length==0){
                        const Message = document.createElement("div");
                        Message.style.fontSize="1.5rem";
                        Message.innerText="Không có sản phẩm trong giỏ hàng";
                        $(".order-details").append(Message);
                        $(".cart-container").children("div")[2].remove();
                    }
                },
                error: function (jqXHR, exception) {
                    console.log(jqXHR);
                    console.log(exception);
                    toast({
                        title: "Lỗi!",
                        message: "Đã có lỗi xảy ra ("+ exception +")",
                        type: "error",
                        duration: 4000
                    });
                },
            });
        });
        
    });
}
function payCart(){
    
    $(".pay-cart-btn").click(function (e) {
        renderCart() 
        $.get(`../../../main/controller/api/cartAPI.php?cartView=${id_gio_hang}`,function(response){
            $("#payment-check").children("tbody").html("");
            $(response).each(function (index, element) {
                const billItem = document.createElement("tr");
                $(billItem).addClass("row");
                let str=`
                <th scope="col" class="col-sm-1">${index*1+1}</th>
                    <td scope="col" class="col-sm-2"><img src="${imgFolder}${element.img_path}" alt="" class="img-fluid"></td>
                    <td scope="col" class="col-sm-4">${element.ten_sp}</td>
                    `
                if(element.in_stock==1&&element.so_luong!==0){
                    str+=   ` <td scope="col" class="col-sm-2">${money.format(element.don_gia)}</td>
                        <td scope="col" class="col-sm-1">${element.quantity}</td>
                        <td scope="col" class="col-sm-2">${money.format(element.don_gia*element.quantity)}</td>
                    `             
                } else str+=`
                <td scope="col" class="col-sm-2"></td>
                <td scope="col" class="col-sm-1"><span style="color:red">Đã hết hàng !!!</span></td>
                <td scope="col" class="col-sm-2"></td>
                `;
                billItem.innerHTML=str;
                $("#payment-check").children("tbody").append(billItem);
            });
        });

    });
}

$(".payment-infor").submit(function (e) { 
    e.preventDefault();
    let address = addressValid();
    let phone = PhoneValid();
    let name = nameValid();
    if(phone && address && name){
        console.log("cmm");
        e.preventDefault();
        let data={};
        data['name']=$("#payment-name").val();
        data['phone']=$("#payment-phone").val();
        data['address']=$("#payment-address").val();
        data['id_gio_hang']=id_gio_hang;
        $.ajax({
            type: "POST",
            url: "../../../main/controller/api/orderAPI.php",
            data: JSON.stringify(data),
            dataType: "json",
            success: function (response) {
                deleteCart();
            },
            error: function (jqXHR, exception) {
                console.log(jqXHR);
                console.log(exception);
                toast({
                    title: "Lỗi!",
                    message: "Đã có lỗi xảy ra ("+ exception +")",
                    type: "error",
                    duration: 4000
                });
            },
        });
    }
});
function deleteCart(){
    $.ajax({
        type: "DELETE",
        url: `../../../main/controller/api/cartAPI.php?cartId=${id_gio_hang}`,
        success: function (response) {
            alert("Thanh cong");
            window.location.replace("../user-page/index.php");
        }
    });
}
function PhoneValid() {
    let phone = $("#payment-phone").val();
    let regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    let check = regex.test(phone);
    let errorMessage = $('label[for="payment-phone"]').children("span")
    if(phone.length==0){
        $(errorMessage).text("Không được để trống");
        $("#payment-phone").css("border-color", "red");
        return false;
    }
    else if(!check){
        $(errorMessage).text("vui lòng nhập đúng định dạng");
        $("#payment-phone").css("border-color", "red");
        return false;
    }else {
        $("#payment-phone").css("border-color", "");
        $(errorMessage).text("");
        return true;
    }
}
function addressValid() {
    let address = $("#payment-address").val();
    let errorMessage=$('label[for="payment-address"]').children("span");
    if(address.length==0){
        $(errorMessage).text("Không được để trống");
        $("#payment-address").css("border-color", "red");
        return false;
    }else{
        $("#payment-address").css("border-color", "");
        $(errorMessage).text("");
        return true;
    }
}
function nameValid() {
    let name = $("#payment-name").val();
    let errorMessage=$('label[for="payment-name"]').children("span");
    if(name.length==0){
        $(errorMessage).text("Không được để trống");
        $("#payment-name").css("border-color", "red");
        return false;
    }else{
        $("#payment-name").css("border-color", "");
        $(errorMessage).text("");
        return true;
    }
}
$("#payment-phone,#payment-name,#payment-address").blur(function (e) {
    if($(e.target).is($("#payment-phone")))
        PhoneValid();
    if($(e.target).is($("#payment-name")))
        nameValid();
    if($(e.target).is($("#payment-address")))
        addressValid();
});


// Xem lai don dat hang
$('#myOrder-btn').each(function(index,item){
    $(item).click(function (e) { 
        e.preventDefault();
        let account_id=$('#logged-in').val()
        let orderNoteList=getOrderNoteByAccountId(account_id).responseJSON
        if(orderNoteList == null) {
            $(".orderNote_body").html (`<span style="margin-top: 30px; display:block">Bạn chưa có đơn hàng nào, hãy mua ngay tại shop chúng tôi!</span>`)
        }else{
            orderNoteList.forEach((item) => {
                let status = item.status==1 ? "Đã xử lý":"Chưa xử lý"
                let statusStyle = item.status==1 ? "text-success": "text-danger"
                let orderOverview = document.createElement("div")
                orderOverview.classList.add("orderNote_overView")
                orderOverview.innerHTML=`
                <i class="fa-sharp fa-solid fa-clipboard"></i>
                <div class="orderNote_info">
                    <div class="orderNote_id">Mã đơn hàng: ${item.id}</div>
                    <div class="orderNote_totalPrice">Thành tiền: <span style="color: red;">${money.format(item.tong_tien)}</span></div>
                </div>
                <div class="orderNote_date">Ngày tạo: ${item.created_date}</div>
                <div class="orderNote_statsus">
                    Tình trạng
                    <div class="${statusStyle}">${status}</div>
                </div>
                <div class="orderNote_viewDetails">
                    <span>Xem chi tiết</span>
                    <i class="fa-solid fa-circle-plus"></i>
                </div>
            `
            let orderNoteDetailList=getOrderNoteDetailByOrderId(item.id).responseJSON
            if(orderNoteDetailList!=null){
                const orderDetail = document.createElement("div")
                orderDetail.classList.add("orderNote_details","hidden")
                orderDetail.style.display="none";
                let str="";
                orderNoteDetailList.forEach((item) => {
                str += `
                    <div class="orderNote_items">
                        <div class="orderNote_productName">${item.ten_sp}</div>
                        <div class="orderNote_productPrice">Đơn giá: <span style="color: red;">${money.format(item.don_gia)}</span></div>
                        <div class="orderNote_productQuantity">SL: ${item.so_luong}</div>
                    </div>
                `
            })
                orderDetail.innerHTML=str
            $(".orderNote_body").append(orderOverview,orderDetail)
            }
        })
        $(".orderNote_body").find($(".orderNote_viewDetails")).each(function(index,item) {
            $(item).click(function(e){ 
                const orderDetail=$(item).parent().next();
                if(orderDetail.hasClass("hidden")) {
                    item.innerHTML = `
                        <span>Ẩn bớt</span>
                        <i class="fa-solid fa-minus"></i>
                    `
                    orderDetail.removeClass("hidden")
                }
                else {
                    item.innerHTML = `
                        <span>Xem chi tiết</span>
                        <i class="fa-solid fa-circle-plus"></i>
                    `
                    orderDetail.addClass("hidden")
                }
                
                orderDetail.toggle()
            })
            })
        }
    })
});

function getOrderNoteByAccountId(id){
    return $.ajax({
        type: "GET",
        url: `../../../main/controller/api/orderAPI.php?action=order&account_id=${id}`,
        dataType: "json",
        async: false,
        error: function(jqXHR, exception) {
        }
    });

}
function getOrderNoteDetailByOrderId(id){
    return $.ajax({
        type: "GET",
        url: `../../../main/controller/api/orderAPI.php?action=orderDetail&id=${id}`,
        dataType: "json",
        async: false,
        error: function(jqXHR, exception) {
            
        }
    });
}