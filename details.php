<?php include('navigation.php'); ?>


<p class = 'hiden' id = 'eventNumber'><?php echo $_GET['event']?><p>


<section id="detail-container" class="side-panel-open">

  <div class="side-panel">
    <div class="go-backk " onClick='window.location.href="index.php";'><i class="fa-solid fa-backward"></i>   Back to previous page</div>
  </div>
  <button class="side-panel-toggle" type="button">
    <span class="material-icons sp-icon-open">keyboard_double_arrow_right</span>
    <span class="material-icons sp-icon-close">keyboard_double_arrow_left</span>
  </button>
  <div id = 'map'>
    <div class="timeAndDistance"></div>
  </div>

</section>

<script type='text/javascript' src='https://platform-api.sharethis.com/js/sharethis.js#property=634fa98ad9431f001240b4ee&product=inline-share-buttons' async='async'></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="js/detail.js"></script>
<script src="js/stickynav.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBBppcBUcHW_cVOnB4g2iwTQ1tuuw4HIB4&map_ids=9138761426e2e387&language=en&callback=geocode"
    async defer></script>
<!-- <script src="https://unpkg.com/axios/dist/axios.min.js"></script> -->

    

</body>
</html>