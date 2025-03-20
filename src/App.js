import {useEffect, useState} from 'react'
import Nav from './components/Nav'
import CurrentInfo from './components/CurrentInfo'


function App() {

  const [location, setLocation] = useState("")
  const [weatherJSON, setWeatherJSON] = useState(null)
  const [init, setInit] = useState(true)
  const [isCelcius, setIsCelcius] = useState(true)
  const [error, setError] = useState(false)
  const [weather, setWeather] = useState('clear');

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByPosition(lat, lon)
    }, (error)=>{
      console.error("Error occured: ", error)
    });
  },[])

  useEffect(() => {
    console.log("Error state changed:", error);
  }, [error]);

  const getWeatherByPosition = async (lat, lon) => {
    try {
      setError(false)
      let url = init ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_KEY}`
      : `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_WEATHER_KEY}`
      let response = await fetch(url)
      let data = await response.json()
      if (data.cod === 200) {
        setWeatherJSON(data);
        setInit(false);
      } else {
        // 잘못된 위치일 경우 에러 처리
        setWeatherJSON(null);
        setError(true);
      }
    } catch (err) {
      setWeatherJSON(null)
      setError(true)
    }
  }

  return (
    <div className="App">
      <div className="container">
        <Nav location={location} setLocation={setLocation} getWeatherByPosition={getWeatherByPosition}
        isCelcius={isCelcius} setIsCelcius={setIsCelcius} />
        <div className="info">
           <CurrentInfo weatherJSON={weatherJSON} isCelcius={isCelcius} error={error} />
        </div>
        
      </div>
    </div>
  );
}

export default App;
