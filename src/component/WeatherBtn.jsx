import React from 'react';
import { Button } from 'react-bootstrap';

const WeatherBtn = () => {
  return (
    <div className="weather-btn">
      <Button variant="warning" className="btn">
        Current Location
      </Button>
      <Button variant="warning">paris</Button>
      <Button variant="warning">new york</Button>
    </div>
  );
};

export default WeatherBtn;
