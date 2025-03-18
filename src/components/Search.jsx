import {useEffect} from 'react'

const Search = ({location, setLocation, getWeatherByPosition}) => {

    const onChange = (e)=>{
        if(e.key === "Enter"){
            setLocation(e.target.value)
        }
    }

    useEffect(()=>{
        if(location) getWeatherByPosition()
    },[location])

    return (
        <div className="search">
            <input placeholder="Search Location" onKeyDown={(e)=>onChange(e)}/>
        </div>
    )
}

export default Search