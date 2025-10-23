import React from 'react';

const WeatherBox = ({ weather }) => {
  const celsius = weather?.main.temp;
  const fahrenheit = (celsius * 9) / 5 + 32;

  return (
    <div className="weather-box">
      <div>{weather?.name}</div>
      <h2>
        {celsius}°C / {fahrenheit.toFixed(1)}°F
      </h2>
      <h3>{weather?.weather[0].description}</h3>
    </div>
  );
};

export default WeatherBox;
