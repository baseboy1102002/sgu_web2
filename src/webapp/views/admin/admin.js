let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
let userAccounts = localStorage.getItem("userAccounts") ? JSON.parse(localStorage.getItem("userAccounts")) : [];
let orderNoteList = localStorage.getItem("orderNoteList") ? JSON.parse(localStorage.getItem("orderNoteList")) : [];
let categories = localStorage.getItem("categories") ? JSON.parse(localStorage.getItem("categories")) : [];
let cart_products = localStorage.getItem("cart_products") ? JSON.parse(localStorage.getItem("cart_products")) : [];

function getParentElement(element, parent) {
    while (element.parentElement) {
        if (element.parentElement.matches(parent)) {
            return element.parentElement;
        }
        element = element.parentElement;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    renderOrderNotes(orderNoteList)
    renderProducts(products)
    renderProductCategory(productCategory)
    renderProductCategory(productFilterSelection)
    searchProduct(products)
    renderCategories()
    renderAccount()
    caclTotalIncome(tinhHinhKinhDoanhSanPham())
    renderReport(tinhHinhKinhDoanhSanPham())
    renderReportFilter()
    filterReport()
    renderAttributes()
});


// ============================================ //
// ---------------- SIDEBAR ------------------- //
// =========================================== //

const sideBarMenuItems = document.querySelectorAll(".sidebar_menu-items")
const tabs = document.querySelectorAll(".tabs")
sideBarMenuItems.forEach((item) => {
    item.onclick = () => {
        const id = item.classList[1]
        if (id == "account" && !checkQuyenAdminTong()) {
            alert("Chỉ có người quản trị cao nhất mới có thể sử dụng chức năng này!")
            return
        } else {
            document.querySelector(".menu_active").classList.remove("active")
            document.querySelector(".menu_active").classList.remove("menu_active")
            tabs.forEach((i) => {
                i.classList.add("tab_hide")
                if (i.classList.contains(id)) {
                    i.classList.remove("tab_hide")
                }
            })
            item.classList.add("menu_active")
            item.classList.add("active")
        }
    }
})

function checkQuyenAdminTong() {
    return JSON.parse(localStorage.getItem("accountState")) == "admin"
}

// =========================================== //
// ---------------- ORDERNOTE ---------------- //
// =========================================== //


function renderOrderNotes(orderNotes) {
    const orderNoteListContent = document.querySelector(".orderNote_list_content")
    orderNoteListContent.innerHTML = ""
    orderNotes.forEach((item) => {
        const tt = (item.status == 0) ? "Chưa xử lý" : "Đã xử lý"
        const tt2 = (item.status == 0) ? "Đã xử lý" : "Chưa xử lý"
        const orderDivOverview = document.createElement("tr")
        orderDivOverview.classList.add("orderNote_overView")
        if (tt === "Chưa xử lý") orderDivOverview.classList.add("background_red")
        else orderDivOverview.classList.add("background_blue")
        orderDivOverview.setAttribute("data-id", item.orderNoteID)
        orderDivOverview.innerHTML = `
            <td class="orderNote_list_items">${item.orderNoteID}</td>
            <td class="orderNote_list_items">${new Date(item.date).toLocaleString()}</td>
            <td class="orderNote_list_items">
                ${tt}
            </td>
            <td class="orderNote_list_items">${item.totalPrice} đ</td>
            <td class="orderNote_list_items">
                <button type="button" class="btn btn-success orderNoteListDetail" data-toggle="modal" data-target="#order_modal">Chi tiết</button>
            </td>
        `
        orderNoteListContent.append(orderDivOverview)
    });
    renderOrderNoteListDetail()
        // changeOrderNoteStatus()
}
// renderOrderNoteListDetail in the modal
function renderOrderNoteListDetail() {
    const orderNoteListDetail = document.querySelectorAll(".orderNoteListDetail");
    orderNoteListDetail.forEach((item) => {
        item.onclick = () => {
            const orderDivOverviewID = getParentElement(item, ".orderNote_overView").getAttribute('data-id');
            orderNoteList.forEach((item) => {
                if (item.orderNoteID == orderDivOverviewID) {
                    const tt = (item.status == 0) ? "Chưa xử lý" : "Đã xử lý"
                    const tt2 = (item.status == 0) ? "Đã xử lý" : "Chưa xử lý"
                    let str = ""
                    let str1 = `
                        <div class="panel panel-primary">
                            <div class="panel-heading">Thông tin khách hàng</div>
                            <div class="orderNote_customerInfo panel-body">
                                <div>Tên khách hàng: ${item.customerName}</div>
                                <div>Địa chỉ: ${item.address}</div>
                                <div>Số điện thoại: ${item.phoneNumber}</div>
                                <label for="status_selection">Tình trạng đơn hàng</label>
                                <select class="orderNote_selection" id="status_selection" onchange="changeOrderNoteStatus(this)">
                                    <option value="${item.status==0? 0:1}" selected>${tt}</option>
                                    <option value="${item.status==0? 1:0}">${tt2}</option>
                                </select>
                            </div>
                        </div>
                        `
                    item.buyItems.forEach((i) => {
                        str += `
                            <tr class="orderNote_products">
                                <td class="orderNote_product_img" style="background-image: url(.${i.img})"></div>
                                <td class="orderNote_products_id">${i.id}</div>
                                <td class="orderNote_products_name">${i.name}</td>
                                <td class="orderNote_products_price"><span style="color: var(--theme-color)">${i.price} đ</span></div>
                                <td class="orderNote_products_quantity">${i.quantity}</div>
                            </tr>
                            `
                    })
                    str =
                        `<div class="table-overflow">
                            <table class="table table-hover orderNoteTab_body">
                                <thead>
                                    <tr class="orderNote_list_Detail_header">
                                        <th class="orderNote_list_items"></th>
                                        <th class="orderNote_list_items">Mã sản phẩm</th>
                                        <th class="orderNote_list_items">Tên sản phẩm</th>
                                        <th class="orderNote_list_items">Đơn giá</th>
                                        <th class="orderNote_list_items">Số lượng</th>
                                    </tr>
                                </thead>
                                <tbody class="orderNote_list_Detail_content">
                                        ${str}
                                </tbody>
                            </table>
                        </div>`
                    str1 += str
                    const orderDivDetail = document.createElement("div")
                    orderDivDetail.classList.add("orderNote_details");
                    orderDivDetail.setAttribute("data-id", item.orderNoteID)
                    orderDivDetail.innerHTML = str1;
                    document.querySelector('.oderNoteListDetail').innerHTML = orderDivDetail.outerHTML;
                }
            })
        }
    })
}

function changeOrderNoteStatus(select) {
    const tt = parseInt(select.value)
    const orderDivDetailID = getParentElement(select, ".orderNote_details").getAttribute("data-id")
    const orderNoteoverViewList = document.querySelectorAll(".orderNote_overView")
    orderNoteoverViewList.forEach((item) => {
        if (item.getAttribute("data-id") == orderDivDetailID) {
            if (tt === 0) {
                item.classList.remove("background_blue")
                item.classList.add("background_red")
                item.children[2].innerText = "Chưa xử lý"
            } else {
                item.classList.remove("background_red")
                item.classList.add("background_blue")
                item.children[2].innerText = "Đã xử lý"
            }
            const index = orderNoteList.findIndex((i) => { return i.orderNoteID == item.getAttribute("data-id") })
            if (index !== -1) orderNoteList[index].status = tt
            localStorage.setItem("orderNoteList", JSON.stringify(orderNoteList))
            const arrThongKe = tinhHinhKinhDoanhSanPham()
            renderReport(arrThongKe)
            caclTotalIncome(arrThongKe)
        }
    })
}

// ------------- filter order notes by date ----------------- //

const orderNoteFilterBtn = document.querySelector("#orderNote_date-btn")
const orderNoteAllBtn = document.querySelector("#orderNote_all-btn")
const dateFrom = document.querySelector("#orderNote_date-from")
const dateTo = document.querySelector("#orderNote_date-to")

orderNoteFilterBtn.onclick = () => {
    // if(dateFrom.value=="" || dateTo.value==""){
    //     alert("Vui lòng chọn khoảng thời gian!")
    //     return
    // }
    let from = new Date(dateFrom.value)
    from.setHours(0, 0, 1)
    let to = new Date(dateTo.value)
    to.setHours(23, 59, 59)
    const orderNotesByFilter = orderNoteList.filter((item) => {
        const date = new Date(item.date)
        from = (dateFrom.value == "") ? date : from
        to = (dateTo.value == "") ? date : to
        return from <= date && date <= to
    })
    renderOrderNotes(orderNotesByFilter)
}

orderNoteAllBtn.onclick = () => {
    renderOrderNotes(orderNoteList)
}


// ============================================ //
// ---------------- CATEGORY ------------------ //
// ============================================ //


function renderCategories() {
    const categoryList = document.querySelector(".category_list")
    categoryList.innerHTML = ""
    let str = ""
    categories.forEach((item) => {
        str += `
            <tr class="category_list_content" data-cateID="${item.categoryID}">
                <td class="category_list_items">${item.categoryID}</td>
                <td class="category_list_items">${item.categoryName}</td>
                <td class="category_list_items">
                    <button type="button" class="btn btn-danger category_delelte_btn" data-toggle="modal" data-target="#category_delete_modal"><i class="fa-solid fa-trash"></i></button>
                    <button type="button" class="btn btn-success category_update_btn" data-toggle="modal" data-target="#category_modal"><i class="fa-solid fa-pen-to-square"></i></button>
                </td>
            </tr>
        `
    })

    categoryList.innerHTML = str;
    deleteCategory()
    updateCategory()
}


const categoryModal = document.querySelector(".category_modal")
const categoryAddBtn = document.querySelector("#category_add_btn")
const categoryCancelBtn = categoryModal.querySelector("#category_cancel_btn")
const categorySubmitBtn = categoryModal.querySelector("#category_confirm_btn")
let category_form_action = ""


// --------------- thêm danh mục ---------------- //

categoryAddBtn.onclick = () => {
    category_form_action = "add"
    document.querySelector('.modal-title-category').innerHTML = "Thêm danh mục";
    categoryModal.classList.remove("category_modal_hide")
    document.querySelector("#category_id").value = autoGenerateCategoryId()
    document.querySelector("#category_name").value = ""
    document.querySelector(".messege").innerText = ""
}

categoryCancelBtn.onclick = () => {
    categoryModal.classList.add("category_modal_hide")
}


// ------------ submit form danh mục --------------- //
categorySubmitBtn.onclick = (e) => {
    e.preventDefault()
    let categoryId = document.querySelector("#category_id").value
    let categoryName = document.querySelector("#category_name").value
    let flag = true
    if (categoryId === "" || categoryName === "") {
        document.querySelector(".messege").innerText = "Không được để trống"
        return
    }
    if (categories.some((item) => { return item.categoryName == categoryName })) {
        document.querySelector(".messege").innerText = "Tên danh mục bị trùng"
        return
    } else {
        switch (category_form_action) {
            case "add":
                let categoryItem = {
                    categoryID: categoryId,
                    categoryName: categoryName
                }
                categories.unshift(categoryItem)
                localStorage.setItem("categories", JSON.stringify(categories))
                document.querySelector(".messege").innerText = ""
                    // alert
                categoryModal.classList.add("category_modal_hide")
                document.getElementById("category_modal").classList.remove("in")
                document.querySelector(".modal-backdrop").classList.remove("in")
                document.querySelector(".notification_cate").innerHTML = `
                    <div class="alert alert-success alert-dismissible fade in" style='position: absolute;top: 10px;right: 10px;'>
                        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                        <strong>Thành công!</strong> Bạn đã thêm thành công danh mục ${categoryName}
                    </div>
                    `
                document.querySelector("body").removeChild(document.querySelector('.modal-backdrop'))
                setTimeout(() => {
                    document.getElementById("category_modal").style.display = "none"
                }, 1000);
                break;
            case "update":
                const index = categories.findIndex((item) => { return item.categoryID == categoryId })
                categories[index].categoryName = categoryName
                localStorage.setItem("categories", JSON.stringify(categories))
                document.querySelector(".messege").innerText = ""
                categoryModal.classList.add("category_modal_hide")
                document.getElementById("category_modal").classList.remove("in")
                document.querySelector(".modal-backdrop").classList.remove("in")
                document.querySelector(".notification_cate").innerHTML = `
                    <div class="alert alert-success alert-dismissible fade in" style='position: absolute;top: 10px;right: 10px;'>
                        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                        <strong>Thành công!</strong> Bạn đã sửa thành công danh mục mới là ${categoryName}
                    </div>
                    `
                document.querySelector("body").removeChild(document.querySelector('.modal-backdrop'))
                setTimeout(() => {
                    document.getElementById("category_modal").style.display = "none"
                }, 1000);
                break;
            default:
                flag = false
                break;
        }
        if (flag) {
            renderCategories()
            renderProductCategory(productCategory)
            renderProductCategory(productFilterSelection)
            renderReportFilter()
        }

    }
}

// ------------- xóa danh mục ------------------- //
function checkDeleteCategory(categoryId) {
    return products.some((item) => { return item.categoryID == categoryId })
}

function deleteCategory() {
    const categoryDeleteBtns = document.querySelectorAll(".category_delelte_btn")
    categoryDeleteBtns.forEach((item) => {
        item.onclick = () => {
            const categoryId = getParentElement(item, ".category_list_content").children[0].innerText
            const categoryName = getParentElement(item, ".category_list_content").children[1].innerText
            document.querySelector(".category_delete_id").value = categoryId
            document.querySelector(".category_delete_name").value = categoryName
            const delete_btn = document.querySelector(".category_confirm_delete_btn")
            delete_btn.onclick = () => {
                if (!checkDeleteCategory(categoryId)) {
                    const index = categories.findIndex((item) => { return item.categoryID == categoryId })
                    const deletedCate = categories.splice(index, 1)
                    localStorage.setItem("categories", JSON.stringify(categories))
                    if (deletedCate != null) {
                        document.querySelector(".notification_cate").innerHTML = `
                        <div class="alert alert-success alert-dismissible fade in" style='position: absolute;top: 10px;right: 10px;'>
                            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                            <strong>Thành công!</strong> Bạn đã xóa thành công danh mục ${categoryName}
                        </div>
                        `
                    }
                    document.getElementById("category_delete_modal").classList.remove("in")
                    document.querySelector(".modal-backdrop").classList.remove("in")
                    document.querySelector("body").removeChild(document.querySelector('.modal-backdrop'))
                    setTimeout(() => {
                        document.getElementById("category_delete_modal").style.display = "none"
                    }, 1000);
                    renderCategories()
                    renderProductCategory(productCategory)
                    renderProductCategory(productFilterSelection)
                } else {
                    // alert("Không thể xóa một danh mục vẫn tồn tại sản phẩm hiện hành!")
                    document.querySelector(".notification_cate").innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade in" style='position: absolute;top: 10px;right: 10px;'>
                        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                        <strong>Thất bại!</strong> Không thể xóa danh mục ${categoryName} vì còn sản phẩm tồn tại
                    </div>
                    `
                }
                document.getElementById("category_modal").classList.remove("in")
                document.querySelector(".modal-backdrop").classList.remove("in")
                document.querySelector("body").removeChild(document.querySelector('.modal-backdrop'))
                setTimeout(() => {
                    document.getElementById("category_modal").style.display = "none"
                }, 1000);
            }
        }
    })
}

// --------------- update danh mục --------------- //
function updateCategory() {
    const categoryUpdateBtns = document.querySelectorAll(".category_update_btn")
    categoryUpdateBtns.forEach((item) => {
        item.onclick = () => {
            document.querySelector('.messege').innerHTML = ""
            document.querySelector('.modal-title-category').innerHTML = "Sửa danh mục"
            category_form_action = "update"
            const categoryId = getParentElement(item, ".category_list_content").getAttribute("data-cateID")
            categoryModal.classList.remove("category_modal_hide")
            document.querySelector("#category_id").value = categoryId
            renderCategoryForm(categoryId)
        }
    })
}

function autoGenerateCategoryId() {
    let num = 1
    let cateId = ""
    let checkId
    const categoryIdArr = categories.map((item) => {
        return item.categoryID
    })
    categories.forEach((item) => {
        checkId = ""
        checkId += num
        if (categoryIdArr.includes(checkId)) num++
    })
    cateId += num
    return cateId
}

function renderCategoryForm(categoryId) {
    const category = categories.find((item) => { return item.categoryID == categoryId })
    document.querySelector("#category_name").value = category.categoryName
}

// ======================================== //
// -------------- PRODUCT ----------------- //
// ======================================== //

// --------------render products --------------- //
function renderProducts(arrProducts) {
    const productList = document.querySelector(".product_list")
    productList.innerHTML = ""
    let str = ""
    arrProducts.forEach((item) => {
        str += `
            <tr class="product_list_content" data-id="${item.id}">
                <td class="product_list_items">
                    <div class="product_bgImg" style="background-image: url(.${item.background_image})"></div>
                </td>
                <td class="product_list_items product_name">${item.name}</td>
                <td class="product_list_items">
                    <button type="button" class="btn btn-danger product_delete_btn" data-toggle="modal" data-target="#product_delete_modal">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    <button type="button" class="btn btn-success product_update_btn" data-toggle="modal" data-target="#product_modal">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    
                </td>
            </tr>
        `
    })
    productList.innerHTML = str
    deleteProduct()
    updateProduct()
}

const productModal = document.querySelector(".product_modal")
const productModalForm = document.querySelector(".product_modal_form")
const productAddBtn = document.querySelector("#product_add_btn")
const productConfirmBtn = document.querySelector("#product_confirm_btn")
const productCancelBtn = document.querySelector("#product_cancel_btn")
const productCategory = document.querySelector("#product_category_selection")
const productFile = document.querySelector("#product_img")
const productName = document.querySelector("#product_name")
const productDesc = document.querySelector("#product_description")
let product_form_action = ""

// ------------ preview img before upload ---------------- //
productFile.onchange = () => {
    let reader = new FileReader();
    reader.onload = (e) => {
        let str = e.target.result;
        let img = document.querySelector(".img_review")
        img.style.backgroundImage = `url(${str})`
    }
    reader.readAsDataURL(productFile.files[0]);
}

// ------------ add product -------------- //
productAddBtn.onclick = () => {
    clearProductForm()
    product_form_action = "add"
    document.querySelector('.modal-title-product').innerHTML = "Thêm sản phẩm"
    productModal.classList.remove("product_modal_hide")
    document.querySelector("#product_id").innerText = `${autoGenerateProductId()}`
}

productCancelBtn.onclick = (e) => {
    e.preventDefault()
    productModal.classList.add("product_modal_hide")
    clearProductForm();
}

// --------------- product form submit -------------- //
productModalForm.onsubmit = (e) => {
    // check required input fields
    // add to products arr in first index(for render)
    let img = ""
    let regex = /[!@#$%^&*,.?":{}|<>]/gm
    e.preventDefault()
    if (regex.test(productName.value)) {
        alert("Tên sản phẩm không chứa ký tự đặc biệt!")
        return
    }
    if (productCategory.value == "0") {
        alert("Vui lòng chọn danh mục cho sản phẩm")
        return
    }
    if (productFile.value != "") {
        let fileName = productFile.files[0].name
        idxDot = fileName.lastIndexOf(".") + 1,
            extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
            img = `./assets/products_img/${fileName}`
        } else {
            alert("Chỉ được up file định dạng jpg/jpeg/png");
            file.value = ""; // Reset the input so no files are uploaded
            return
        }
    } else {
        img = "./assets/products_img/default.jpg"
    }
    switch (product_form_action) {
        case "add":
            if (products.some((item) => { return item.name == productName.value })) {
                alert("Tên sản phẩm không được trùng (đã tồn tại)")
                return
            }
            product = {
                id: autoGenerateProductId(),
                name: productName.value,
                background_image: img,
                categoryID: productCategory.value,
                description: productDesc.value,
            }
            products.unshift(product)
            localStorage.setItem("products", JSON.stringify(products))
            renderProducts(products)

            productModal.classList.add("product_modal_hide")
            clearProductForm();
            document.querySelector(".notification_product").innerHTML = `
                <div class="alert alert-success alert-dismissible fade in" style='position: absolute;top: 10px;right: 10px;'>
                    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                    <strong>Thành công!</strong> Bạn đã thêm thành công sản phẩm mới
                </div>
                `
            break;
        case "update":
            const index = products.findIndex((item) => { return item.id == document.querySelector("#product_id").innerText })
            products[index].name = productName.value
            products[index].description = productDesc.value
            products[index].categoryID = productCategory.value
            if (`url(.${products[index].background_image})` != document.querySelector(".img_review").style.backgroundImage) {
                products[index].background_image = productFile.value != "" ?
                    `./assets/products_img/${productFile.files[0].name}` : "./assets/products_img/default.jpg"
            }
            localStorage.setItem("products", JSON.stringify(products))
            renderProducts(products)
            productModal.classList.add("product_modal_hide")
            clearProductForm();
            document.querySelector(".notification_product").innerHTML = `
                <div class="alert alert-success alert-dismissible fade in" style='position: absolute;top: 10px;right: 10px;'>
                    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                    <strong>Thành công!</strong> Bạn đã cập nhật thành công sản phẩm
                </div>
                `
            break;
        default:
            break;
    }
    document.getElementById("product_modal").classList.remove("in")
    document.querySelector(".modal-backdrop").classList.remove("in")
    document.querySelector("body").removeChild(document.querySelector('.modal-backdrop'))
    setTimeout(() => {
        document.getElementById("product_modal").style.display = "none"
    }, 1000);
}

function renderProductCategory(element) {
    let str = element == productCategory ? "<option value='0'>Chọn danh mục</option>" : "<option value='0'>Tất cả</option>"
    categories.forEach((item) => {
        str += `
            <option value="${item.categoryID}">${item.categoryName}</option>
        `
    })
    element.innerHTML = str;
}

function clearProductForm() {
    productFile.value = null
    document.querySelector(".img_review").removeAttribute("style")
    productName.value = ""
    productCategory.value = "0"
    productDesc.value = ""
}

function renderProductForm(productId) {
    let product = products.find((item) => { return item.id == productId })
    productName.value = product.name
    productDesc.value = product.description
    productCategory.value = product.categoryID
    document.querySelector(".img_review").style.backgroundImage = `url(.${product.background_image})`
}

function autoGenerateProductId() {
    let num = 1
    let productId = ""
    let checkId
    const productIdArr = products.map((item) => {
        return item.id
    })
    products.forEach((item) => {
        checkId = ""
        checkId += num
        if (productIdArr.includes(checkId)) num++
    })
    productId += num
    return productId
}

// --------- delete product ---------- //

function checkDeleteProduct(productID) {
    const flag1 = cart_products.some((item) => { return item.id == productID })
    let flag2 = false
    orderNoteList.forEach((item) => {
        if (item.buyItems.some((i) => { return i.id == productID && item.status === 0 })) {
            flag2 = true
        }
    })
    const checkResult = (flag1 || flag2)
    return checkResult
}

function deleteProduct() {
    const deleteBtns = document.querySelectorAll(".product_delete_btn")
    deleteBtns.forEach((item) => {
        item.onclick = () => {
            const productID = getParentElement(item, ".product_list_content").getAttribute("data-id")
            const productName = getParentElement(item, ".product_list_content").children[1].innerText
            document.querySelector(".product_delete_id").value = productID
            document.querySelector(".product_delete_name").value = productName
            const delete_btn = document.querySelector(".product_confirm_delete_btn")
            delete_btn.onclick = () => {
                if (!checkDeleteProduct(productID)) {
                    const deletedProduct = products.splice(products.findIndex(function(i) { return i.id === productID }), 1)
                    localStorage.setItem("products", JSON.stringify(products))
                    renderProducts(products)
                    if (deletedProduct != null) {
                        document.querySelector(".notification_product").innerHTML = `
                        <div class="alert alert-success alert-dismissible fade in" style='position: absolute;top: 10px;right: 10px;'>
                            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                            <strong>Thành công!</strong> Bạn đã xóa thành công sản phẩm
                        </div>
                        `
                    }
                } else {
                    document.querySelector(".notification_product").innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade in" style='position: absolute;top: 10px;right: 10px;'>
                        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                        <strong>Thất bại!</strong> Không thể xóa sản phẩm đang nằm trong một giỏ hàng/hóa đơn chưa xử lý!
                    </div>
                    `
                }
                document.getElementById("product_delete_modal").classList.remove("in")
                document.querySelector(".modal-backdrop").classList.remove("in")
                document.querySelector("body").removeChild(document.querySelector('.modal-backdrop'))
                setTimeout(() => {
                    document.getElementById("product_delete_modal").style.display = "none"
                }, 1000);
            }
        }
    })
}


// ------------ update product --------------- //
function updateProduct() {
    const updateBtns = document.querySelectorAll(".product_update_btn")
    updateBtns.forEach((item) => {
        item.onclick = () => {
            product_form_action = "update"
            document.querySelector('.modal-title-product').innerHTML = "Sửa sản phẩm"
            const productId = getParentElement(item, ".product_list_content").getAttribute("data-id")
            productModal.classList.remove("product_modal_hide")
            document.querySelector("#product_id").innerText = productId
            renderProductForm(productId)
        }
    })
}

// -------------- search ----------------- //
function searchProduct(ProductList) {
    const searchBtn = document.querySelector("#product_search_btn")
    searchBtn.onclick = () => {
        const searchValue = document.querySelector("#product_search_input").value.toLowerCase()
        if (productFilterSelection.value == 0) {
            const result = ProductList.filter((item) => { return item.name.toLowerCase().includes(searchValue) })
            renderProducts(result)
        } else {
            const result = ProductList.filter((item) => {
                return item.name.toLowerCase().includes(searchValue) &&
                    item.categoryID == productFilterSelection.value
            })
            renderProducts(result)
        }
    }
}

// ----------- product flter -------------- //
const productFilterSelection = document.querySelector(".product_filter_category")
productFilterSelection.onchange = () => {
    ProdcutFilter(productFilterSelection.value)
    document.querySelector("#product_search_input").value = ""
}

function ProdcutFilter(categoryId) {
    if (categoryId == 0) {
        renderProducts(products)
        searchProduct(products)
        return
    } else {
        const result = products.filter((item) => { return item.categoryID == categoryId })
        renderProducts(result)
        searchProduct(result)
        return
    }
}

// =========================================//
// --------------- Account ---------------- //
// =========================================//

const accountModal = document.querySelector(".account_modal")
const accountForm = document.querySelector(".account_modal_form")
const accountAddBtn = document.querySelector("#account_add_btn")
const accountCancelBtn = document.querySelector("#account_cancel_btn")
const userName = document.querySelector("#account_id")
const Email = document.querySelector("#account_email")
const Pass = document.querySelector("#account_pass")
const accountType = document.querySelector("#account_type_selection")
let accountFormAction = ""

function renderAccount() {
    const accList = document.querySelector(".account_list")
    accList.innerHTML = ""
    let str = ""
    userAccounts.forEach((item) => {
        if (item.username == "admin") return
            // kiểm tra admin gốc=>không cho chỉnh sửa account nay
        str += `
            <tr class="account_list_content" data-id="${item.username}">
                <td class="account_list_items">${item.username}</td>
                <td class="account_list_items">${item.type == 1 ? "Quản trị":"Khách hàng"}</td>
                <td class="account_list_items accountInfo_detail">
                <button type="button" class="btn btn-info" data-toggle="modal" data-target="#account_detail_modal">
                    Xem chi tiết
                </button>
                </td>
                <td class="account_list_items">
                    <button type="button" class="btn btn-danger account_delete_btn" data-toggle="modal" data-target="#account_delete_modal">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    <button type="button" class="btn btn-success account_update_btn" data-toggle="modal" data-target="#account_modal">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                </td>
            </tr>
        `
    })
    accList.innerHTML = str;
    deleteAccount()
    updateAccount()
}

function deleteAccount() {
    const deleteBtns = document.querySelectorAll(".account_delete_btn")
    deleteBtns.forEach((item) => {
        item.onclick = () => {
            const accId = getParentElement(item, ".account_list_content").getAttribute("data-id")
            document.getElementById("account_delete_id").value = accId
            document.getElementById("account_delete_confirm_btn").onclick = (e) => {
                e.preventDefault()
                const deletedAccount = userAccounts.splice(userAccounts.findIndex(function(i) { return i.username === accId }), 1)
                localStorage.setItem("userAccounts", JSON.stringify(userAccounts))
                renderAccount()
                if (deletedAccount != null) {
                    document.querySelector(".notification_account").innerHTML = `
                    <div class="alert alert-success alert-dismissible fade in" style='position: absolute;top: 10px;right: 10px;'>
                        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                        <strong>Thành công!</strong> Đã xóa tài khoản
                    </div>
                    `
                } else {
                    document.querySelector(".notification_account").innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade in" style='position: absolute;top: 10px;right: 10px;'>
                        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                        <strong>Thất bại!</strong> Không thể xóa tài khoản này!
                    </div>
                    `
                }
                document.getElementById("account_delete_modal").classList.remove("in")
                document.querySelector(".modal-backdrop").classList.remove("in")
                document.querySelector("body").removeChild(document.querySelector('.modal-backdrop'))
                setTimeout(() => {
                    document.getElementById("account_delete_modal").style.display = "none"
                }, 1000);
            }

        }
    })
}

function updateAccount() {
    const updateBtns = document.querySelectorAll(".account_update_btn")
    updateBtns.forEach((item) => {
        item.onclick = () => {
            clearAccountForm()
            document.querySelector(".modal-title-account").innerHTML = "Sửa tài khoản"
            accountFormAction = "update"
            const accId = getParentElement(item, ".account_list_content").getAttribute("data-id")
            userName.value = accId
            userName.readOnly = true
            createAccountForm(accId)
            accountModal.classList.remove("account_modal_hide")
        }
    })
}

accountAddBtn.onclick = () => {
    clearAccountForm()
    document.querySelector(".modal-title-account").innerHTML = "Thêm tài khoản"
    accountModal.classList.remove("account_modal_hide")
    accountFormAction = "add"
}
accountCancelBtn.onclick = (e) => {
    e.preventDefault()
    accountModal.classList.add("account_modal_hide")
    clearAccountForm()
}

function clearAccountForm() {
    userName.value = ""
    userName.readOnly = false
    Email.value = ""
    Pass.value = ""
    accountType.value = 0
}

function createAccountForm(accId) {
    const acc = userAccounts.find((item) => { return item.username == accId })
    Email.value = acc.email
    Pass.value = acc.password
    accountType.value = acc.type
}

function checkExitsAccId(accId) {
    return userAccounts.some((item) => { return item.username == accId })
}

accountForm.onsubmit = (e) => {
    e.preventDefault()
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!regex.test(Email.value)) {
        alert("Vui lòng nhập đúng định dạng email!")
        return
    }
    if (Pass.value.length < 6) {
        alert("Mật khẩu có độ dài từ 6 ký tự trở lên!")
        return
    }
    switch (accountFormAction) {
        case "add":
            if (checkExitsAccId(userName.value)) {
                alert("Đã tồn tại một tên tài khoản như vậy!")
                return
            }
            let acc = {
                username: userName.value,
                password: Pass.value,
                type: accountType.value,
                email: Email.value
            }
            userAccounts.unshift(acc)
            localStorage.setItem("userAccounts", JSON.stringify(userAccounts))
            renderAccount()
            document.querySelector(".notification_account").innerHTML = `
            <div class="alert alert-success alert-dismissible fade in" style='position: absolute;top: 10px;right: 10px;'>
                <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                <strong>Thành công</strong> Thêm tài khoản mới thành công!
            </div>
            `
            setTimeout(() => {
                accountModal.classList.add("account_modal_hide")
                clearAccountForm()
            }, 1000);
            break;
        case "update":
            const index = userAccounts.findIndex((item) => { return item.username == userName.value })
            userAccounts[index].email = Email.value
            userAccounts[index].password = Pass.value
            userAccounts[index].type = accountType.value
            localStorage.setItem("userAccounts", JSON.stringify(userAccounts))
            renderAccount()
            document.querySelector(".notification_account").innerHTML = `
            <div class="alert alert-success alert-dismissible fade in" style='position: absolute;top: 10px;right: 10px;'>
                <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                <strong>Thành công</strong> Sửa tài khoản thành công!
            </div>
            `
            setTimeout(() => {
                accountModal.classList.add("account_modal_hide")
                clearAccountForm()
            }, 1000);
            break;
        default:
            break;
    }
    document.getElementById("account_modal").classList.remove("in")
    document.querySelector(".modal-backdrop").classList.remove("in")
    document.querySelector("body").removeChild(document.querySelector('.modal-backdrop'))
    setTimeout(() => {
        document.getElementById("account_modal").style.display = "none"
    }, 1000);
}

// ======================================= //
// ----------- THỐNG KÊ BÁO BÁO ---------- //
// ======================================= //

// ---------- tính tổng doanh thu ----------- //
function caclTotalIncome(arr) {
    let totalSaleQuantity = arr.reduce((totalVal, curVal) => { return totalVal + (curVal.saleQuantity) }, 0)
    let income = arr.reduce((totalVal, currVal) => { return totalVal + (currVal.saleQuantity * parseInt(currVal.unitPrice.replace(/[ .đ]/gm, ''))) }, 0)
    document.querySelector("#report_total_quantity").innerHTML = `Tổng số lượng đã bán: ${totalSaleQuantity}`
    document.querySelector("#report_total_income").innerHTML = `Tổng doanh thu: <span style="color:red;">${income} đ</span>`
}

function chechOrderNoteStatus(orderNote) {
    return orderNote.status === 1
}

// {id sp, sl, date}
function getDSBillProduct() {
    const arr = orderNoteList.map((item) => {
        let buyProducts = []
        for (const product of item.buyItems) {
            let buyInfo = {
                id: product.id,
                quantity: product.quantity,
                date: new Date(item.date),
                status: item.status
            }
            buyProducts.push(buyInfo)
        }
        return buyProducts
    }).flat().filter(chechOrderNoteStatus)
    return arr
}

function tinhHinhKinhDoanhSanPham(categoryId) {
    const arr = getDSBillProduct()
    let tinhHinhKinhDoanhSp = []
    const map = new Map();
    let date_from = new Date(document.querySelector("#report_date_from").value)
    date_from.setHours(0, 0, 1)
    let date_to = new Date(document.querySelector("#report_date_to").value)
    date_to.setHours(23, 59, 59)
    products.forEach((item) => {
        if (categoryId != null && categoryId != item.categoryID) return
        let flag = false
        for (const buyInfo of arr) {
            date_from = (document.querySelector("#report_date_from").value == "") ? buyInfo.date : date_from
            date_to = (document.querySelector("#report_date_to").value == "") ? buyInfo.date : date_to
            if (item.id == buyInfo.id && buyInfo.date >= date_from && buyInfo.date <= date_to) {
                flag = true
                if (map.has(item.id)) {
                    let thongke1SP = map.get(item.id)
                    thongke1SP.saleQuantity += buyInfo.quantity
                    map.set(item.id, thongke1SP)
                } else {
                    map.set(item.id, {
                        id: item.id,
                        name: item.name,
                        img: item.background_image,
                        saleQuantity: buyInfo.quantity,
                        unitPrice: item.price,
                    })
                }
            }
        }
        if (flag == false) {
            map.set(item.id, {
                id: item.id,
                name: item.name,
                img: item.background_image,
                saleQuantity: 0,
                unitPrice: item.price,
            })
        }
    })
    map.forEach((value) => { tinhHinhKinhDoanhSp.push(value) })
    return tinhHinhKinhDoanhSp
}

// ----------- render giao diện thống kê ---------------- //
function renderReport(arrThongKe) {
    const reportList = document.querySelector(".report_list")
    reportList.innerHTML = ""
    let str = ""
    arrThongKe.forEach((item) => {
        str += `
            <tr class="report_list_content" data-reportProductId="${item.id}">
                <td class="report_list_items">
                    <div class="product_bgImg" style="background-image: url(.${item.img})"></div>
                </td>
                <td class="report_list_items product_name">${item.name}</td>
                <td class="report_list_items">${item.saleQuantity}</div>
                <td class="report_list_items" style="color: red;">${parseInt(item.unitPrice.replace(/[ .đ]/gm,''))*item.saleQuantity} đ</td>
            </tr>
        `
    })
    reportList.innerHTML = str
}

function renderReportFilter() {
    let str = "<option value='0'>Tất cả</option>"
    categories.forEach((item) => {
        str += `
            <option value="${item.categoryID}">${item.categoryName}</option>
        `
    })
    document.querySelector("#report_filter_category").innerHTML = str
}

function filterReport() {
    const filterBtn = document.querySelector("#report_filter_btn")
    filterBtn.onclick = () => {
        const categoryId = document.querySelector("#report_filter_category").value
        const arrThongKe = tinhHinhKinhDoanhSanPham(categoryId == 0 ? null : categoryId)
        renderReport(arrThongKe)
        caclTotalIncome(arrThongKe)
    }
}

// ======================================= //
// ------- log out trang admin ----------- //
// ======================================= //


const logOutBtn = document.querySelector(".logOut")
logOutBtn.onclick = () => {
    let accountState = JSON.parse(localStorage.getItem("accountState"))
    accountState = -1
    localStorage.setItem("accountState", JSON.stringify(accountState))
    window.location.href = "../index.html"
}






// ============================================ //
// ---------------- ATTRIBUTE ----------------- //
// ============================================ //

let attr = localStorage.getItem("attribute") ? JSON.parse(localStorage.getItem("attribute")) : [];

function renderAttributes() {
    const attributeList = document.querySelector(".attribute_list")
    attributeList.innerHTML = ""
    let str = ""
    attr.forEach((item) => {
        str += `
            <tr class="attribute_list_content" data-attributeID="${item.attributeID}">
                <td class="attribute_list_items">${item.attributeID}</td>
                <td class="attribute_list_items">${item.attributeName}</td>
                <td class="attribute_list_items">${item.attributeValue}</td>
                <td class="attribute_list_items">
                    <button type="button" class="btn btn-danger attribute_delelte_btn" data-toggle="modal" data-target="#attribute_delete_modal"><i class="fa-solid fa-trash"></i></button>
                    <button type="button" class="btn btn-success attribute_update_btn" data-toggle="modal" data-target="#attribute_modal"><i class="fa-solid fa-pen-to-square"></i></button>
                </td>
            </tr>
        `
    })

    attributeList.innerHTML = str;
    deleteAttribute()
    updateAttribute()
}


const attributeModal = document.querySelector(".attribute_modal")
const attributeAddBtn = document.querySelector("#attribute_add_btn")
const attributeCancelBtn = attributeModal.querySelector("#attribute_cancel_btn")
const attributeSubmitBtn = attributeModal.querySelector("#attribute_confirm_btn")
let attribute_form_action = ""

// --------------- validate form thuộc tính ---------------- //

function validateFormAttribute() {
    const attributeId = document.querySelector("#attributeId").value
    const attributeName = document.querySelector("#attributeName").value
    const attributeValue = document.querySelector("#attributeValue").value
    if (attributeId === "") {
        document.querySelector(".message").innerText = "ID thuộc tính không được để trống"
        return false
    }
    if (attributeName === "") {
        document.querySelector(".message").innerText = "Tên thuộc tính không được để trống"
        return false
    }
    if (attributeValue === "") {
        document.querySelector(".message").innerText = "Giá trị thuộc tính không được để trống"
        return false
    }
    if (attr.some((item) => { return item.attributeName == attributeName })) {
        document.querySelector(".messege").innerText = "Tên thuộc tính bị trùng"
        return false
    } else
        return true
}

// --------------- thêm thuộc tính ---------------- //

attributeAddBtn.onclick = () => {
    attribute_form_action = "add"
    document.querySelector('.modal-title-attribute').innerHTML = "Thêm thuộc tính";
    attributeModal.classList.remove("attribute_modal_hide")
    document.querySelector("#attributeId").value = ""
    document.querySelector("#attributeName").value = ""
    document.querySelector("#attributeValue").value = ""
    document.querySelector(".message").innerText = ""
}

attributeCancelBtn.onclick = () => {
    attributeModal.classList.add("attribute_modal_hide")
}


// ------------ Submit form thuộc tính --------------- //

attributeSubmitBtn.onclick = (e) => {
    e.preventDefault()
    let attributeId = document.querySelector("#attributeId").value
    let attributeName = document.querySelector("#attributeName").value
    let attributeValue = document.querySelector("#attributeValue").value
    let flag = true
    if (!validateFormAttribute()) {
        return
    } else {
        switch (attribute_form_action) {
            case "add":
                let attributeItem = {
                    attributeID: attributeId,
                    attributeName: attributeName,
                    attributeValue: attributeValue
                }
                attr.unshift(attributeItem)
                localStorage.setItem("attribute", JSON.stringify(attr))
                document.querySelector(".messege").innerText = ""

                attributeModal.classList.add("attribute_modal_hide")
                document.querySelector(".notification_attribute").innerHTML = `
                <div class="alert alert-success alert-dismissible fade in" style='position: absolute;top: 10px;right: 10px;'>
                    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                    <strong>Thành công!</strong> Bạn đã thêm thành công thuộc tính ${attributeName} với giá trị ${attributeValue}
                </div>
                `
                document.getElementById("attribute_modal").classList.remove("in")
                document.querySelector(".modal-backdrop").classList.remove("in")
                document.querySelector("body").removeChild(document.querySelector(".modal-backdrop"))
                setTimeout(() => { document.getElementById("attribute_modal").style.display = 'none' }, 1000)
                break;
            case "update":
                const index = attr.findIndex((item) => { return item.AttributeID == attributeId })
                attr[index].AttributeName = attributeName
                attr[index].AttributeValue = attributeValue
                localStorage.setItem("attribute", JSON.stringify(attr))
                document.querySelector(".messege").innerText = ""
                document.querySelector(".notification_attribute").innerHTML = `
                <div class="alert alert-success alert-dismissible fade in" style='position: absolute;top: 10px;right: 10px;'>
                    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                    <strong>Thành công!</strong> Bạn đã sửa thành công thuộc tính ${attributeName} với giá trị ${attributeValue}
                </div>
                `
                document.getElementById("attribute_modal").classList.remove("in")
                document.querySelector(".modal-backdrop").classList.remove("in")
                document.querySelector("body").removeChild(document.querySelector(".modal-backdrop"))
                setTimeout(() => { document.getElementById("attribute_modal").style.display = 'none' }, 1000)
                break;
            default:
                flag = false
                break;
        }

    }
}

// ------------- xóa thuộc tính ------------------- //
function checkDeleteAttribute(attributeId) {
    return products.some((item) => { return item.attributeID == attributeId })
}

function deleteAttribute() {
    const attributeDeleteBtns = document.querySelectorAll(".attribute_delete_btn")
    attributeDeleteBtns.forEach((item) => {
        item.onclick = () => {
            const attributeId = getParentElement(item, ".attribute_list_content").children[0].innerText
            const attributeName = getParentElement(item, ".attribute_list_content").children[1].innerText
            const attributeValue = getParentElement(item, ".attribute_list_content").children[2].innerText
            document.querySelector(".attribute_delete_id").value = attributeId
            document.querySelector(".attribute_delete_name").value = attributeName
            document.querySelector(".attribute_delete_value").value = attributeValue
            const delete_btn = document.querySelector(".attribute_confirm_delete_btn")
            delete_btn.onclick = () => {
                if (!checkDeleteAttribute(attributeId)) {
                    const index = attr.findIndex((item) => { return item.attributeID == attributeId })
                    const deletedAttr = attr.splice(index, 1)
                    localStorage.setItem("attribute", JSON.stringify(attr))
                    if (deletedAttr != null) {
                        document.querySelector(".notification_attribute").innerHTML = `
                        <div class="alert alert-success alert-dismissible fade in" style='position: absolute;top: 10px;right: 10px;'>
                            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                            <strong>Thành công!</strong> Bạn đã xóa thành công thuộc tính ${attributeName}
                        </div>
                        `
                    }
                    document.getElementById("attribute_delete_modal").classList.remove("in")
                    document.querySelector(".modal-backdrop").classList.remove("in")
                    document.querySelector("body").removeChild(document.querySelector('.modal-backdrop'))
                    setTimeout(() => {
                        document.getElementById("attribute_delete_modal").style.display = "none"
                    }, 1000);
                    renderattribute()
                    renderProductAttribute(productAttribute)
                    renderProductAttribute(productFilterSelection)
                } else {
                    document.querySelector(".notification_attribute").innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade in" style='position: absolute;top: 10px;right: 10px;'>
                        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                        <strong>Thất bại!</strong> Không thể xóa thuộc tính ${attributeName} vì còn sản phẩm tồn tại
                    </div>
                    `
                }
                document.getElementById("attribute_modal").classList.remove("in")
                document.querySelector(".modal-backdrop").classList.remove("in")
                document.querySelector("body").removeChild(document.querySelector('.modal-backdrop'))
                setTimeout(() => {
                    document.getElementById("attribute_modal").style.display = "none"
                }, 1000);
            }
        }
    })
    document.getElementById('attribute_delete_confirm_btn').onclick = () => {
        document.querySelector(".notification_attribute").innerHTML = `
        <div class="alert alert-success alert-dismissible fade in" style='position: absolute;top: 10px;right: 10px;'>
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
            <strong>Thành công!</strong> đã xóa thành công thuộc tính!
        </div>
        `
        document.getElementById("attribute_delete_modal").classList.remove("in")
        document.querySelector(".modal-backdrop").classList.remove("in")
        document.querySelector("body").removeChild(document.querySelector('.modal-backdrop'))
        setTimeout(() => {
            document.getElementById("attribute_delete_modal").style.display = "none"
        }, 1000);
    }
}
// --------------- update thuộc tính --------------- //
function updateAttribute() {
    const attributeUpdateBtns = document.querySelectorAll(".attribute_update_btn")
    attributeUpdateBtns.forEach((item) => {
        item.onclick = () => {
            document.querySelector('.messege').innerHTML = ""
            document.querySelector('.modal-title-attribute').innerHTML = "Sửa thuộc tính"
            attribute_form_action = "update"
            const attributeId = getParentElement(item, ".attribute_list_content").getAttribute("data-attributeID")
            attributeModal.classList.remove("attribute_modal_hide")
            document.querySelector("#attributeId").value = attributeId
            renderAttributeForm(attributeId)
        }
    })
}

function renderAttributeForm(attributeId) {
    const attribute = attr.find((item) => { return item.attributeID == attributeId })
    document.querySelector("#attributeName").value = attribute.attributeName
    document.querySelector("#attributeValue").value = attribute.attributeValue
}




// ======================================= //
// ------- Biến thể ----------- //
// ======================================= //
function attribute(id, name) {
    this.id = id;
    this.name = name;
}

function attributeValue(id, name, attribute_id) {
    this.id = id;
    this.name = name;
    this.attribute_id = attribute_id;
}
var AttributeArray = [
    new attribute('1', 'cpu '),
    new attribute('2', 'ram '),
    new attribute('3', 'ssd '),
    new attribute('4', 'vga '),
]
var AttributeValueArray = [
    new attributeValue(1, 'Intel core i5', 1),
    new attributeValue(2, 'Amd ryzen 5', 1),
    new attributeValue(3, '8G', 2),
    new attributeValue(4, '4G', 2),
    new attributeValue(5, '256GB', 3),
    new attributeValue(6, '512GB', 3),
    new attributeValue(7, 'GTX1650', 4),
    new attributeValue(8, 'RTX3050', 4),
    new attributeValue(9, 'Amd Ryzen 7', 1),
    new attributeValue(10, 'RTX3060', 4),
    new attributeValue(11, '16G', 2)
]
localStorage.setItem("AttributeArray", JSON.stringify(AttributeArray))
localStorage.setItem("AttributeValueArray", JSON.stringify(AttributeValueArray))
const attributes = document.getElementById('variantAttribute_name');
var variant_action = "";

function renderAttribute(arr) {
    var str = "";
    arr.forEach(element => {
        str += `<option value="${element.id}">${element.name}</option>`;
    });
    attributes.innerHTML = str;
}

function renderAttributeValue(arr) {
    const attributeValue = document.getElementById('variantAttribute_value');
    const selectedAttribute = document.getElementById('variantAttribute_name').value;
    str = "";
    arr.forEach(element => {
        if (element.attribute_id == selectedAttribute) {
            str += `<option value="${element.id}">${element.name}</option>`;
        }
    });
    attributeValue.innerHTML = str;
}

function clearFormVariant() {
    document.getElementById('variant_id').value = ""
    document.getElementById('variant_name').value = ""
    document.getElementById('variant_price').value = ""
    document.getElementById('variant_quantity').value = ""
    document.getElementById('variant_id_sp').value = ""
    document.querySelector('.variant_messege').innerHTML = "";
    document.querySelector('.variantDetail_messege').innerHTML = "";
    document.querySelector('.variantAttribute_messege').innerHTML = "";
    document.querySelector('.variantAttributeDetail_list').innerHTML = "";
}

function setUpFormVariant() {
    clearFormVariant();
    var AttributeArray = localStorage.getItem("AttributeArray") ? JSON.parse(localStorage.getItem("AttributeArray")) : [];
    var AttributeValueArray = localStorage.getItem("AttributeValueArray") ? JSON.parse(localStorage.getItem("AttributeValueArray")) : [];
    renderAttribute(AttributeArray);
    renderAttributeValue(AttributeValueArray);
    attributes.addEventListener('change', function() {
        renderAttributeValue(AttributeValueArray);
    });
    addVariantAttribute();
}
document.getElementById('variant_add_btn').onclick = () => {
    variant_action = "add"
    document.querySelector('.modal-title-variant').innerHTML = "Thêm biến thể"
    setUpFormVariant();
}

function isExistAttribute(attributeOption) {
    var flag = true;
    document.querySelectorAll('.variantAttribute_item').forEach(element => {
        if (element.firstElementChild.innerHTML.toLowerCase() === attributeOption.trim().toLowerCase()) {
            flag = false;
        }
    });
    return flag;
}

function addVariantAttribute() {
    document.getElementById('addAttribute').onclick = () => {
        const selectedAttribute = document.getElementById('variantAttribute_name');
        const attributeOption = selectedAttribute.selectedOptions[0];
        const selectedValue = document.getElementById('variantAttribute_value');
        const valueOption = selectedValue.selectedOptions[0];
        if (isExistAttribute(attributeOption.textContent)) {
            var str = `
            <tr class="variantAttribute_item">
                <td class="variantAttribute_attribute">${attributeOption.textContent}</td>
                <td class="variantAttribute_value">${valueOption.textContent}</td>
                <td class="variantAttribute_delete"><i class="fa-solid fa-trash product_delete_btn"></i></td>
            </tr>`;
            document.querySelector('.variantAttributeDetail_list').innerHTML += str;
            document.querySelector('.variantDetail_messege').innerHTML = "";
        } else {
            var str = `${attributeOption.textContent} đã tồn tại`;
            document.querySelector('.variantDetail_messege').innerHTML = str;
        }
        deleteVariantAttribute();
    }
}

function deleteVariantAttribute() {
    const variantDetail_delete = document.querySelectorAll('.variantAttribute_delete');
    variantDetail_delete.forEach(element => {
        element.onclick = () => {
            document.querySelector('.variantAttributeDetail_list').removeChild(element.parentElement);
        }
    })
}

const fixVariantBtns = document.querySelectorAll('.variant_update_btn');
fixVariantBtns.forEach(fixVariantBtn => {
    fixVariantBtn.onclick = () => {
        variant_action = "update"
        document.querySelector('.modal-title-variant').innerHTML = "Sửa biến thể";
        setUpFormVariant();
        // dữ liệu cứng để test
        document.getElementById('variant_id').value = "1"
        document.getElementById('variant_name').value = "S092K1"
        document.getElementById('variant_price').value = "1000000"
        document.getElementById('variant_quantity').value = "200"
        document.getElementById('variant_id_sp').value = "3"
        document.querySelector('.variantAttributeDetail_list').innerHTML = `
        <tr class="variantAttribute_item">
            <td class="variantAttribute_attribute">cpu</td>
            <td class="variantAttribute_value">Intel</td>
            <td class="variantAttribute_delete"><i class="fa-solid fa-trash product_delete_btn"></i></td>
        </tr>
        <tr class="variantAttribute_item">
            <td class="variantAttribute_attribute">ram</td>
            <td class="variantAttribute_value">8GB</td>
            <td class="variantAttribute_delete"><i class="fa-solid fa-trash product_delete_btn"></i></td>
        </tr>
        `
            // dữ liệu cứng để test
    }
})

function validateFormVariant() {
    const variant_id = document.getElementById('variant_id').value;
    const variant_name = document.getElementById('variant_name').value;
    const variant_price = document.getElementById('variant_price').value;
    const variant_quantity = document.getElementById('variant_quantity').value;
    const variant_id_sp = document.getElementById('variant_id_sp').value;
    const variant_attribute_count = document.querySelector('.variantAttributeDetail_list').childElementCount;
    var variant_messege = document.querySelector('.variant_messege');
    var variantAttribute_messege = document.querySelector('.variantAttribute_messege');
    if (variant_id.trim() == "") {
        variant_messege.innerHTML = "Mã biến thể đang trống!";
        return false;
    }
    if (variant_name.trim() == "") {
        variant_messege.innerHTML = "Tên biến thể đang trống!";
        return false;
    }
    if (variant_price.trim() == "") {
        variant_messege.innerHTML = "Đơn giá đang trống!";
        return false;
    }
    if (variant_price <= 0) {
        variant_messege.innerHTML = "Đơn giá không hợp lệ!";
        return false;
    }
    if (variant_quantity.trim() == "") {
        variant_messege.innerHTML = "Số lượng đang trống!";
        return false;
    }
    if (variant_quantity <= 0) {
        variant_messege.innerHTML = "Số lượng không hợp lệ!";
        return false;
    }
    if (variant_id_sp.trim() == "") {
        variant_messege.innerHTML = "Mã sản phẩm đang trống!";
        return false;
    }
    if (variant_attribute_count == 0) {
        variantAttribute_messege.innerHTML = "Vui lòng chọn chi tiết biến thể!";
        return false;
    }
    return true;
}
document.querySelector('.variant_form_submit').onsubmit = (e) => {
    e.preventDefault();
    if (validateFormVariant()) {
        switch (variant_action) {
            case 'add':
                document.querySelector(".notification_variant").innerHTML = `
                <div class="alert alert-success alert-dismissible fade in" style='position: absolute;top: 10px;right: 10px;'>
                    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                    <strong>Thành công!</strong> Đã thêm một biến thể mới!
                </div>
                `
                break;
            case 'update':
                document.querySelector(".notification_variant").innerHTML = `
                <div class="alert alert-success alert-dismissible fade in" style='position: absolute;top: 10px;right: 10px;'>
                    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                    <strong>Thành công!</strong> Đã sửa thành công!
                </div>
                `
                break;
        }
        document.getElementById("variant_modal").classList.remove("in")
        document.querySelector('.modal-backdrop').classList.remove("in")
        document.querySelector("body").removeChild(document.querySelector('.modal-backdrop'))
        setTimeout(() => {
            document.getElementById("variant_modal").style.display = "none"
        }, 1000);
    }
}



document.getElementById('variant_delete_confirm_btn').onclick = () => {
    document.querySelector(".notification_variant").innerHTML = `
    <div class="alert alert-success alert-dismissible fade in" style='position: absolute;top: 10px;right: 10px;'>
        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
        <strong>Thành công!</strong> Đã xóa thành công!
    </div>
    `
    document.getElementById("variant_delete_modal").classList.remove("in")
    document.querySelector('.modal-backdrop').classList.remove("in")
    document.querySelector("body").removeChild(document.querySelector('.modal-backdrop'))
    setTimeout(() => {
        document.getElementById("variant_delete_modal").style.display = "none"
    }, 1000);
}


// ======================================= //
// ------- nhóm quyền ----------- //
// ======================================= //
function clearFormPermission() {
    document.getElementById('permission_id').value = "";
    document.getElementById('permission_name').value = "";
    document.querySelector('.permisson-message').innerHTML = "";
    var arr = document.querySelectorAll('.permisson-checkbox');
    arr.forEach(element => {
        if (element.checked) {
            element.checked = false;
        }
    })
}

function validateFormPermission() {
    const permission_id = document.getElementById('permission_id').value;
    const permission_name = document.getElementById('permission_name').value;
    var permisson_message = document.querySelector('.permisson-message');
    if (permission_id.trim() == "") {
        permisson_message.innerHTML = "Mã nhóm quyền đang trống!";
        return false;
    }
    if (permission_name.trim() == "") {
        permisson_message.innerHTML = "Tên nhóm quyền đang trống!";
        return false;
    }
    return true;
}
document.querySelector('.permission_update_btn').onclick = () => {
    clearFormPermission();
    document.querySelector('.modal-title-permission').innerHTML = "Sửa nhóm quyền"
}
document.getElementById('permission_add_btn').onclick = () => {
    clearFormPermission();
    document.querySelector('.modal-title-permission').innerHTML = "Thêm nhóm quyền"
}
document.getElementById("permission_confirm_btn").onclick = (e) => {
    e.preventDefault();
    if (validateFormPermission()) {
        document.querySelector(".notification_permission").innerHTML = `
        <div class="alert alert-success alert-dismissible fade in" style='position: absolute;top: 10px;right: 10px;'>
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
            <strong>Thành công!</strong> Đã thêm thành công một nhóm quyền mới!
        </div>
        `
        document.getElementById("permission_modal").classList.remove("in")
        document.querySelector('.modal-backdrop').classList.remove("in")
        document.querySelector("body").removeChild(document.querySelector('.modal-backdrop'))
        setTimeout(() => {
            document.getElementById("permission_modal").style.display = "none"
        }, 1000);
    }
}

document.getElementById("permission_delete_confirm_btn").onclick = (e) => {
    e.preventDefault();
    document.querySelector(".notification_permission").innerHTML = `
    <div class="alert alert-success alert-dismissible fade in" style='position: absolute;top: 10px;right: 10px;'>
        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
        <strong>Thành công!</strong> Đã xóa thành công!
    </div>
    `
    document.getElementById("permission_delete_modal").classList.remove("in")
    document.querySelector('.modal-backdrop').classList.remove("in")
    document.querySelector("body").removeChild(document.querySelector('.modal-backdrop'))
    setTimeout(() => {
        document.getElementById("permission_delete_modal").style.display = "none"
    }, 1000);
}