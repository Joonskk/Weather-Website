import React, {useEffect} from 'react'

const CurrentInfo = ({weatherJSON, isCelcius, error, setTemp}) => {

    const isDataValid =
        weatherJSON &&
        weatherJSON !== "wrong location" &&
        weatherJSON.main &&
        weatherJSON.weather;

    useEffect(() => {
      if (isDataValid) {
        const celciusTemp = (weatherJSON.main.temp - 273.15).toFixed(0);
        setTemp(celciusTemp);
      }
    }, [isDataValid, weatherJSON, setTemp]);

    const convertTemperature = (kelvin, isCelcius) => {
      if (isCelcius) {
        return `${(kelvin - 273.15).toFixed(0)}°C`;
      } else {
        return `${((kelvin - 273.15) * 9/5 + 32).toFixed(0)}°F`;
      }
    }

    return (
        <div className="currentInfo">
            {isDataValid ? (
          <>
            <div className="name">{weatherJSON.name}</div>
            {console.log(weatherJSON)}
            <div className="deepInfo">
              <div className="deepInfo-left">
                <div className="temp">{convertTemperature(weatherJSON.main.temp, isCelcius)}</div>
                <div className="weather">{weatherJSON.weather[0].description}</div>
              </div>
              <div className="deepInfo-right">
                <table>
                  <tbody>
                  <tr>
                    <th>최대</th>
                    <td>{convertTemperature(weatherJSON.main.temp_max, isCelcius)}</td>
                    <th>습도</th>
                    <td>{weatherJSON.main.humidity}%</td>
                  </tr>
                  <tr>
                    <th>최소</th>
                    <td>{convertTemperature(weatherJSON.main.temp_min, isCelcius)}</td>
                    <th>체감</th>
                    <td>{convertTemperature(weatherJSON.main.feels_like, isCelcius)}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div className="weather-icon">
                <img src={`https://openweathermap.org/img/wn/${weatherJSON.weather[0].icon}@2x.png`} alt={weatherJSON.weather[0].description} />
              </div>
            </div>
          </>
        ) : (
          <>
          {
            error ? <h1>Wrong Location</h1> : null
          }
          </>
        )}
        </div>
    )
}

// Used React.memo() to avoid rerendering CurrentInfo.jsx
export default React.memo(CurrentInfo);