function loadDate() {
  var currentDate = new Date();
  var dateString = currentDate
    .toString()
    .split(" ")
    .splice(0, 4) // making the string contain only the first four words
    .join(" ");

  $("#date").text(dateString);
}
("c26fbfd745729f6bd1948a47c486a2f5");

function loadWeather() {
  var weather = $("#weather");
  var uv = $("#uv");
  var hum = $("#hum");
  var cc = $("#cc");
  var moon = $("#moon");
  var curr = $("#current");
  var url = "https://api.forecast.io/forecast/"; // Dark Sky API url
  var apiKey = "c26fbfd745729f6bd1948a47c486a2f5"; // API key from Dark Sky

  function success(position) {
    var latitude = position.coords.latitude; // latitude using geolocation
    var longitude = position.coords.longitude; // longitude using geolocation

    // API request:
    $.getJSON(
      url + apiKey + "/" + latitude + "," + longitude + "?callback=?",
      function(data) {
        weather.text("" + data.currently.temperature + "° F");
        uv.text("" + data.currently.uvIndex + " UV");
        hum.text("" + data.currently.humidity * 100 + "%");
        cc.text("" + data.currently.cloudCover + "%");
        moon.text("" + data.daily.moonPhase + "m");
        curr.text("" + data.currently.summary + ".");
      }
    );
  }

  // This message is displayed if their is a geolocation error:
  function error() {
    alert("Unable to retrieve your location for weather");
  }

  // calling the geolocation API
  navigator.geolocation.getCurrentPosition(success, error);

  // the text that will be displayed while the function is making the request
  weather.text("Temp");
  uv.text("UV");
  hum.text("Humidity");
  cc.text("Cloud");
  moon.text("moon");
  curr.text("Summary");
}

function loadNews() {
  var news = $("#news");
  var url =
    "https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey="; // News API url
  var apiKey = "b5fc06092d64426eaab82ee1a807d052"; // API key from News API

  $.getJSON(url + apiKey, function(data) {
    // map() method to call article urls and titles

    var titles = data.articles.map(function(articles) {
      return "<a href='" + articles.url + "'>" + articles.title + "</a>";
    });

    // joining the titles with two line breaks

    news.html(titles.join("<br><br>"));
  });

  // the text that will be displayed while the function is making the request
  news.text("fetching news...");
}

loadDate();
loadWeather();
loadNews();
