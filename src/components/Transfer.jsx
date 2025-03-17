import { useEffect } from "react"

const Transfer = ({isCelcius, setIsCelcius}) => {

    const onClick = () => {
        setIsCelcius(!isCelcius)
    }

    useEffect(()=>{
        console.log(isCelcius)
    },[isCelcius])

    return (
        <div>
            <button onClick={onClick}>{isCelcius ? "To Fahrenheit" : "To Celcius"}</button>
        </div>
    )
}

export default Transfer