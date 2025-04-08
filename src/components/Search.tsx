import {useEffect} from 'react'

type SearchProps = {
    location: string;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
    getWeatherByPosition: (lat?: number, lon?: number) => Promise<void>;
}

const Search: React.FC<SearchProps> = ({location, setLocation, getWeatherByPosition}) => {

    const onChange = (e: React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === "Enter"){
            setLocation(e.currentTarget.value)
        }
    }

    useEffect(()=>{
        if(location) getWeatherByPosition()
    },[location])

    return (
        <div className="search">
            <input placeholder="Search Location" onKeyDown={onChange}/>
        </div>
    )
}

export default Search