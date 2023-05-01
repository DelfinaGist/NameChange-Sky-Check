import React, {useState} from 'react';
import './App.css';

function getWindDirection(deg) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
}

function App() {

  const apiKey = `32d9f1a0c954f5656882096bc0b1ed1f`;
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("")

  const getWeather = (event) => {
    if (event.key === "Enter") {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          setWeatherData(data);
          setCity("")
        })
    }
  };
  

  return (
    <div className="container">

        <div>
          <p>Welcome to Sky-Check weather app!</p>
        </div>

      <input className="input" placeholder="Type your City here..." 
      onChange={e => setCity(e.target.value)}
      value={city}
      onKeyPress={getWeather}
      />

      {typeof weatherData.main === 'undefined' ?(
        <div>
          <p>Type name of a city to get the weather of.</p>
        </div>  
      ): (
        <div className='weather-data'>
          <p className='city'>{weatherData.name}</p>
          <p className='temp'>{Math.round(weatherData.main.temp)}°F</p>
          <p className='weather'>{weatherData.weather[0].main}</p>
          <p className='weanter'>{weatherData.main.humidity}% humidity</p>
          <p className='wind'>Wind: {weatherData.wind.speed} {weatherData.units?.speed} {getWindDirection(weatherData.wind.deg)}</p>
          {/* <p className='aqi'>AQI: {weatherData.aqi}</p> */}
          <p className='sunrise-sunset'>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()} / Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()} </p>
        </div>  
      )}

      {weatherData.cod === "404" ? (
        <div>    
          <h1>Sorry ...</h1>
          <h3>City not found.</h3>
        </div>
      ) : (
        <>
        </>
      )}

    </div>
  )
}    
  export default App;