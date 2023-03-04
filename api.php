<?php 
$api_url = "http://www.trumba.com/calendars/brisbane-city-council.json";
$json_data = file_get_contents($api_url);
echo $json_data;
?>