import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [data, setData] = useState({});
  const [city, setCity] = useState("");
  const [weatherData, setweatherData] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });

    if (latitude && longitude) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=93eee144b7450e33ce666ddbb913584a`
        )
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        });
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (latitude && longitude) {
      axios
        .get(
          // `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=93eee144b7450e33ce666ddbb913584a`
          `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=93eee144b7450e33ce666ddbb913584a`
        )
        .then((response) => {
          console.log(response);
          // console.log(response.list);
          setweatherData(response.list);
        });
    }
  }, [latitude, longitude]);

  const searchCity = (event) => {
    if (event.key === "Enter") {
      // useEffect(() => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=93eee144b7450e33ce666ddbb913584a`
        )
        .then((response) => {
          console.log(response);
          setData(response.data);
          setweatherData(response.list);
        });
      // });
      setCity("");
    }
  };

  function degreeinFarenheit(degree) {
    let result = (degree - 273.15) * 1.8 + 32;
    return result.toFixed();
  }

  return (
    <div className="App">
      <div>{weatherData}</div>
      <h1>Weather App</h1>
      <input
        className="input-text"
        type="text"
        placeholder="Enter City"
        value={city}
        onChange={(event) => setCity(event.target.value)}
        //  & onChangeHandler(event.target.value)}
        onKeyPress={searchCity}
      ></input>
      <div className="city-name">{data.name}</div>
      <div className="temp">
        {data.main ? <h1>{degreeinFarenheit(data.main.temp)} °F</h1> : null}
      </div>
      <div className="temp-description">
        <div className="feels_like">
          {data.main ? (
            <h6>
              {degreeinFarenheit(data.main.feels_like)} °F <br />
              Feels like
            </h6>
          ) : null}
        </div>
        <div className="air">
          {data.main ? (
            <h6>
              {data.wind.speed} m/s
              <br />
              Wind speed
            </h6>
          ) : null}
        </div>
        <div className="">
          {data.main ? (
            <h6>
              {data.main.humidity}
              <br />
              Humidity
            </h6>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
