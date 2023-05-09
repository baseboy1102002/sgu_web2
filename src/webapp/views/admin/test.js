function getParentElement(element, parent) {
    while (element.parentElement) {
        if (element.parentElement.matches(parent)) {
            return element.parentElement;
        }
        element = element.parentElement;
    }
}

let product_pageable = {
    page:1,
    itemPerPage: 5,
    categoryId: null,
    keyword: null
}

let permission = {}

function loadTab(tab_id) {
    switch (tab_id) {
        case 'category':
            
            break;
        case 'product':
            // product tabs
            product_pageable.page=1
            product_pageable.categoryId=null
            product_pageable.keyword=null
            $.ajax({
                type: "GET",
                url: "../../../main/controller/api/productAPI.php",
                data: product_pageable,
                dataType: "json",
                success: function (response) {
                    // products = JSON.parse(JSON.stringify(response))
                    loadProducts(response.products)
                    loadPage(response.count)
                    loadProductComboboxCategory("#product_category_selection")
                    loadProductComboboxCategory(".product_filter_category")
                }
            });
            break;
        case 'ordernote':
            
            break;
        case 'account':
            
            break;
        case 'report':
            
            break;
        case 'attribute':
            $.ajax({
                type: "GET",
                url: "../../../main/controller/api/attributeAPI.php",
                dataType: "json",
                success: function (response) {
                    loadAttributes(response)
                }
            });
            break;
        case 'variant':
            product_pageable.page=1
            product_pageable.categoryId=null
            product_pageable.keyword=null
            $.ajax({
                type: "GET",
                url: "../../../main/controller/api/productVariantsAPI.php",
                data: product_pageable,
                dataType: "json",
                success: function (response) {
                    loadProductVariants(response.products)
                    loadProductVariantsPage(response.count)
                    load_Cbb_Sku_Attribute()
                    loadVariantComboboxCategory()
                }
            });
            break;
        case 'permission':
            $.ajax({
                type: "GET",
                url: "../../../main/controller/api/permissionAPI.php",
                dataType: "json",
                success: function (response) {
                    loadPermission(response)
                }
            });
            break;
        default:
            break;
    }
}

// ============================================ //
// ---------------- SIDEBAR ------------------- //
// =========================================== //

// $(".sidebar_menu-items").each(function (index, element) {
//     $(element).click(function (e) { 
//         const id = element.classList[1]
//         $(".menu_active").removeClass("active")
//         $(".menu_active").removeClass("menu_active")
//         $(".tabs").each(function (i, e) {
//             $(e).addClass("tab_hide")
//             if ($(e).hasClass(id)) {
//                 loadTab(id)
//                 $(e).removeClass("tab_hide")
//             }
//         });
//         $(element).addClass("menu_active")
//         $(element).addClass("active")
//     });
// });

$(document).ready(function () {
    const account_id_nhom_quyen = $('#account_id_nhom_quyen').val()
    
    $.ajax({
        type: "GET",
        url: `../../../main/controller/api/permissionAPI.php?id=${account_id_nhom_quyen}`,
        dataType: "json",
        async: 'false',
        success: function (response) {
            response.forEach(item=>{
                permission[item.id_chuc_nang] = {}
                permission[item.id_chuc_nang]['is_read'] = item.is_read
                permission[item.id_chuc_nang]['is_insert'] = item.is_insert
                permission[item.id_chuc_nang]['is_update'] = item.is_update
                permission[item.id_chuc_nang]['is_delete'] = item.is_delete
            })
            $.ajax({
                type: "GET",
                url: '../../../main/controller/api/featureAPI.php',
                dataType: "json",
                success: function (response) {
                    loadSideBar(response)
                    authorizeUser(permission)
                }
            });
        }
    });

    

    loadTab('report')
    searchProduct()
    searchVariant()
    loadFeatureList()
    logout()
});

function authorizeUser(permission) {
    $(".sidebar_menu-items").each(function (index, element) {
        const id_chuc_nang = $(this).data('id-chuc-nang');
        let is_read
        if(id_chuc_nang==0) is_read = 1
        else is_read = permission[id_chuc_nang]['is_read']
        if(is_read==0) {
            is_read = 0
            $(element).addClass('background-grey')
        }
        $(element).click(function (e) { 
            if(is_read==1) {
                const id = element.classList[1]
                $(".menu_active").removeClass("active")
                $(".menu_active").removeClass("menu_active")
                $(".tabs").each(function (i, e) {
                    $(e).addClass("tab_hide")
                    if ($(e).hasClass(id)) {
                        loadTab(id)
                        $(e).removeClass("tab_hide")
                    }
                });
                $(element).addClass("menu_active")
                $(element).addClass("active")
            } else {
                toast({
                    title: "Hạn chế",
                    message: "Bạn không có quyền hạn để truy cập",
                    type: "warning",
                    duration: 2000
                });
            }
        });
    });
}

function loadSideBar(response) {
    let str=`
    <li class="sidebar_menu-items report list-group-item menu_active active" data-id-chuc-nang="0">
        <i class="fa-solid fa-chart-pie"></i> Thống kê
    </li>
    `
    response.forEach(item=>{
        str += `
        <li class="sidebar_menu-items ${item.code} list-group-item" data-id-chuc-nang=${item.id}>
            <i class="${item.icon}"></i> ${item.ten_chuc_nang}
        </li>
        `
    })
    $('.sidebar_menu-list').html(str);
}


function loadPage(count) {
    let str = '';
    let totalPage = Math.ceil(count/product_pageable.itemPerPage)
    if(totalPage<=1){
        $("#product_pagination").html(str)
        return
    }
    str += '<li class="page-item" data-page="pre"><a class="page-link" href="">Previous</a></li>'
    for(let i=1; i<=totalPage; i++) {
        if(product_pageable.page==i) {
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
    $("#product_pagination").html(str)

    $(".page-item").each(function(index, element) {
        $(element).click(function (e) {
            e.preventDefault();
            let page = $(element).data('page');
            if(page==="pre") page = product_pageable.page > 1? product_pageable.page-1 : product_pageable.page
            if(page==="next") page = product_pageable.page < totalPage ? product_pageable.page+1 : product_pageable.page
            if(product_pageable.page != page) {
                $(".page-item.active").removeClass("active")
                product_pageable.page = page;
                $.ajax({
                    type: "GET",
                    url: "../../../main/controller/api/productAPI.php",
                    data: product_pageable,
                    dataType: "json",
                    success: function (response) {
                        loadProducts(response.products)
                        loadPage(response.count)
                    }
                });
            }
        })
    });
}

function searchProduct() {
    $("#product_search_btn").click(function (e) { 
        e.preventDefault()
        const searchValue = $("#product_search_input").val()
        const categoryId = $('.product_filter_category').val() == 0? null:$('.product_filter_category').val()
        if(searchValue.trim()) {
            product_pageable.page = 1
            product_pageable.keyword = searchValue
            product_pageable.categoryId = categoryId
        } else {
            product_pageable.page = 1
            product_pageable.keyword = null
            product_pageable.categoryId = categoryId
        }
        $("#product_search_input").val('')
        $.ajax({
            type: "GET",
            url: "../../../main/controller/api/productAPI.php",
            data: product_pageable,
            dataType: "json",
            success: function (response) {
                loadProducts(response.products)
                loadPage(response.count)
            },
            error: function(jqXHR, exception) {
                loadProducts([])
                loadPage(0)
            }
        });
    });
}

function loadProducts(products) {
    if($.isEmptyObject(products)) {
        $(".product_list").html("<h2>Không tìm thấy sản phẩm!</h2>");    
        return
    }
    $(".product_list").html("")
    let str = ""
    const imgFolder = '../../../uploads/'
    products.forEach((item) => {
        str += `
            <tr data-id="${item.id}">
                <td>${item.id}</td>
                <td>
                    <div class="product_bgImg" style="background-image: url(${imgFolder}${item.img_path})"></div>
                    <input type="hidden" id="${item.id}" value="${item.img_path}">
                </td>
                <td>${item.ten_sp}</td>
                <td>
                    <button type="button" class="btn btn-danger product_delete_btn">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    <button type="button" class="btn btn-success product_update_btn">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    
                </td>
            </tr>
        `
    })
    $(".product_list").html(str)

    $(".product_update_btn").each(function (index, element) {
        $(element).click(function (e) { 
            e.preventDefault()
            const product_id = $(element).closest('tr').data('id')
            // const img_path_value = $(element).closest('tr').find('.img_path').val()
            const img_path_value = $('#'+product_id).val();
            $('.modal-title-product').text('Sửa sản phẩm')
            loadProductDetail(product_id, img_path_value)
            $('#product_modal').attr('data-action', 'update');
            $('#product_modal').modal('show')
        });
        
    });
    
    $('.product_delete_btn').each(function (index, element) {
        $(element).click(function (e) { 
            e.preventDefault();
            const product_id = $(element).closest('tr').data('id')
            const product_name = $(element).closest('tr').children(':nth-child(2)').text()
            $('#product_delete_id').val(product_id)
            $('#product_delete_name').val(product_name)
            $('#product_delete_modal').modal('show')
        });
        
    });
}

function loadProductDetail(product_id, img_path_value) {
    $.ajax({
        type: "GET",
        url: "../../../main/controller/api/productAPI.php",
        data: `id=${product_id}`,
        dataType: "json",
        success: function (response) {
            $("#product_name").val(response.ten_sp)
            $("#product_description").val(response.description)
            $("#product_category_selection").val(response.id_danh_muc)
        }
    });
    $('#product_id').text(product_id)
    $('#img_path_value').val(img_path_value)

}

function loadProductComboboxCategory(selector) {
    let str = selector == '#product_category_selection' ? "<option value='0'>Chọn danh mục</option>" : "<option value='0'>Tất cả</option>"
    $.ajax({
        type: "GET",
        url: "../../../main/controller/api/categoryAPI.php",
        dataType: "json",
        success: function (response) {
            // categories = JSON.parse(JSON.stringify(response))
            response.forEach((item) => {
                str += `
                    <option value="${item.id}">${item.ten_danh_muc}</option>
                `
            })
            $(selector).html(str)
        }
    });
}

$("#product_add_btn").click(function (e) { 
    const active_feature = $('.sidebar_menu-items.active').data('id-chuc-nang')
    if(permission[active_feature]['is_insert']==1) {
        clearProductForm()
        $('#product_modal').attr('data-action', 'add')
        $('.modal-title-product').text('Thêm sản phẩm')
        $("#product_id").text('auto');
        $('#product_modal').modal('show')
    } else {
        toast({
            title: "Hạn chế",
            message: "Bạn không có quyền hạn để sử dụng hành động này",
            type: "warning",
            duration: 2000
        });
    }
});

function clearProductForm() {
    $("#product_name").val('')
    $("#product_img").val('')
    // document.querySelector(".img_review").removeAttribute("style")
    $("#img_review").removeAttr('style')
    $("#product_description").val('')
    $("#product_category_selection").val(0)
    $('#product_form .form-messege').text('')
}


$("#product_form").submit(function (e) {
    e.preventDefault()
    const active_feature = $('.sidebar_menu-items.active').data('id-chuc-nang');
    if(permission[active_feature]['is_update']==0){
        toast({
            title: "Hạn chế",
            message: "Bạn không có quyền hạn để sử dụng hành động này",
            type: "warning",
            duration: 2000
        });
        return false
    } 
        
    if (validateProductForm()) {
        let formData = new FormData();
        $.each($(this).serializeArray(), function (i, e) { 
                formData.append(e.name, e.value)
        });
        formData.append('in_stock', 1)
        formData.append('image', $('#product_img')[0].files[0])
    
        let product_id, url, message

        switch ($('#product_modal').attr('data-action')) {
            case 'add':
                url = "../../../main/controller/api/productAPI.php"
                message = "Tạo sản phẩm thành công"
                break
            case 'update':
                product_id = $('#product_id').text()
                url = `../../../main/controller/api/productAPI.php?id=${product_id}`
                message = "Đã cập nhật thay đổi"
                break
            default:
                break
        }
        $.ajax({
            type: "POST",
            url: url,
            data: formData,
            processData: false,
            contentType: false,
            dataType: "json",
            success: function (response) {
                loadTab('product')
                $('#product_modal').modal('hide')
                toast({
                    title: "Thành công!",
                    message: message,
                    type: "success",
                    duration: 4000
                });
            }, error: function(jqXHR, exception) {
                $('#product_modal').modal('hide')
                toast({
                    title: "Thất bại!",
                    message: "Đã có lỗi xảy ra ("+ exception +")",
                    type: "error",
                    duration: 4000
                });
            }
        });
    } else return false

});

function validateProductForm() {
    const regex = /[!@#$%^&*,.?":{}|<>]/gm
    let flag = true
    if (regex.test($("#product_name").val())) {
        $('#product_name').next().text('Tên sản phẩm không chứa kí tự đặc biệt')
        flag = false
    } else
        $('#product_name').next().text('')
    if ($("#product_category_selection").val() == "0") {
        $($("#product_category_selection").closest('.form-group').children(".form-messege")).text('Vui lòng chọn một danh mục cho sản phẩm')
        flag = false
    } else
        $($("#product_category_selection").closest('.form-group').children(".form-messege")).text('')
    if (regex.test($("#product_description").val())) {
        $($("#product_description").closest('.form-group').children(".form-messege")).text('Chứa ký tự đặc biệt')
        flag = false
    } else
        $($("#product_description").closest('.form-group').children(".form-messege")).text('')
    return flag
}

$('#product_confirm_delete_btn').click(function (e) { 
    e.preventDefault();
    const active_feature = $('.sidebar_menu-items.active').data('id-chuc-nang');
    if(permission[active_feature]['is_delete']==0) {
        toast({
            title: "Hạn chế",
            message: "Bạn không có quyền hạn để sử dụng hành động này",
            type: "warning",
            duration: 2000
        });
        return false
    }
    const product_id = $(this).closest('form').find('#product_delete_id').val()
    $.ajax({
        type: "DELETE",
        url: `../../../main/controller/api/productAPI.php?id=${product_id}`,
        dataType: "json",
        success: function (response) {
            loadTab('product')
            $('#product_delete_modal').modal('hide')
            toast({
                title: "Thành công!",
                message: "Đã xóa sản phẩm",
                type: "success",
                duration: 4000
            });
        }, error: function(jqXHR, exception) {
            $('#product_delete_modal').modal('hide')
            toast({
                title: "Thất bại!",
                message: "Đã có lỗi xảy ra ("+ exception +")",
                type: "error",
                duration: 4000
            });
        }
    });
});


// VARIANT TAB //

function loadVariantComboboxCategory() {
    let str = "<option value='0'>Tất cả</option>"
    $.ajax({
        type: "GET",
        url: "../../../main/controller/api/categoryAPI.php",
        dataType: "json",
        success: function (response) {
            response.forEach((item) => {
                str += `
                    <option value="${item.id}">${item.ten_danh_muc}</option>
                `
            })
            $('.variant_filter_category').html(str)
        }
    });
}

function searchVariant() {
    $("#variant_search_btn").click(function (e) { 
        e.preventDefault()
        const searchValue = $("#variant_search_input").val()
        const categoryId = $('.variant_filter_category').val() == 0? null:$('.variant_filter_category').val()
        if(searchValue.trim()) {
            product_pageable.page = 1
            product_pageable.keyword = searchValue
            product_pageable.categoryId = categoryId
        } else {
            product_pageable.page = 1
            product_pageable.keyword = null
            product_pageable.categoryId = categoryId
        }
        $("#variant_search_input").val('')
        $.ajax({
            type: "GET",
            url: "../../../main/controller/api/productVariantsAPI.php",
            data: product_pageable,
            dataType: "json",
            success: function (response) {
                loadProductVariants(response.products)
                loadProductVariantsPage(response.count)
            },
            error: function(jqXHR, exception) {
                loadProductVariants([])
                loadProductVariantsPage(0)
            }
        });
    });
}

function loadProductVariants(productVariants) {
    if($.isEmptyObject(productVariants)) {
        $(".variant_list").html("<h2>Không tìm thấy sản phẩm!</h2>")
        return
    }
    $(".variant_list").html("")
    let str = ""
    productVariants.forEach( item => {
        str += `
            <tr data-sku-id=${item.id}>
                <td>${item.id}</td>
                <td>${item.tensp}</td>
                <td>${item.don_gia}</td>
                <td>${item.so_luong}</td>
                <td>${item.id_sp}</td>
                <td>
                    <button type="button" class="btn btn-danger variant_delete_btn">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    <button type="button" class="btn btn-success variant_update_btn">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                </td>
            </tr>
        ` 
    })
    $(".variant_list").html(str)

    $(".variant_update_btn").each(function (index, element) {
        $(element).click(function (e) { 
            e.preventDefault()
            const variant_id = $(element).closest('tr').data('sku-id')
            $('.modal-title-variant').text('Sửa biến thể')
            getProductVariantDetail(variant_id)
            $('#variant_modal').attr('data-action', 'update');
            $('#variant_modal').modal('show')
        });
        
    });

    $('.variant_delete_btn').each(function (index, element) {
        $(element).click(function (e) { 
            e.preventDefault();
            const variant_id = $(element).closest('tr').data('sku-id')
            const variant_name = $(element).closest('tr').children(':nth-child(2)').text()
            $('#variant_delete_id').val(variant_id)
            $('#variant_delete_name').val(variant_name)
            $('#variant_delete_modal').modal('show')
        });
        
    });
}

function loadProductVariantsPage(count) {
    let str = '';
    let totalPage = Math.ceil(count/product_pageable.itemPerPage)
    if(totalPage<=1){
        $("#product_variant_pagination").html(str)
        return
    }
    str += '<li class="page-item" data-page="pre"><a class="page-link" href="">Previous</a></li>'
    for(let i=1; i<=totalPage; i++) {
        if(product_pageable.page==i) {
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
    $("#product_variant_pagination").html(str)
    $(".page-item").each(function(index, element) {
        $(element).click(function (e){
            e.preventDefault();
            let page = $(element).data('page');
            if(page==="pre") page = product_pageable.page > 1? product_pageable.page-1 : product_pageable.page
            if(page==="next") page = product_pageable.page < totalPage ? product_pageable.page+1 : product_pageable.page

            if(product_pageable.page != page) {
                $(".page-item.active").removeClass("active")
                product_pageable.page = page;
                $.ajax({
                    type: "GET",
                    url: "../../../main/controller/api/productVariantsAPI.php",
                    data: product_pageable,
                    dataType: "json",
                    success: function (response) {
                        loadProductVariants(response.products)
                        loadProductVariantsPage(response.count)
                    }
                });
            }
        })
    });
}

function getProductVariantDetail(variant_id) {
    $.ajax({
        type: "GET",
        url: "../../../main/controller/api/productVariantsAPI.php",
        data: `id=${variant_id}`,
        dataType: "json",
        success: function (response) {
            let variant = {}
            response.forEach(item=>{
                if(!variant['thuoc_tinh']) variant['thuoc_tinh'] = {}
                variant['thuoc_tinh'][`${item.id_thuoc_tinh}/${item.ten_thuoc_tinh}`] = `${item.id_gia_tri_tt}/${item.gia_tri}`
                variant['sku_id'] = item.id
                variant['sku_name'] = item.sku_name
                variant['don_gia'] = item.don_gia
                variant['so_luong'] = item.so_luong
                variant['id_sp'] = item.id_sp
            })
            loadProductVariantDetail(variant)
        }
    });
}

function loadProductVariantDetail(variant) {
    $('#variant_id').val(variant.sku_id)
    $('#variant_name').val(variant.sku_name)
    $('#variant_price').val(variant.don_gia)
    $('#variant_quantity').val(variant.so_luong)
    $('#variant_id_sp').val(variant.id_sp)
    $('.variantDetail_messege').text('')

    let str = ''
    for (var key in variant['thuoc_tinh']) {
        const arr_thuoc_tinh = key.split('/')
        const arr_gia_tri = variant['thuoc_tinh'][key].split('/')
        const id_thuoc_tinh = arr_thuoc_tinh[0]
        const ten_thuoc_tinh = arr_thuoc_tinh[1]
        const id_gia_tri = arr_gia_tri[0]
        const gia_tri = arr_gia_tri[1]
        str += `
            <tr class="variantAttribute_item">
                <td class="variantAttribute_attribute" data-id-tt="${id_thuoc_tinh}">${ten_thuoc_tinh}</td>
                <td class="variantAttribute_value">
                    <select class="form-control">
                    </select>
                </td>
                <td class="variantAttribute_delete"><i class="fa-solid fa-trash variantAttribute_del_btn"></i></td>
            </tr>        
        `
        getAll_Sku_Attribute_Value_ById(id_thuoc_tinh, id_gia_tri, true)
    }
    $('.variantAttributeDetail_list').html(str)

    $('.variantAttribute_del_btn').each(function (index, element) {
        $(element).click(function (e) { 
            e.preventDefault()
            $(this).closest('.variantAttribute_item').remove()
        });
    });

}

// btn add attribute click event
$('#addAttribute').click(function (e) { 
    e.preventDefault()
    const attr_id = $('#variantAttribute_name').val()
    const id_gia_tri = $('#variantAttribute_value').val()
    const attr_name = $('#variantAttribute_name option:selected').text()

    if(isExistAttribute(attr_id)) {
        $('.variantDetail_messege').text(`Thuộc tính ${attr_name} đã tồn tại`)
    } else {
        let str = `
            <tr class="variantAttribute_item">
                <td class="variantAttribute_attribute" data-id-tt="${attr_id}">${attr_name}</td>
                <td class="variantAttribute_value">
                    <select class="form-control">
                    </select>
                </td>
                <td class="variantAttribute_delete"><i class="fa-solid fa-trash variantAttribute_del_btn"></i></td>
            </tr>
        `
        getAll_Sku_Attribute_Value_ById(attr_id, id_gia_tri, true)
        $('.variantAttributeDetail_list').append(str)
        $(`[data-id-tt=${attr_id}]`).closest('.variantAttribute_item').find('.variantAttribute_del_btn').click(function (e) { 
            e.preventDefault()
            $(this).closest('.variantAttribute_item').remove()
        });
    }
});

function isExistAttribute(attr_id) { 
    let flag = false
    $('[data-id-tt]').each(function (index, element) {
        if($(element).data('id-tt') == attr_id) flag = true
    });
    return flag
}

function load_Cbb_Sku_Attribute() {
    $.ajax({
        type: "GET",
        url: "../../../main/controller/api/attributeAPI.php",
        dataType: "json",
        success: function (response) {
            let str = ''
            let selected_value;
            $.each(response, function (index, element) { 
                if(index==0) selected_value = element.id
                str += `
                    <option value="${element.id}">${element.ten_thuoc_tinh}</option>
                `
            });
            $('#variantAttribute_name').html(str);
            $('#variantAttribute_name').val(selected_value)
            getAll_Sku_Attribute_Value_ById(selected_value, false)
            $('#variantAttribute_name').unbind().change(function (e) { 
                e.preventDefault();
                const id_thuoc_tinh = $('#variantAttribute_name').val()
                getAll_Sku_Attribute_Value_ById(id_thuoc_tinh, false)
            });
        }
    });
}

function load_Cbb_Sku_AttributeValue(attributeValues) {
    let str = ''
    attributeValues.forEach(item=>{
        str += `
            <option value="${item.id}">${item.gia_tri}</option>
        `
    })
    $('#variantAttribute_value').html(str)
}

function load_Cbb_Sku_Attribute_ValueDetail(attributeValues, id_thuoc_tinh, id_gia_tri) {
    let str = ''
    let flag = false
    attributeValues.forEach(item=> {
        if(id_gia_tri == item.id) {
            flag = true
        }
        str += `
            <option value="${item.id}">${item.gia_tri}</option>
        `
    })
    $(`[data-id-tt="${id_thuoc_tinh}"]`).closest('tr').find('select').html(str)
    if(flag)
        $(`[data-id-tt="${id_thuoc_tinh}"]`).closest('tr').find('select').val(id_gia_tri)
    else
        $(`[data-id-tt="${id_thuoc_tinh}"]`).closest('tr').find('select').val(attributeValues[0].id)
}

function getAll_Sku_Attribute_Value_ById(id_thuoc_tinh, id_gia_tri=null, loadOnDetal=false) {
    $.ajax({
        type: "GET",
        url: "../../../main/controller/api/attributeValueAPI.php",
        data: `id_thuoc_tinh=${id_thuoc_tinh}`,
        dataType: "json",
        success: function (response) {
            if (loadOnDetal) {
                load_Cbb_Sku_Attribute_ValueDetail(response, id_thuoc_tinh, id_gia_tri)
            } else {
                load_Cbb_Sku_AttributeValue(response)
            }
        }
    });
}

function clearProductVariantForm() {
    $('#variant_id').val('')
    $('#variant_name').val('')
    $('#variant_price').val('')
    $('#variant_quantity').val('')
    $('#variant_id_sp').val('')
    $('.variantAttributeDetail_list').html('')
    $('#variant_form .form-messege').text('')
    $('.variantDetail_messege').text('')
}

$('#variant_add_btn').click(function (e) { 
    const active_feature = $('.sidebar_menu-items.active').data('id-chuc-nang');
    if(permission[active_feature]['is_insert']==1) {
        clearProductVariantForm()
        $('.modal-title-variant').text('Thêm biến thể')
        $('#variant_id').val('auto')
        $('#variant_modal').attr('data-action', 'add');
        $('#variant_modal').modal('show')
    } else {
        toast({
            title: "Hạn chế",
            message: "Bạn không có quyền hạn để sử dụng hành động này",
            type: "warning",
            duration: 2000
        });
    }
});

$('#variant_form').submit(function (e) { 
    e.preventDefault();
    const active_feature = $('.sidebar_menu-items.active').data('id-chuc-nang');
    if(permission[active_feature]['is_update']==0) {
        toast({
            title: "Hạn chế",
            message: "Bạn không có quyền hạn để sử dụng hành động này",
            type: "warning",
            duration: 2000
        });
        return false
    }
    const id_sp = $('#variant_id_sp').val()
    if (validateVariantForm()&&isExistProductId(id_sp)) {
        let data = {}
        $.each($(this).serializeArray(), function (i, el) { 
            data[""+el.name+""] = el.value
        })
        data['in_stock'] = 1
        data['id_thuoc_tinh'] = []
        data['id_gia_tri'] = []
        $('.variantAttribute_item').each(function (index, element) {
            data['id_thuoc_tinh'].push($(this).find('[data-id-tt]').data('id-tt'))
            data['id_gia_tri'].push($(this).find('select').val())
        });
        let method, sku_id, url, message
        switch ($('#variant_modal').attr('data-action')) {
            case 'add':
                method = 'POST'
                url = "../../../main/controller/api/productVariantsAPI.php"
                message = "Tạo biến thể sản phẩm thành công"
                break
            case 'update':
                method = 'PUT'
                sku_id = $('#variant_id').val()
                url = `../../../main/controller/api/productVariantsAPI.php?id=${sku_id}`
                message = "Đã cập nhật thay đổi"
                break
            default:
                break
        }
        $.ajax({
            type: method,
            url: url,
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json',
            success: function (response) {
                loadTab('variant')
                $('#variant_modal').modal('hide')
                toast({
                    title: "Thành công!",
                    message: message,
                    type: "success",
                    duration: 4000
                });
            }, error: function(jqXHR, exception) {
                $('#variant_modal').modal('hide')
                toast({
                    title: "Thất bại!",
                    message: "Đã có lỗi xảy ra ("+ exception +")",
                    type: "error",
                    duration: 4000
                });
            }
        });
    } else return false
});

function isExistProductId(product_id) {
    return $.ajax({
        type: "GET",
        url: `../../../main/controller/api/productAPI.php?id=${product_id}`,
        async: false,
        dataType: "json",
        success: function (response) {
            if(response.in_stock!=0)
                $($("#variant_id_sp").closest('.form-group').children(".form-messege")).text('')
            else
                $($("#variant_id_sp").closest('.form-group').children(".form-messege")).text('Mã sản phẩm không tồn tại')
        }, error: function(jqXHR, exception) {
            $($("#variant_id_sp").closest('.form-group').children(".form-messege")).text('Mã sản phẩm không tồn tại')
        }
    }).responseText;
}

function validateVariantForm() {
    const regex = /[!@#$%^&*,.?":{}|<>]/gm
    let flag = true
    if (regex.test($("#variant_name").val())) {
        $($("#variant_name").closest('.form-group').children(".form-messege")).text('Chứa ký tự đặc biệt')
        flag = false
    } else
        $($("#variant_name").closest('.form-group').children(".form-messege")).text('')
    if ($('#variant_price').val()<=0) {
        $($("#variant_price").closest('.form-group').children(".form-messege")).text('Giá không đúng')
        flag = false
    } else
    $($("#variant_price").closest('.form-group').children(".form-messege")).text('')
    if ($('#variant_quantity').val()<=0) {
        $($("#variant_quantity").closest('.form-group').children(".form-messege")).text('Số lượng không đúng')
        flag = false
    } else $($("#variant_quantity").closest('.form-group').children(".form-messege")).text('')
    if ($('.variantAttributeDetail_list .variantAttribute_item').length == 0) {
        $('.variantDetail_messege').text('Phải có ít nhất một thuộc tính cho biến thể')
        flag = false
    } else $('.variantDetail_messege').text('')
    return flag
}

$('#variant_delete_confirm_btn').click(function (e) { 
    e.preventDefault();
    const active_feature = $('.sidebar_menu-items.active').data('id-chuc-nang');
    if(permission[active_feature]['is_delete']==0) {
        toast({
            title: "Hạn chế",
            message: "Bạn không có quyền hạn để sử dụng hành động này",
            type: "warning",
            duration: 2000
        });
        return false
    }
    const variant_id = $(this).closest('form').find('#variant_delete_id').val()
    $.ajax({
        type: "DELETE",
        url: `../../../main/controller/api/productVariantsAPI.php?id=${variant_id}`,
        dataType: "json",
        success: function (response) {
            loadTab('variant')
            $('#variant_delete_modal').modal('hide')
            toast({
                title: "Thành công!",
                message: "Đã xóa biến thể",
                type: "success",
                duration: 4000
            });
        }, error: function(jqXHR, exception) {
            $('#variant_delete_modal').modal('hide')
            toast({
                title: "Thất bại!",
                message: "Đã có lỗi xảy ra ("+ exception +")",
                type: "error",
                duration: 4000
            });
        }
    });
});

// ATTRIBUTE TAB  //

function loadAttributes(attributes) {
    if($.isEmptyObject(attributes)) {
        $(".attribute_list").html("<h2>Không có dữ liệu để hiển thị!</h2>");    
        return
    }
    $(".attribute_list").html('')
    let str = ''
    attributes.forEach((item)=>{
        str += `
            <tr data-id="${item.id}">
                <td>${item.id}</td>
                <td>${item.ten_thuoc_tinh}</td>
                <td class = "text-center">
                    <button type="button" class="btn btn-danger attribute_delete_btn">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    <button type="button" class="btn btn-success attribute_update_btn">
                        Xem chi tiết/Sửa
                    </button>
                </td>
            </tr>
        `
    })
    $(".attribute_list").html(str)
    $(".attribute_update_btn").each(function (index, element) {
        $(element).click(function (e) { 
            e.preventDefault()
            const attribute_id = $(element).closest('tr').data('id')
            $('.modal-title-attribute').text('Sửa thuộc tính')
            $('#attribute_messege').text('')
            loadAttributeDetail(attribute_id)
            $('#attribute_modal').attr('data-action', 'update');
            $('#attribute_modal').modal('show')
        });
        
    });

    $('.attribute_delete_btn').each(function (index, element) {
        $(element).click(function (e) { 
            e.preventDefault();
            const attribute_id = $(element).closest('tr').data('id')
            const attribute_name = $(element).closest('tr').children(':nth-child(2)').text()
            $('#attribute_delete_id').val(attribute_id)
            $('#attribute_delete_name').val(attribute_name)
            $('.modal-title-attribute').text('Xóa thuộc tính')
            $('#attribute_delete_modal').modal('show')
        });
        
    });
}

function loadAttributeDetail(attribute_id) {
    $('#attribute_id').val(attribute_id)
    $.ajax({
        type: "GET",
        url: "../../../main/controller/api/attributeAPI.php",
        data: `id=${attribute_id}`,
        dataType: "json",
        success: function (response) {
            $("#attribute_name").val(response.ten_thuoc_tinh)
        }
    });

    $.get("../../../main/controller/api/attributeValueAPI.php", `id_thuoc_tinh=${attribute_id}`,
        function (data, textStatus, jqXHR) {
            let str = ''
            data.forEach((item)=>{
                str += `
                    <tr class="attributeValue_item">
                        <td class="attribute_value" data-id-gt="${item.id}"><input class="form-input form-control" type="text" value="${item.gia_tri}" required></td>
                        <td class="attribute_delete text-center"><i class="fa-solid fa-trash attributeValue_del_btn"></i></td>
                    </tr>
                `
            })
            $('.attributeValue_list').html(str);
            $('.attributeValue_del_btn').each(function (index, element) {
                $(element).click(function (e) { 
                    e.preventDefault()
                    $(this).closest('.attributeValue_item').remove()
                });
            });
        },
    "json"
    );
}

$('#attribute_add_btn').click(function (e) {
    const active_feature = $('.sidebar_menu-items.active').data('id-chuc-nang');
    if(permission[active_feature]['is_insert']==1) {
        clearAttributeForm()
        $('#attribute_id').val('auto')
        $('#attribute_modal').attr('data-action', 'add')
        $('.modal-title-attribute').text('Thêm thuộc tính');
        $('#attribute_modal').modal('show')
    } else {
        toast({
            title: "Hạn chế",
            message: "Bạn không có quyền hạn để sử dụng hành động này",
            type: "warning",
            duration: 2000
        });
    }
});

function clearAttributeForm() {
    $('#attribute_name').val('')
    $('.attributeValue_list').html('')
    $('#attribute_form .form-messege').text('')
    $('#attribute_messege').text('')
}

$('#add_attribute_value').click(function (e) { 
    e.preventDefault();
    const value = $('#attribute_value').val().trim().toLowerCase()
    if(isExistAttribute_Value(value)) {
        $('#attribute_messege').text('Giá trị đã được thiết lập');
    } else {
        let str = `
            <tr class="attributeValue_item">
                <td class="attribute_value" data-id-gt=""><input class="form-input form-control" type="text" value="${value}" required></td>
                <td class="attribute_delete text-center"><i class="fa-solid fa-trash attributeValue_del_btn"></i></td>
            </tr>
        `
        $('.attributeValue_list').append(str)
        $('.attributeValue_del_btn').each(function (index, element) {
            $(element).unbind().click(function (e) { 
                e.preventDefault()
                $(this).closest('.attributeValue_item').remove()
            });
        });
    }
});

function isExistAttribute_Value(value) {
    let flag = false
    $('.attribute_value input').each(function (index, element) {
        if(value === $(element).val().trim().toLowerCase())
            flag = true
    });
    return flag
}

$('#attribute_form').submit(function (e) { 
    e.preventDefault();
    const active_feature = $('.sidebar_menu-items.active').data('id-chuc-nang');
    if(permission[active_feature]['is_update']==0) {
        toast({
            title: "Hạn chế",
            message: "Bạn không có quyền hạn để sử dụng hành động này",
            type: "warning",
            duration: 2000
        });
        return false
    }
    if(validateAttributeForm()) {
        let data = {}
        $.each($(this).serializeArray(), function (i, el) { 
            data[""+el.name+""] = el.value
        });
        data['id_gia_tri'] = []
        data['gia_tri'] = []
        $('.attribute_value').each(function (index, element) {
            const attribute_value_id = $(element).data('id-gt')
            data['id_gia_tri'].push(attribute_value_id!=''?attribute_value_id:'DEFAULT')
            data['gia_tri'].push($(element).find('input').val())
        });
        switch ($('#attribute_modal').attr('data-action')) {
            case 'add':
                $.ajax({
                    type: "POST",
                    url: "../../../main/controller/api/attributeAPI.php",
                    data: JSON.stringify(data),
                    dataType: "json",
                    success: function (response) {
                        const id_thuoc_tinh = JSON.parse(JSON.stringify(response))
                        data['id_thuoc_tinh'] = id_thuoc_tinh
                        $.ajax({
                            type: "POST",
                            url: "../../../main/controller/api/attributeValueAPI.php",
                            data: JSON.stringify(data),
                            dataType: "json",
                            success: function (response) {
                                loadTab('attribute')
                                $('#attribute_modal').modal('hide')
                                toast({
                                    title: "Thành công!",
                                    message: "Đã tạo thuộc tính mới",
                                    type: "success",
                                    duration: 4000
                                });
                            }
                        });
                    }, error: function(jqXHR, exception) {
                        $('#attribute_modal').modal('hide')
                        toast({
                            title: "Thất bại!",
                            message: "Đã có lỗi xảy ra ("+ exception +")",
                            type: "error",
                            duration: 4000
                        });
                    }
                });
                break;
            case 'update':
                const id_thuoc_tinh = $('#attribute_id').val();
                $.ajax({
                    type: "PUT",
                    url: `../../../main/controller/api/attributeAPI.php?id=${id_thuoc_tinh}`,
                    data: JSON.stringify(data),
                    dataType: "json",
                    success: function (response) { 
                        data['id_thuoc_tinh'] = id_thuoc_tinh
                        $.ajax({
                            type: "PUT",
                            url: '../../../main/controller/api/attributeValueAPI.php',
                            data: JSON.stringify(data),
                            dataType: "json",
                            success: function (response) {
                                loadTab('attribute')
                                $('#attribute_modal').modal('hide')
                                toast({
                                    title: "Thành công!",
                                    message: "Đã cập nhật thay đổi",
                                    type: "success",
                                    duration: 4000
                                });
                            }
                        });
                    }, error: function(jqXHR, exception) {
                        $('#attribute_modal').modal('hide')
                        toast({
                            title: "Thất bại!",
                            message: "Đã có lỗi xảy ra ("+ exception +")",
                            type: "error",
                            duration: 4000
                        });
                    }
                });
                break;
            default:
                break;
        }
    } else return false
});

function validateAttributeForm() {
    const regex = /[!@#$%^&*,.?":{}|<>]/gm
    let flag = true
    if (regex.test($("#attribute_name").val())) {
        $($("#attribute_name").closest('.form-group').children(".form-messege")).text('Chứa ký tự đặc biệt')
        flag = false
    } else {
        $($("#attribute_name").closest('.form-group').children(".form-messege")).text('')
    }
    if ($('.attributeValue_list .attributeValue_item').length == 0) {
        $('#attribute_messege').text('Phải có ít nhất một thuộc tính cho biến thể')
        flag = false
    } else {
        $('#attribute_messege').text('')
    }
    return flag
}

$('#attribute_delete_confirm_btn').click(function (e) { 
    e.preventDefault();
    const active_feature = $('.sidebar_menu-items.active').data('id-chuc-nang');
    if(permission[active_feature]['is_delete']==0) {
        toast({
            title: "Hạn chế",
            message: "Bạn không có quyền hạn để sử dụng hành động này",
            type: "warning",
            duration: 2000
        });
        return false
    }
    const attr_id = $(this).closest('form').find('#attribute_delete_id').val()
    $.ajax({
        type: "DELETE",
        url: `../../../main/controller/api/attributeAPI.php?id=${attr_id}`,
        dataType: "json",
        success: function (response) {
            loadTab('attribute')
            $('#attribute_delete_modal').modal('hide')
            toast({
                title: "Thành công!",
                message: "Đã xóa thuộc tính",
                type: "success",
                duration: 4000
            });
        }, error: function(jqXHR, exception) {
            $('#attribute_delete_modal').modal('hide')
            toast({
                title: "Thất bại!",
                message: "Đã có lỗi xảy ra ("+ exception +")",
                type: "error",
                duration: 4000
            });
        }
    });
});

// FEATURE TAB //
function loadFeatureList() {
    $.ajax({
        type: "GET",
        url: '../../../main/controller/api/featureAPI.php',
        dataType: "json",
        success: function (response) {
            response.forEach(item=> {
                str = `
                <tr data-id="${item.id}">
                    <td>${item.ten_chuc_nang}</td>
                    <td><label class="switch">
                        <input type="checkbox" class="permisson-checkbox" data-type="is_insert">
                        <span class="slider round"></span>
                    </label></td>
                    <td><label class="switch">
                        <input type="checkbox" class="permisson-checkbox" data-type="is_update">
                        <span class="slider round"></span>
                    </label></td>
                    <td><label class="switch">
                        <input type="checkbox" class="permisson-checkbox" data-type="is_delete">
                        <span class="slider round"></span>
                        </label></td>
                    <td><label class="switch">
                        <input type="checkbox" class="permisson-checkbox" data-type="is_read">
                        <span class="slider round"></span>
                    </label></td>
                </tr>
                `
                $('#permission_feature_detail').append(str);
            })
        }
    });
}

function loadPermission(permissions) {
    $(".permission_list").html("")
    permissions.forEach(item=>{
        let str = `
        <tr class="permission_list_content" data-id="${item.id}">
            <td class="permission_list_item">${item.id}</td>
            <td class="permission_list_item">${item.ten_nhom_quyen}</td>
            <td class="permission_list_item">
                <button type="button" class="btn btn-danger permission_delete_btn">
                    <i class="fa-solid fa-trash"></i>
                </button>
                <button type="button" class="btn btn-success permission_update_btn">
                   Xem chi tiết/Sửa
                </button>
            </td>
        </tr>
        `
        $('.permission_list').append(str);
        
    })
    $('.permission_list [data-id]').each(function(i, e) {
        if([1,2].includes($(this).data('id')))
            $(this).find('.permission_delete_btn').prop('disabled', true)
    })

    $(".permission_update_btn").each(function (index, element) {
        $(element).click(function (e) { 
            e.preventDefault()
            const permission_id = $(element).closest('tr').data('id')
            const permission_name = $(element).closest('tr').children(':nth-child(2)').text()
            $('.modal-title-permission').text('Sửa nhóm quyền')
            loadPermissionDetail(permission_id, permission_name)
            $('#permission_modal').attr('data-action', 'update');
            $('#permission_modal').modal('show')
        });
        
    });

    $('.permission_delete_btn').each(function (index, element) {
        $(element).click(function (e) { 
            e.preventDefault();
            const permission_id = $(element).closest('tr').data('id')
            const permission_name = $(element).closest('tr').children(':nth-child(2)').text()
            $('#permission_delete_id').val(permission_id)
            $('#permission_delete_name').val(permission_name)
            $('#permission_delete_modal').modal('show')
        });
        
    });
}

function loadPermissionDetail(permission_id, permission_name) {
    $('#permission_id').val(permission_id);
    $('#permission_name').val(permission_name);
    if([1,2].includes(permission_id)) {
        $('#permission_confirm_btn').prop('disabled', true)
    } else $('#permission_confirm_btn').prop('disabled', false)
    $.ajax({
        type: "GET",
        url: '../../../main/controller/api/permissionAPI.php',
        data: `id=${permission_id}`,
        dataType: "json",
        success: function (response) {
            response.forEach(item=> {
                $(`#permission_feature_detail [data-id="${item.id_chuc_nang}"]`).find('input').each(function (index, element) {
                    $(element).prop('checked', item[`${$(element).data('type')}`]==1?true:false);
                });
            })
        }, error: function(jqXHR, exception) {
            clearFeatureCheckBoxs()
        }
    });
}

function clearFeatureCheckBoxs() {
    $(`#permission_feature_detail [data-id]`).find('input').each(function (index, element) {
        $(element).prop('checked', false);
    })
}

function clearPermissionForm() {
    clearFeatureCheckBoxs()
    $('#permission_name').val('');
    $('.permisson-message').text('');
    $('#permission_confirm_btn').prop('disabled', false)
}

$('#permission_add_btn').click(function (e) { 
    const active_feature = $('.sidebar_menu-items.active').data('id-chuc-nang');
    if(permission[active_feature]['is_insert']==1) {
        clearPermissionForm()
        $('.modal-title-permission').text('Thêm nhóm quyền')
        $('#permission_id').val('auto')
        $('#permission_modal').attr('data-action', 'add')
        $('#permission_modal').modal('show')
    } else {
        toast({
            title: "Hạn chế",
            message: "Bạn không có quyền hạn để sử dụng hành động này",
            type: "warning",
            duration: 2000
        });
    }
});

$('#permission_form').submit(function (e) { 
    e.preventDefault();
    const active_feature = $('.sidebar_menu-items.active').data('id-chuc-nang');
    if(permission[active_feature]['is_update']==0) {
        toast({
            title: "Hạn chế",
            message: "Bạn không có quyền hạn để sử dụng hành động này",
            type: "warning",
            duration: 2000
        });
        return false
    }
    if(validatePermissionForm()) {
        let data = {}
        $.each($(this).serializeArray(), function (i, el) { 
            data[""+el.name+""] = el.value
        })
        data['id_chuc_nang'] = []
        data['is_read'] = []
        data['is_insert'] = []
        data['is_update'] = []
        data['is_delete'] = []
        $('#permission_feature_detail tr').each(function (index, element) {
            data['id_chuc_nang'].push($(element).data('id'))
            $(element).find('input').each(function (i, e) {
                data[`${$(e).data('type')}`].push($(e).is(':checked') ? 1:0)
            })
        });
        let method, permission_id, url, message
        switch ($('#permission_modal').attr('data-action')) {
            case 'add':
                method = 'POST'
                url = '../../../main/controller/api/permissionAPI.php'
                message = 'Đã thêm nhóm quyền mới'
                break;
            case 'update':
                method = 'PUT'
                permission_id = $('#permission_id').val()
                url = `../../../main/controller/api/permissionAPI.php?id=${permission_id}`
                message = 'Đã cập nhật thay đổi'
                break;
            default:
                break;
        }
        console.log(data)
        $.ajax({
            type: method,
            url: url,
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (response) {
                loadTab('permission')
                $('#permission_modal').modal('hide')
                toast({
                    title: "Thành công!",
                    message: message,
                    type: "success",
                    duration: 4000
                });
            }, error: function(jqXHR, exception) {
                $('#permission_modal').modal('hide')
                toast({
                    title: "Thất bại!",
                    message: "Đã có lỗi xảy ra ("+ exception +")",
                    type: "error",
                    duration: 4000
                });
            }
        });
    }
});

function validatePermissionForm() {
    let flag = true
    const regex = /[!@#$%^&*,.?":{}|<>]/gm
    if(regex.test($('#permission_name').val())) {
        flag = false
        $('.permisson-message').text('Chứa ký tự không hợp lệ');
    } else {
        $('.permisson-message').text('');
    }
    return flag
}

$('#permission_delete_confirm_btn').click(function (e) { 
    e.preventDefault();
    const active_feature = $('.sidebar_menu-items.active').data('id-chuc-nang');
    if(permission[active_feature]['is_delete']==0) {
        toast({
            title: "Hạn chế",
            message: "Bạn không có quyền hạn để sử dụng hành động này",
            type: "warning",
            duration: 2000
        });
        return false
    }
    const permission_id = $(this).closest('form').find('#permission_delete_id').val()
    $.ajax({
        type: "DELETE",
        url: `../../../main/controller/api/permissionAPI.php?id=${permission_id}`,
        success: function (response) {
            loadTab('permission')
            $('#permission_delete_modal').modal('hide')
            toast({
                title: "Thành công!",
                message: "Đã xóa nhóm quyền",
                type: "success",
                duration: 4000
            });
        }, error: function(jqXHR, exception) {
            $('#permission_delete_modal').modal('hide')
            toast({
                title: "Thất bại!",
                message: "Đã có lỗi xảy ra ("+ exception +")",
                type: "error",
                duration: 4000
            });
        }
    });
});

function logout() {
    $("#logOut").click(function (e) { 
        e.preventDefault();
        $.post( "../../../main/controller/api/accountAPI.php", function(data) {
            window.location.replace('../user-page/index.php')
        });
    });
}