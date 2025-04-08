import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

type WeatherData = {
  name: string;
  main: WeatherMain;
  weather: WeatherDescription[];
}

type WeatherMain = {
  temp: number;
  temp_max: number;
  temp_min: number;
  humidity: number;
  feels_like: number;
}

type WeatherDescription = {
  description: string;
  icon: string;
}


type CurrentInfoProps = {
  weatherJSON: WeatherData;
  isCelcius: boolean;
  error: boolean;
  setTemp: React.Dispatch<React.SetStateAction<number>>;
}
// FC = Fucntional Component
const CurrentInfo: React.FC<CurrentInfoProps> = ({ weatherJSON, isCelcius, error, setTemp }) => {
  const isDataValid = weatherJSON && weatherJSON.main && weatherJSON.weather;

  useEffect(() => {
    if (isDataValid) {
      const celciusTemp = parseInt((weatherJSON.main.temp - 273.15).toFixed(0));
      setTemp(celciusTemp);
    }
  }, [isDataValid, weatherJSON, setTemp]);

  const convertTemperature = (kelvin: number, isCelcius: boolean): string => {
    if (isCelcius) {
      return `${(kelvin - 273.15).toFixed(0)}°C`;
    } else {
      return `${((kelvin - 273.15) * 9 / 5 + 32).toFixed(0)}°F`;
    }
  }

  return (
    <motion.div
      className="currentInfo"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {isDataValid ? (
        <>
          <div className="name">{weatherJSON.name}</div>
          <motion.div
            className="deepInfo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
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
            <motion.div
              className="weather-icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <img src={`https://openweathermap.org/img/wn/${weatherJSON.weather[0].icon}@2x.png`} alt={weatherJSON.weather[0].description} />
            </motion.div>
          </motion.div>
        </>
      ) : (
        <>
          {error && <h1>Wrong Location</h1>}
        </>
      )}
    </motion.div>
  )
}

export default React.memo(CurrentInfo);
