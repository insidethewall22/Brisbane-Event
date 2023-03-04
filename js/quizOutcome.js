function convertToPlain(html) {
  // Create a new div element
  var tempDivElement = document.createElement("div");

  // Set the HTML content with the given value
  tempDivElement.innerHTML = html;

  // Retrieve the text property of the element
  return tempDivElement.textContent || tempDivElement.innerText || "";
}
// googel map
var API_key = "AIzaSyBBppcBUcHW_cVOnB4g2iwTQ1tuuw4HIB4";
var map;

var geocodeSite = `https://maps.googleapis.com/maps/api/geocode/json`;

function initMap(props) {
  map = new google.maps.Map(document.getElementById("map"), {
    center: props,
    zoom: 16,
  });
  var marker = new google.maps.Marker({
    position: props,
    map: map,
  });
}

$(document).ready(function () {
  // ------------- page elements
  var eventNumber = $("#eventNumber").text();
  var allDetails = JSON.parse(localStorage.getItem(eventNumber));
  console.log(eventNumber);
  console.log(allDetails);
  var description = convertToPlain(allDetails.description);
  //console.log(description);
  var title = convertToPlain(allDetails.title);
  var startDateTime = allDetails.startDateTime;
  var endDateTime = allDetails.endDateTime;
  var image = allDetails.eventImage.url;
  var location = convertToPlain(allDetails.location);
  console.log(location);
  //-----------get the coordinate by address

  // --------------- initiate map
  function geocode() {
    axios
      .get(geocodeSite, {
        params: {
          address: location,
          key: API_key,
        },
      })
      .then(function (response) {
        console.log(response);
        console.log(response.data.results[0].geometry.location);
        // google map function to show map on screen
        initMap(response.data.results[0].geometry.location);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  geocode();

  // ------------------ page layout
  $("#detail-container").append(
    $("<div class='container'>").append(
      $("<div class='left-container'>").append($("<img>").attr("src", image)),
      $("<div class='reight-container'>").append($("<h1>").text(title))
    )
  );
});
