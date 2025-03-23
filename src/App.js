import { useEffect, useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import Nav from './components/Nav'
import CurrentInfo from './components/CurrentInfo'
import Spinner from './components/Spinner'

function App() {

  const [location, setLocation] = useState("")
  const [weatherJSON, setWeatherJSON] = useState(null)
  const [init, setInit] = useState(true)
  const [isCelcius, setIsCelcius] = useState(true)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [temp, setTemp] = useState(0)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByPosition(lat, lon)
    }, (error) => {
      console.error("Error occurred: ", error)
    });
  }, [])

  const getWeatherByPosition = useCallback(async (lat, lon) => {
    try {
      setLoading(true)
      setError(false)
      let url = init ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_KEY}`
        : `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_WEATHER_KEY}`
      let response = await fetch(url)
      let data = await response.json()
      if (data.cod === 200) {
        setWeatherJSON(data);
        setInit(false);
      } else {
        setWeatherJSON(null);
        setError(true);
      }
    } catch (err) {
      setWeatherJSON(null)
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [init, location])

  // Used useMemo Hook to avoid changing bgPicture in unnecessary situations.
  const bgPicture = useMemo(() => {
    if (loading) return "loading";
    return temp > 25 ? "hot" : temp > 15 ? "warm" : temp > 5 ? "cool" : "cold";
  }, [loading, temp]);

  const bgUrl = `/assets/${bgPicture}.jpg`;

  return (
    <div className="App">
      {bgUrl &&
        <div
          className="container"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backgroundImage: `url(${bgUrl})`,
            backgroundBlendMode: "darken",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
            color: "white",
          }}
        >
          <Nav location={location} setLocation={setLocation} getWeatherByPosition={getWeatherByPosition}
            isCelcius={isCelcius} setIsCelcius={setIsCelcius} />
          <motion.div
            className="info"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {loading ? <Spinner /> :
              <CurrentInfo weatherJSON={weatherJSON} isCelcius={isCelcius} error={error} setTemp={setTemp} />}
          </motion.div>
        </div>
      }
    </div>
  );
}

export default App;
