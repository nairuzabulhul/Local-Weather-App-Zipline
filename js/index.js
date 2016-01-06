$(document).ready(function(){
    var appKey = "01ffc2b8227e5302ffa7f8555ba7738e";
  
 // Get the location 
  
 function getLocation(){
  
   //Step1:use get method for extracting json 
  $.get("http://ipinfo.io/json", function(location){
 
    //step2: call the city and region and country 
    $("#city").html(location.city + " , " + location.region + " &nbsp; &nbsp;" + location.country);
    
    
    //step three define metricUnit
    var units = getMetricUnit(location.country);
   getWeatherMetric(location.loc,units);
    
    //Step four define Fahrenheit Unit
    var units1 = getFahrenheitUnit (location.country);
    getWeatherFahrenheit (location.loc, units1);
  }); 
   
 }
  
//End of GetLocation function --------------------

  function getWeatherMetric (location, units){
   //latitude and longtitude of the location 
    var latitude = location.split(",")[0];
    var longtitude = location.split(",")[1];
    //Weather API
    var weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longtitude + "&units=" + units + "&APPID=" + appKey;
    
    
   
  //use get function in order to access the weather attributes
    $.get(weatherAPI, function(weather){
      
      var metric_temperature = weather.main.temp;
      var metric_unitDegree = "C";

      metric_temperature = parseFloat(metric_temperature.toFixed(0));
      
      //display the temperatue on the div
      $("#celsius_degree").append("&nbsp;"+ metric_temperature   + " " + metric_unitDegree + " &nbsp;");
      
      //weather icon:
      $('#icon').append("<img src='http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png'>");
      
      //weather condition/ status
     $("#weatherStatus").append(weather.weather[0].description);
      
      //Wind section 
      var windSpeed = windDirection(weather.wind.deg);
      $("#windSpeed").append(windSpeed + " " + weather.wind.speed + " knots");
      
    },"jsonp");
    
    
  }//End of the getWeather function
  
  
  
//get weather in Fahrenheit 
  function getWeatherFahrenheit (location, units){
     //latitude and longtitude of the location 
    var latitude = location.split(",")[0];
    var longtitude = location.split(",")[1];
    //Weather API
    var weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longtitude + "&units=" + units + "&APPID=" + appKey;
    
    $.get(weatherAPI , function (weather){
      var fahren_temperature = weather.main.temp;
      var fahren_unitDegree = "F";
      
      
      //round the float to intger
      fahren_temperature = parseFloat(fahren_temperature.toFixed(0));
      
      //Display the temperature on the div 
      $("#fahren_degree").append(fahren_temperature + " " + fahren_unitDegree + " &nbsp;");
      
      $('#icon1').append("<img src='http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png'>");
      
      
    },"jsonp");
    
  }
  
  function getMetricUnit(country){
    var units = "metric";
    return units;
  } //End the function of getMetricUnit
  
  
  function getFahrenheitUnit (country){
    var units = "imperial";
    return units;
  }
  
//Convert Wind function
 function windDirection(direction) {
    var directionOn_Map = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    var directionPoints = Math.floor(direction / 45);
    return directionOn_Map[directionPoints];
  }
  
  
  //calling getLocation function
  getLocation();
});