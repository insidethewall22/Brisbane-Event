<?php include('navigation.php'); ?>

<p class = 'hiden' id = 'eventNumber'><?php echo $_GET['event']?><p>
<section id="detail-container"></section>
<div id = 'map'></div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBBppcBUcHW_cVOnB4g2iwTQ1tuuw4HIB4&callback=initMap"
    async defer></script>
    <script src="js/detail.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
</body>
</html>