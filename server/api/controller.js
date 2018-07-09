var request = require("superagent");
const OPEN_WEATHER_API_KEY = "OPEN_WEATHER_API_KEY";

let getWeather = (OPEN_WEATHER_API_KEY, city, successCB, failureCB) => {
  try {
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=metric`;
    request
      .get(url)
      // .set('accept', 'json')
      .end(function(err, response) {
        if (err) {
          failureCB({ msg: "error", err });
        } else {
          successCB(response.text);
        }
      });
  } catch (err) {
    failureCB({ msg: "exception", err });
  }
};

module.exports = {
  getWeather
};
