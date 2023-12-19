import HandIcon from "./HandIcon";
import './HandButton.css';

function HandButton({ value, onClick }) {

    // 이렇게 어렵게 할 필요없이 바로 값 넣으면됨
    // const className = `HandButton`
    // const className2 = `HandButton-icon`
    const handleClick = () => onClick(value);
    return (
        <button className="HandButton" onClick={handleClick}>
            <HandIcon className="HandButton-icon" value={value}/>
        </button>
        );
  }
  export default HandButton;