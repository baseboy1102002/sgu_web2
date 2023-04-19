
let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
let cart_products = localStorage.getItem("cart_products") ? JSON.parse(localStorage.getItem("cart_products")) : [];


const query = window.location.search;
const urlParams = new URLSearchParams(query);
const productID = urlParams.get("product_id");
let product = products.find(function(item) {
    return item.id == productID;
});

const col1 = document.getElementById("col1");
const col2 = document.getElementById("col2");

function renderProductDetails() {
    col2.setAttribute("data-id", product.id)
    const productImg = col1.querySelector(".product-img")
    const productBanner = col1.querySelector(".banner");
    const productName = document.querySelector(".product-name");
    const productPrice = document.querySelector(".product-price");
    const productDesc = document.querySelector(".product-desc");
    const productQuantity = document.querySelector(".product-quantity");
    productImg.setAttribute("style", `background-image: url(.${product.background_image})`);
    productName.innerText = product.name;
    productPrice.innerText = product.price;
    productDesc.innerText = product.description;
    productQuantity.innerHTML = `<span>Còn lại: </span>${product.quantity}`
    addToCart();
    renderCart();
}

const toHomeBtn = document.querySelector("#toHome")
toHomeBtn.onclick = () => {
    window.location.href = "../index.html"   // trở về tran chính
}

const btnPre = document.querySelector(".btn-pre")
const btnNext = document.querySelector(".btn-next")
const slides = document.querySelector(".slides")

function recommendSlider() {
    const slide = document.querySelectorAll(".slide")
    const length = slide.length // so luong rcm product (8)
    const sub = length - 5 // so luong rcm co dinh tren UI la 5(chua co response)
    const width = 240 // chieu ngang cua mot o rcm product
    let marginLeft = 0
    btnNext.onclick = () => {
        console.log(marginLeft)
        if(marginLeft== -1*sub*width) {
            marginLeft = 0
            slides.style.marginLeft = 0 + "px"
        }
        else {
            marginLeft -= 240
            slides.style.marginLeft = marginLeft + "px"
        }
    }
    btnPre.onclick = () => {
      console.log(marginLeft)
      if(marginLeft== 0) {
          marginLeft = -1*sub*width
          slides.style.marginLeft = -1*sub*width + "px"
      }
      else {
          marginLeft += 240
          slides.style.marginLeft = marginLeft + "px"
      }
    }
}


function renderRecommend(){
    let arr = products.filter((item) => {
        return Math.abs(parseInt(item.price.replace(/[ .đ]/gm,''))-parseInt(product.price.replace(/[ .đ]/gm,'')))<5000000 && item.id!=product.id
    });
    if(arr.length<8){
      arr = arr.concat(products.filter((item)=>{return item.categoryID == product.categoryID && !arr.includes(item.id)}))
    }
    const recommendArr = arr.slice(0, 8); // recommend toi da 8 sp

    let str = ""
    recommendArr.forEach((item) => {
        str += `
        <div class="slide" data-id="${item.id}">
            <div class="rcm-product-img" style="background-image: url(.${item.background_image})"></div>
            <div class="rcm-product-name">${item.name}</div>
            <div class="rcm-product-price">${item.price}</div>
            <div class="rcm-product-detailsBtn"><i class="fa-solid fa-magnifying-glass"></i></div>
        </div>
        `
    });
    slides.innerHTML = str;
    recommendSlider()
}
renderRecommend()

//Gio hang
const toHomeBtn2 = document.querySelector(".cart_nofi")
toHomeBtn2.onclick = () => {
    window.location.href = "../index.html"   // trở về tran chính
}



function addToCart() {
    // id, name, price, quantity ,background_image, categoryID, description
    cart_products = localStorage.getItem("cart_products")
      ? JSON.parse(localStorage.getItem("cart_products"))
      : [];
    const addToCartBtns = document.querySelectorAll(".product-addToCartBtn");
    addToCartBtns.forEach(function (item) {
      item.onclick = function () {
        const productBox = getParentElement(item, "#col2");
        const productID = productBox.getAttribute("data-id");
        const productItem = products.find(function (i) {
          return i.id === productID;
        });
        if (productItem.quantity <= 0) {
          alert("Out of order!");
        } else {
          function product(id, img, name, price, quantity) {
            (this.id = id), (this.img = img);
            this.name = name;
            this.price = price;
            this.quantity = quantity;
            this.totalPrice = this.quantity * this.price;
          }
          const index = cart_products.findIndex(function (i) {
            return i.id === productID;
          }); // return index, if not find return -1.
          if (index !== -1) {
            if (productItem.quantity < cart_products[index].quantity + 1) {
              alert("Out of order!");
            } else {
              cart_products[index].quantity += 1;
              cart_products[index].totalPrice =
                cart_products[index].quantity * cart_products[index].price;
              localStorage.setItem(
                "cart_products",
                JSON.stringify(cart_products)
              );
            }
          } else {
            let cart_item = new product(
              productID,
              productItem.background_image,
              productItem.name,
              parseInt(productItem.price.replace(/[ .đ]/gm, "")),
              1
            );
            cart_products.push(cart_item);
            localStorage.setItem("cart_products", JSON.stringify(cart_products));
          }
          renderCart();
        }
      };
    });
  }

  function getParentElement(element, parent) {
    while (element.parentElement) {
      if (element.parentElement.matches(parent)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }

  function renderCart() {
    cart_products = localStorage.getItem("cart_products")
      ? JSON.parse(localStorage.getItem("cart_products"))
      : [];
    const cart_list = document.querySelector(".cart_list");
    cart_list.innerHTML = "";
    if (cart_products.length !== 0) {
      cart_products.forEach(function (item) {
        const cart_item = document.createElement("div");
        cart_item.classList.add("cart_items");
        cart_item.setAttribute("data-id", `${item.id}`);
        cart_item.innerHTML = `
              <div class="cart_items-img" style="background-image: url(.${item.img})"></div>
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
      });
      document.querySelector(
        ".cart_nofi"
      ).innerHTML = `<div class="cart_confirm-btn">Quay lại trang chủ để thanh toán</div>`;
      deleteProductCart(cart_list);
      decreaseQuantity();
      increaseQuantity();
      //createBuyForm(); // hàm chỉ dc gọi sau khi đã render ra cartbox hoàn chỉnh (có btn để querySelector)
    }
  }

  function deleteProductCart(cartContainer) {
    const deleteBtns = cartContainer.querySelectorAll(".cart_items-deleteBtn");
    deleteBtns.forEach(function (item) {
      item.onclick = function () {
        const cart_item = getParentElement(item, ".cart_items");
        const productID = cart_item.getAttribute("data-id");
        const index = cart_products.findIndex(function (i) {
          return i.id === productID;
        });
        cart_products.splice(index, 1); // at index i, delete 1 element => delete element while change the original array
        localStorage.setItem("cart_products", JSON.stringify(cart_products));
        cartContainer.removeChild(cart_item);
        if (cart_products.length == 0) {
          document.querySelector(".cart_nofi").innerText =
            "Không tìm thấy sản phẩm";
        }
      };
    });
  }

  function decreaseQuantity() {
    const increaseBtns = document.querySelectorAll(".decrease");
    increaseBtns.forEach(function (item) {
      item.onclick = function () {
        const cartItem = getParentElement(item, ".cart_items");
        const productID = cartItem.getAttribute("data-id");
        const index = cart_products.findIndex(function (i) {
          return i.id === productID;
        });
        if (cart_products[index].quantity > 0) {
          cart_products[index].quantity -= 1;
          cart_products[index].totalPrice =
            cart_products[index].quantity * cart_products[index].price;
        } else {
          cart_products[index].quantity = 0;
          cart_products[index].totalPrice =
            cart_products[index].quantity * cart_products[index].price;
        }
        item.parentElement.children[1].innerText = cart_products[index].quantity;
        cartItem.children[1].children[2].innerText =
          cart_products[index].totalPrice + " đ";
        localStorage.setItem("cart_products", JSON.stringify(cart_products));
      };
    });
  }
  
  function increaseQuantity() {
    const decreaseBtns = document.querySelectorAll(".increase");
    decreaseBtns.forEach(function (item) {
      item.onclick = function () {
        const cartItem = getParentElement(item, ".cart_items");
        const productID = cartItem.getAttribute("data-id");
        const index = cart_products.findIndex(function (i) {
          return i.id === productID;
        });
        const productQuantity = products.find(function (i) {
          return i.id === productID;
        }).quantity;
        if (cart_products[index].quantity + 1 > productQuantity) {
          alert("Out of order!");
        } else {
          cart_products[index].quantity += 1;
          cart_products[index].totalPrice =
            cart_products[index].quantity * cart_products[index].price;
          item.parentElement.children[1].innerText =
            cart_products[index].quantity;
          cartItem.children[1].children[2].innerText =
            cart_products[index].totalPrice + " đ";
          localStorage.setItem("cart_products", JSON.stringify(cart_products));
        }
      };
    });
  }

  // ------------------- CART BOX ---------------------

const cartBtn = document.querySelector("#cart");
const cartBox = document.querySelector(".cart_box");
cartBtn.onclick = function () {
  cartBox.classList.toggle("cart_box-hide");
}


// Click chi tiet san pham o phan recommend //

const rcm_btns = document.querySelectorAll(".rcm-product-detailsBtn")
rcm_btns.forEach((item)=>{
  item.onclick=()=>{
    const productId = getParentElement(item, ".slide").getAttribute("data-id")
    window.location.href = `./product_details.html?product_id=${productId}`;
  }
})
