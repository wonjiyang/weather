import React from 'react';
import { Button } from 'react-bootstrap';

const WeatherBtn = ({ cities, setCity, changeCurrent, city }) => {
  return (
    <div className="weather-btn">
      <Button
        variant={city === '' ? 'warning' : 'outline-warning'}
        className="btn"
        onClick={() => changeCurrent('current')}
      >
        Current Location
      </Button>
      {cities.map((item, index) => (
        <Button
          key={index}
          variant={city === item ? 'warning' : 'outline-warning'}
          className="btn"
          onClick={() => changeCurrent(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
};

export default WeatherBtn;
