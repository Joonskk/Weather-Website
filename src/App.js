import {useEffect, useState} from 'react'
import Nav from './components/Nav'
import CurrentInfo from './components/CurrentInfo'

function App() {

  const [location, setLocation] = useState('')
  const [weatherJSON, setWeatherJSON] = useState(null)
  const [init, setInit] = useState(true)
  const [isCelcius, setIsCelcius] = useState(true)

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByPosition(lat, lon)
    }, (error)=>{
      console.error("Error occured: ", error)
    });
  },[])

  const getWeatherByPosition = async (lat, lon) => {
    let url = init ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_KEY}`
     : `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_WEATHER_KEY}`
    let response = await fetch(url)
    let data = await response.json()
    console.log(data)
    setWeatherJSON(data)
    setInit(false)
  }

  return (
    <div className="App">
      <div className="container">
        <Nav location={location} setLocation={setLocation} getWeatherByPosition={getWeatherByPosition}
        isCelcius={isCelcius} setIsCelcius={setIsCelcius} />
        <CurrentInfo weatherJSON={weatherJSON} isCelcius={isCelcius} />
      </div>
    </div>
  );
}

export default App;
