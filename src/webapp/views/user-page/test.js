let pageable = {
    page: 1,
    itemPerPage: 8,
    categoryId: null,
    priceStart: null,
    priceEnd: null,
    key_words: null
}

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "../../../main/controller/Web/api/productVariantsAPI.php",
        data: pageable,
        dataType: "json",
        success: function (response) {
            loadProduct(response.products)
            loadPage(response.count)
        }
    })
    $.ajax({
        type: "GET",
        url: "../../../main/controller/Web/api/categoryAPI.php",
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
});

function loadProduct(products) {
    console.log(pageable)
    if($.isEmptyObject(products)) {
        $("#row2").html("<h2>Không tìm thấy sản phẩm!</h2>");    
        return
    }
    $("#row2").html("");
    products.forEach(function (item) {
        const product = document.createElement("div");
        product.classList.add("grid_column", "pc_col3", "tablet_col4", "mobile_col6", "pc-wide_col3"); // modifiy here
        product.innerHTML = `
        <div class="product_item-link" href="#">
            <div class="product_items" data-id="${item.id}">
                <div class="product_items-img" style="background-image: url(${item.img_path})"></div>
                <div class="product_items-name">${item.tensp}</div>
                <div class="product_items-price">${item.don_gia} VND</div>
                <div class="product_items-modal">
                    <div class="product_items-addBtn"><i class="fa-solid fa-cart-shopping"></i></div>
                    <div class="product_item-detailBtn">
                        <a href="../product-detail-page.php?product_id=${item.id_sp}&id=${item.id}">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        `;
        $("#row2").append(product);
    })
}

function loadPage(totalItem) {
    let str = '';
    let totalPage = Math.ceil(totalItem/pageable.itemPerPage)
    if(totalPage==1){
        $(".page_list").html(str)
        return
    }
    for(let i=1; i<=totalPage; i++) {
        if(pageable.page==i) {
            str+= `
                <a href="">
                    <li class="page_list-items page_list_item-active">${i}</li>
                </a>
            `
        }
        else
            str+= `
                <a href="">
                    <li class="page_list-items">${i}</li>
                </a>
            `
    }
    $(".page_list").html(str)
    // when click and change page
    $(".page_list a").each(function(index, element) {
        $(element).click(function (e){
            e.preventDefault();
            $(".page_list_item-active").removeClass("page_list_item-active")
            if(pageable.page != index+1) {
                pageable.page = index+1;
                $.ajax({
                    type: "GET",
                    url: "../../../main/controller/Web/api/productVariantsAPI.php",
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
                pageable.key_words = null
                pageable.priceStart = null
                pageable.priceEnd = null
                $.ajax({
                    type: "GET",
                    url: "../../../main/controller/Web/api/productVariantsAPI.php",
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
            pageable.key_words = searchValue
            $(".header_searhbar-input").val("");
            $.ajax({
                type: "GET",
                url: "../../../main/controller/Web/api/productVariantsAPI.php",
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
                    url: "../../../main/controller/Web/api/productVariantsAPI.php",
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