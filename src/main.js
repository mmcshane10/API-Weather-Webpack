$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_KEY}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    }

    request.open("GET", url, true);
    request.send();

    const getElements = function(response) {
      let tempF = ((response.main.temp * 9/5) - 460).toFixed(1);
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature is ${tempF} degrees.`);
      $('.showWind').text(`The wind speed is ${response.wind.speed} mph.`);
      $('.showPressure').text(`the atomspheric pressure is ${response.main.pressure}.`);
    };

  });
});
