function convertToPlain(html) {
  // Create a new div element
  var tempDivElement = document.createElement("div");

  // Set the HTML content with the given value
  tempDivElement.innerHTML = html;

  // Retrieve the text property of the element
  return tempDivElement.textContent || tempDivElement.innerText || "";
}

function sidePanel() {
  document.querySelector(".side-panel-toggle").addEventListener("click", () => {
    document
      .querySelector("#detail-container")
      .classList.toggle("side-panel-open");
  });
}
[{}];

$(document).ready(function () {
  // -------------------- car park location
  let carParks = [];
  const carParkData = {
    resource_id: "2c8d124c-81c6-409d-bffb-5761d10299fe",
    limit: 500, // the resource id
  };

  $.ajax({
    url: "https://www.data.brisbane.qld.gov.au/data/api/3/action/datastore_search",
    data: carParkData,
    dataType: "json",
    async: false,
    success: function (data) {
      carParks.push(data);
    },
  });
  console.log(carParks);
  //--------------------- bicycle rack api
  let bikeRacks = [];
  var data = {
    resource_id: "4a67a16d-ffc7-4831-a77b-64d8ac42459e", // the resource id // get 5 results
    // query for 'jones'
  };
  $.ajax({
    url: "https://www.data.brisbane.qld.gov.au/data/api/3/action/datastore_search",
    data: data,
    dataType: "json",
    async: false,
    success: function (data) {
      console.log(data);
      $.each(data, function (key, value) {
        bikeRacks.push(value);
      });
    },
  });
  console.log(bikeRacks);

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
  var type;
  var cost;
  var externalLink = convertToPlain(allDetails.webLink);
  var bookLink = allDetails.eventActionUrl;
  $.each(allDetails.customFields, function (key, value) {
    if (value.fieldID == 21859) {
      type = value.value;
    }
    if (value.fieldID == 22177) {
      cost = convertToPlain(value.value);
    }
  });

  console.log(location);

  // ------------------ page layout
  $(".side-panel").append(
    $("<div class='picture'>").append($("<img>").attr("src", image)),
    $("<div class='title'>").append($("<h1>").text(title)),
    $("<div class='detail-content'>").append(
      $("<div class='detail-description-container-content'>").append(
        $('<i class="fa-solid fa-circle-info description-icon"></i>'),
        $("<p class='detail-description'>").text(description)
      ),
      // -------------------------------- book button
      $("<div class='detail-book-container'>").append(
        $('<i class="fa-solid fa-bookmark"></i>'),
        $(
          "<a class='detail-link' href = " +
            bookLink +
            " target='_blank'>BOOK YOUR TICKETS! -> </a>"
        )
      ),
      $("<div class='dateTitle'>").append($("<h1>").text(`Details`)),
      // ------------------------------- time
      $("<div class='detail-date-container'>").append(
        $('<i class="fa-solid fa-clock"></i>'),
        $("<p class='detail-date'>").text(
          "From " + startDateTime + " To " + endDateTime
        )
      ),
      // ------------------------------- location
      $("<div class='detail-location-container-content'>").append(
        $('<i class="fa-solid fa-location-dot icon"></i>'),
        $("<p class='detail-location'>").text(location)
      ),
      //-------------------------------- price
      $("<div class='detail-location-container-content'>").append(
        $('<i class="fa-sharp fa-solid fa-sack-dollar description-icon"></i>'),
        $("<p class='detail-location'>").text(cost)
      ),
      
      // ------------------------------- type
      $("<div class='detail-description-container-content'>").append(
        $('<i class="fa-regular fa-dragon description-icon"></i>'),
        $("<p class='detail-type'>").text(type)
      ),
      // ------------------------------- navigation header
      $("<div class='detail-location-container'>").append(
        $("<h1>").text(`Navigation Guidance`)
      ),
      $("<div class='detail-location-container-content'>").append(
        $("<b>Select your preferredmode of Travel    </b>"),
        $("<select id='mode'>").append(
          $("<option value='DRIVING'>Drving</option>"),
          $("<option value='WALKING'>Walking</option>"),
          $("<option value='BICYCLING'>Bicycling</option>"),
          $("<option value='TRANSIT'>Transit</option>")
        ),
        $("<div class='distance'></div>"),
        $("<div class='time'></div>"),
        $("<div class='sharethis-inline-share-buttons'></div>")
      )
    )
  );

  // googel map
  var API_key = "AIzaSyBBppcBUcHW_cVOnB4g2iwTQ1tuuw4HIB4";
  var map;

  var geocodeSite = `https://maps.googleapis.com/maps/api/geocode/json`;

  function calculateAndDisplayRoute(
    directionsService,
    directionsRenderer,
    from,
    to,
    model
  ) {
    directionsService
      .route({
        origin: from,
        destination: to,
        travelMode: google.maps.TravelMode[model],
      })
      .then((response) => {
        $(".distance").html(
          $("<p>").text(
            model + " distance: " + response.routes[0].legs[0].distance.text
          )
        );
        $(".time").html(
          $("<p>").text("Duration: " + response.routes[0].legs[0].duration.text)
        );
        directionsRenderer.setDirections(response);
      })
      .catch((e) => {
        window.alert("Direction request failed due to" + e);
      });
  }

  const initMap = async function (props) {
    map = new google.maps.Map(document.getElementById("map"), {
      center: props.coords,
      zoom: 14,
      mapId: "9138761426e2e387",
    });
    //----------------- navigation

    //calculateAndDisplayRoute(directionsRender,directionsService,)

    //-------------------- add user's location on the map
    //  geolocation api to get users location
    function getCoordinates() {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    }
    //       geolocation api to get users location also use the coords to show direction
    async function getAddress() {
      // notice, no then(), cause await would block and
      // wait for the resolved result
      const position = await getCoordinates();
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      addMarker({
        coords: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        iconImage: "asset/user.png",
        content: "<h1>Your are here!🤗</h1>",
      });
      const directionsRenderer = new google.maps.DirectionsRenderer({
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: "red",
        },
      });
      const directionsService = new google.maps.DirectionsService();
      directionsRenderer.setMap(map);
      console.log($("#mode").val());
      calculateAndDisplayRoute(
        directionsService,
        directionsRenderer,
        `${latitude},${longitude}`,
        location,
        $("#mode").val()
      );
      //      mode change event
      $("#mode").change(function () {
        calculateAndDisplayRoute(
          directionsService,
          directionsRenderer,
          `${latitude},${longitude}`,
          location,
          $("#mode").val()
        );
      });
    }

    getAddress();

    //------------------------- iterate bicycle rack and  add marker when selection == cycling;
    //----------------------Haversine formula p1{lat:lat, lng:lng}
    var rad = function (x) {
      return (x * Math.PI) / 180;
    };

    var getDistance = function (p1, p2) {
      var R = 6378137; // Earth’s mean radius in meter
      var dLat = rad(p2.lat - p1.lat);
      var dLong = rad(p2.lng - p1.lng);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat)) *
          Math.cos(rad(p2.lat)) *
          Math.sin(dLong / 2) *
          Math.sin(dLong / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return d; // returns the distance in meter
    };

    function addBikeRackMarker() {
      let bikeMarkers = [];
      $.each(bikeRacks[2].records, function (key, value) {
        const bike_rack_address = value["Address"];
        const capacity = value["Capacity"];
        const latitude = parseFloat(value["Latitude"]);
        const longitude = parseFloat(value["Longitude"]);
        const rack_type = value["Rack type"];
        $("#mode").change(function () {
          if ($("#mode").val() == "BICYCLING") {
            console.log(
              getDistance({ lat: latitude, lng: longitude }, props.coords),
              props.coords
            );
            if (
              getDistance({ lat: latitude, lng: longitude }, props.coords) <=
              4000 // show bicycle rack in 4000 miles
            ) {
              let bikeMarker = {
                coords: { lat: latitude, lng: longitude },
                iconImage: "asset/bike.png",
                content: `<div class= 'markerInfo'> <h1>Bike Rack</h1><p>address: ${bike_rack_address}</p><p>capacity: ${capacity}</p> </div>`,
              };

              bikeMarkers.push(addMarker(bikeMarker));
            }
          } else {
            for (i = 0; i < bikeMarkers.length; i++) {
              bikeMarkers[i].setMap(null);
            }
          }
        });
      });
    }

    addBikeRackMarker();

    //------------------------- iterate carparks and  add marker when selection == DRIVING;
    //----------------------Haversine formula p1{lat:lat, lng:lng}

    function addCarParkMarker() {
      let carParkMarkers = [];
      $.each(carParks[0].result.records, function (key, value) {
        const parkName = value["PARK_NAME"];
        const parkNumber = value["PARK_NUMBER"];
        const postCode = value["POST_CODE"];
        const streetAddress = value["STREET_ADDRESS"];
        const parkLatitude = parseFloat(value["LAT"]);
        const parkLongitude = parseFloat(value["LONG"]);
        if ($("#mode").val() == "DRIVING") {
          if (
            getDistance(
              { lat: parkLatitude, lng: parkLongitude },
              props.coords
            ) <= 2000 //   show car park in 2000 miles
          ) {
            let carParkMarker = {
              coords: { lat: parkLatitude, lng: parkLongitude },
              iconImage: "asset/carPark.png",
              content: `<div class= 'markerInfo'> <h1>Car Park</h1><p>park Name: ${parkName}</p><p>parkNumber: ${parkNumber}</p><p>Address: ${streetAddress}</p> </div>`,
            };
            carParkMarkers.push(addMarker(carParkMarker));
          }
        }
        $("#mode").change(function () {
          if ($("#mode").val() == "DRIVING") {
            if (
              getDistance(
                { lat: parkLatitude, lng: parkLongitude },
                props.coords
              ) <= 2000 //   show car park in 2000 miles
            ) {
              let carParkMarker = {
                coords: { lat: parkLatitude, lng: parkLongitude },
                iconImage: "asset/carpark.png",
                content: `<div class= 'markerInfo'> <h1>Car Park</h1><p>park Name: ${parkName}</p><p>parkNumber: ${parkNumber}</p><p>Address: ${streetAddress}</p> </div>`,
              };
              carParkMarkers.push(addMarker(carParkMarker));
              console.log(carParkMarkers);
            }
          } else {
            for (i = 0; i < carParkMarkers.length; i++) {
              carParkMarkers[i].setMap(null);
            }
          }
        });
      });
    }
    addCarParkMarker();

    //--------[0]marker: user marker, [1] marker: event marker
    var markers = [
      {
        coords: props.coords,
        iconImage: "asset/blueBrisbaneActivitiesLogo.png",
        content: `<div class= 'markerInfo'><img class="markerImage" src = ${image}> <h1>${title}</h1> </div>`,
      },
    ];

    for (let i = 0; i < markers.length; i++) {
      addMarker(markers[i]);
    }

    function addMarker(props) {
      var marker = new google.maps.Marker({
        position: props.coords,
        map: map,
        // icon: {
        //   url: icon,
        //   scaledSize: new google.maps.Size(38, 38),
        // },
      });
      if (props.iconImage) {
        marker.setIcon({
          url: props.iconImage,
          scaledSize: new google.maps.Size(50, 50),
        });
      }

      if (props.content) {
        var infoWindow = new google.maps.InfoWindow({
          content: props.content,
        });
        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      }
      return marker;
    }
  };

  //-----------get the coordinate by address

  // --------------- initiate map
  let geocoder;
  function geocode() {
    // const axios = require("axios").default;
    // axios
    //   .get(geocodeSite, {
    //     params: {
    //       address: location,
    //       key: API_key,
    //     },
    //   })
    //   .then(function (response) {
    //     // google map function to show map on screen
    //     var eventProps = {
    //       coords: response.data.results[0].geometry.location,
    //     };
    //     console.log(eventProps);
    //     initMap(eventProps);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: location }, function (result, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        let latitude = result[0].geometry.location.lat();
        let longitude = result[0].geometry.location.lng();
        var eventProps = {
          coords: { lat: latitude, lng: longitude },
        };
        initMap(eventProps);
      } else {
        console.log(status);
      }
    });
  }
  window.geocode = geocode;
  geocode();
  sidePanel();

  // ------------------- go back button
});
