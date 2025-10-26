import React from 'react';

/**
 * props:
 * - cities: array of city strings
 * - handleCityChange: fn(selected) -> "current" or cityName
 * - selectedCity: null for current, or city string
 */

const WeatherBtn = ({ cities, handleCityChange, selectedCity }) => {
  return (
    <div className="d-flex flex-wrap gap-2">
      <button
        className={`btn btn-sm city-btn ${
          selectedCity === null ? 'active-city' : ''
        }`}
        onClick={() => handleCityChange('current')}
      >
        Current
      </button>

      {cities.map((c) => {
        // match ignoring case for highlight (user-friendly)
        const isActive =
          selectedCity && selectedCity.toLowerCase() === c.toLowerCase();

        return (
          <button
            key={c}
            className={`btn btn-sm city-btn ${isActive ? 'active-city' : ''}`}
            onClick={() => handleCityChange(c)}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
};

export default WeatherBtn;
