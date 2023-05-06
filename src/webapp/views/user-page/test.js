let pageable = {
    page: 1,
    itemPerPage: 8,
    categoryId: null,
    priceStart: null,
    priceEnd: null,
    keyword: null
}

$(document).ready(function () {
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
});

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
        const imgFolder = '../../../uploads/'
        product.classList.add("grid_column", "pc_col3", "tablet_col4", "mobile_col6", "pc-wide_col3"); // modifiy here
        product.innerHTML = `
        <div class="product_item-link" href="#">
            <div class="product_items" data-sku-id="${item.id}" data-pd-id="${item.id_sp}">
                <div class="product_items-img" style="background-image: url(${imgFolder}${item.img_path})"></div>
                <div class="product_items-name">${item.tensp}</div>
                <div class="product_items-price">${item.don_gia} VND</div>
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
    showProductDetailModalOnClick()
}

function loadPage(totalItem) {
    let str = '';
    let totalPage = Math.ceil(totalItem/pageable.itemPerPage)
    console.log(totalPage)
    if(totalPage<=1){
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
    $(".product-price").text(variants[sku_id].don_gia);
    $(".product-img").css('background-image', `url(${imgFolder}${variants[sku_id].img_path})`);
    $(".product-desc").text(variants[sku_id].description);
    $(".product-quantity").text(variants[sku_id].so_luong);
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
            $(".product-price").text(variants[sku_id_clicked].don_gia);
            $(".product-desc").text(variants[sku_id_clicked].description);
            $(".product-quantity").text(variants[sku_id_clicked].so_luong);
            $("#pd_detail_item").attr("data-sku-id", sku_id_clicked);
        });
    });
}