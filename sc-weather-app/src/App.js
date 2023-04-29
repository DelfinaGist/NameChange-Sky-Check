import React, {useState} from 'react';
import './App.css';

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
      <input className="input" placeholder="Type your City here..." 
      onChange={e => setCity(e.target.value)}
      value={city}
      onKeyPress={getWeather}
      />

      {typeof weatherData.main === 'undefined' ?(
        <div>
          <p>Welcome to Sky-Check weather app!</p>
          <p>Type name of a city to get the weather of.</p>
        </div>  
      ): (
        <div className='weather-data'>
          <p className='city'>{weatherData.name}</p>
          <p className='temp'>{Math.round(weatherData.main.temp)}°F</p>
          <p className='weather'>{weatherData.weather[0].main}</p>
        </div>  
      )}

      {weatherData.cod === "404" ? (
        <p>City not found.</p>
      ) : (
        <>
        </>
      )}

    </div>
  )
}    
  export default App;