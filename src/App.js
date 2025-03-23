import {useEffect, useState, useCallback, useMemo} from 'react'
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

  // Used useCallback Hook to avoid recreating getWeatherByPosition if isCelcius changes.
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
        // 잘못된 위치일 경우 에러 처리
        setWeatherJSON(null);
        setError(true);
      }
    } catch (err) {
      setWeatherJSON(null)
      setError(true)
    } finally {
      setLoading(false)
    }
  },[init, location])

  useEffect(()=>{
    console.log("getWeatherByPosition Changed!!!")
  },[getWeatherByPosition])


  // Used useMemo Hook to avoid changing bgPicture in unnecessary situations.
  const bgPicture = useMemo(() => {
    if (loading) return "loading";
    return temp > 25 ? "hot" : temp > 15 ? "warm" : temp > 5 ? "cool" : "cold";
  }, [loading, temp]);
  
  const bgUrl = `/assets/${bgPicture}.jpg`;

  return (
    <div className="App">
      <div className="container" style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundImage: `url(${bgUrl})`,
        backgroundBlendMode: "darken",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "white",
    }}>
        <Nav location={location} setLocation={setLocation} getWeatherByPosition={getWeatherByPosition}
        isCelcius={isCelcius} setIsCelcius={setIsCelcius} />
        <div className="info">
          {loading ? <Spinner /> : 
          <CurrentInfo weatherJSON={weatherJSON} isCelcius={isCelcius} error={error} setTemp={setTemp} />}
        </div>
        
      </div>
    </div>
  );
}

export default App;
