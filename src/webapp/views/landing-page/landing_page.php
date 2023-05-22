<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Landing page</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../style/base.css">
  <link rel="stylesheet" href="./landing_page_style.css" />
  <link rel="stylesheet" href="../components/header/header.css">
  <link rel="stylesheet" href="../style/responsive.css">
  <link rel="stylesheet" href="../components/footer/footer.css">
</head>

<body>
  <div class="wrapper">
    <header class="header">

      <?php 
        include '../components/header/header.php'
      ?>

      <div class="header-main">
        <div class="header-items">

          <div class="header-title">
            <span style="color: rgb(255, 255, 255); font-size: x-large; text-align: center;">
              <h1 class="header-title-big">Laptop shop</h1>
            </span>
            <span style="color:rgb(255, 255, 255); font-size: large; text-align: center;">
              <h2 class="header-title-medium">Your laptop, your future</h2>
            </span>
            <img src="../../assets/landing_page_img/header-line.png" alt="">
          </div>

          <div class="header-title-bottom">
            <img class="header-title-bottom-img" src="../../assets/landing_page_img/vanchuyen.png" alt="">
            <p class="header-title-bottom-text">Miễn phí vận chuyển</p>
            <img class="header-title-bottom-img" src="../../assets/landing_page_img/chinhhang.png" alt="">
            <p class="header-title-bottom-text">Hàng chính hãng</p>
            <img class="header-title-bottom-img" src="../../assets/landing_page_img/trahang.png" alt="">
            <p class="header-title-bottom-text">Trả hàng trong 30 ngày</p>
          </div>
          

          <img src="../../assets/landing_page_img/hi.jpg" alt="">
        </div>
      </div>
    </header>


    <main>
      <div class="main-container">
        
        <div class="main-item">
          <div class="main-item-container">

            <div class="main-item-left">
              <img class="main-img-big" src="../../assets/landing_page_img/banner9.jpg" alt="">
            </div>

            <div class="main-item-right">
              <img class="main-img-small" src="../../assets/landing_page_img/banner2.png" alt="">
              <img class="main-img-small" src="../../assets/landing_page_img/banner3.jpg" alt="">
            </div>
            
          </div>
        </div>

        <div class="main-item">
          <img class="main-img-medium" src="../../assets/landing_page_img/banner4.png">
          <img class="main-img-medium" src="../../assets/landing_page_img/banner6.jpeg">
        </div>
        
        <div class="main-item">
          <img class="main-img-big" src="../../assets/landing_page_img/banner7.jpg" alt="">
        </div>

        <div class="main-item">
          <img class="main-img-big" src="../../assets/landing_page_img/banner12.jpg" alt="">
        </div>

        <div class="main-item">
          <img class="main-img-medium" src="../../assets/landing_page_img/banner8.jpg" alt="">
          <img class="main-img-medium" src="../../assets/landing_page_img/banner10.jpg" alt="">
        </div>

        <div class="main-item">
          <img class="main-img-big" src="../../assets/landing_page_img/banner12.jpg" alt="">
        </div>

        <div class="main-item">
          <img class="main-img-big" src="../../assets/landing_page_img/banner13.jpg" alt="">
        </div>

        <div class="main-item">
          <img class="main-img-big" src="../../assets/landing_page_img/banner14.jpg" alt="">
        </div>

        <div class="main-item">
          <img class="main-img-big" src="../../assets/landing_page_img/banner15.jpg" alt="">
        </div>
        
        <div class="main-item">
          <img class="main-img-big" src="../../assets/landing_page_img/banner16.jpg" alt="">
        </div>

        <div class="main-item">
          <img class="main-img-big" src="../../assets/landing_page_img/banner17.jpg" alt="">
        </div>

      </div>
    </main>
  </div>

  <!-- scroll top btn -->
  <div id="scroll_top_btn"><i class="fa-solid fa-arrow-up"></i></div>
  <script src="./landing_page.js"></script>
</body>

<footer class="landing_page_footer" id="footer">
  <?php 
    include '../components/footer/footer.php';
  ?>
</footer>

</html>