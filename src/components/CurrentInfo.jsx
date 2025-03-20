const CurrentInfo = ({weatherJSON, isCelcius, error}) => {

    const isDataValid =
        weatherJSON &&
        weatherJSON !== "wrong location" &&
        weatherJSON.main &&
        weatherJSON.weather;

    return (
        <div className="currentInfo">
            {isDataValid ? (
          <>
            <div className="name">{weatherJSON.name}</div>
            {console.log(weatherJSON)}
            {isCelcius ?
            <div className="deepInfo">
              <div className="deepInfo-left">
                <div className="temp">{(weatherJSON.main.temp - 273.15).toFixed(0)}°C</div>
                <div className="weather">{weatherJSON.weather[0].description}</div>
              </div>
              <div className="deepInfo-right">
                <table>
                  <tbody>
                  <tr>
                    <th>최대</th>
                    <td>{(weatherJSON.main.temp_max - 273.15).toFixed(0)}°C</td>
                    <th>습도</th>
                    <td>{weatherJSON.main.humidity}%</td>
                  </tr>
                  <tr>
                    <th>최소</th>
                    <td>{(weatherJSON.main.temp_min - 273.15).toFixed(0)}°C</td>
                    <th>체감</th>
                    <td>{(weatherJSON.main.feels_like - 273.15).toFixed(0)}°C</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div className="weather-icon">
                <img src={`https://openweathermap.org/img/wn/${weatherJSON.weather[0].icon}@2x.png`} alt={weatherJSON.weather[0].description} />
              </div>
            </div>
            :
            <div className="deepInfo">
              <div className="deepInfo-left">
                <div className="temp">{((weatherJSON.main.temp - 273.15)*9/5+32).toFixed(0)}°F</div>
                <div className="weather">{weatherJSON.weather[0].description}</div>
              </div>
              <div className="deepInfo-right">
                <table>
                  <tbody>
                  <tr>
                    <th>최대</th>
                    <td>{((weatherJSON.main.temp_max - 273.15)*9/5+32).toFixed(0)}°F</td>
                    <th>습도</th>
                    <td>{weatherJSON.main.humidity}%</td>
                  </tr>
                  <tr>
                    <th>최소</th>
                    <td>{((weatherJSON.main.temp_min - 273.15)*9/5+32).toFixed(0)}°F</td>
                    <th>체감</th>
                    <td>{((weatherJSON.main.feels_like - 273.15)*9/5+32).toFixed(0)}°F</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div className="weather-icon">
                <img src={`https://openweathermap.org/img/wn/${weatherJSON.weather[0].icon}@2x.png`} alt={weatherJSON.weather[0].description} />
              </div>
            </div>
            }
          </>
        ) : (
          <>
          {
            error ? <h1>Wrong Location</h1> : <h1>Loading...</h1>
          }
          </>
        )}
        </div>
    )
}

export default CurrentInfo;