var slideIndex = 1;
let dots = document.querySelectorAll(".dot");
showDivs2(slideIndex);

function plusDivs(n) {
    showDivs2(slideIndex+=n);
}

function showDivs2(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length || slideIndex>x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  for (let index = 0; index < dots.length; index++) {
    dots[index].classList.remove("dot-active")
    
  }
  dots[slideIndex-1].classList.add("dot-active")
  x[slideIndex-1].style.display = "block";
}