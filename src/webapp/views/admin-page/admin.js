let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
let userAccounts = localStorage.getItem("userAccounts") ? JSON.parse(localStorage.getItem("userAccounts")) : [];
let orderNoteList = localStorage.getItem("orderNoteList") ? JSON.parse(localStorage.getItem("orderNoteList")) : [];
let categories = localStorage.getItem("categories") ? JSON.parse(localStorage.getItem("categories")) : [];
let cart_products = localStorage.getItem("cart_products") ? JSON.parse(localStorage.getItem("cart_products")) : []

function getParentElement(element, parent) {
    while(element.parentElement) {
        if(element.parentElement.matches(parent)) {
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
});


// ============================================ //
// ---------------- SIDEBAR ------------------- //
// =========================================== //

const sideBarMenuItems = document.querySelectorAll(".sidebar_menu-items")
const tabs = document.querySelectorAll(".tabs")
sideBarMenuItems.forEach((item) => {
    item.onclick = () => {
        const id = item.classList[1]
        if(id == "account" && !checkQuyenAdminTong()){
            alert("Chỉ có người quản trị cao nhất mới có thể sử dụng chức năng này!")
            return
        }
        else{
            document.querySelector(".menu_active").classList.remove("menu_active")
            tabs.forEach((i) => {
                i.classList.add("tab_hide")
                if(i.classList.contains(id)) {
                    i.classList.remove("tab_hide")
                }
            })
            item.classList.add("menu_active")
        }
    }
})

function checkQuyenAdminTong(){
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
        const orderDivOverview = document.createElement("div")
        const orderDivDetail = document.createElement("div")
        orderDivOverview.classList.add("orderNote_overView")
        if(tt === "Chưa xử lý") orderDivOverview.classList.add("background_red")
        else orderDivOverview.classList.add("background_blue")
        orderDivOverview.setAttribute("data-id", item.orderNoteID)
        orderDivDetail.classList.add("orderNote_details", "orderNote_details-hide");
        orderDivOverview.innerHTML = `
            <div class="orderNote_list_items">${item.orderNoteID}</div>
            <div class="orderNote_list_items">${new Date(item.date).toLocaleString()}</div>
            <div class="orderNote_list_items">
                ${tt}
            </div>
            <div class="orderNote_list_items">${item.totalPrice} đ</div>
            <div class="orderNote_list_items orderNote_viewDetails">Chi tiết</div>
        ` 
        let str = ""
        let str1  = `
                <div class="orderNote_customerInfo">
                    <div>Tên khách hàng: ${item.customerName}</div>
                    <div>Địa chỉ: ${item.address}</div>
                    <div>Số điện thoại: ${item.phoneNumber}</div>
                    <label for="status_selection">Tình trạng đơn hàng</label>
                    <select class="orderNote_selection" id="status_selection">
                        <option value="${item.status==0? 0:1}" selected>${tt}</option>
                        <option value="${item.status==0? 1:0}">${tt2}</option>
                    </select>
                </div>
            `
        item.buyItems.forEach((i) => {
            str += `
                <div class="orderNote_products">
                    <div class="orderNote_product_img" style="background-image: url(.${i.img})"></div>
                    <div class="orderNote_product_title">
                        <div class="orderNote_products_id">Mã sp: ${i.id}</div>
                        <div class="orderNote_products_name">${i.name}</div>
                    </div>
                    <div class="orderNote_products_price">Đơn giá: <span style="color: var(--theme-color)">${i.price} đ</span></div>
                    <div class="orderNote_products_quantity">SL: ${i.quantity}</div>
                </div>
                `
        })
        str1 += str
        orderDivDetail.innerHTML = str1
        orderNoteListContent.append(orderDivOverview, orderDivDetail)
    });
    changeOrderNoteStatus()
    orderNoteListContent.querySelectorAll(".orderNote_viewDetails").forEach((item) => {
        const orderNoteDetail = getParentElement(item, ".orderNote_overView").nextElementSibling;
        item.onclick = () => {
            if(orderNoteDetail.classList.contains("orderNote_details-hide")) {
                item.innerHTML = "Ẩn bớt"
            }
            else {
                item.innerHTML = "Chi tiết"
            }
            orderNoteDetail.classList.toggle("orderNote_details-hide")
        }
    })
}


function changeOrderNoteStatus() {
    const orderNoteSelects = document.querySelectorAll(".orderNote_selection")
    orderNoteSelects.forEach((item) => {
        item.onchange = function() {
            const tt = parseInt(item.value)
            const orderNoteoverView = getParentElement(item, ".orderNote_details").previousElementSibling
            if(tt === 0) {
                orderNoteoverView.classList.remove("background_blue")
                orderNoteoverView.classList.add("background_red")
                orderNoteoverView.children[2].innerText="Chưa xử lý"
            }
            else {
                orderNoteoverView.classList.remove("background_red")
                orderNoteoverView.classList.add("background_blue")
                orderNoteoverView.children[2].innerText="Đã xử lý"
            }
            const index = orderNoteList.findIndex((i) => {return i.orderNoteID == orderNoteoverView.getAttribute("data-id")})
            if(index !== -1) orderNoteList[index].status = tt
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

orderNoteFilterBtn.onclick=()=>{
    // if(dateFrom.value=="" || dateTo.value==""){
    //     alert("Vui lòng chọn khoảng thời gian!")
    //     return
    // }
    let from = new Date(dateFrom.value)
    from.setHours(0,0,1)
    let to = new Date(dateTo.value)
    to.setHours(23,59,59)
    const orderNotesByFilter = orderNoteList.filter((item)=>{
        const date = new Date(item.date)
        from = (dateFrom.value=="") ? date : from
        to = (dateTo.value=="") ? date : to
        return from<=date && date<=to
    })
    renderOrderNotes(orderNotesByFilter)
}

orderNoteAllBtn.onclick=()=>{
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
            <div class="category_list_content" data-cateID="${item.categoryID}">
                <div class="category_list_items">${item.categoryID}</div>
                <div class="category_list_items">${item.categoryName}</div>
                <div class="category_list_items">
                    <i class="fa-solid fa-trash category_delelte_btn"></i>
                    <i class="fa-solid fa-pen-to-square category_update_btn"></i>
                </div>
            </div>
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
    categoryModal.classList.remove("category_modal_hide")
    document.querySelector("#category_id").value=autoGenerateCategoryId()
    document.querySelector("#category_name").value=""
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
    if(categoryId === "" || categoryName === "") {
        document.querySelector(".messege").innerText = "Không được để trống"
    }
    if(categories.some((item)=>{return item.categoryName==categoryName})){
        document.querySelector(".messege").innerText = "Tên danh mục bị trùng"
        return
    }
    else {
        switch (category_form_action) {
            case "add":
                let categoryItem = {
                    categoryID : categoryId,
                    categoryName : categoryName
                }
                categories.unshift(categoryItem)
                localStorage.setItem("categories", JSON.stringify(categories))
                alert("Thêm danh mục mới thành công!")
                setTimeout(() => {
                    categoryModal.classList.add("category_modal_hide")
                }, 1000);
                break;
            case "update":
                const index = categories.findIndex((item)=>{return item.categoryID == categoryId})
                categories[index].categoryName = categoryName
                localStorage.setItem("categories". JSON.stringify(categories))
                alert("Cập nhật danh mục thành công!")
                setTimeout(() => {
                    categoryModal.classList.add("category_modal_hide")
                }, 1000);
                break;
            default:
                flag = false
                break;
        }
        if(flag){
            renderCategories()
            renderProductCategory(productCategory)
            renderProductCategory(productFilterSelection)
            renderReportFilter()
        }
    }
}

// ------------- xóa danh mục ------------------- //
function checkDeleteCategory(categoryId){
    return products.some((item)=>{return item.categoryID == categoryId})
}

function deleteCategory() {
    const categoryDeleteBtns = document.querySelectorAll(".category_delelte_btn")
    categoryDeleteBtns.forEach((item) => {
        item.onclick = () => {
            const categoryId = getParentElement(item, ".category_list_content").children[0].innerText
            if(confirm("Bạn có chắc muốn xóa category này?") == true) {
                if(!checkDeleteCategory(categoryId)){
                    const index = categories.findIndex((item)=>{return item.categoryID == categoryId})
                    const deletedCate = categories.splice(index, 1)
                    localStorage.setItem("categories", JSON.stringify(categories))
                    if(deletedCate!=null) alert("Xóa danh mục thành công!")
                    renderCategories()
                    renderProductCategory(productCategory)
                    renderProductCategory(productFilterSelection)
                } else{
                    alert("Không thể xóa một danh mục vẫn tồn tại sản phẩm hiện hành!")
                }
            }
        }
    })
}

// --------------- update danh mục --------------- //
function updateCategory(){
    const categoryUpdateBtns = document.querySelectorAll(".category_update_btn")
    categoryUpdateBtns.forEach((item) => {
        item.onclick = () => {
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
    categories.forEach((item)=>{
        checkId = ""
        checkId += num
        if(categoryIdArr.includes(checkId)) num++
    })
    cateId += num
    return cateId
}

function renderCategoryForm(categoryId){
    const category = categories.find((item)=>{return item.categoryID == categoryId})
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
            <div class="product_list_content" data-id="${item.id}">
                <div class="product_list_items">
                    <div class="product_bgImg" style="background-image: url(.${item.background_image})"></div>
                </div>
                <div class="product_list_items product_name">${item.name}</div>
                <div class="product_list_items"><span style="color:var(--theme-color)">${item.price}</span></div>
                <div class="product_list_items">${item.quantity}</div>
                <div class="product_list_items">
                    <i class="fa-solid fa-trash product_delete_btn"></i>
                    <i class="fa-solid fa-pen-to-square product_update_btn"></i>
                </div>
            </div>
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
const productPrice = document.querySelector("#product_price")
const productQuantity = document.querySelector("#product_quantity")
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
    product_form_action = "add"
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
    let img=""
    let regex=/[!@#$%^&*,.?":{}|<>]/gm
    e.preventDefault()
    if(regex.test(productName.value)){
        alert("Tên sản phẩm không chứa ký tự đặc biệt!")
        return
    }
    if(productPrice.value<0){
        alert("Giá sản phẩm phải >=0")
        return
    }
    if(productQuantity.value<=0){
        alert("Số lượng sản phẩm không hợp lệ")
        return
    }
    if(productCategory.value == "0"){
        alert("Vui lòng chọn danh mục cho sản phẩm")
        return
    }
    if(productFile.value != "") {
        let fileName = productFile.files[0].name
        idxDot = fileName.lastIndexOf(".") + 1,
        extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
            img = `./assets/products_img/${fileName}`
        } 
        else{
            alert("Chỉ được up file định dạng jpg/jpeg/png");
            file.value = "";  // Reset the input so no files are uploaded
            return
        }
    }
    else {
        img = "./assets/products_img/default.jpg"
    }
    switch (product_form_action) {
        case "add":
            if(products.some((item)=>{return item.name == productName.value})) {
                alert("Tên sản phẩm không được trùng (đã tồn tại)")
                return
            }
            product = {
                id : autoGenerateProductId(),
                name : productName.value,
                price : productPrice.value + " đ",
                quantity : productQuantity.value,
                background_image : img,
                categoryID : productCategory.value,
                description : productDesc.value,
            }
            products.unshift(product)
            localStorage.setItem("products", JSON.stringify(products))
            renderProducts(products)
            alert("Tạo sản phẩm mới thành công!")
            setTimeout(() => {
                productModal.classList.add("product_modal_hide")
                clearProductForm();
            }, 1000);
            break;
        case "update":
            const index = products.findIndex((item)=>{return item.id == document.querySelector("#product_id").innerText})
            products[index].name = productName.value
            products[index].quantity = productQuantity.value
            products[index].price = productPrice.value
            products[index].description = productDesc.value
            products[index].categoryID = productCategory.value
            if(`url(.${products[index].background_image})` != document.querySelector(".img_review").style.backgroundImage){
                products[index].background_image = productFile.value != "" ?
                    `./assets/products_img/${productFile.files[0].name}` : "./assets/products_img/default.jpg"
            }
            localStorage.setItem("products", JSON.stringify(products))
            renderProducts(products)
            alert("Cập nhật sản phẩm thành công!")
            setTimeout(() => {
                productModal.classList.add("product_modal_hide")
                clearProductForm();
            }, 1000);
            break;
        default:
            break;
    }
}

function renderProductCategory(element) {
    let str = element==productCategory? "<option value='0'>Chọn danh mục</option>" : "<option value='0'>Tất cả</option>"
    categories.forEach((item) => {
        str += `
            <option value="${item.categoryID}">${item.categoryName}</option>
        `
    })
    element.innerHTML = str;
}

function clearProductForm(){
    productFile.value = null
    document.querySelector(".img_review").removeAttribute("style")
    productName.value = ""
    productPrice.value = null
    productCategory.value = "0"
    productQuantity.value = null
    productDesc.value = ""
}

function renderProductForm(productId){
    let product = products.find((item)=>{return item.id == productId})
    productName.value = product.name
    productPrice.value = parseInt(product.price.replace(/[ .đ]/gm,''))
    productQuantity.value = product.quantity
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
    products.forEach((item)=>{
        checkId = ""
        checkId += num
        if(productIdArr.includes(checkId)) num++
    })
    productId += num
    return productId
}

// --------- delete product ---------- //

function checkDeleteProduct(productID){
    const flag1 =  cart_products.some((item)=>{return item.id == productID})
    let flag2 = false
    orderNoteList.forEach((item)=>{
        if (item.buyItems.some((i)=>{return i.id == productID && item.status===0})){
            flag2 = true
        }
    })
    const checkResult = (flag1 || flag2)
    return checkResult
}

function deleteProduct(){
    const deleteBtns = document.querySelectorAll(".product_delete_btn")
    deleteBtns.forEach((item)=> {
        item.onclick = () => {
            const productID = getParentElement(item, ".product_list_content").getAttribute("data-id")
            if(confirm("Bạn có chắc muốn xóa sản phẩm này?")==true){
                if(checkDeleteProduct(productID)){
                    alert("Không thể xóa sản phẩm đang nằm trong một giỏ hàng/hóa đơn chưa xử lý!")
                } else{
                    const deletedProduct = products.splice(products.findIndex(function(i) {return i.id === productID}),1)
                    localStorage.setItem("products", JSON.stringify(products))
                    renderProducts(products)
                    if(deletedProduct!=null) alert("Xóa sản phẩm thành công!")
                }
            }
        }
    })
}


// ------------ update product --------------- //
function updateProduct() {
    const updateBtns = document.querySelectorAll(".product_update_btn")
    updateBtns.forEach((item)=>{
        item.onclick=()=>{
            product_form_action = "update"
            const productId = getParentElement(item, ".product_list_content").getAttribute("data-id")
            productModal.classList.remove("product_modal_hide")
            document.querySelector("#product_id").innerText = productId
            renderProductForm(productId)
        }
    })
}

// -------------- search ----------------- //
function searchProduct(ProductList){
    const searchBtn = document.querySelector("#product_search_btn")
    searchBtn.onclick=()=>{
        const searchValue = document.querySelector("#product_search_input").value.toLowerCase()
        if(productFilterSelection.value == 0){
            const result = ProductList.filter((item)=>{return item.name.toLowerCase().includes(searchValue)})
            renderProducts(result)
        }
        else {
            const result = ProductList.filter((item)=>{return item.name.toLowerCase().includes(searchValue)
                && item.categoryID == productFilterSelection.value})
            renderProducts(result)
        }
    }
}

// ----------- product flter -------------- //
const productFilterSelection = document.querySelector(".product_filter_category")
productFilterSelection.onchange = ()=>{
    ProdcutFilter(productFilterSelection.value)
    document.querySelector("#product_search_input").value = ""
}

function ProdcutFilter(categoryId){
    if(categoryId == 0){
        renderProducts(products)
        searchProduct(products)
        return
    }
    else{
        const result = products.filter((item)=>{return item.categoryID == categoryId})
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
        if(item.username == "admin") return
         // kiểm tra admin gốc=>không cho chỉnh sửa account nay
        str += `
            <div class="account_list_content" data-id="${item.username}">
                <div class="account_list_items">${item.username}</div>
                <div class="account_list_items">${item.type == 1 ? "Quản trị":"Khách hàng"}</div>
                <div class="account_list_items accountInfo_detail"><span>Xem chi tiết</span></div>
                <div class="account_list_items">
                    <i class="fa-solid fa-trash account_delete_btn"></i>
                    <i class="fa-solid fa-pen-to-square account_update_btn"></i>
                </div>
            </div>
        `
    })
    accList.innerHTML = str;
    deleteAccount()
    updateAccount()
}

function deleteAccount(){
    const deleteBtns = document.querySelectorAll(".account_delete_btn")
    deleteBtns.forEach((item)=>{
        item.onclick = ()=>{
            if(confirm("Bạn có chắc muốn xóa tài khoản này?")==true){
                const accId = getParentElement(item, ".account_list_content").getAttribute("data-id")
                const deletedAccount = userAccounts.splice(userAccounts.findIndex(function(i) {return i.username === accId}),1)
                localStorage.setItem("userAccounts", JSON.stringify(userAccounts))
                renderAccount()
                if(deletedAccount!=null) alert("Xóa tài khoản thành công!")
            }
        }
    })
}
function updateAccount(){
    const updateBtns = document.querySelectorAll(".account_update_btn")
    updateBtns.forEach((item)=>{
        item.onclick=()=>{
            accountFormAction = "update"
            const accId = getParentElement(item, ".account_list_content").getAttribute("data-id")
            userName.value = accId
            userName.readOnly = true
            createAccountForm(accId)
            accountModal.classList.remove("account_modal_hide")
        }
    })
}

accountAddBtn.onclick=()=>{
    accountModal.classList.remove("account_modal_hide")
    accountFormAction = "add"
}
accountCancelBtn.onclick=(e)=>{
    e.preventDefault()
    accountModal.classList.add("account_modal_hide")
    clearAccountForm()
}

function clearAccountForm(){
    userName.value=""
    userName.readOnly = false
    Email.value=""
    Pass.value=""
    accountType.value=0
}

function createAccountForm(accId){
    const acc = userAccounts.find((item)=>{return item.username == accId})
    Email.value = acc.email
    Pass.value = acc.password
    accountType.value = acc.type
}

function checkExitsAccId(accId){
    return userAccounts.some((item)=>{return item.username == accId})
}

accountForm.onsubmit=(e)=>{
    e.preventDefault()
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(!regex.test(Email.value)){
        alert("Vui lòng nhập đúng định dạng email!")
        return
    }
    if(Pass.value.length<6){
        alert("Mật khẩu có độ dài từ 6 ký tự trở lên!")
        return
    }
    switch (accountFormAction) {
        case "add":
            if(checkExitsAccId(userName.value)){
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
            alert("Thêm tài khoản mới thành công!")
            setTimeout(() => {
                accountModal.classList.add("account_modal_hide")
                clearAccountForm()
            }, 1000);
            break;
        case "update":
            const index = userAccounts.findIndex((item)=>{return item.username == userName.value})
            userAccounts[index].email = Email.value
            userAccounts[index].password = Pass.value
            userAccounts[index].type = accountType.value
            localStorage.setItem("userAccounts", JSON.stringify(userAccounts))
            renderAccount()
            alert("Cập nhật tài khoản thành công!")
            setTimeout(() => {
                accountModal.classList.add("account_modal_hide")
                clearAccountForm()
            }, 1000);
            break;
        default:
            break;
    }
}

// ======================================= //
// ----------- THỐNG KÊ BÁO BÁO ---------- //
// ======================================= //

// ---------- tính tổng doanh thu ----------- //
function caclTotalIncome(arr){
    let totalSaleQuantity = arr.reduce((totalVal, curVal)=>{return totalVal + (curVal.saleQuantity)},0)
    let income = arr.reduce((totalVal, currVal)=>{return totalVal + (currVal.saleQuantity*parseInt(currVal.unitPrice.replace(/[ .đ]/gm,'')))},0)
    document.querySelector("#report_total_quantity").innerHTML = `Tổng số lượng đã bán: ${totalSaleQuantity}`
    document.querySelector("#report_total_income").innerHTML = `Tổng doanh thu: <span style="color:red;">${income} đ</span>`
}

function chechOrderNoteStatus(orderNote){
    return orderNote.status===1
}

// {id sp, sl, date}
function getDSBillProduct(){
    const arr = orderNoteList.map((item)=>{
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

function tinhHinhKinhDoanhSanPham(categoryId){
    const arr = getDSBillProduct()
    let tinhHinhKinhDoanhSp = []
    const map = new Map();
    let date_from = new Date(document.querySelector("#report_date_from").value)
    date_from.setHours(0,0,1)
    let date_to = new Date(document.querySelector("#report_date_to").value)
    date_to.setHours(23,59,59)
    products.forEach((item)=>{
        if(categoryId != null && categoryId != item.categoryID) return
        let flag = false
        for (const buyInfo of arr) {
            date_from = (document.querySelector("#report_date_from").value=="") ? buyInfo.date : date_from
            date_to = (document.querySelector("#report_date_to").value=="") ? buyInfo.date : date_to
            if(item.id == buyInfo.id && buyInfo.date>=date_from && buyInfo.date<=date_to){
                flag = true
                if(map.has(item.id)){
                    let thongke1SP = map.get(item.id)
                    thongke1SP.saleQuantity += buyInfo.quantity
                    map.set(item.id, thongke1SP)
                }
                else{
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
        if(flag == false){
            map.set(item.id, {
                id: item.id,
                name: item.name,
                img: item.background_image,
                saleQuantity: 0,
                unitPrice: item.price,
            })
        }
    })
    map.forEach((value)=>{tinhHinhKinhDoanhSp.push(value)})
    return tinhHinhKinhDoanhSp
}

// ----------- render giao diện thống kê ---------------- //
function renderReport(arrThongKe){
    const reportList = document.querySelector(".report_list")
    reportList.innerHTML = ""
    let str = ""
    arrThongKe.forEach((item) => {
        str += `
            <div class="report_list_content" data-reportProductId="${item.id}">
                <div class="report_list_items">
                    <div class="product_bgImg" style="background-image: url(.${item.img})"></div>
                </div>
                <div class="report_list_items product_name">${item.name}</div>
                <div class="report_list_items">${item.saleQuantity}</div>
                <div class="report_list_items" style="color: red;">${parseInt(item.unitPrice.replace(/[ .đ]/gm,''))*item.saleQuantity} đ</div>
            </div>
        `
    })
    reportList.innerHTML = str
}

function renderReportFilter(){
    let str = "<option value='0'>Tất cả</option>"
    categories.forEach((item)=>{
        str += `
            <option value="${item.categoryID}">${item.categoryName}</option>
        `
    })
    document.querySelector("#report_filter_category").innerHTML = str
}

function filterReport(){
    const filterBtn = document.querySelector("#report_filter_btn")
    filterBtn.onclick = ()=>{
        const categoryId = document.querySelector("#report_filter_category").value
        const arrThongKe = tinhHinhKinhDoanhSanPham(categoryId==0? null:categoryId)
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