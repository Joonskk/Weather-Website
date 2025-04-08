type TransferProps = {
    isCelcius: boolean;
    setIsCelcius: React.Dispatch<React.SetStateAction<boolean>>;
}
// FC = Functional Component
const Transfer: React.FC<TransferProps> = ({isCelcius, setIsCelcius}) => {

    const onClick = () => {
        setIsCelcius(!isCelcius)
    }

    return (
        <div className="transfer">
            <button onClick={onClick}>{isCelcius ? "°C" : "°F"}</button>
        </div>
    )
}

export default Transfer