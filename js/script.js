window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
function convertToPlain(html) {
  // Create a new div element
  var tempDivElement = document.createElement("div");

  // Set the HTML content with the given value
  tempDivElement.innerHTML = html;

  // Retrieve the text property of the element
  return tempDivElement.textContent || tempDivElement.innerText || "";
}
// ------------------firework loading
function iterateRecords(data) {
  setTimeout(function () {
    $("body").addClass("loaded");
  }, 1000);

  let count = -1;
  $.each(data, function (recordKey, recordValue) {
    count++;
    var recordTitle = convertToPlain(recordValue["title"]);
    var recordStartTime = recordValue["startDateTime"];
    var recordEndTime = recordValue["endDateTime"];
    var shortenStartTime = recordStartTime.substring(
      0,
      recordStartTime.indexOf("T")
    );
    var shortenEndTime = recordEndTime.substring(0, recordEndTime.indexOf("T"));
    try {
      var recordImage = recordValue.eventImage.url;
    } catch (e) {
      console.log("YO", e);
    }
    var recordDescription = convertToPlain(recordValue["description"]);
    var recordLocation = convertToPlain("Location: " + recordValue["location"]);

    if (
      recordTitle &&
      recordStartTime &&
      recordImage &&
      recordDescription &&
      !recordTitle.includes("babies") &&
      !recordTitle.includes("Babies") &&
      !recordTitle.includes("older") &&
      !recordTitle.includes("Older") &&
      !recordTitle.includes("toddler") &&
      !recordTitle.includes("Toddler") &&
      !recordTitle.includes("toddlers") &&
      !recordTitle.includes("Toddlers") &&
      !recordTitle.includes("chatter") &&
      !recordTitle.includes("Chatter") &&
      !recordTitle.includes("kindy") &&
      !recordTitle.includes("Kindy") &&
      !recordTitle.includes("little") &&
      !recordTitle.includes("Little") &&
      !recordTitle.includes("gentle") &&
      !recordTitle.includes("Gentle") &&
      !recordTitle.includes("baby") &&
      !recordTitle.includes("Baby") &&
      !recordTitle.includes("seniors") &&
      !recordTitle.includes("Seniors") &&
      !recordTitle.includes("kids") &&
      !recordTitle.includes("Kids") &&
      !recordTitle.includes("mobility") &&
      !recordTitle.includes("Mobility") &&
      !recordTitle.includes("mum") &&
      !recordTitle.includes("Mum") &&
      !recordTitle.includes("bubs") &&
      !recordTitle.includes("Bubs") &&
      !recordTitle.includes("baby") &&
      !recordTitle.includes("Baby") &&
      !recordTitle.includes("children") &&
      !recordTitle.includes("Fringe") &&
      !recordTitle.includes("Children")
    ) {
      localStorage.setItem(recordKey, JSON.stringify(recordValue));
      $("#records").append(
        $('<div class="blog-container" >').append(
          $('<div class="blog-box">').append(
            $('<div class="blog-img">').append(
              $("<img>").attr("src", recordImage)
            ),
            //   <!--text-->
            $('<article class="blog-text">').append(
              $("<span class = 'date'>").text(
                `${shortenStartTime} to ${shortenEndTime}`
              ),
              $('<p class = "blog-title">').text(`${recordTitle}`),
              // $('<div class = "blog-loc">').append(
              //   $('<p class = "blog-location">').text(`${recordLocation}`)
              // ),
              $('<p class = "short-description">').text(
                `${recordDescription.substring(0, 170)} ....`
              ),
              $("<div class = blog-button>").append(
                $("<form method = 'get' action = 'details.php'>").append(
                  $(
                    "<input type = 'hidden' name='event' value=" + count + " >"
                  ),
                  $(
                    "<input class='buttonToDetails' type='submit' value = ' see more details..'>"
                  )
                )
              )
            )
          )
        )
      );
    }
  });
  // show the number of records
  $("#filter-count strong").text($(".blog-container").length);

  // filter records based on the typed string
  $("#filter-text").keyup(function () {
    let searchTerm = $(this).val();
    console.log(searchTerm);

    $(".blog-container").hide();
    $(".blog-container:contains('" + searchTerm + "')").show();
    $("#filter-count strong").text($(".blog-container:visible").length);
  });
  $(".quiz-page").show();
}
// show loading, hide all stuff

// quizz function
function allStorage() {
  localStorage.removeItem("debug");
  var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;

  console.log(localStorage);

  while (i--) {
    let key = keys[i];
    values.push({ [key]: JSON.parse(localStorage.getItem([key])) });
  }
  return values;
}
// duplicate the api data from local storage
let filteredData = allStorage();
let eventType = [];
let startDate = [];
let endDate = [];
let cost = [];
$.each(filteredData, function (recordKey, recordValue) {
  let type = recordValue["customFields"];
  startDate.push(recordValue["startDateTime"]);
  endDate.push(recordValue["endDateTime"]);
  var index = recordKey;
  $.each(type, function (recordKey, recordValue) {
    if (recordValue["label"] == "Event type") {
      eventType.push({ [index]: recordValue["value"] });
    }
    if (recordValue["label"] == "Cost") {
      cost.push(recordValue["value"]);
    }
  });
});
let questions = [
  {
    question: "When are you free?",
    imgSrc: "asset/brisbaneBackground1.jpg",
    choiceA: "Today",
    choiceB: "Select",
    choiceC: "Anytime",
    id: 1,
  },
  {
    question: "Free or paid event?",
    imgSrc: "asset/brisbane2.jpg",
    choiceA: "Free",
    choiceB: "Not Free",
    id: 2,
  },
  {
    question: "What do you feel like doing?",
    imgSrc: "asset/brisbaneBackground3.jpg",
    choiceA: "Family events",
    choiceB: "Fitness",
    choiceC: "Green",
    choiceD: "Culture",
    choiceE: "Art",
    id: 3,
  },
];
// create some variables about quiz
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
function renderProgress() {
  for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
    $("#progress").append("<div class='prog' id=" + qIndex + "></div>");
  }
}
// show the question screen
function renderQuestion() {
  $("#" + (runningQuestion - 1)).css("background-color", "#54b3d6");
  console.log(runningQuestion);
  if (runningQuestion == lastQuestion) {
    $(".choice").click(function () {
      $("#" + runningQuestion).css("background-color", "#54b3d6");
    });
  }
  let q = questions[runningQuestion];
  console.log(q);
  $("#question").html($("<p>").text(q.question));
  $(".background").html($("<img src=" + q.imgSrc + ">"));
  $("#A").html(
    $(
      "<input class='submit' type='submit' value = '" + q.choiceA + "'></input>"
    )
  );
  $("#B").html(
    $(
      "<input class='submitB' type='submit' value = '" +
        q.choiceB +
        "'></input>"
    )
  );
  // if there exist the option C, add an button
  if (q.choiceC) {
    $("#C").show();
    $("#C").html(
      $(
        "<input class='submitC' type='submit' value = '" +
          q.choiceC +
          "'></input>"
      )
    );
  } else {
    //$("#C").removeClass("choice");
    $("#C").hide();
    //$("#D").hide();
    //$("#E").hide();
  }
  // if there exist the option D, add an button
  if (q.choiceD) {
    $("#D").html(
      $(
        "<input class='submitD' type='submit' value = '" +
          q.choiceD +
          "'></input>"
      )
    );
    $("#D").show();
  } else {
    $("#D").hide();
    //$("#E").hide();
  }
  // if there exist the option E, add an button
  if (q.choiceE) {
    $("#E").show();
    $("#E").html(
      $(
        "<input class='submitE' type='submit' value = '" +
          q.choiceE +
          "'></input>"
      )
    );
  } else {
    //$("#D").removeClass("choice");
    $("#E").hide();
  }
  // ---------------------------- IF IT WAS THE LAST QUESTION, "GENERATE OUTCOME" BUTTON shown.
}
// ---------------------- process the answer user's choice
let quizData = [];

function chooseTheType(Data, tag) {
  for (var i = 0; i < quizData.length; i++) {
    let eachQuiz = quizData[i];
    let keys = Object.keys(eachQuiz);
    let key = keys[0];
    let eventType = eachQuiz[key]["customFields"];
    $.each(eventType, function (recordKey, recordValue) {
      if (recordValue["label"] == "Event type") {
        if (!recordValue["value"].includes(tag)) {
          Data.splice(i, 1);
          // when splice, all next elements will be moved to preceded index, in order to retrieve
          // all elements in arry we need to let i -1 so next iteration, (i-1) +1, so the index i will indicate
          // the current new element and would not omit any elements.
          i--;
        }
      }
    });
  }
}
function processAnswer(answer) {
  // for each questions if user choose A option
  if (answer == questions[runningQuestion].choiceA) {
    // for question 1 choice A
    if (answer == "Today") {
      // get todat date
      var today = new Date();
      var month =
        today.getMonth() + 1 >= 10
          ? (today.getMonth() + 1).toString()
          : "0" + (today.getMonth() + 1);
      var day =
        today.getDate() >= 10
          ? today.getDate().toString()
          : "0" + today.getDate();
      // -----------date
      var date = today.getFullYear() + "-" + month + "-" + day;
      // get today time
      var hour =
        today.getHours() >= 10
          ? today.getHours().toString()
          : "0" + today.getHours();
      var minute =
        today.getMinutes() >= 10
          ? today.getMinutes().toString()
          : "0" + today.getMinutes();
      var second =
        today.getSeconds() >= 10
          ? today.getSeconds().toString()
          : "0" + today.getSeconds();

      var time = hour + ":" + minute + ":" + second;
      // --------------------today date
      var compareToday = date + "T" + time;
      // filter today events
      $.each(filteredData, function (recordKey, recordValue) {
        var key = Object.keys(recordValue)[0];
        var quizStartTime = recordValue[key]["startDateTime"];
        var quizEndTime = recordValue[key]["endDateTime"];
        var shortenQuizStartDay = quizStartTime.substring(
          0,
          quizStartTime.indexOf("T")
        );
        var shortenQuizStartTime = quizStartTime.substring(
          quizStartTime.indexOf("T") + 1
        );
        var shortenQuizEndDay = quizEndTime.substring(
          0,
          quizEndTime.indexOf("T")
        );
        var shortenQuizEndTime = quizEndTime.substring(
          quizEndTime.indexOf("T") + 1
        );
        if (
          (shortenQuizStartDay == date && shortenQuizStartTime >= time) ||
          (shortenQuizStartDay <= date && shortenQuizEndDay > date)
        ) {
          // fullfill the condition so collect the event.
          quizData.push({ [key]: recordValue[key] });
        }
      });
      console.log(quizData);
      console.log(filteredData);
    }
    // question2 choice A : free
    if (answer == "Free") {
      for (var i = 0; i < quizData.length; i++) {
        let eachQuiz = quizData[i];
        let keys = Object.keys(eachQuiz);
        // console.log(keys);
        let key = keys[0];
        let paymentType = eachQuiz[key]["customFields"];
        $.each(paymentType, function (recordKey, recordValue) {
          // if value != free, delete the element
          if (recordValue["label"] == "Cost") {
            if (
              recordValue["value"] != "Free" &&
              recordValue["value"] != "FREE"
            ) {
              quizData.splice(i, 1);
              i--;
            }
          }
        });
      }
      console.log(quizData);
    }
    // ----------------- question3 choice A : choiceA: "Family events",
    if (answer == "Family events") {
      chooseTheType(quizData, "Family events");
      console.log(quizData);
      $(".generateOutcome").show();
    }
  }
  // each question process choice B
  if (answer == questions[runningQuestion].choiceB) {
    // ----------------- question1 choice B : choiceB: "Select",
    if (answer == "Select") {
      //------ popup up the date choose screen
      openModal();

      //-------- when user click close button, dont turn to next question:
      $(".close-modal").click(function () {
        closeModal();
      });
      //--------get and handle users input;
      var inputDate;
      $("#submit").click(function () {
        closeModal();
        inputDate = new Date($("#dateSelect").val());
        console.log(inputDate);
        console.log(Object.prototype.toString.call(inputDate));
        // if users submit a valid date, storing the compatitable events based on the input date.
        if (Object.prototype.toString.call(inputDate) == "[object Date]") {
          let inputDay =
            inputDate.getDate().toString() >= 10
              ? inputDate.getDate().toString()
              : "0" + inputDate.getDate().toString();
          let inputMonth =
            (inputDate.getMonth() + 1).toString() >= 10
              ? (inputDate.getMonth() + 1).toString()
              : "0" + (inputDate.getMonth() + 1).toString();
          let inputYear = inputDate.getFullYear().toString();
          console.log(inputYear, "-", inputDay, "-", inputMonth);
          // make the format of input date no difference with format of data date
          //ex.2022-09-01
          let cleanInputDate = inputYear + "-" + inputMonth + "-" + inputDay;
          $.each(filteredData, function (recordKey, recordValue) {
            var key = Object.keys(recordValue)[0];
            var quizStartTime = recordValue[key]["startDateTime"];
            var quizEndTime = recordValue[key]["endDateTime"];
            var shortenQuizStartDay = quizStartTime.substring(
              0,
              quizStartTime.indexOf("T")
            );
            var shortenQuizEndDay = quizStartTime.substring(
              0,
              quizEndTime.indexOf("T")
            );
            if (
              cleanInputDate >= shortenQuizStartDay &&
              cleanInputDate <= shortenQuizEndDay
            ) {
              quizData.push({ [key]: recordValue[key] });
            }
          });
          console.log(quizData);
          // all of storing stuff has been done, now we can go to next quiz.
          runningQuestion = 1;
          console.log(runningQuestion);
          renderQuestion();
        }
      });
    }
    // ----------------- question2 choice B : choiceB: "Paid",
    if (answer == "Not Free") {
      for (var i = 0; i < quizData.length; i++) {
        let eachQuiz = quizData[i];
        let keys = Object.keys(eachQuiz);
        //console.log(keys);
        let key = keys[0];
        let paymentType = eachQuiz[key]["customFields"];
        $.each(paymentType, function (recordKey, recordValue) {
          // if value == free, delete the element
          if (recordValue["label"] == "Cost") {
            if (
              recordValue["value"] == "Free" ||
              recordValue["value"] == "FREE"
            ) {
              quizData.splice(i, 1);
              i--;
            }
          }
        });
      }
      console.log(quizData);
    }
    // ----------------- question3 choice B : choiceB: "fitness",
    if (answer == "Fitness") {
      chooseTheType(quizData, "Fitness");
      console.log(quizData);
      $(".generateOutcome").show();
    }
  }
  //----------------------each question process choice C;
  if (answer == questions[runningQuestion].choiceC) {
    //----------------------question1 choice C :  "Anytime",
    if (answer == "Anytime") {
      // get todat date
      var today = new Date();
      var month =
        today.getMonth() + 1 >= 10
          ? (today.getMonth() + 1).toString()
          : "0" + (today.getMonth() + 1);
      var day =
        today.getDate() >= 10
          ? today.getDate().toString()
          : "0" + today.getDate();
      // -----------date
      var date = today.getFullYear() + "-" + month + "-" + day;
      // get today time
      var hour =
        today.getHours() >= 10
          ? today.getHours().toString()
          : "0" + today.getHours();
      var minute =
        today.getMinutes() >= 10
          ? today.getMinutes().toString()
          : "0" + today.getMinutes();
      var second =
        today.getSeconds() >= 10
          ? today.getSeconds().toString()
          : "0" + today.getSeconds();
      // -----------time
      var time = hour + ":" + minute + ":" + second;
      // --------------------today date
      var compareToday = date + "T" + time;
      $.each(filteredData, function (recordKey, recordValue) {
        var key = Object.keys(recordValue)[0];
        var quizEndTime = recordValue[key]["endDateTime"];
        if (compareToday < quizEndTime) {
          quizData.push({ [key]: recordValue[key] });
        }
      });
      //console.log(filteredData);
      console.log(compareToday);
      console.log(quizData);
    }
    //----------------------question3 choice C :  "Connecting with nature",
    if (answer == "Nature") {
      chooseTheType(quizData, "Nature");
      console.log(quizData);
      $(".generateOutcome").show();
    }
  }

  //----------------------question3 choice D :  "Culture",
  if (answer == "Culture") {
    chooseTheType(quizData, "Culture");
    console.log(quizData);
    $(".generateOutcome").show();
  }
  //----------------------question3 choice E :  "Art",
  if (answer == "Art") {
    chooseTheType(quizData, "Art");
    console.log(quizData);
    $(".generateOutcome").show();
  }

  // finally, one question has been finished turn to next question
  // when user to selet date option:
  // unlsess user give system a valid date,
  // otherwise this will not turn to the next page
  if (answer != "Select") {
    if (runningQuestion < lastQuestion) {
      runningQuestion++;
      renderQuestion();
    }
  }
}

function openModal() {
  $("#modal").show();
  $(".fuzzy").show();
}

function closeModal() {
  $("#modal").hide();
  $(".fuzzy").hide();
}

//  home page show
function renderEventListPage() {
  $("#generateOutcome").hide();
  $(".quiz-page").hide();
  $("#modal").hide();
  $(".fuzzy").hide();
  $("#quizLoading").hide();
}
// selectedOptions used to store options users choose
// as for the last question, users can click options many times so each time user change
// their options in last question, old choose would be deleted
let selectedOptions = [];
function storeOptions(option) {
  if (selectedOptions.push(option) > lastQuestion + 1) {
    // index of last second option
    selectedOptions.splice(selectedOptions.length - 2, 1);
  }
}
function quizLoading() {
  $("#generateOutcome").hide();
  $(".quiz-page").hide();
  $(".eventList").hide();
  $("#quizLoading").show();
  $(".userChoose").show();
  $("#filteredRecords").show();

  setTimeout(function () {
    $("body").addClass("quizLoaded");
  }, 2000);
}

function backHome() {
  runningQuestion = 0;
  selectedOptions.length = 0;
  quizData.length = 0;
  $(".userChoose").empty();
  $("#filteredRecords").empty();
  $("#progress").empty();
  renderProgress();
  renderQuestion();

  $(".eventQuiz").show();
  $("#records").show();
  $(".quiz-page").show();
  $("#generateOutcome").show();
  $(".generateOutcome").hide();
  $(".userChoose").hide();
  $("#filteredRecords").hide();
}

function iterateQuizData(data) {
  quizLoading();
  $("#filteredRecords").append(
    $(
      "<div class='go-back'><i class='fa-solid fa-rotate-right'></i> Restart</div>"
    )
  );

  if (data.length == 0) {
    $("#filteredRecords").append(
      $("h4")
        .addClass("sorry")
        .text(
          "Unfortunately there are currently no events that match your selection. Check out our other upcoming events below!"
        )
    );
  }
  $(".go-back").click(backHome);
  $.each(selectedOptions, function (recordKey, recordValue) {
    $(".userChoose").append(
      $("h2").addClass("yourEvents").text("Here are your events!"),
      $("<p>").addClass("singleChoose").text(recordValue)
    );
  });

  $.each(data, function (recordKey, recordValue) {
    let keys = Object.keys(recordValue);
    let key = keys[0];
    console.log(data);
    var recordTitle = convertToPlain(recordValue[key].title);
    var recordStartTime = recordValue[key]["startDateTime"];
    var recordEndTime = recordValue[key]["endDateTime"];
    var shortenStartTime = recordStartTime.substring(
      0,
      recordStartTime.indexOf("T")
    );
    var shortenEndTime = recordEndTime.substring(0, recordEndTime.indexOf("T"));
    try {
      var recordImage = recordValue[key].eventImage.url;
    } catch (e) {
      console.log("YO", e);
    }
    var recordDescription = convertToPlain(recordValue[key]["description"]);
    var recordLocation = convertToPlain(
      "Location: " + recordValue[key]["location"]
    );
    //localStorage.setItem(recordKey, JSON.stringify(recordValue));
    if (recordTitle && recordStartTime && recordImage && recordDescription) {
      $("h3").addClass("yourEvents").text("Here are your events!"),
        $("<h2 class='yourEvents'>Here are your events!</h2>"),
        $("#filteredRecords").append(
          $('<div class="blog-container" >').append(
            $('<div class="blog-box">').append(
              $('<div class="blog-img">').append(
                $("<img>").attr("src", recordImage)
              ),
              //   <!--text-->
              $('<article class="blog-text">').append(
                $("<span class = 'date'>").text(
                  `${shortenStartTime} to ${shortenEndTime}`
                ),
                $('<p class = "blog-title">').text(`${recordTitle}`),
                // $('<div class = "blog-loc">').append(
                //   $('<p class = "blog-location">').text(`${recordLocation}`)
                // ),
                $('<p class = "short-description">').text(
                  `${recordDescription.substring(0, 170)} ....`
                ),
                $("<div class = blog-button>").append(
                  $("<form method = 'get' action = 'details.php'>").append(
                    $(
                      "<input type = 'hidden' name='event' value=" + key + " >"
                    ),
                    $(
                      "<input class='buttonToDetails' type='submit' value = ' see more details..'>"
                    )
                  )
                )
              )
            )
          )
        );
    }
  });
}
$(document).ready(function () {
  renderEventListPage();
  $(".eventList").show();
  $("#generateOutcome").show();
  renderQuestion();
  renderProgress();
  $(".quiz-page").show();
  $(".userChoose").hide();
  console.log(localStorage);
  console.log(filteredData);
  console.log(cost);
  console.log(startDate);
  console.log(endDate);
  console.log(eventType);
  //console.log(filteredData);
  // ------------ quiz options
  $("#A").click(function () {
    storeOptions($(".submit").val());
    processAnswer($(".submit").val());
  });
  $("#B").click(function () {
    storeOptions($(".submitB").val());
    processAnswer($(".submitB").val());
  });
  $("#C").click(function () {
    storeOptions($(".submitC").val());
    processAnswer($(".submitC").val());
  });
  $("#D").click(function () {
    storeOptions($(".submitD").val());
    processAnswer($(".submitD").val());
  });
  $("#E").click(function () {
    storeOptions($(".submitE").val());
    processAnswer($(".submitE").val());
  });

  $(".generateOutcome").click(function () {
    iterateQuizData(quizData);
  });

  // ---------------------avoid cors error

  // jQuery.ajaxPrefilter(function (options) {
  //   if (options.crossDomain && jQuery.support.cors) {
  //     options.url = "https://cors-anywhere.herokuapp.com/" + options.url;
  //   }
  // });

  //------------- filter function

  // $.ajax({
  //   url: "http://www.trumba.com/calendars/brisbane-city-council.json",
  //   data: "",
  //   dataType: "json",
  //   type: "GET",
  //   async: true,
  //   success: function (res) {
  //     // console.log(res);
  //     iterateRecords(res);
  //   },

  //   error: function () {
  //     console.log("Save error.");
  //   },
  // });

  let apiRoute = $(location).attr("pathname");
  if (apiRoute.split("/").length > 1) {
    apiRoute = apiRoute.substring(0, apiRoute.lastIndexOf("/"));
  }
  $.ajax({
    url: $(location).attr("protocol") + apiRoute + "/api.php",
    data: "",
    dataType: "json",
    type: "GET",
    async: true,
    success: function (res) {
      console.log(res);
      console.log(apiRoute);
      iterateRecords(res);
    },

    error: function () {
      console.log($(location).attr("protocol"));
      console.log(apiRoute);
      //console.log("Save error.");
    },
  });
});

// read the local file:
// function readTextFile(file, callback) {
//   var rawFile = new XMLHttpRequest();
//   rawFile.overrideMimeType("application/json");
//   rawFile.open("GET", file, true); // type， url/file, true: asynchronous
//   rawFile.onreadystatechange = function () {
//     if (rawFile.readyState === 4 && rawFile.status == "200") {
//       //readyState: the current state of request 0 unset, 3 loading, 4 :done have data to read,
//       // status: response from server, status: 200 success, 404 not found
//       callback(rawFile.responseText);
//     }
//   };
//   rawFile.send(null);
// }

// //usage:
// readTextFile(
//   "http://www.trumba.com/calendars/brisbane-city-council.json",
//   function (text) {
//     var data = JSON.parse(text);
//     console.log(data);
//     iterateRecords(data);
//   }
// );
//--------- -----------------------------------------------------------------------
// var data = {
// 	resource_id: '9eaeeceb-e8e3-49a1-928a-4df76b059c2d', // the resource id
// 	limit: 50, // get 5 results
// 	// q: 'jones' // query for 'jones'
//   };
//   $.ajax({
// 	url: 'https://www.data.qld.gov.au/api/3/action/datastore_search',
// 	data: data,
// 	dataType: 'jsonp',
// 	success: function(data) {
// 		iterateRecords(data)
// 	}
//   });
