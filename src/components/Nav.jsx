import React from 'react'
import Search from './Search'
import Transfer from './Transfer'

const Nav = ({location, setLocation, getWeatherByPosition, isCelcius, setIsCelcius}) => {
    return (
        <nav>
            <div className="logo"><a href="/">날씨</a></div>
            <Search location={location} setLocation={setLocation} getWeatherByPosition={getWeatherByPosition} />
            <Transfer isCelcius={isCelcius} setIsCelcius={setIsCelcius} />
        </nav>
    )
}

// Used React.memo() to avoid rerendering Nav.jsx
export default React.memo(Nav)