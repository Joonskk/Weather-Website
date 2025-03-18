import Search from './Search'
import Transfer from './Transfer'

const Nav = ({location, setLocation, getWeatherByPosition, isCelcius, setIsCelcius}) => {
    return (
        <nav>
            <div className="logo"><a href="/">J 날씨</a></div>
            <Search location={location} setLocation={setLocation} getWeatherByPosition={getWeatherByPosition} />
            <Transfer isCelcius={isCelcius} setIsCelcius={setIsCelcius} />
        </nav>
    )
}

export default Nav