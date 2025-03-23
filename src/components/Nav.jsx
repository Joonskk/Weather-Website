import { motion } from 'framer-motion'
import React from 'react'
import Search from './Search'
import Transfer from './Transfer'

const Nav = ({location, setLocation, getWeatherByPosition, isCelcius, setIsCelcius}) => {
    return (
        <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
            <div className="logo"><a href="/">날씨</a></div>
            <Search location={location} setLocation={setLocation} getWeatherByPosition={getWeatherByPosition} />
            <Transfer isCelcius={isCelcius} setIsCelcius={setIsCelcius} />
        </motion.nav>
    )
}

// Used React.memo() to avoid rerendering Nav.jsx
export default React.memo(Nav)