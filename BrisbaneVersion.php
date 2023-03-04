<?php include('navigation.php'); ?>

<div id='PokemonMap'></div>
<div id="gameModal">
        <button class="closeGameModal">&times;</button>
        <h1>Fight against the Australian animals to see the event happening at their location!!🥰 </h1>
        <p>Note: This feature is not yet optimised for mobile.</p>   
    </div>
    <div class = "modalBackground"></div>
    
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

   
    <script src="js/Brisbane.js"></script>

    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDXEWPP72oKWlwiGJvuljKsTQK2YwoJtdI&callback=initMap2"
    async defer></script>


</body>
</html>