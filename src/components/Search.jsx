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
        <search className="searchDiv">
            <input className="search" placeholder="Search Location" onKeyDown={(e)=>onChange(e)}/>
        </search>
    )
}

export default Search