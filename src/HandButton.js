import HandIcon from "./HandIcon";
function HandButton({ value2, onClick }) {
    const handleClick = () => onClick(value2);
    return (
        <button onClick={handleClick}>
            <HandIcon value={value2}/>
        </button>);
  }
  export default HandButton;