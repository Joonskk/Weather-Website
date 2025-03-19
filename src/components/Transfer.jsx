import { useEffect } from "react"

const Transfer = ({isCelcius, setIsCelcius}) => {

    const onClick = () => {
        setIsCelcius(!isCelcius)
    }

    useEffect(()=>{
    },[isCelcius])

    return (
        <div className="transfer">
            <button onClick={onClick}>{isCelcius ? "°C" : "°F"}</button>
        </div>
    )
}

export default Transfer