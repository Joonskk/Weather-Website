const CurrentInfo = ({weatherJSON, isCelcius}) => {
    return (
        <div className="currentInfo">
            {weatherJSON ? (
          <>
            <div className="name">{weatherJSON.name}</div>
            {isCelcius ?
            <>
            <div className="temp">{(weatherJSON.main.temp - 273.15).toFixed(0)}°C</div>
            <div className="temp-max">max: {(weatherJSON.main.temp_max - 273.15).toFixed(0)}°C</div>
            <div className="temp-min">min: {(weatherJSON.main.temp_min - 273.15).toFixed(0)}°C</div>
            <div className="humidity">💧: {weatherJSON.main.humidity}%</div>
            <div className="weather">{weatherJSON.weather[0].main}</div>
            </>
            :
            <>
            <div className="temp">{((weatherJSON.main.temp - 273.15)*9/5+32).toFixed(0)}°F</div>
            <div className="temp-max">max: {((weatherJSON.main.temp_max - 273.15)*9/5+32).toFixed(0)}°F</div>
            <div className="temp-min">min: {((weatherJSON.main.temp_min - 273.15)*9/5+32).toFixed(0)}°F</div>
            <div className="humidity">💧: {weatherJSON.main.humidity}%</div>
            <div className="weather">{weatherJSON.weather[0].main}</div>
            </>
            }
          </>
        ) : (
          <h1>Loading...</h1>
        )}
        </div>
    )
}

export default CurrentInfo;