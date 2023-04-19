window.addEventListener("DOMContentLoaded", function(){
    scrolltoTop()
})

window.addEventListener("scroll", function(){
    let Y = this.scrollY
    if(Y<1000) document.querySelector("#scroll_top_btn").style.display = "none"
    else document.querySelector("#scroll_top_btn").style.display = "unset"
})

function scrolltoTop(){
    const scrolltoTopBtn = document.querySelector("#scroll_top_btn")
    scrolltoTopBtn.onclick=()=>{
        window.scrollTo({top: 0, behavior: 'smooth'})
    }
}