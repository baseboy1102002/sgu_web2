const line = document.querySelector('.line')
const desc = document.querySelector('.desc')
const activeTab = document.querySelector('.active')
const inputForms = document.querySelectorAll(".form-input")

$(document).ready(function () {
    
    desc.innerHTML = "Chào mừng bạn đến với shop!";
    desc.style.color = "var(--text-color)";
    line.style.height = activeTab.offsetHeight + "px"
    line.style.width = activeTab.offsetWidth + "px"
    line.style.left = (activeTab.offsetLeft + 20) + 'px'
    line.style.top = '20px'   // padding of element

    inputForms.forEach(function(item) {
        item.addEventListener("focus", function() {
            item.classList.add("form-input-active");
        })
        item.addEventListener("blur", function() {
            item.classList.remove("form-input-active");
        })
    })
});

function getParentElement(element, parent) {
    while(element.parentElement) {
        if(element.parentElement.matches(parent)) {
            return element.parentElement;
        }
        element = element.parentElement;
    }
}

// reset error valid trước đó
function resetInValidInputs() {
    inputForms.forEach((item) => {
        item.classList.remove("invalid");
        item.value = ""
        getParentElement(item, ".form-group").querySelector(".form-messege").innerText = "";
    });
}


$("#form-1, #form-2").submit(function (e) { 
    e.preventDefault()
    const check1 = usernameValid()
    const check2 = emailValid()
    const check3 = passwordValid()
    const check4 = confirmPassWordValid()
    const checkLogin1 = usernameLoginValid()
    const checkLogin2 = PasswordLoginValid()

    if($("#sign-up").hasClass("active")) {
        const username = $("#username").val();
        if(check1&&check2&&check3&&check4&&!isExistUsername(username)) {
            e.preventDefault()
            let data = {}
            let formData = $("#form-1").serializeArray()
            $.each(formData, function (i, e) { 
                data[""+e.name+""] = e.value
            });
            data["id_nhom_quyen"] = 1
            data["status"] = 1
            $.ajax({
                type: "POST",
                url: "../../../main/controller/api/accountAPI.php?action=signup",
                contentType: "application/json",
                data: JSON.stringify(data),
                dataType: "json",
                success: function (response) {
                    toast({
                        title: "Thành công!",
                        message: "Đăng ký tài khoản thành công",
                        type: "success",
                        duration: 4000
                    });
                    $("#log-in").click()
                },
                error: function(jqXHR, exception) {
                    toast({
                        title: "Thất bại!",
                        message: "Đã có lỗi xảy ra ("+ exception +")",
                        type: "error",
                        duration: 4000
                    });
                }
            });
        } else
            e.preventDefault()
    } else {
        // login
        if(checkLogin1&&checkLogin2) {
            e.preventDefault()
            let data = {}
            let formData = $("#form-2").serializeArray()
            $.each(formData, function (i, e) { 
                data[""+e.name+""] = e.value;
            });
            $.ajax({
                type: "POST",
                url: "../../../main/controller/api/accountAPI.php?action=login",
                contentType: 'application/json',
                data: JSON.stringify(data),
                dataType: "json",
                success: function (response) {
                    window.location.replace("../user-page/index.php")
                },
                error: function(jqXHR, exception) {
                    toast({
                        title: "Thất bại!",
                        message: "Sai tên đăng nhập hoặc mặt khẩu",
                        type: "error",
                        duration: 4000
                    });
                }
            });
        } else
            e.preventDefault()
    }
});

function isExistUsername(username){
    return $.ajax({
        type: "GET",
        url: `../../../main/controller/api/accountAPI.php?action=check`,
        data: `username=${username}`,
        async:false,
        dataType: "json",
        success: function (response) {
            toast({
                title: "Thất bại!",
                message: "Tài khoản đã tồn tại",
                type: "error",
                duration: 4000
            });
        }
    }).responseText;
}


$("#sign-up").click(function () { 
    $("#form-1").removeClass("hide_form");
    $("#form-2").addClass("hide_form");
    desc.innerText = 'Chào mừng đến với shop!'
    desc.style.color = "var(--text-color)";
    line.style.width = this.offsetWidth + "px"
    line.style.left = (this.offsetLeft + 20) + 'px'
    line.style.height = activeTab.offsetHeight + "px"
    line.style.top = '20px'
    $(".active").removeClass("active");
    $(this).addClass("active");
    resetInValidInputs()
});


$("#log-in").click(function () { 
    $("#form-1").addClass("hide_form");
    $("#form-2").removeClass("hide_form");
    desc.innerText = 'Mừng bạn quay lại!'
    desc.style.color = "var(--text-color)";
    line.style.width = this.offsetWidth + "px"
    line.style.left = (this.offsetLeft + 20) + 'px'
    line.style.height = activeTab.offsetHeight + "px"
    line.style.top = '20px'
    $(".active").removeClass("active");
    $(this).addClass("active");
    resetInValidInputs()
});


const username = document.querySelector("#username")
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const confirmPass = document.querySelector("#confirm-password")
const username_login = document.querySelector("#username-login")
const username_pass = document.querySelector("#password-login")

username.addEventListener("blur", usernameValid)
email.addEventListener("blur", emailValid)
password.addEventListener("blur", passwordValid)
confirmPass.addEventListener("blur", confirmPassWordValid)

function usernameValid() {
    let value = username.value;
    let messege = value ? true : false;
    const form_group = getParentElement(username, ".form-group");
    const errorSpan = form_group.querySelector(".form-messege");
    if (!messege) {
        username.classList.add("invalid");
        errorSpan.innerText = "Vui lòng không để trống";
        return false;
    }
    else {
        username.classList.remove("invalid");
        errorSpan.innerText = "";
        return true;
    }
}

function usernameLoginValid() {
    let value = username_login.value;
    let messege = value ? true : false;
    const form_group = getParentElement(username_login, ".form-group");
    const errorSpan = form_group.querySelector(".form-messege");
    if (!messege) {
        username_login.classList.add("invalid");
        errorSpan.innerText = "Vui lòng không để trống";
        return false;
    }
    else {
        username_login.classList.remove("invalid");
        errorSpan.innerText = "";
        return true;
    }
}

function PasswordLoginValid() {
    let value = username_pass.value;
    let messege = value ? true : false;
    const form_group = getParentElement(username_pass, ".form-group");
    const errorSpan = form_group.querySelector(".form-messege");
    if (!messege) {
        username_pass.classList.add("invalid");
        errorSpan.innerText = "Vui lòng không để trống";
        return false;
    }
    else {
        username_pass.classList.remove("invalid");
        errorSpan.innerText = "";
        return true;
    }
}

function emailValid() {
    let value = email.value;
    let messege1 = value ? true : false;
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let messege2 = regex.test(value);
    const form_group = getParentElement(email, ".form-group");
    const errorSpan = form_group.querySelector(".form-messege");
    if(!messege1) {
        email.classList.add("invalid");
        errorSpan.innerText = "Vui lòng không để trống";
        return false;
    } 
    else if(!messege2) {
        email.classList.add("invalid");
        errorSpan.innerText = "Vui lòng nhập đúng định dạng email";
        return false;
    }
    else {
        email.classList.remove("invalid");
        errorSpan.innerText = "";
        return true;
    }
}

function passwordValid() {
    let value = password.value;
    let messege1 = value ? true : false;
    let messege2 = value.length<6 ? false : true;
    const form_group = getParentElement(password, ".form-group");
    const errorSpan = form_group.querySelector(".form-messege");
    if(!messege1) {
        password.classList.add("invalid");
        errorSpan.innerText = "Vui lòng không để trống";
        return false;
    } 
    else if(!messege2) {
        password.classList.add("invalid");
        errorSpan.innerText = "Độ dài mật khẩu tối thiểu là 6 ký tự!";
        return false;
    } 
    else {
        password.classList.remove("invalid");
        errorSpan.innerText = "";
        return true;
    }
}

function confirmPassWordValid() {
    let value = confirmPass.value;
    let messege1 = value ? true : false;
    let messege2 = value === password.value ? true : false;
    const form_group = getParentElement(confirmPass, ".form-group");
    const errorSpan = form_group.querySelector(".form-messege");
    if(!messege1) {
        confirmPass.classList.add("invalid");
        errorSpan.innerText = "Vui lòng không để trống";
        return false;
    } 
    else if(!messege2) {
        confirmPass.classList.add("invalid");
        errorSpan.innerText = "Mật khẩu nhập lại không trùng khớp!";
        return false;
    } 
    else {
        confirmPass.classList.remove("invalid");
        errorSpan.innerText = "";
        return true;
    }
}