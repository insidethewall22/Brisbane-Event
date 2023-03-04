const API_key = "AIzaSyDXEWPP72oKWlwiGJvuljKsTQK2YwoJtdI";
const geocodeSite = `https://maps.googleapis.com/maps/api/geocode/json`;
let preparedData = []; //--------------- used for stor data in marker form
var map;
function convertToPlain(html) {
  // Create a new div element
  var tempDivElement = document.createElement("div");

  // Set the HTML content with the given value
  tempDivElement.innerHTML = html;

  // Retrieve the text property of the element
  return tempDivElement.textContent || tempDivElement.innerText || "";
}

function openModal() {
  $("#gameModal").show();
  $(".modalBackground").show();
}

function closeModal() {
  $("#gameModal").hide();
  $(".modalBackground").hide();
}

$(window).on("load", function () {
  //---------- extract all event data from local storage
  openModal();
  $(".closeGameModal").click(function () {
    closeModal();
  });
  $(".modalBackground").click(function () {
    closeModal();
  });
  let allData = [];
  let allKeys = Object.keys(localStorage);
  for (let i = 0; i < allKeys.length; i++) {
    allData.push({
      key: parseInt(allKeys[i]),
      event: JSON.parse(localStorage.getItem(allKeys[i])),
    });
  }
  //-------------------- initMap
  //----------- random number from 1 - 12

  $.each(allData, function (recordKey, recordValue) {
    let random = Math.floor(Math.random() * 12 + 1);
    var recordTitle = convertToPlain(recordValue.event["title"]);
    var recordStartTime = recordValue.event["startDateTime"];
    var recordEndTime = recordValue.event["endDateTime"];
    var shortenStartTime = recordStartTime.substring(
      0,
      recordStartTime.indexOf("T")
    );
    var shortenEndTime = recordEndTime.substring(0, recordEndTime.indexOf("T"));
    try {
      var recordImage = recordValue.event.eventImage.url;
    } catch (e) {
      console.log("YO", e);
    }
    var pokemonMarker = `asset/brisbane/${random}.png`;
    var recordDescription = convertToPlain(recordValue.event["description"]);
    var recordLocation = convertToPlain(
      "Location: " + recordValue.event["location"]
    );
    var plainLocation = convertToPlain(recordValue.event["location"]);
    preparedData.push({
      eventKey: recordValue.key,
      coords: plainLocation,
      iconImage: pokemonMarker,
      content: `<div class="eventsContainer"><p>Title: ${recordTitle}</br>startTime: ${shortenStartTime}</br>endTime ${shortenEndTime}</br>${recordLocation}</p> <img src= ${recordImage}>
      <form method = 'get' action = 'diceRolling.php'>
        <input type = 'hidden' name='pokemonNumber' value=${recordValue.key}>
        
       <input class='button' type='submit' value = 'Start Game!'>
        </form>
      </div>`,
    });

    console.log(recordValue.key);
  });
  console.log(preparedData);

  initMap2(preparedData);
  console.log(map);
});

function initMap2(preparedData) {
  console.log(preparedData);
  map = new google.maps.Map(document.getElementById("PokemonMap"), {
    center: { lat: -27.470125, lng: 153.021072 }, //QLD coordinate
    zoom: 13,
    mapId: "9138761426e2e387",
  });

  const geocoder = new google.maps.Geocoder();
  var delay = 100;

  if (preparedData) {
    var length = preparedData.length - 185;
  }
  console.log(length);

  //   $.each(preparedData, function (recordKey, recordValue) {
  let count = 0.003;
  function geocoding(data, next) {
    geocoder.geocode({ address: data.coords }, function (result, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        let latitude = result[0].geometry.location.lat() + count;
        let longitude = result[0].geometry.location.lng() + count;
        data.coords = { lat: latitude, lng: longitude };
        count += 0.002;
        console.log(data);
        addMarker(data);
      } else {
        if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
          nextAddress--;
          delay++;
        } else {
          console.log(status);
        }
      }
      next();
    });
  }
  var nextAddress = 0;
  function theNext() {
    if (nextAddress < length) {
      setTimeout(geocoding(preparedData[nextAddress], theNext), delay);
      nextAddress++;
    } else {
    }
  }
  theNext();

  //--------------- add marker on the map
  function addMarker(props) {
    var marker = new google.maps.Marker({
      position: props.coords,
      map: map,
    });
    if (props.iconImage) {
      marker.setIcon({
        url: props.iconImage,
        scaledSize: new google.maps.Size(70, 70),
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
    // map.setCenter({ lat: latitude, lng: longitude }, 9);
    addMarker({
      coords: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
      iconImage: "asset/user.png",
      content: "<h1>Your are here!🤗</h1>",
    });
  }
  getAddress();
}
