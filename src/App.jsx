import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import WeatherBox from './component/WeatherBox';
import WeatherBtn from './component/WeatherBtn';
import { ClipLoader } from 'react-spinners';

const cities = ['Paris', 'New York', 'Tokyo', 'Incheon'];
const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState(null);
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [apiError, setAPIError] = useState('');
  const [unitC, setUnitC] = useState(true);

  const fetchForecastByCoords = async (lat, lon) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setWeatherForecast(data);
        setAPIError('');
      } else {
        setAPIError(data.message || 'API Error');
      }
    } catch (err) {
      setAPIError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchForecastByCity = async (cityName) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
        cityName
      )}&appid=${API_KEY}&units=metric`;
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setWeatherForecast(data);
        setAPIError('');
      } else {
        setAPIError(data.message || 'API Error');
      }
    } catch (err) {
      setAPIError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setAPIError('Geolocation을 지원하지 않는 브라우저입니다.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchForecastByCoords(latitude, longitude);
      },
      (err) => {
        setAPIError('위치 정보를 가져오지 못했습니다. 위치 권한을 확인하세요.');
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    setLoading(true);
    setAPIError('');
    if (city === null) {
      getCurrentLocation();
    } else {
      fetchForecastByCity(city);
    }
  }, [city]);

  const handleCityChange = (selected) => {
    if (selected === 'current') {
      setCity(null);
    } else {
      setCity(selected);
    }
  };

  const toggleUnit = () => setUnitC((v) => !v);

  return (
    <div className="app-bg d-flex align-items-center justify-content-center min-vh-100">
      <div className="app-wrapper">
        {loading ? (
          <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
            <ClipLoader size={120} loading={loading} />
          </div>
        ) : apiError ? (
          <div className="error-box glass">
            <h5>오류</h5>
            <p>{apiError}</p>
            <div className="d-flex gap-2 mt-2">
              <button
                className="btn btn-outline-light"
                onClick={() => {
                  setAPIError('');
                  setLoading(true);
                  if (city === null) getCurrentLocation();
                  else fetchForecastByCity(city);
                }}
              >
                다시 시도
              </button>
              <button
                className="btn btn-light"
                onClick={() => {
                  setCity(null);
                  setAPIError('');
                  setLoading(true);
                  getCurrentLocation();
                }}
              >
                현재 위치로
              </button>
            </div>
          </div>
        ) : (
          <div className="glass main-container p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="mb-0">Weather</h3>
              <div>
                <button
                  className="btn btn-sm btn-toggle"
                  onClick={toggleUnit}
                  aria-label="toggle unit"
                >
                  {unitC ? '°C' : '°F'}
                </button>
              </div>
            </div>

            <WeatherBox forecast={weatherForecast} unitC={unitC} />

            <hr className="my-3" />

            <WeatherBtn
              cities={cities}
              handleCityChange={handleCityChange}
              selectedCity={city}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
