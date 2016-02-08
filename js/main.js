$(document).ready(function() {
  getLocation();
  var apiKey = "69997ee9eefd6b873e2e12551a5063a7";
  var temperature;
  var unitMeasure;

  function getLocation() {
    $.get("http://www.ipinfo.io", function(location) {
      $("#location").append(location.city + ", ").append(location.country);
      getWeather(location.loc);
    }, "jsonp");
  }

  function getWeather(loc) {

    unitMeasure = " °C";
    var lat = loc.split(",")[0];
    var lon = loc.split(",")[1];
    var weatherAPI = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric" + "&APPID=" + apiKey;
    $.get(weatherAPI, function(weather) {
      temperature = weather.main.temp;
      $("#temp").append("temperature: " + temperature + unitMeasure);
      $("#conditions").append("<img src='http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png'>").append(weather.weather[0].description);
      $("#humidity").append("humidity: " + weather.main.humidity + "%");
    }, "jsonp");
  }
  $("input:radio[name=degree]").click(function() {
    var temp;
    var value = $(this).val();
    if (value === "F") {
      temp = ((temperature / 5) * 9 + 32).toFixed(2);
      unitMeasure = " °F";
      $("#temp").text("temperature: " + temp + unitMeasure);
    } else if (value === "C") {
      temp = temperature.toFixed(2);
      unitMeasure = " °C";
      $("#temp").text("temperature: " + temp + unitMeasure);
    }
  });
});
