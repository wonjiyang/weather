import React from 'react';

/**
 * forecast: 전체 forecast 응답 (list 배열 포함)
 * unitC: true -> °C, false -> °F
 *
 * 표시 방식: forecast.list[0]을 기준으로 '현재'와,
 * 아래에 간단히 다음 4개의 예보(3시간 단위) 노출
 */

const WeatherBox = ({ forecast, unitC }) => {
  if (!forecast || !forecast.list || forecast.list.length === 0) {
    return (
      <div className="weather-box text-center">
        <p>날씨 정보를 불러올 수 없습니다.</p>
      </div>
    );
  }

  // 현재(가장 첫 항목)
  const current = forecast.list[0];
  const cityName = forecast.city ? forecast.city.name : '';
  const country = forecast.city ? forecast.city.country : '';

  const tempC = current.main.temp;
  const temp = unitC ? tempC : (tempC * 9) / 5 + 32;
  const tempRounded = Math.round(temp * 10) / 10;

  const description =
    current.weather && current.weather[0] ? current.weather[0].description : '';

  const iconCode =
    current.weather && current.weather[0] ? current.weather[0].icon : null;
  const iconUrl = iconCode
    ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    : null;

  // 다음 예보 4개 (3시간 간격)
  const nextList = forecast.list.slice(1, 5);

  return (
    <div className="weather-box">
      <div className="d-flex align-items-center">
        {iconUrl && (
          <img
            src={iconUrl}
            alt={description}
            style={{ width: 80, height: 80 }}
          />
        )}
        <div className="ms-3">
          <h4 className="mb-0">
            {cityName} {country ? `, ${country}` : ''}
          </h4>
          <p className="mb-1 text-capitalize">{description}</p>
          <h1 className="temp-display">
            {tempRounded}°{unitC ? 'C' : 'F'}
          </h1>
        </div>
      </div>

      <div className="mt-3 small-forecast d-flex justify-content-between">
        {nextList.map((item, idx) => {
          const tC = item.main.temp;
          const t = unitC ? tC : (tC * 9) / 5 + 32;
          const tt = Math.round(t * 10) / 10;
          const time = item.dt_txt ? item.dt_txt.split(' ')[1].slice(0, 5) : '';
          const ico =
            item.weather && item.weather[0] ? item.weather[0].icon : null;
          const icoUrl = ico
            ? `https://openweathermap.org/img/wn/${ico}.png`
            : null;

          return (
            <div key={idx} className="text-center forecast-item">
              <div className="small-time">{time}</div>
              {icoUrl && <img src={icoUrl} alt="" />}
              <div className="small-temp">{tt}°</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherBox;
